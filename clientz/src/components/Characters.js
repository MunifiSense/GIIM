import React, { Fragment, useEffect, useState } from "react";
import {addUserCharacter, getAllCharacters, getByName, getUserCharacters, updateUserCharacter, removeUserCharacter} from "../services/CharacterService";
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type, cellEditFactory } from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import "../App.css";
const { SearchBar, ClearSearchButton } = Search;

function Characters(){
    const [characters, setCharacters] = useState([]);
    const [userCharacters, setUserCharacters] = useState([]);
    const [currentCharacter, setCurrentCharacter] = useState(null);
    const id = 1;
    const columns = [{
        dataField: `character_id`,
        text: ``,
        hidden: true
    }, {
        dataField: `name`,
        text: ``,
        sort: true
    },{
        dataField: `level`,
        text: ``,
        sort: true
    },{
        dataField: `desired_level`,
        text: ``,
        sort: true
    },{
        dataField: `ascended`,
        text: ``,
        editor: {
            type: Type.CHECKBOX,
            value: '1:0'
        },
        sort: true
    },{
        dataField: `normal_atk_level`,
        text: ``,
        sort: true
    },{
        dataField: `normal_atk_desired_level`,
        text: ``,
        sort: true
    },{
        dataField: `q_atk_level`,
        text: ``,
        sort: true
    },{
        dataField: `q_atk_desired_level`,
        text: ``,
        sort: true
    },{
        dataField: `e_atk_level`,
        text: ``,
        sort: true
    },{
        dataField: `e_atk_desired_level`,
        text: ``,
        sort: true
    },{
        dataField: `managed`,
        text: ``,
        editor: {
            type: Type.CHECKBOX,
            value: '1:0'
        },
        sort: true
    }];

    const defaultSorted = [{
        dataField: 'managed',
        order: 'desc'
    }, {
        dataField: 'name',
        order: 'desc'
    }];

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
        })
        .catch(e => {
            console.log(e);
        });
    };

    function UpdateUserCharacter(){
        const data ={
            userid: id,
            usercharinfo: currentCharacter
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
        const data ={
            userid: id,
            charid: cid
        };
        removeUserCharacter(data)
        .then(response => {
            console.log(response.data);
            console.log("The user character was removed successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };

    function IsCharAdded(charid){
        return userCharacters.some(userChar => userChar.character_id === charid)
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
                            Search:
                            <SearchBar { ...props.searchProps } />
                            <ClearSearchButton { ...props.searchProps } />
                            <BootstrapTable 
                                { ...props.baseProps }
                                cellEdit={ cellEditFactory({ 
                                    mode: 'click',
                                    blurToSave: true,
                                    nonEditableRows: () => [0] }) 
                                }
                                defaultSorted = {defaultSorted} 
                                striped hover 
                                classes="my-table"/>
                        </div>
                    )

                }
                    
                </ToolkitProvider>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Add
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {characters.map((character, i) => {
                            if(IsCharAdded(character.id)){
                                return(
                                    <Fragment>
                                        <Dropdown.Item onSelect={() => AddUserCharacter(character.id)}>{character.name}</Dropdown.Item>
                                    </Fragment>
                                );
                            }
                            return (null);
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                        Remove
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {userCharacters.map((character, i) => {
                            return(
                                <Fragment>
                                    <Dropdown.Item onSelect={() => RemoveUserCharacter(character.id)}>{character.name}</Dropdown.Item>
                                </Fragment>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
        </Container>
    );
};

export default Characters;
