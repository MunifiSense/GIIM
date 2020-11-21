import React, { useEffect, useState } from "react";
import {addUserItems, getAllItems, getUserItems, updateUserItem} from "../services/ItemService";
import {retrieveNeeded, checkForge} from "../tools/ItemCalc";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {FaSortUp, FaSortDown} from 'react-icons/fa';
import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const { SearchBar } = Search;

function Items(){
    const [items, setItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [changed, setChanged] = useState(false);
    const id = 1;
    const columns = [{
        dataField: `item_id`,
        hidden: true
    },{
        dataField: `game_sort_order`,
        text: 'Game Sort',
        sort: true,
        sortCaret: sortingThing,
        editable: false
    },{
        dataField: `name`,
        text: `Name`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        formatter: imageFormatter,
        style: {width: '300px'},
        headerStyle: {width: '300px'}
    },{
        dataField: `Users[0].UserItems.amount`,
        text: `Have`,
        sort: true,
        sortCaret: sortingThing,
        style: {backgroundColor: '#303030', borderLeft: '1px solid white', borderRight: '1px solid white'},
        headerStyle: {backgroundColor: '#303030', borderLeft: '1px solid white', borderRight: '1px solid white'},
        validator: checkAmountNum
    },{
        dataField: `needed`,
        text: `Needed Total`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        filter: numberFilter({
            defaultValue: { number: '0', comparator: Comparator.GT },
            placeholder: '#'
          })
    },{
        dataField: `Users[0].UserItems.forge`,
        text: `Forge`,
        sort: true,
        sortCaret: sortingThing,
        style: (cell, row, rowIndex, colIndex) => {
            if(cell !== -1){
               return {backgroundColor: '#303030', borderLeft: '1px solid white', borderRight: '1px solid white'}
            }else{
                return {borderLeft: '1px solid white', borderRight: '1px solid white'}
            }
        },
        headerStyle: {backgroundColor: '#303030', borderLeft: '1px solid white', borderRight: '1px solid white'},
        editable: (cell, row, rowIndex, colIndex) => {
            return cell !== -1;
        },
        formatter: forgeFormatter,
        formatExtraData: {
            '-1': ''
        },
        validator: checkForgeNum
    },{
        dataField: `canForge`,
        text: `Can Forge`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        formatter: forgeFormatter,
        formatExtraData: {
            '-1': ''
        }
    },{
        dataField: `totalAmount`,
        text: `Total Amount`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            if(cell < 0){
               return {color: 'red'}
            }
        }
    },{
        dataField: `neededCharacterAsc`,
        text: `Character Ascension`,
        sort: true,
        sortCaret: sortingThing,
        editable: false
    },{
        dataField: `neededCharacterTalent`,
        text: `Character Talent`,
        sort: true,
        sortCaret: sortingThing,
        editable: false
    },{
        dataField: `neededCharacterLevel`,
        text: `Character Leveling`,
        sort: true,
        sortCaret: sortingThing,
        editable: false
    },{
        dataField: `neededWeaponAsc`,
        text: `Weapon Ascension`,
        sort: true,
        sortCaret: sortingThing,
        editable: false
    },{
        dataField: `neededWeaponLevel`,
        text: `Weapon Leveling`,
        sort: true,
        sortCaret: sortingThing,
        editable: false
    }];

    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    function sortingThing(order, column){
        if (!order) return (
        <span>&nbsp;&nbsp;
            <div style={{display: 'inline-block'}}>
                <FaSortUp />
                <FaSortDown style={{ position: 'relative', right: '16px'}} />
            </div>
        </span>);
        else if (order === 'asc') return (
        <span>&nbsp;&nbsp;
            <div style={{display: 'inline-block'}}>
                <FaSortUp />
                <FaSortDown style={{ position: 'relative', right: '16px', fill: 'gray' }} />
            </div>
        </span>);
        else if (order === 'desc') return (
        <span>&nbsp;&nbsp;
            <div style={{display: 'inline-block'}}>
                <FaSortUp style={{ fill: 'gray' }} />
                <FaSortDown style={{ position: 'relative', right: '16px' }}/>
            </div>
        </span>);
        return null;
    }

    useEffect(() =>{
        retrieveStuff();
    }, []);

    function forgeFormatter(cell, row, rowIndex, formatExtraData) {
        if(cell !== -1){
            return cell;
        }
        return(
        <span>{formatExtraData[cell]}</span>
        )
    }

    async function retrieveStuff(){
        setItems(await retrieveItemsInfo());
        setUserItems(await retrieveNeeded(await retrieveUserItems()));
    }

    async function retrieveItemsInfo(){
        return new Promise(function(resolve, reject) {
            getAllItems().then(response => {
                resolve(response.data);
            }).catch(e => {
                console.log(e);
            });
        })
    };

    async function retrieveUserItems(){
        return new Promise(function(resolve, reject) {
            getUserItems(id).then(response => {
                if(response.data.length < items.length){
                    AddUserItems();
                }
                resolve(response.data);
            }).catch(e => {
                console.log(e);
            });
        })
    };

    

    function checkAmountNum(newValue, row, column){
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Number should be numeric'
            };
        }
        else if(newValue < 0){
            return {
                valid: false,
                message: 'Number should not be lower than 0'
            };
        }
        
        return true;
    }

    async function checkForgeNum(newValue, row, column){
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Number should be numeric'
            };
        }
        else if(newValue < 0){
            return {
                valid: false,
                message: 'Number should not be lower than 0'
            };
        }
        
        setUserItems(await checkForge(userItems));
        
        return true;
    }

    function AddUserItems(){
        addUserItems(id)
        .then(response => {
            console.log(response.data);
            console.log("The user item was added successfully!");
            retrieveUserItems();
        })
        .catch(e => {
            console.log(e);
        });
    };

    function UpdateUserItem(value){
        console.log(value);
        const data ={
            userid: id,
            itemid: value.item_id,
            amount: value.amount,
            forge: value.forge
        };
        updateUserItem(data)
        .then(response => {
            console.log(response.data);
            console.log("The user item was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    }; 

    function saveChanged(){
        setChanged(false);
        itemData.forEach(UpdateUserItem);
        setItemData([]);
    }

    function imageFormatter(cell, row, rowIndex, formatExtraData) {
        return(
        <span>
            <Image src={'https://muni.moe/images/genshin/Item_'+cell.replace(/ /g, '_').replace(/'/g,'%27')+'.png'} style={{height: '32px', width: '32px', marginRight: "10px", display: 'inline-block', verticalAlign: 'middle'}}/>
            <p style={{display: 'inline-block'}}>{cell}</p>
            
        </span>
        )
    }

    return(
        <>
        <Container fluid className='table-container'>
            <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
                <h1>Item Inventory</h1>
            </Row>
            <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
                <p>Click a cell to edit!</p>
            </Row>
            <Row className="justify-content-md-center">
                <ToolkitProvider
                    keyField="item_id"
                    data={ userItems }
                    columns={ columns }
                    search
                >{
                    props => (
                        <div>
                            <Row style={{paddingLeft: '30px', paddingRight: '30px'}}>
                                <div>
                                    <SearchBar { ...props.searchProps } className="searchBar" />
                                </div>                                               
                            </Row>
                            <BootstrapTable
                                bootstrap4
                                cellEdit={ cellEditFactory({ 
                                    mode: 'click',
                                    blurToSave: true,
                                    afterSaveCell: (oldValue, newValue, row, column) => {
                                        var indexOfItem = itemData.findIndex(userItem => userItem.item_id === row.Users[0].UserItems.item_id);
                                        if(indexOfItem !== -1){
                                            itemData[indexOfItem] = row.Users[0].UserItems;
                                        }else{
                                            itemData.push(row.Users[0].UserItems);
                                        }
                                        setItemData(itemData);
                                        setChanged(true);
                                    }
                                })}
                                defaultSorted = {defaultSorted} 
                                hover condensed
                                classes="my-table"
                                bordered={false}
                                filter={ filterFactory() }
                                noDataIndication={() => (
                                    <Spinner animation="border" variant="light" />
                                )}
                                { ...props.baseProps } />
                        </div>
                    )

                }
                </ToolkitProvider>
            </Row>
        </Container>
        <Button variant="primary" className="position-sticky float-right" style={{bottom: '10px', right: '10px', marginRight: '0px'}} onClick={() => saveChanged()} disabled={!changed}>
                        Save
                </Button>
        </>
    );
};

export default Items;
