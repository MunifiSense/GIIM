import React, { useEffect, useState, useContext } from "react";
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
import Select from 'react-select';
import { BsFillPeopleFill } from 'react-icons/bs';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userContext } from "../userContext";
import {cloneDeep} from "lodash";
const set = require('set-value');
const { SearchBar } = Search;

function Characters(){
    const user = useContext(userContext);
    const [characters, setCharacters] = useState([]);
    const [userCharacters, setUserCharacters] = useState([]);
    const [characterData, setCharacterData] = useState([]);
    const [changed, setChanged] = useState(false);
    const [show, setShow] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState({});
    const [addValue, setAddValue] = useState();
    const [removeValue, setRemoveValue] = useState();
    const [loading, setLoading] = useState(true);
    const handleClose = () => setShow(false);

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
        height: '100px',
        width: '100px'
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
        headerStyle: {backgroundColor: '#424242', borderRight: '1px solid white', width: '175px', position: 'sticky', top: '50px', zIndex: '1', boxShadow: '1px 0px white, 0 2px white'},
        formatter: imageFormatter
    },{
        dataField: `Users[0].UserCharacters.level`,
        text: `Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkLevel,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserCharacters.desired_level`,
        text: `Desired\nLevel`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkDesiredLevel,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
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
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserCharacters.ascend_next_max`,
        text: `Ascend\nOn Max?`,
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
        dataField: `Users[0].UserCharacters.normal_atk_level`,
        text: `Normal\nAttack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkNTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserCharacters.normal_atk_desired_level`,
        text: `Normal\nAttack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkNDesiredTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserCharacters.e_atk_level`,
        text: `Elemental\nSkill Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkETalent,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserCharacters.e_atk_desired_level`,
        text: `Elemental\nSkill Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkEDesiredTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserCharacters.q_atk_level`,
        text: `Elemental\nBurst Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkQTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
    },{
        dataField: `Users[0].UserCharacters.q_atk_desired_level`,
        text: `Elemental\nBurst Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkQDesiredTalent,
        style: {backgroundColor: '#303030'},
        headerStyle: editableHeader
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
        headerStyle: editableHeader,
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
            row.Users[0].UserCharacters.normal_atk_desired_level = newValue;
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
            row.Users[0].UserCharacters.e_atk_desired_level = newValue;
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
        setLoading(true);
        retrieveCharactersInfo();
        retrieveUserCharacters();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    function retrieveCharactersInfo(){
        getAllCharacters().then(response => {
            setCharacters(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    function retrieveUserCharacters(){
        if(user){
            getUserCharacters().then(response => {
                setUserCharacters(response.data);
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });
        }else{
            // If not signed in and no userCharacters stored locally...
            const localUserCharData = localStorage.getItem("userCharacters");
            if(!localUserCharData){
                localStorage.setItem("userCharacters", JSON.stringify([]));
                setUserCharacters([]);
            }else{
                setUserCharacters(JSON.parse(localUserCharData));
            }
        }
        
    };

    function AddUserCharacter(cid){
        if(user){
            const data ={
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
        }else{
            const charIndex = characters.findIndex((element) => element.character_id === cid);
            const newUserChar = characters[charIndex];
            newUserChar.Users = [];
            newUserChar.Users[0]= {};
            set(newUserChar.Users[0], 'UserCharacters.character_id', cid)
            set(newUserChar.Users[0], 'UserCharacters.level', 1);
            set(newUserChar.Users[0], 'UserCharacters.desired_level', 1);
            set(newUserChar.Users[0], 'UserCharacters.ascended', 0);
            set(newUserChar.Users[0], 'UserCharacters.ascend_next_max', 0);
            set(newUserChar.Users[0], 'UserCharacters.normal_atk_level', 1);
            set(newUserChar.Users[0], 'UserCharacters.normal_atk_desired_level', 1);
            set(newUserChar.Users[0], 'UserCharacters.q_atk_level', 1);
            set(newUserChar.Users[0], 'UserCharacters.q_atk_desired_level', 1);
            set(newUserChar.Users[0], 'UserCharacters.e_atk_level', 1);
            set(newUserChar.Users[0], 'UserCharacters.e_atk_desired_level', 1);
            set(newUserChar.Users[0], 'UserCharacters.managed', 1);
            const newUserCharacters = cloneDeep(userCharacters);
            newUserCharacters.push(newUserChar);
            setUserCharacters(newUserCharacters);
            localStorage.setItem("userCharacters", JSON.stringify(newUserCharacters));
        }
    };

    function UpdateUserCharacter(value){
        if(user){
            const data ={
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
        }else{
            const indexOfChar = userCharacters.findIndex((chara) => chara.character_id === value.character_id);
            console.log(value);
            console.log(indexOfChar);
            const newUserChar = userCharacters[indexOfChar];
            set(newUserChar.Users[0], 'UserCharacters.level', value.level);
            set(newUserChar.Users[0], 'UserCharacters.desired_level', value.desired_level);
            set(newUserChar.Users[0], 'UserCharacters.ascended', value.ascended);
            set(newUserChar.Users[0], 'UserCharacters.ascend_next_max', value.ascend_next_max);
            set(newUserChar.Users[0], 'UserCharacters.normal_atk_level', value.normal_atk_level);
            set(newUserChar.Users[0], 'UserCharacters.normal_atk_desired_level',value.normal_atk_desired_level);
            set(newUserChar.Users[0], 'UserCharacters.q_atk_level', value.q_atk_level);
            set(newUserChar.Users[0], 'UserCharacters.q_atk_desired_level', value.q_atk_desired_level);
            set(newUserChar.Users[0], 'UserCharacters.e_atk_level', value.e_atk_level);
            set(newUserChar.Users[0], 'UserCharacters.e_atk_desired_level', value.e_atk_desired_level);
            set(newUserChar.Users[0], 'UserCharacters.managed', value.managed);
            const newUserCharacters = cloneDeep(userCharacters);
            newUserCharacters[indexOfChar] = newUserChar;
            setUserCharacters(newUserCharacters);
            localStorage.setItem("userCharacters", JSON.stringify(newUserCharacters));
        }
        
    }; 

    function RemoveUserCharacter(cid){
        if(user){
            removeUserCharacter(cid)
            .then(response => {
                console.log(response.data);
                retrieveCharactersInfo();
                retrieveUserCharacters();
                console.log("The user character was removed successfully!");
            })
            .catch(e => {
                console.log(e);
            });
        }else{
            const newUserCharacters = cloneDeep(userCharacters);
            newUserCharacters.splice(newUserCharacters.findIndex(chara => chara.character_id === cid), 1);
            setUserCharacters(newUserCharacters);
            localStorage.setItem("userCharacters", JSON.stringify(newUserCharacters));
        }
        //populateAddUsers();
        //populateRemoveUsers();
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
            <Image src={'https://localhost/images/genshin/Character_'+cell+'_Thumb.png'} style={{height: '64px', width: '64px', marginRight: "10px", display: 'inline-block', verticalAlign: 'middle'}}/>
            <p style={{display: 'inline-block'}}>{cell}</p>
            
        </span>
        )
    }

    function populateAddUsers(){
        const newAddUsers = [];
        characters.filter(IsCharNotAdded).forEach((element) => {
            newAddUsers.push({
                value: element.character_id,
                label: element.name,
                image: 'https://localhost/images/genshin/Character_'+ element.name +'_Thumb.png'
            });
        });
        newAddUsers.sort((a, b) => {
            return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
        });
        return newAddUsers;
    }

    function populateRemoveUsers(){
        const newRemoveUsers = [];
        userCharacters.forEach((element) => {
            newRemoveUsers.push({
                value: element.character_id,
                label: element.name,
                image: 'https://localhost/images/genshin/Character_'+ element.name +'_Thumb.png'
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
                <img src={props.data.image} style={{height: '32px', width: '32px', marginRight: "5px", display: 'inline-block', verticalAlign: 'middle', padding: '2px'} } alt= {props.data.label}/>
                {props.data.label}
            </div>
        ) : null);
    }
        

    function saveChanged(){
        setChanged(false);
        characterData.forEach(UpdateUserCharacter);
        setCharacterData([]);
    }

    return(
        <Container fluid className="outer-container">
        <Container fluid className="inner-container">
        <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <BsFillPeopleFill size='64' color='white' style={{display: "inline-block", verticalAlign: 'middle !important', marginRight: '10px'}}/>
                <h1 style={{display: "inline-block"}}>Team Roster</h1>
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
                        Deleting Character
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove {toBeDeleted ? toBeDeleted.label : ''} from your roster?
                    <br></br>Doing so will wipe all data relating to them!<br></br>
                    <b>TIP: If you set a character to not managed, they won't show up by default.</b>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Nevermind
                </Button>
                <Button variant="primary" onClick={() => {
                    handleClose();
                    RemoveUserCharacter(toBeDeleted.value);
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
                                <div style={{marginRight: '0px', marginLeft: 'auto'}}>
                                    <div style={{width: '300px', display: "inline-block"}}>
                                        <Select 
                                            className="my-dropdown"
                                            value = {addValue}
                                            options={populateAddUsers()} 
                                            onChange={
                                                (value) => {
                                                    AddUserCharacter(value.value);
                                                    setAddValue(null);
                                                }
                                            }
                                            placeholder="Select character to add..."
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
                                            placeholder="Select character to remove..."
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
                                        const indexOfChar = characterData.findIndex(userChar => userChar.character_id === row.Users[0].UserCharacters.character_id);
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
                                    loading ? <Spinner animation="border" variant="light" /> : <p>No Data</p>
                                )}
                                { ...props.baseProps } />
                        </div>
                    )

                }
                </ToolkitProvider>
            </Row>
            
            
        </Container>
        
        </Container>
        <Button variant="primary" className="save-button" onClick={() => saveChanged()} disabled={!changed}>
                        Save
            </Button>
        </Container>
    );
};

export default Characters;
