import React, { useEffect, useState, useContext } from "react";
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
import Select from 'react-select';
import { RiSwordFill } from 'react-icons/ri';
import { userContext } from "../userContext";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {cloneDeep} from "lodash";
const { SearchBar } = Search;
const set = require('set-value');

function Weapons(){
    const user = useContext(userContext);
    const [weapons, setWeapons] = useState([]);
    const [userWeapons, setUserWeapons] = useState([]);
    const [weaponData, setWeaponData] = useState([]);
    const [changed, setChanged] = useState(false);
    const [show, setShow] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState({});
    const handleClose = () => setShow(false);
    const [addValue, setAddValue] = useState();
    const [removeValue, setRemoveValue] = useState();
    const [loading, setLoading] = useState(true);

    const selectOptions = {
        0: '-',
        1: '✓'
    };

    const editableHeader = {
        backgroundColor: '#303030', 
        position: 'sticky', 
        top: '50px', 
        zIndex: '1', 
        boxShadow: 'inset 1px 0px white, 0 2px white',
        height: '100px'
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
        headerStyle: {backgroundColor: '#424242', borderRight: '1px solid white', width: '300px', position: 'sticky', top: '50px', zIndex: '1', boxShadow: '1px 0px white, 0 2px white'}
    },{
        dataField: `Users[0].UserWeapons.level`,
        text: `Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkLevel,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserWeapons.desired_level`,
        text: `Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkDesiredLevel,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
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
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserWeapons.ascend_next_max`,
        text: `Ascend On Max?`,
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
        headerStyle: editableHeader
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
        headerStyle: editableHeader,
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
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if(user){
            getUserWeapons().then(response => {
                setUserWeapons(response.data);
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });
        }else{
            // If not signed in and no userWeapons stored locally...
            var localUserWeaponData = localStorage.getItem("userWeapons");
            if(!localUserWeaponData){
                localStorage.setItem("userWeapons", JSON.stringify([]));
            }else{
                setUserWeapons(JSON.parse(localUserWeaponData));
            }
        }
    };

    function AddUserWeapon(cid){
        if(user){
            const data ={
                wepid: cid
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
        }else{
            const weaponIndex = weapons.findIndex((element) => {
                return element.weapon_id === cid;
            });
            const newUserWeapon = weapons[weaponIndex];
            newUserWeapon.Users = [];
            newUserWeapon.Users[0]= {};
            set(newUserWeapon.Users[0], 'UserWeapons.weapon_id', cid);
            set(newUserWeapon.Users[0], 'UserWeapons.level', 1);
            set(newUserWeapon.Users[0], 'UserWeapons.desired_level', 1);
            set(newUserWeapon.Users[0], 'UserWeapons.ascended', 0);
            set(newUserWeapon.Users[0], 'UserWeapons.ascend_next_max', 0);
            set(newUserWeapon.Users[0], 'UserWeapons.managed', 1);
            const newUserWeapons = cloneDeep(userWeapons);
            newUserWeapons.push(newUserWeapon);
            setUserWeapons(newUserWeapons);
            localStorage.setItem("userWeapons", JSON.stringify(newUserWeapons));
        }
    };

    function UpdateUserWeapon(value){
        if(user){
            const data ={
                weaponid: value.weapon_id,
                level: value.level,
                desired_level: value.desired_level,
                ascended: value.ascended,
                ascend_next_max: value.ascend_next_max,
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
        }else{
            const indexOfWeapon = userWeapons.findIndex(weapon => weapon.weapon_id === value.weapon_id);
            const newUserWeapon = userWeapons[indexOfWeapon];
            set(newUserWeapon.Users[0], 'UserWeapons.level', value.level);
            set(newUserWeapon.Users[0], 'UserWeapons.desired_level', value.desired_level);
            set(newUserWeapon.Users[0], 'UserWeapons.ascended', value.ascended);
            set(newUserWeapon.Users[0], 'UserWeapons.ascend_next_max', value.ascend_next_max);
            set(newUserWeapon.Users[0], 'UserWeapons.managed', value.managed);
            const newUserWeapons = cloneDeep(userWeapons);
            newUserWeapons[indexOfWeapon] = newUserWeapon;
            setUserWeapons(newUserWeapons);
            localStorage.setItem("userWeapons", JSON.stringify(newUserWeapons));
        }
    }; 

    function RemoveUserWeapon(cid){
        if(user){
            removeUserWeapon(cid)
            .then(response => {
                console.log(response.data);
                retrieveWeaponsInfo();
                retrieveUserWeapons();
                console.log("The user weapon was removed successfully!");
            })
            .catch(e => {
                console.log(e);
            });
        }else{
            const newUserWeapons = cloneDeep(userWeapons);
            newUserWeapons.splice(newUserWeapons.findIndex(weapon => weapon.weapon_id === cid), 1);
            setUserWeapons(newUserWeapons);
            localStorage.setItem("userWeapons", JSON.stringify(newUserWeapons));
        }
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

    function populateAddUsers(){
        const newAddUsers = [];
        weapons.filter(IsWeaponNotAdded).forEach((element) => {
            newAddUsers.push({
                value: element.weapon_id,
                label: element.name,
                image: 'https://muni.moe/images/genshin/Weapon_'+ element.name.replace(/ /g, '_').replace(/'/g,'%27')+'.png'
            });
        });
        newAddUsers.sort((a, b) => {
            return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
        });
        return newAddUsers;
    }

    function populateRemoveUsers(){
        const newRemoveUsers = [];
        userWeapons.forEach((element) => {
            newRemoveUsers.push({
                value: element.weapon_id,
                label: element.name,
                image: 'https://muni.moe/images/genshin/Weapon_'+ element.name.replace(/ /g, '_').replace(/'/g,'%27')+'.png'
            });
        });
        newRemoveUsers.sort((a, b) => {
            return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
        });
       return newRemoveUsers;
    }

    const CustomOption = props => {
        const { innerProps, innerRef, isDisabled } = props;
        return (!isDisabled ? (
            <div ref={innerRef} {...innerProps} className="custom-option"> 
                <img src={props.data.image} style={{height: '32px', width: '32px', marginRight: "5px", display: 'inline-block', verticalAlign: 'middle', padding: '2px'}} alt= {props.data.label}/>
                {props.data.label}
            </div>
        ) : null);
    }

    return(
        <>
        <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <RiSwordFill size='64' color='white' style={{display: "inline-block", verticalAlign: 'middle !important', marginRight: '10px'}}/>
                <h1 style={{display: "inline-block"}}>Weapon Roster</h1>
            </div>   
        </Row>
        <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
                <p>Click a dark cell to edit!</p>
        </Row>
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
                    Are you sure you want to remove {toBeDeleted ? toBeDeleted.label : ''} from your roster?
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
                                        value = {addValue}
                                        options={populateAddUsers()} 
                                        onChange={
                                            (value) => {
                                                AddUserWeapon(value.value);
                                                setAddValue(null);
                                            }
                                        }
                                        placeholder="Select weapon to add..."
                                        components = {{
                                            Option: CustomOption
                                        }}
                                        isClearable
                                    />
                                </div>
                                <div  style={{width: '300px', paddingLeft: '10px', display: "inline-block"}}>
                                    <Select
                                        className="my-dropdown"
                                        value = {removeValue} 
                                        options={populateRemoveUsers()}
                                        onChange={
                                            (value) => {
                                                if(value !== undefined){
                                                    setToBeDeleted(value);
                                                    setShow(true);
                                                    setRemoveValue(null);
                                                }
                                            }
                                        }
                                        placeholder="Select weapon to remove..."
                                        components = {{
                                            Option: CustomOption
                                        }}
                                        isClearable   
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

export default Weapons;
