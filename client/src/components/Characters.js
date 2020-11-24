import React, { useEffect, useState } from "react";
import {addUserCharacter, getAllCharacters, getUserCharacters, updateUserCharacter, removeUserCharacter} from "../services/CharacterService";
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
import { BsFillPeopleFill } from 'react-icons/bs';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/esm/Card";
const { SearchBar } = Search;

function Characters(){
    const [characters, setCharacters] = useState([]);
    const [userCharacters, setUserCharacters] = useState([]);
    const [characterData, setCharacterData] = useState([]);
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
        dataField: `character_id`,
        hidden: true
    }, {
        dataField: `name`,
        text: `Character`,
        sort: true,
        sortCaret: sortingThing,
        editable: false,
        style: {borderRight: '1px solid white', width: '175px'},
        headerStyle: {borderRight: '1px solid white', width: '175px'},
        formatter: imageFormatter
    },{
        dataField: `Users[0].UserCharacters.level`,
        text: `Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkLevel,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.desired_level`,
        text: `Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkDesiredLevel,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.ascended`,
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
        dataField: `Users[0].UserCharacters.ascend_next_max`,
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
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.normal_atk_level`,
        text: `Normal Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkNTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.normal_atk_desired_level`,
        text: `Normal Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkNDesiredTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.q_atk_level`,
        text: `Q Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkQTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.q_atk_desired_level`,
        text: `Q Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkQDesiredTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.e_atk_level`,
        text: `E Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkETalent,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.e_atk_desired_level`,
        text: `E Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkEDesiredTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'}
    },{
        dataField: `Users[0].UserCharacters.managed`,
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
        style: {backgroundColor: '#303030'},
        headerStyle: {backgroundColor: '#303030'},
        sort: true,
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
        else if(newValue > row.Users[0].UserCharacters.desired_level){
            row.Users[0].UserCharacters.desired_level = newValue;
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
        else if(newValue < row.Users[0].UserCharacters.level){
            return {
                valid: false,
                message: 'Desired level should be higher than level'
            };
        }
        return true;
    }

    function checkQTalent(newValue, row, column){
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
        else if(newValue > row.Users[0].UserCharacters.q_atk_desired_level){
            row.Users[0].UserCharacters.q_atk_desired_level = newValue;
            return true;
        }
        return true;
    }

    function checkQDesiredTalent(newValue, row, column){
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Desired talent level should be numeric'
            };
        }
        else if (newValue > 10) {
            return {
                valid: false,
                message: 'Desired talent level should not be higher than 10'
            };
        }
        else if(newValue < 1){
            return {
                valid: false,
                message: 'Desired talent level should not be lower than 1'
            };
        }
        else if(newValue < row.Users[0].UserCharacters.q_atk_level){
            return {
                valid: false,
                message: 'Desired level should be higher than level'
            };
        }
        return true;
    }

    function checkNTalent(newValue, row, column){
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
        else if(newValue > row.Users[0].UserCharacters.normal_atk_desired_level){
            row.Users[0].UserCharacters.q_atk_desired_level = newValue;
            return true;
        }
        return true;
    }

    function checkNDesiredTalent(newValue, row, column){
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Desired talent level should be numeric'
            };
        }
        else if (newValue > 10) {
            return {
                valid: false,
                message: 'Desired talent level should not be higher than 10'
            };
        }
        else if(newValue < 1){
            return {
                valid: false,
                message: 'Desired talent level should not be lower than 1'
            };
        }
        else if(newValue < row.Users[0].UserCharacters.normal_atk_level){
            return {
                valid: false,
                message: 'Desired level should be higher than level'
            };
        }
        return true;
    }

    function checkETalent(newValue, row, column){
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
        else if(newValue > row.Users[0].UserCharacters.e_atk_desired_level){
            row.Users[0].UserCharacters.q_atk_desired_level = newValue;
            return true;
        }
        return true;
    }

    function checkEDesiredTalent(newValue, row, column){
        if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Desired talent level should be numeric'
            };
        }
        else if (newValue > 10) {
            return {
                valid: false,
                message: 'Desired talent level should not be higher than 10'
            };
        }
        else if(newValue < 1){
            return {
                valid: false,
                message: 'Desired talent level should not be lower than 1'
            };
        }
        else if(newValue < row.Users[0].UserCharacters.e_atk_level){
            return {
                valid: false,
                message: 'Desired level should be higher than level'
            };
        }
        return true;
    }

    useEffect(() =>{
        retrieveCharactersInfo();
        retrieveUserCharacters();
    }, []);

    function retrieveCharactersInfo(){
        getAllCharacters().then(response => {
            setCharacters(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    function retrieveUserCharacters(){
        getUserCharacters(id).then(response => {
            setUserCharacters(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    function AddUserCharacter(cid){
        const data ={
            userid: id,
            charid: cid
        };
        addUserCharacter(data)
        .then(response => {
            console.log(response.data);
            console.log("The user character was added successfully!");
            retrieveUserCharacters();
        })
        .catch(e => {
            console.log(e);
        });
    };

    function UpdateUserCharacter(value){
        console.log(value);
        const data ={
            userid: id,
            charid: value.character_id,
            level: value.level,
            desired_level: value.desired_level,
            ascended: value.ascended,
            ascend_next_max: value.ascend_next_max,
            normal_atk_level: value.normal_atk_level,
            normal_atk_desired_level: value.normal_atk_desired_level,
            q_atk_level: value.q_atk_level,
            q_atk_desired_level: value.q_atk_desired_level,
            e_atk_level: value.e_atk_level,
            e_atk_desired_level: value.e_atk_desired_level,
            managed: value.managed
        };
        updateUserCharacter(data)
        .then(response => {
            console.log(response.data);
            console.log("The user character was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    }; 

    function RemoveUserCharacter(cid){
        removeUserCharacter(id, cid)
        .then(response => {
            console.log(response.data);
            retrieveCharactersInfo();
            retrieveUserCharacters();
            console.log("The user character was removed successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };

    function IsCharNotAdded(value){
        return !userCharacters.some(userChar => userChar.character_id === value.character_id);
    }

    function boolFormatter(cell, row, rowIndex, formatExtraData) {
        return(
        <span>{formatExtraData[cell]}</span>
        )
    }

    function imageFormatter(cell, row, rowIndex, formatExtraData) {
        return(
        <span>
            <Image src={'https://muni.moe/images/genshin/Character_'+cell+'_Thumb.png'} style={{height: '64px', width: '64px', marginRight: "10px", display: 'inline-block', verticalAlign: 'middle'}}/>
            <p style={{display: 'inline-block'}}>{cell}</p>
            
        </span>
        )
    }

    function saveChanged(){
        setChanged(false);
        characterData.forEach(UpdateUserCharacter);
        setCharacterData([]);
    }

    return(
        <>
        <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <BsFillPeopleFill size='64' color='white' style={{display: "inline-block", verticalAlign: 'middle !important', marginRight: '10px'}}/>
                <h1 style={{display: "inline-block"}}>Team Roster</h1>
            </div>             
        </Row>
        <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
            <p>Click a cell to edit!</p>
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
                        Deleting Character
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove {toBeDeleted.name} from your roster?
                    <br></br>Doing so will wipe all data relating to them!<br></br>
                    <b>TIP: If you set a character to not managed, they won't show up by default.</b>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Nevermind
                </Button>
                <Button variant="primary" onClick={() => {
                    handleClose();
                    RemoveUserCharacter(toBeDeleted.character_id);
                }             
                    }>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
            
            <Row className="justify-content-md-center">
                <ToolkitProvider
                    keyField="character_id"
                    data={ userCharacters }
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
                                            options={characters.filter(IsCharNotAdded)} 
                                            values={[]} 
                                            valueField="character_id" 
                                            labelField="name" 
                                            searchBy="name" 
                                            sortBy="name"
                                            onChange={
                                                (value) => AddUserCharacter(value[0].character_id)
                                            }
                                            closeOnSelect
                                            placeholder="Select character to add..."
                                            dropdownGap = {-2}
                                            dropdownPosition= "auto"
                                            clearOnSelect={true}
                                        />
                                    </div>
                                    <div  style={{width: '300px', paddingLeft: '10px', display: "inline-block"}}>
                                        <Select
                                            className="my-dropdown" 
                                            options={userCharacters} 
                                            values={[]} 
                                            valueField="character_id" 
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
                                            placeholder="Select character to remove..."
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
                                        var indexOfChar = characterData.findIndex(userChar => userChar.character_id === row.Users[0].UserCharacters.character_id);
                                        if(indexOfChar !== -1){
                                            characterData[indexOfChar] = row.Users[0].UserCharacters;
                                        }else{
                                            characterData.push(row.Users[0].UserCharacters)
                                        }
                                        setCharacterData(characterData);
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
        <Button variant="primary" className="position-sticky float-right save-button" onClick={() => saveChanged()} disabled={!changed}>
                        Save
            </Button>
        </>
    );
};

export default Characters;
