import React, { useEffect, useState } from "react";
import {addUserWeapon, getAllWeapons, getUserWeapons, updateUserWeapon, removeUserWeapon} from "../services/WeaponService";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {FaSortUp, FaSortDown} from 'react-icons/fa';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import Select from "react-dropdown-select";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const { SearchBar } = Search;

function Weapons(){
    const [weapons, setWeapons] = useState([]);
    const [userWeapons, setUserWeapons] = useState([]);
    const [weaponData, setWeaponData] = useState([]);
    const id = 1;
    const selectOptions = {
        0: '-',
        1: '✓'
    };
    const columns = [{
        dataField: `weapon_id`,
        hidden: true
    }, {
        dataField: `name`,
        text: `Name`,
        sort: true,
        sortCaret: sortingThing,
        editable: false
    },{
        dataField: `Users[0].UserWeapons.level`,
        text: `Level`,
        sort: true,
        sortCaret: sortingThing
    },{
        dataField: `Users[0].UserWeapons.desired_level`,
        text: `Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkLevel
    },{
        dataField: `Users[0].UserWeapons.ascended`,
        text: `Ascended`,
        editor: {
            type: Type.CHECKBOX,
            value: '1:0'
        },
        formatter: boolFormatter,
        formatExtraData: {
            0: '-',
            1: '✓'
        },
        sort: true,
        sortCaret: sortingThing
    },{
        dataField: `Users[0].UserWeapons.normal_atk_level`,
        text: `Normal Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserWeapons.normal_atk_desired_level`,
        text: `Normal Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserWeapons.q_atk_level`,
        text: `Q Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserWeapons.q_atk_desired_level`,
        text: `Q Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserWeapons.e_atk_level`,
        text: `E Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserWeapons.e_atk_desired_level`,
        text: `E Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserWeapons.managed`,
        text: `Managed`,
        editor: {
            type: Type.CHECKBOX,
            value: '1:0'
        },
        formatter: boolFormatter,
        formatExtraData: {
            0: '-',
            1: '✓'
        },
        sort: true,
        sortCaret: sortingThing,
        filter: selectFilter({
            options: selectOptions,
            placeholder: 'Any'
        })
    }];

    const defaultSorted = [{
        dataField: 'name',
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

    function checkLevel(newValue, row, column){
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Level should be numeric'
            };
        }
        else if (newValue > 90) {
            return {
                valid: false,
                message: 'Level should not be higher than 90'
            };
        }
        else if(newValue < 1){
            return {
                valid: false,
                message: 'Level should not be lower than 1'
            };
        }
        return true;
    }

    function checkTalent(newValue, row, column){
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Talent level should be numeric'
            };
        }
        else if (newValue > 10) {
            return {
                valid: false,
                message: 'Talent level should not be higher than 10'
            };
        }
        else if(newValue < 1){
            return {
                valid: false,
                message: 'Talent level should not be lower than 1'
            };
        }
        return true;
    }

    useEffect(() =>{
        retrieveWeaponsInfo();
        retrieveUserWeapons();
    }, []);

    function retrieveWeaponsInfo(){
        getAllWeapons().then(response => {
            setWeapons(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    function retrieveUserWeapons(){
        getUserWeapons(id).then(response => {
            setUserWeapons(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    function AddUserWeapon(cid){
        const data ={
            userid: id,
            weaponid: cid
        };
        addUserWeapon(data)
        .then(response => {
            console.log(response.data);
            console.log("The user weapon was added successfully!");
            retrieveWeaponsInfo();
            retrieveUserWeapons();
        })
        .catch(e => {
            console.log(e);
        });
    };

    function UpdateUserWeapon(value){
        const data ={
            userid: id,
            weaponid: value.weapon_id,
            level: value.level,
            desired_level: value.desired_level,
            ascended: value.ascended,
            managed: value.managed
        };
        updateUserWeapon(data)
        .then(response => {
            console.log(response.data);
            console.log("The user weapon was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    }; 

    function RemoveUserWeapon(cid){
        removeUserWeapon(id, cid)
        .then(response => {
            console.log(response.data);
            retrieveWeaponsInfo();
            retrieveUserWeapons();
            console.log("The user weapon was removed successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };

    function IsWeaponNotAdded(value){
        return !userWeapons.some(userWeapon => userWeapon.weapon_id === value.weapon_id);
    }

    function boolFormatter(cell, row, rowIndex, formatExtraData) {
        return(
        <span>{formatExtraData[cell]}</span>
        )
    }

    function saveChanged(){
        weaponData.forEach(UpdateUserWeapon);
        setWeaponData([]);
    }

    return(
        <Container fluid>
            <Row className="justify-content-md-center" >
                <h1>Weapon Roster</h1>
            </Row>
            <Row className="justify-content-md-center">
                <p>Click a cell to edit!</p>
            </Row>
            <Row className="justify-content-md-center">
                <ToolkitProvider
                    keyField="weapon_id"
                    data={ userWeapons }
                    columns={ columns }
                    search
                >{
                    props => (
                        <div>
                            <SearchBar { ...props.searchProps } className="searchBar"/>
                            <BootstrapTable
                                bootstrap4 
                                cellEdit={ cellEditFactory({ 
                                    mode: 'click',
                                    blurToSave: true,
                                    afterSaveCell: (oldValue, newValue, row, column) => {
                                        var indexOfWeapon = weaponData.findIndex(userWeapon => userWeapon.weapon_id === row.Users[0].UserWeapons.weapon_id);
                                        if(indexOfWeapon !== -1){
                                            weaponData[indexOfWeapon] = row.Users[0].UserWeapons;
                                        }else{
                                            weaponData.push(row.Users[0].UserWeapons)
                                        }
                                        setWeaponData(weaponData);
                                    }
                                })}
                                defaultSorted = {defaultSorted} 
                                striped hover bordered condensed
                                classes="my-table table-responsive"
                                filter={ filterFactory() }
                                { ...props.baseProps } />
                        </div>
                    )

                }
                </ToolkitProvider>
            </Row>
            <Row className="justify-content-between">
                <div className={'d-flex'}>
                    <div>
                        <Select 
                            className="my-dropdown"
                            options={weapons.filter(IsWeaponNotAdded)} 
                            values={[]} 
                            valueField="weapon_id" 
                            labelField="name" 
                            searchBy="name" 
                            sortBy="name"
                            onChange={
                                (value) => AddUserWeapon(value)
                            }
                            closeOnSelect
                            placeholder="Select weapon to add..."
                            dropdownGap = {-2}
                            style={{width: '300px !important', paddingRight: '10px'}}
                        />
                    </div>
                    <div style={{paddingLeft: '10px'}}>
                        <Select
                            className="my-dropdown" 
                            options={userWeapons} 
                            values={[]} 
                            valueField="weapon_id" 
                            labelField="name" 
                            searchBy="name" 
                            sortBy="name" 
                            onChange={
                                (value) => RemoveUserWeapon(value)
                            }
                            closeOnSelect
                            placeholder="Select weapon to remove..."
                            style={{width: '300px !important', paddingLeft: '10px'}}
                            dropdownGap = {-2}
                        />
                    </div>
                </div>
                <div>
                    <Button variant="primary" onClick={() => saveChanged()} disabled={!(weaponData.length > 0)}>
                            Save
                    </Button>
                </div>
            </Row>
        </Container>
    );
};

export default Weapons;
