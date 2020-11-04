import React, { Fragment, useEffect, useState } from "react";
import {addUserCharacter, getAllCharacters, getByName, getUserCharacters, updateUserCharacter, removeUserCharacter} from "../services/CharacterService";
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
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

function Characters(){
    const [characters, setCharacters] = useState([]);
    const [userCharacters, setUserCharacters] = useState([]);
    const [characterData, setCharacterData] = useState([]);
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
        text: `Name`,
        sort: true,
        sortCaret: sortingThing,
        editable: false
    },{
        dataField: `Users[0].UserCharacters.level`,
        text: `Level`,
        sort: true,
        sortCaret: sortingThing
    },{
        dataField: `Users[0].UserCharacters.desired_level`,
        text: `Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkLevel
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
        sortCaret: sortingThing
    },{
        dataField: `Users[0].UserCharacters.normal_atk_level`,
        text: `Normal Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserCharacters.normal_atk_desired_level`,
        text: `Normal Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserCharacters.q_atk_level`,
        text: `Q Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserCharacters.q_atk_desired_level`,
        text: `Q Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserCharacters.e_atk_level`,
        text: `E Attack Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
    },{
        dataField: `Users[0].UserCharacters.e_atk_desired_level`,
        text: `E Attack Desired Level`,
        sort: true,
        sortCaret: sortingThing,
        validator: checkTalent
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
            retrieveCharactersInfo();
            retrieveUserCharacters();
        })
        .catch(e => {
            console.log(e);
        });
    };

    function UpdateUserCharacter(value){
        const data ={
            userid: id,
            charid: value.character_id,
            level: value.level,
            desired_level: value.desired_level,
            ascended: value.ascended,
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

    function IsCharAdded(charid){
        return userCharacters.some(userChar => userChar.character_id === charid)
    }

    function boolFormatter(cell, row, rowIndex, formatExtraData) {
        return(
        <span>{formatExtraData[cell]}</span>
        )
    }

    function saveChanged(){
        characterData.forEach(UpdateUserCharacter);
        setCharacterData([]);
    }

    return(
        <Container fluid>
            <Row className="justify-content-md-center" >
                <h1>Team Roster</h1>
            </Row>
            <Row className="justify-content-md-center">
                <ToolkitProvider
                    keyField="character_id"
                    data={ userCharacters }
                    columns={ columns }
                    search
                >{
                    props => (
                        <div>
                            <SearchBar { ...props.searchProps } />
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
                <div>
                    <Dropdown className="d-inline">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Add
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {characters.map((character, i) => {
                                if(!IsCharAdded(character.character_id)){
                                    return(
                                        <Fragment>
                                            <Dropdown.Item onSelect={() => AddUserCharacter(character.character_id)}>{character.name}</Dropdown.Item>
                                        </Fragment>
                                    );
                                }
                                return (null);
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="d-inline" style={{paddingLeft: '5px'}}>
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            Remove
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {userCharacters.map((character, i) => {
                                return(
                                    <Fragment>
                                        <Dropdown.Item onSelect={() => RemoveUserCharacter(character.character_id)}>{character.name}</Dropdown.Item>
                                    </Fragment>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    <Button variant="primary" onClick={() => saveChanged()} disabled={!(characterData.length > 0)}>
                            Save
                    </Button>
                </div>
            </Row>
        </Container>
    );
};

export default Characters;
