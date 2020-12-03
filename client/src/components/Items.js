import React, { useEffect, useState, useContext  } from "react";
import {getAllItems, getUserItems, updateUserItem} from "../services/ItemService";
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
import {GiSwapBag} from 'react-icons/gi';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userContext } from "../userContext";
import {cloneDeep} from "lodash";
const set = require('set-value');
const { SearchBar } = Search;

function Items(){
    const user = useContext(userContext);
    const [items, setItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [changed, setChanged] = useState(false);
    const [loading, setLoading] = useState(true);

    const unEditableHeader = {
        backgroundColor: '#424242', 
        position: 'sticky', 
        top: '50px', 
        zIndex: '1', 
        boxShadow: '0 2px white',
        height: '100px'
    };

    const columns = [{
        dataField: `item_id`,
        hidden: true
    },{
        dataField: `game_sort_order`,
        text: 'Game\nSort',
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        headerStyle: unEditableHeader
    },{
        dataField: `name`,
        text: `Name`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        formatter: imageFormatter,
        style: {width: '300px'},
        headerStyle: {
            backgroundColor: '#424242', 
            position: 'sticky', 
            top: '50px', 
            zIndex: '1', 
            boxShadow: '0 2px white',
            height: '100px',
            width: '300px'
        }
    },{
        dataField: `Users[0].UserItems.amount`,
        text: `Have`,
        sort: true,
        sortCaret: sortingThing,
        style: {backgroundColor: '#303030', borderLeft: '1px solid white', borderRight: '1px solid white'},
        headerStyle: {backgroundColor: '#303030', position: 'sticky', top: '50px', zIndex: '1', boxShadow: 'inset 1px 0px white, 0 2px white', height: '100px'},
        validator: checkAmountNum
    },{
        dataField: `needed`,
        text: `Needed\nTotal`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        filter: numberFilter({
            defaultValue: { number: '0', comparator: Comparator.GT },
            placeholder: '#'
          }),
        headerStyle: {
            backgroundColor: '#424242', 
            position: 'sticky', 
            top: '50px', 
            zIndex: '1', 
            boxShadow: 'inset 1px 0px white, 0 2px white',
            height: '100px'
        }
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
        headerStyle: {backgroundColor: '#303030', position: 'sticky', top: '50px', zIndex: '1', boxShadow: 'inset 1px 0px white, 0 2px white', height: '100px'},
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
        text: `Can\nForge`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        formatter: forgeFormatter,
        formatExtraData: {
            '-1': ''
        },
        headerStyle: {
            backgroundColor: '#424242', 
            position: 'sticky', 
            top: '50px', 
            zIndex: '1', 
            boxShadow: 'inset 1px 0px white, 0 2px white',
            height: '100px'
        }
    },{
        dataField: `totalAmount`,
        text: `Total\nAmount`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            if(cell < 0){
               return {color: 'red'}
            }
        },
        headerStyle: unEditableHeader
    },{
        dataField: `neededCharacterAsc`,
        text: `Character\nAscension`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        headerStyle: unEditableHeader
    },{
        dataField: `neededCharacterTalent`,
        text: `Character\nTalent`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        headerStyle: unEditableHeader
    },{
        dataField: `neededCharacterLevel`,
        text: `Character\nLeveling`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        headerStyle: unEditableHeader
    },{
        dataField: `neededWeaponAsc`,
        text: `Weapon\nAscension`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        headerStyle: unEditableHeader
    },{
        dataField: `neededWeaponLevel`,
        text: `Weapon\nLeveling`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        headerStyle: unEditableHeader
    }];

    const defaultSorted = [{
        dataField: 'game_sort_order',
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
        (async function retrieveStuff() {
            setLoading(true);
            setItems(await retrieveItemsInfo());
            setUserItems(await retrieveNeeded(user, await retrieveUserItems()));
            setLoading(false);
        }) ();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    function forgeFormatter(cell, row, rowIndex, formatExtraData) {
        if(cell !== -1){
            return cell;
        }
        return(
        <span>{formatExtraData[cell]}</span>
        )
    }

    /*async function retrieveStuff(){
        setItems(await retrieveItemsInfo());
        setUserItems(await retrieveNeeded(await retrieveUserItems()));
        setLoading(false);
    }*/

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
            if(user){
                getUserItems().then(response => {
                    resolve(response.data);
                }).catch(e => {
                    console.log(e);
                });
            }else{
                // If not signed in and no userItems stored locally...
                const localUserItemData = JSON.parse(localStorage.getItem("userItems"));
                if(!localUserItemData || localUserItemData.length === 0){
                    const newUserItems = [];
                    items.forEach(element => {
                        const newUserItem = element;
                        newUserItem.Users = [];
                        newUserItem.Users[0]= {};
                        set(newUserItem.Users[0], 'UserItems.amount', 0);
                        set(newUserItem.Users[0], 'UserItems.forge', 0);
                        newUserItems.push(newUserItem);               
                    }) 
                    //setUserItems(newUserItems);     
                    localStorage.setItem("userItems", JSON.stringify(newUserItems));
                    resolve(newUserItems);
                }else{
                    resolve(localUserItemData);
                }
            }
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

    function UpdateUserItem(value){
        if(user){
            const data ={
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
        }else{
            const indexOfItem = itemData.findIndex(itema => itema.item_id === value.item_id);
            const newUserItem = itemData[indexOfItem];
                set(newUserItem.Users[0], 'UserItems.amount', value.amount);
                set(newUserItem.Users[0], 'UserItems.forge', value.forge);
                const newUserItems = cloneDeep(userItems);
                newUserItems.push(newUserItem);
                setUserItems(newUserItems);
                localStorage.setItem("userItems", JSON.stringify(newUserItems));
        }
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
        <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <GiSwapBag size='64' color='white' style={{display: "inline-block", verticalAlign: 'middle !important', marginRight: '10px'}}/>
                <h1 style={{display: "inline-block"}}>Item Inventory</h1>
            </div>    
        </Row>
        <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
            <p>Click a dark cell to edit!</p>
        </Row>
        <Container fluid className='table-container'>         
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
                                        const indexOfItem = itemData.findIndex(userItem => userItem.item_id === row.Users[0].UserItems.item_id);
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
                                    loading ? <Spinner animation="border" variant="light" /> : <p>No Data</p>
                                )}
                                { ...props.baseProps } />
                        </div>
                    )

                }
                </ToolkitProvider>
            </Row>
        </Container>
        <Button variant="primary" className="position-sticky float-right save-button" onClick={() => saveChanged()} disabled={!changed}>
                        Save
        </Button>
        </>
    );
};

export default Items;
