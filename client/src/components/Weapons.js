import React, { useEffect, useState } from "react";
import {addUserWeapon, getAllWeapons, getUserWeapons, updateUserWeapon, removeUserWeapon} from "../services/WeaponService";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
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
    const [changed, setChanged] = useState(false);
    const [show, setShow] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        text: `Weapon`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        formatter: imageFormatter,
        style: {borderRight: '1px solid white', width: '300px'},
        headerStyle: {borderRight: '1px solid white', width: '300px'}
    },{
        dataField: `Users[0].UserWeapons.level`,
        text: `Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkLevel,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserWeapons.desired_level`,
        text: `Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkDesiredLevel,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
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
        sortCaret: sortingThing,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
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
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'},
        sortCaret: sortingThing,
        filter: selectFilter({
            options: selectOptions,
            placeholder: 'Any',
            defaultValue: 1
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
        else if(newValue > row.Users[0].UserWeapons.desired_level){
            row.Users[0].UserWeapons.desired_level = newValue;
            return true;
        }
        return true;
    }

    function checkDesiredLevel(newValue, row, column){
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Desired level should be numeric'
            };
        }
        else if (newValue > 90) {
            return {
                valid: false,
                message: 'Desired level should not be higher than 90'
            };
        }
        else if(newValue < 1){
            return {
                valid: false,
                message: 'Desired level should not be lower than 1'
            };
        }
        else if(newValue < row.Users[0].UserWeapons.level){
            return {
                valid: false,
                message: 'Desired level should be higher than level'
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
        setChanged(false);
        weaponData.forEach(UpdateUserWeapon);
        setWeaponData([]);
    }

    function imageFormatter(cell, row, rowIndex, formatExtraData) {
        return(
        <span>
            <Image src={'https://muni.moe/images/genshin/Weapon_'+cell.replace(/ /g, '_').replace(/'/g,'%27')+'.png'} style={{height: '64px', width: '64px', marginRight: "10px", display: 'inline-block', verticalAlign: 'middle'}}/>
            <p style={{display: 'inline-block'}}>{cell}</p>
            
        </span>
        )
    }

    return(
        <>
        <Container fluid className='table-container'>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Deleting Weapon
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove {toBeDeleted.name} from your roster?
                    <br></br>Doing so will wipe all data relating to it!<br></br>
                    <b>TIP: If you set a weapon to not managed, it won't show up by default.</b>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Nevermind
                </Button>
                <Button variant="primary" onClick={() => {
                    handleClose();
                    RemoveUserWeapon(toBeDeleted.weapon_id);
                }             
                    }>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
            <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
                <h1>Weapon Roster</h1>
            </Row>
            <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
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
                            <Row className="justify-content-md-between" style={{paddingLeft: '30px', paddingRight: '30px'}}>
                            <div style={{width: '300px', display: "inline-block"}} >
                                <SearchBar { ...props.searchProps } className="searchBar"/>
                            </div>
                            <div>
                                <div style={{width: '300px', display: "inline-block"}}>
                                    <Select 
                                        className="my-dropdown"
                                        options={weapons.filter(IsWeaponNotAdded)} 
                                        values={[]} 
                                        valueField="weapon_id" 
                                        labelField="name" 
                                        searchBy="name" 
                                        sortBy="name"
                                        onChange={
                                            (value) => {AddUserWeapon(value[0].weapon_id)}
                                        }
                                        closeOnSelect
                                        placeholder="Select weapon to add..."
                                        dropdownGap = {-2}
                                        dropdownPosition= "auto"
                                        clearOnSelect={true}
                                    />
                                </div>
                                <div style={{width: '300px', paddingLeft: '10px', display: "inline-block"}}>
                                    <Select
                                        className="my-dropdown" 
                                        options={userWeapons} 
                                        values={[]} 
                                        valueField="weapon_id" 
                                        labelField="name" 
                                        searchBy="name" 
                                        sortBy="name" 
                                        onChange={
                                            (value) => {
                                                setToBeDeleted(value[0]);
                                                setShow(true);
                                            }
                                        }
                                        closeOnSelect
                                        placeholder="Select weapon to remove..."
                                        dropdownGap = {-2}
                                        dropdownPosition= "auto"
                                        clearOnSelect={true}
                                    />
                                </div>
                            </div>
                            </Row>
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
                                        setChanged(true);
                                    }
                                })}
                                defaultSorted = {defaultSorted} 
                                hover condensed
                                classes="my-table"
                                bordered= {false}
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
        <Button variant="primary" className="position-sticky float-right" style={{bottom: '10px', right: '10px', marginRight: '0px'}} onClick={() => saveChanged()} disabled={!(weaponData.length > 0)}>
                        Save
            </Button>
        </>
    );
};

export default Weapons;
