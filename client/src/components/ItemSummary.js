import React, { useEffect, useState, useContext, Fragment } from "react";
import {/*getAllItems, */getUserItems} from "../services/ItemService";
import {retrieveNeeded, getNeededItemsCharacters, getNeededItemsWeapons} from "../tools/ItemCalc";
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {BsStarFill} from 'react-icons/bs';
import {GiTwoHandedSword, GiPiercingSword, GiSpearHook, GiPocketBow, GiSecretBook} from 'react-icons/gi';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import {FaGem} from 'react-icons/fa';
import { userContext } from "../userContext";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Items(){
    const user = useContext(userContext);
    //const [items, setItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [weaponItems, setWeaponItems] = useState([]);
    const [characterItems, setCharacterItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [domainItems, setDomainItems] = useState();
    const [monsterItems, setMonsterItems] = useState([]);
    const [bossItems, setBossItems] = useState();
    const [harvestingItems, setHarvestingItems] = useState([]);
    const [miscItems, setMiscItems] = useState();

    useEffect(() =>{
        (async function retrieveStuff() {
            //setItems(await retrieveItemsInfo());
            setCharacterItems(await getNeededItemsCharacters(user));
            setWeaponItems(await getNeededItemsWeapons(user));
            var something = await retrieveNeeded(user, await retrieveUserItems());
            setUserItems(something);
            await itemSummary(something);
            setLoading(false);
        }) ();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    /*async function retrieveStuff(){
        //setItems(await retrieveItemsInfo());
        setCharacterItems(await getNeededItemsCharacters(user));
        setWeaponItems(await getNeededItemsWeapons(user));
        var something = await retrieveNeeded(user, await retrieveUserItems());
        setUserItems(something);
        await itemSummary(something);
        setLoading(false);
    }*/

    /*async function retrieveItemsInfo(){
        return new Promise(function(resolve, reject) {
            getAllItems().then(response => {
                resolve(response.data);
            }).catch(e => {
                console.log(e);
            });
        })
    };*/

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
                var localUserItemData = JSON.parse(localStorage.getItem("userItems"));
                if(!localUserItemData || localUserItemData.length === 0){
                    const newUserItems = [];
                    setUserItems(newUserItems);     
                    localStorage.setItem("userItems", JSON.stringify(newUserItems));
                    resolve(newUserItems);
                }else{
                    resolve(localUserItemData);
                }
            }
        })
    };

    function ToggleIcon({ children, eventKey, callback }){
        const currentEventKey = useContext(AccordionContext);

        const decoratedOnClick = useAccordionToggle(
            eventKey,
            () => callback && callback(eventKey),
        );

        return (
            <div onClick={decoratedOnClick} style={{cursor: 'pointer'}}>
            {children}
            {(currentEventKey === eventKey)? <IoIosArrowUp size='20' style={{marginLeft: '10px', verticalAlign: 'center'}}/> : <IoIosArrowDown size='20' style={{marginLeft: '10px', verticalAlign: 'center'}}/>}
            </div>
        )
    }

    function getItemImage(type, itemName) {
        if(type === 'Character'){
            return('https://muni.moe/images/genshin/Character_'+itemName+'_Thumb.png');
        }else if (type === 'Weapon'){
            return('https://muni.moe/images/genshin/Weapon_'+itemName.replace(/ /g, '_').replace(/'/g,'%27')+'.png');
        } else if (type === 'Item'){
            return('https://muni.moe/images/genshin/Item_'+itemName.replace(/ /g, '_').replace(/'/g,'%27')+'.png');
        } else if (type === 'Monster'){
            return('https://muni.moe/images/genshin/Enemy_'+itemName.replace(/ /g, '_').replace(/'/g,'%27')+'.png');
        } else{
            return('https://muni.moe/images/genshin/'+ type +'_'+itemName.replace(/ /g, '_').replace(/'/g,'%27')+'.png');
        }
    }

    async function itemSummary(itemsList){
        const domainStuff = {};
        const monsterStuff = {};
        const bossStuff = {
            normal: {

            },
            weekly: {

            }
        };
        const harvestingStuff = {};
        const miscStuff = {};
        itemsList.forEach(element => {
            if(element.needed > 0){
                if(element.Monsters.length > 0){
                    // Monsters
                    element.Monsters.forEach(monster => {
                        if(monster.type === "Boss"){
                            // Boss
                            if(!bossStuff.normal[monster.name]){
                                bossStuff.normal[monster.name] = {};
                            }

                            if(bossStuff.normal[monster.name][element.name]){
                                bossStuff.normal[monster.name][element.name] += element.needed;
                            }else{
                                bossStuff.normal[monster.name][element.name] = 0;
                                bossStuff.normal[monster.name][element.name] += element.needed;
                            }
                        }else if(monster.type === "Weekly Boss"){
                            // Weekly Boss
                            if(!bossStuff.weekly[monster.name]){
                                bossStuff.weekly[monster.name] = {};
                            }

                            if(bossStuff.weekly[monster.name][element.name]){
                                bossStuff.weekly[monster.name][element.name] += element.needed;
                            }else{
                                bossStuff.weekly[monster.name][element.name] = 0;
                                bossStuff.weekly[monster.name][element.name] += element.needed;
                            }
                        } else{
                            // Normal or Elite monster
                            if(!monsterStuff[monster.name]){
                                monsterStuff[monster.name] = {};
                            }

                            if(monsterStuff[monster.name][element.name]){
                                monsterStuff[monster.name][element.name] += element.needed;
                            }else{
                                monsterStuff[monster.name][element.name] = 0;
                                monsterStuff[monster.name][element.name] += element.needed;
                            }
                        }
                    })
                }else if(element.Domains.length > 0){
                    // Domains
                    console.log(element.Domains);
                    element.Domains.forEach(domain => {
                        if(!domainStuff[domain.name]){
                            domainStuff[domain.name] = {};                       
                        }

                        if(!domainStuff[domain.name][domain.ItemDomains.day_of_week1]){
                            domainStuff[domain.name][domain.ItemDomains.day_of_week1] = {};
                        }
                        
                        if(domainStuff[domain.name][domain.ItemDomains.day_of_week1][element.name]){
                            domainStuff[domain.name][domain.ItemDomains.day_of_week1][element.name]+=element.needed;
                        }else{
                            domainStuff[domain.name][domain.ItemDomains.day_of_week1][element.name]= 0;
                            domainStuff[domain.name][domain.ItemDomains.day_of_week1][element.name]+=element.needed;
                        }
                        
                    })                   
                }else if(element.item_group === "Ore" || element.item_group === "Harvested Material"){
                    // Ores, harvested stuff
                    if(element.item_group === "Ore"){
                        if(!harvestingStuff[element.location]){
                            harvestingStuff[element.location] = {};                       
                        }                       
                        if(harvestingStuff[element.location][element.name]){
                            harvestingStuff[element.location][element.name]+=element.needed;
                        }else{
                            harvestingStuff[element.location][element.name]= 0;
                            harvestingStuff[element.location][element.name]+=element.needed;
                        }
                    }else if(element.item_group === "Harvested Material"){
                        if(!harvestingStuff[element.location]){
                            harvestingStuff[element.location] = {};                       
                        }                       
                        if(harvestingStuff[element.location][element.name]){
                            harvestingStuff[element.location][element.name]+=element.needed;
                        }else{
                            harvestingStuff[element.location][element.name]= 0;
                            harvestingStuff[element.location][element.name]+=element.needed;
                        } 
                    }
                }else{
                    // EXP, Mora
                    if(element.item_group === "Character EXP Material"){
                        if(!miscStuff.Characters){
                            miscStuff.Characters = {};                       
                        }    
                        if(miscStuff.Characters[element.name]){
                            miscStuff.Characters[element.name] += element.needed;
                        }else{
                            miscStuff.Characters[element.name] = 0;
                            miscStuff.Characters[element.name] += element.needed;
                        }
                    }else if(element.item_group === "Weapon EXP Material"){
                        if(!miscStuff.Weapons){
                            miscStuff.Weapons = {};                       
                        }    
                        if(miscStuff.Weapons[element.name]){
                            miscStuff.Weapons[element.name] += element.needed;
                        }else{
                            miscStuff.Weapons[element.name] = 0;
                            miscStuff.Weapons[element.name] += element.needed;
                        }
                    }
                }
            }
        })
        setDomainItems(domainStuff);
        setMonsterItems(monsterStuff);
        setBossItems(bossStuff);
        setHarvestingItems(harvestingStuff);
        setMiscItems(miscStuff);
        return;
    }

    function imageWithToolTipIfAmount(itemType, item, amount){
        if(amount > 0 || amount=== -1){
            return (
                
            <div style={{position: 'relative', display: 'inline-block', marginRight: '5px'}}>
                <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip>
                    {item}
                </Tooltip>
            }
            >
                <Image src={getItemImage(itemType, item)} className='sum-image'/>
                </OverlayTrigger>
                <div className='overlay'>{amount===-1? '':amount}</div>
            </div>
            )
        }       
    }

    function getRarityGradient(rarity){
        if(rarity === 1){
            return ({
                background: 'rgb(79,88,100) linear-gradient(175deg, rgba(79,88,100,1) 0%, rgba(134,146,155,1) 100%)'
            });
        } else if(rarity === 2){
            return ({
                background: 'rgb(62,77,77) linear-gradient(175deg, rgba(62,77,77,1) 0%, rgba(97,151,111,1) 100%)'
            });
        } else if(rarity === 3){
            return ({
                background: 'rgb(81,84,116) linear-gradient(175deg, rgba(81,84,116,1) 0%, rgba(77,161,181,1) 100%)'
            });
        } else if(rarity === 4){
            return ({
                background: 'rgb(89,84,130) linear-gradient(175deg, rgba(89,84,130,1) 0%, rgba(185,136,202,1) 100%)'
            });
        } else if(rarity === 5){
            return ({
                background: 'rgb(105,84,83) linear-gradient(175deg, rgba(105,84,83,1) 0%, rgba(230,174,87,1) 100%)'
            });
        }
    }

    function getRarityFrame(rarity){
        if(rarity === 1){
            return ({
                backgroundImage: `url("${getItemImage('Frame', "Common")}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                paddingBottom: '11.76%',
                height: '0px'
            });
        } else if(rarity === 2){
            return ({
                backgroundImage: `url("${getItemImage('Frame', "Uncommon")}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                paddingBottom: '11.76%',
                height: '0px'
            });
        } else if(rarity === 3){
            return ({
                backgroundImage: `url("${getItemImage('Frame', "Rare")}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                paddingBottom: '11.76%',
                height: '0px'
            });
        } else if(rarity === 4){
            return ({
                backgroundImage: `url("${getItemImage('Frame', "Epic")}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                paddingBottom: '11.76%',
                height: '0px'
            });
        } else if(rarity === 5){
            return ({
                backgroundImage: `url("${getItemImage('Frame', "Legendary")}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                paddingBottom: '11.76%',
                height: '0px'
            });
        }
    }

    function getRarityStars(rarity){
        if(rarity === 1){
            return (
                <>
                    <BsStarFill color='#ffcc32'/>
                </>
            );
        } else if(rarity === 2){
            return (
                <>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                </>
            );
        } else if(rarity === 3){
            return (
                <div style={{display: 'inline-block'}}>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                </div>
            );
        } else if(rarity === 4){
            return (
                <div style={{display: 'inline-block'}}>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                </div>
            );
        } else if(rarity === 5){
            return (
                <>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                    <BsStarFill color='#ffcc32'/>
                </>
            );
        }
    }

    function getWeaponTypeIcon(weaponType){
        if(weaponType === "Bow"){
            return(
                <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip>
                    {weaponType}
                </Tooltip>
            }
            >
                <GiPocketBow size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
                </OverlayTrigger>
                
            )
        } else if(weaponType === "Sword"){
            return(
                <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip>
                    {weaponType}
                </Tooltip>
            }
            >
                <GiTwoHandedSword size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
                </OverlayTrigger>   
            )
        } else if(weaponType === "Polearm"){
            return(
                <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip>
                    {weaponType}
                </Tooltip>
            }
            >
                <GiSpearHook size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
                </OverlayTrigger>   
            )
        } else if(weaponType === "Catalyst"){
            return(
                <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip>
                    {weaponType}
                </Tooltip>
            }
            >
                <GiSecretBook size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
                </OverlayTrigger>   
            )
        } else if(weaponType === "Claymore"){
            return(
                <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip>
                    {weaponType}
                </Tooltip>
            }
            >
                <GiPiercingSword size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
                </OverlayTrigger>              
            )
        }
    }

    if(loading){
        return(
        <Container fluid className="inner-container">
            <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FaGem size='64' color='white' style={{display: "inline-block", verticalAlign: 'middle !important', marginRight: '10px'}}/>
                    <h1 style={{display: "inline-block"}}>Needed Item Summary</h1>
                </div>   
            </Row>
            <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
                <p>What you entered all that information for!</p>
            </Row>
            <Row className="justify-content-md-center">
                <p>Loading...</p>
                <Spinner variant="primary" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row>
        </Container>    
    );}
    return(
        <Container fluid className="inner-container">
            <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FaGem size='64' color='white' style={{display: "inline-block", verticalAlign: 'middle !important', marginRight: '10px'}}/>
                    <h1 style={{display: "inline-block"}}>Needed Item Summary</h1>
                </div>   
            </Row>
            <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
                <p>What you entered all that information for!</p>
            </Row>
            <Accordion defaultActiveKey="0" style={{marginBottom: '10px'}}>
                <Card className="acc-card text-center">
                    <Card.Header>
                        <ToggleIcon as={Card.Header} eventKey="0" onClick={{}}>
                        <b>All Items</b>
                        </ToggleIcon>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-md-center">
                            {Object.keys(userItems).map((item, i) => {
                                var itemName = userItems[item].name;
                                if(Number(userItems[item].item_id) === 1){
                                    return <></>;
                                }                  
                                return (
                                    <Fragment key={itemName}>
                                        {imageWithToolTipIfAmount('Item', itemName, userItems[item].needed)}
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="0" style={{marginBottom: '10px'}}>
                <Card className="acc-card text-center">
                    <Card.Header>
                        <ToggleIcon as={Card.Header} eventKey="0" onClick={{}}>
                        <b>Monster Drops</b>
                        </ToggleIcon>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-md-center">
                            {Object.keys(monsterItems).map((item, i) => {
                                var monsterName = Object.keys(monsterItems)[i];
                                return (
                                    <Fragment key={monsterName}>
                                        <Card className='sum-card' key={monsterName + '1'}>
                                        
                                        <Card.Img className='sum-card-img' variant="top" src={getItemImage('Monster', monsterName)} style={getRarityGradient(1)}/>
                                            <Card.Header key={monsterName  + '2'} style={getRarityFrame(1)}>
                                                <h5 className='genshin-font'>{monsterName}</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <div key={monsterName  + '3'}>
                                                    <Card className="sum-inner-card text-center">
                                                        <Card.Header>
                                                            <b>Needed Drops</b>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            {Object.keys(monsterItems[item]).map((item2, j) => {
                                                                var itemName = Object.keys(monsterItems[item])[j];
                                                                return (
                                                                    <Fragment key={itemName}>
                                                                        {imageWithToolTipIfAmount('Item', itemName, monsterItems[item][item2])}
                                                                        
                                                                    </Fragment>
                                                                );
                                                            })}
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            </Card.Body> 
                                        </Card>
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="0" style={{marginBottom: '10px'}}>
                <Card className="acc-card text-center">
                    <Card.Header>
                        <ToggleIcon as={Card.Header} eventKey="0" onClick={{}}>
                        <b>Boss Drops</b>
                        </ToggleIcon>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-md-center">
                            <h5>Normal</h5>
                        </Row>
                        <Row className="justify-content-md-center">                        
                            {Object.keys(bossItems.normal).map((item, i) => {
                                var monsterName = Object.keys(bossItems.normal)[i];
                                return (
                                    <Fragment key={monsterName}>
                                        <Card className='sum-card' key={monsterName + '1'}>
                                        <Card.Img className='sum-card-img' variant="top" src={getItemImage('Monster', monsterName)} style={getRarityGradient(4)}/>
                                            <Card.Header key={monsterName  + '2'} style={getRarityFrame(4)}>
                                                <h5 className='genshin-font'>{monsterName}</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card className="sum-inner-card text-center">
                                                    <Card.Header>
                                                        <b>Needed Drops</b>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {Object.keys(bossItems.normal[item]).map((item2, j) => {
                                                            var itemName = Object.keys(bossItems.normal[item])[j];
                                                            return (
                                                                <Fragment key={itemName}>
                                                                    {imageWithToolTipIfAmount('Item', itemName, bossItems.normal[item][item2])}
                                                                    
                                                                </Fragment>
                                                            );
                                                        })}
                                                    </Card.Body>
                                                </Card>
                                            </Card.Body> 
                                        </Card>
                                    </Fragment>
                                )
                            })}
                        </Row>
                        <Row className="justify-content-md-center">
                            <h5>Weekly</h5>
                        </Row>
                        <Row className="justify-content-md-center">
                        {Object.keys(bossItems.weekly).map((item, i) => {
                                var monsterName = Object.keys(bossItems.weekly)[i];
                                return (
                                    <Fragment key={monsterName}>
                                        <Card className='sum-card' key={monsterName + '1'}>
                                        <Card.Img variant="top" src={getItemImage('Monster', monsterName)} className='sum-card-img' style={getRarityGradient(5)}/>
                                            <Card.Header key={monsterName  + '2'} style={getRarityFrame(5)}>
                                                <h5 className='genshin-font'>{monsterName}</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card className="sum-inner-card text-center">
                                                    <Card.Header>
                                                        <b>Needed Drops</b>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {Object.keys(bossItems.weekly[item]).map((item2, j) => {
                                                            var itemName = Object.keys(bossItems.weekly[item])[j];
                                                            return (
                                                                <Fragment key={itemName}>
                                                                    {imageWithToolTipIfAmount('Item', itemName, bossItems.weekly[item][item2])}
                                                                    
                                                                </Fragment>
                                                            );
                                                        })}
                                                    </Card.Body>
                                                </Card>
                                            </Card.Body> 
                                        </Card>
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="0" style={{marginBottom: '10px'}}>
                <Card className="acc-card text-center">
                <Card.Header>
                        <ToggleIcon as={Card.Header} eventKey="0" onClick={{}}>
                        <b>Domain Drops</b>
                        </ToggleIcon>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-md-center">
                            {Object.keys(domainItems).map((item, i) => {
                                var domainName = Object.keys(domainItems)[i];
                                return (
                                    <Fragment key={domainName}>
                                        <Card className='sum-card' key={domainName + '1'}>
                                        <Card.Img  variant="top" src={getItemImage('Domain', domainName)} style={{padding: '5px'}}/>
                                            <Card.Header key={domainName  + '2'}>
                                                <h4 className='genshin-font'>{domainName}</h4>
                                            </Card.Header>
                                            <Card.Body>
                                            <Card className="sum-inner-card text-center">
                                                    <Card.Header>
                                                        <b>Needed Drops</b>
                                                    </Card.Header>
                                                    <Card.Body>
                                                    <Row className="justify-content-md-between">
                                                        <Col>
                                                            <p style={{margin: 0}}>Mon/Thurs</p>
                                                            <div key={domainName  + '3'}>                              
                                                                { domainItems[item][1] ?
                                                                        Object.keys(domainItems[item][1]).map((item2, j) => {
                                                                            var itemName = Object.keys(domainItems[item][1])[j];
                                                                            return (
                                                                                <Fragment key={itemName}>
                                                                                    {imageWithToolTipIfAmount('Item', itemName, domainItems[item][1][item2])}
                                                                                    
                                                                                </Fragment>
                                                                            );
                                                                        })
                                                                : ''}
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <p style={{margin: 0}}>Tues/Fri</p>
                                                            <div key={domainName  + '3'}>                              
                                                                {domainItems[item][2] ?
                                                                        Object.keys(domainItems[item][2]).map((item2, j) => {
                                                                            var itemName = Object.keys(domainItems[item][2])[j];
                                                                            return (
                                                                                <Fragment key={itemName}>
                                                                                    {imageWithToolTipIfAmount('Item', itemName, domainItems[item][2][item2])}
                                                                                    
                                                                                </Fragment>
                                                                            );
                                                                        })
                                                                : ''}
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <p style={{margin: 0}}>Wed/Sat</p>
                                                            <div key={domainName  + '3'}>                              
                                                                {domainItems[item][3] ?
                                                                        Object.keys(domainItems[item][3]).map((item2, j) => {
                                                                            var itemName = Object.keys(domainItems[item][3])[j];
                                                                            return (
                                                                                <Fragment key={itemName}>
                                                                                    {imageWithToolTipIfAmount('Item', itemName, domainItems[item][3][item2])}
                                                                                    
                                                                                </Fragment>
                                                                            );
                                                                        })
                                                                : ''}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    </Card.Body>
                                                </Card>
                                            
                                            
                                            </Card.Body> 
                                        </Card>
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="0" style={{marginBottom: '10px'}}>
                <Card className="acc-card text-center">
                <Card.Header>
                        <ToggleIcon as={Card.Header} eventKey="0" onClick={{}}>
                        <b>Mining and Harvesting</b>
                        </ToggleIcon>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-md-center">                        
                            {Object.keys(harvestingItems).map((item, i) => {
                                var placeName = Object.keys(harvestingItems)[i];
                                return (
                                    <Fragment key={placeName}>
                                        <Card className='sum-card' key={placeName + '1'}>
                                        <Card.Img  variant="top" src={getItemImage('Location', placeName)} style={{padding: '5px'}}/>
                                            <Card.Header key={placeName  + '2'}>
                                            <h4 className='genshin-font'>{placeName}</h4>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card className="sum-inner-card text-center">
                                                    <Card.Header>
                                                        <b>Needed Drops</b>
                                                    </Card.Header>
                                                    <Card.Body>
                                                    {Object.keys(harvestingItems[item]).map((item2, j) => {
                                                        var itemName = Object.keys(harvestingItems[item])[j];
                                                        return (
                                                            <Fragment key={itemName}>
                                                                {imageWithToolTipIfAmount('Item', itemName, harvestingItems[item][item2])}
                                                                
                                                            </Fragment>
                                                        );
                                                    })}
                                                    </Card.Body>
                                                </Card>
                                            </Card.Body> 
                                        </Card>
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="0" style={{marginBottom: '10px'}}>
                <Card className="acc-card text-center">
                <Card.Header>
                        <ToggleIcon as={Card.Header} eventKey="0" onClick={{}}>
                        <b>Miscellaneous Items</b>
                        </ToggleIcon>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-md-center">                        
                            {Object.keys(miscItems).map((item, i) => {
                                var typeName = Object.keys(miscItems)[i];
                                return (
                                    <Fragment key={typeName}>
                                        <Card className='sum-card' key={typeName+ '1'}>
                                        <Card.Img  variant="top" src={getItemImage('Misc', typeName)} style={{padding: '5px'}}/>
                                            <Card.Header key={typeName  + '2'}>
                                            <h4 className='genshin-font'>{typeName}</h4>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card className="sum-inner-card text-center">
                                                    <Card.Header>
                                                        <b>Needed Drops</b>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {Object.keys(miscItems[item]).map((item2, j) => {
                                                            var itemName = Object.keys(miscItems[item])[j];
                                                            return (
                                                                <Fragment key={itemName}>
                                                                    {imageWithToolTipIfAmount('Item', itemName, miscItems[item][item2])}                                                   
                                                                </Fragment>
                                                            );
                                                        })}
                                                    </Card.Body>
                                                </Card>
                                            </Card.Body> 
                                        </Card>
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="0" style={{marginBottom: '10px'}}>
                <Card className="acc-card text-center">
                <Card.Header>
                        <ToggleIcon as={Card.Header} eventKey="0" onClick={{}}>
                        <b>Characters</b>
                        </ToggleIcon>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-md-center">                        
                            {characterItems.map(item => {
                                var character = item.name;
                                return (
                                    <Fragment key={character}>
                                        <Card className='sum-card' key={character+ '1'} style={{width: '300px'}}>
                                            <div style={getRarityGradient(item.rarity)}>
                                                <div className='sum-card-div' style={{position: 'relative', display: 'inline-block', marginRight: '5px'}}>
                                                    {getRarityStars(item.rarity)}
                                                    <div>
                                                        <Image src={getItemImage('Character', character)} style={{maxWidth: '64px', maxHeight: '64px', marginLeft: 'auto', marginRight: 'auto', marginTop: '5px', marginBottom: '5px'}}/>
                                                        <OverlayTrigger
                                                            placement='bottom'
                                                            overlay={
                                                            <Tooltip>
                                                                {item.element}
                                                            </Tooltip>
                                                        }
                                                        >
                                                            <Image src={getItemImage('Element', item.element)} roundedCircle className='overlay-top' style={{width: '20px'}}/>
                                                        </OverlayTrigger>         
                                                    </div>                                                      
                                                </div>
                                            </div>  
                                            <Card.Header key={character  + '2'} style={getRarityFrame(item.rarity)}>                                       
                                                <h4 className='genshin-font' style={{paddingTop: '2px'}}>{character}</h4>
                                            </Card.Header>
                                            <Card.Body>
                                            <div key={character  + '3'}>
                                                    <Card className="sum-inner-card text-center">
                                                        <Card.Header>
                                                            <b>Needed Items</b>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            {imageWithToolTipIfAmount('Item',item.boss.item, item.boss.amount)}
                                                            {imageWithToolTipIfAmount('Item',item.specialty.item, item.specialty.amount)}                                  
                                                            {imageWithToolTipIfAmount('Item',item.crystal.item_rarity2, item.crystal.rarity2)}
                                                            {imageWithToolTipIfAmount('Item',item.crystal.item_rarity3, item.crystal.rarity3)}
                                                            {imageWithToolTipIfAmount('Item',item.crystal.item_rarity4, item.crystal.rarity4)}
                                                            {imageWithToolTipIfAmount('Item',item.crystal.item_rarity5, item.crystal.rarity5)}
                                                            {imageWithToolTipIfAmount('Item',item.common.item_rarity1, item.common.rarity1+item.talent.common_rarity1)}
                                                            {imageWithToolTipIfAmount('Item',item.common.item_rarity2, item.common.rarity2+item.talent.common_rarity2)}
                                                            {imageWithToolTipIfAmount('Item',item.common.item_rarity3, item.common.rarity3+item.talent.common_rarity3)}
                                                            {imageWithToolTipIfAmount('Item',item.talent.item_rarity2, item.talent.rarity2)}
                                                            {imageWithToolTipIfAmount('Item',item.talent.item_rarity3, item.talent.rarity3)}
                                                            {imageWithToolTipIfAmount('Item',item.talent.item_rarity4, item.talent.rarity4)}
                                                            {imageWithToolTipIfAmount('Item',item.weeklyBoss.item, item.weeklyBoss.amount)}
                                                        </Card.Body>
                                                    </Card>  
                                                    <Card className="sum-inner-card text-center">
                                                        <Card.Header>
                                                            <b>Needed XP</b>
                                                        </Card.Header>
                                                        <Card.Body>
                                                        {imageWithToolTipIfAmount('Item',"Hero's Wit", item.xp.heroswit)}
                                                        {imageWithToolTipIfAmount('Item',"Adventurer's Experience", item.xp.adventurers)}                                  
                                                        {imageWithToolTipIfAmount('Item',"Wanderer's Advice", item.xp.wanderers)}
                                                        </Card.Body>
                                                    </Card>
                                                    <Card className="sum-inner-card text-center">
                                                        <Card.Header>
                                                            <b>Mora</b>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Row className="justify-content-md-between">
                                                                <Col>
                                                                    <p style={{margin: '0px'}}>Leveling</p>
                                                                    <Image fluid src={getItemImage('Item', 'Mora')} className='sum-image' style={{width: '15px', height: '15px', verticalAlign: 'baseline'}}/>{item.mora.leveling}
                                                                </Col>                                                          
                                                                <Col>
                                                                    <p style={{margin: '0px'}}>Ascension</p>
                                                                    <Image fluid src={getItemImage('Item', 'Mora')} className='sum-image' style={{width: '15px', height: '15px', verticalAlign: 'baseline'}}/>{item.mora.ascension}
                                                                </Col>
                                                                <Col>
                                                                    <p style={{margin: '0px'}}>Talents</p>
                                                                    <Image fluid src={getItemImage('Item', 'Mora')} className='sum-image' style={{width: '15px', height: '15px', verticalAlign: 'baseline'}}/>{item.mora.talents}
                                                                </Col>  
                                                            </Row>     
                                                        </Card.Body>
                                                    </Card>                                                                                                                       
                                            </div>
                                            </Card.Body> 
                                        </Card>
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="0">
                <Card className="acc-card text-center">
                <Card.Header>
                        <ToggleIcon as={Card.Header} eventKey="0" onClick={{}}>
                        <b>Weapons</b>
                        </ToggleIcon>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="justify-content-md-center">                        
                            {weaponItems.map(item => {
                                var weapon = item.name;
                                return (
                                    <Fragment key={weapon}>
                                        <Card className='sum-card' key={weapon+ '1'} style={{width: '300px'}}>
                                            <div style={getRarityGradient(item.rarity)}>
                                                <div className='sum-card-div' style={{position: 'relative', display: 'inline-block', marginRight: '5px'}}>
                                                    {getRarityStars(item.rarity)}
                                                    <div>
                                                        <Image src={getItemImage('Weapon', weapon)} style={{maxWidth: '64px', maxHeight: '64px', marginLeft: 'auto', marginRight: 'auto', marginTop: '5px', marginBottom: '5px'}}/>
                                                        {getWeaponTypeIcon(item.type)}
                                                    </div>                                                      
                                                </div>
                                            </div>  
                                            <Card.Header key={weapon  + '2'} style={getRarityFrame(item.rarity)}>                                       
                                                <h4 className='genshin-font' style={{paddingTop: '2px'}}>{weapon}</h4>
                                            </Card.Header>
                                            <Card.Body>
                                            <div key={weapon  + '3'}>
                                                    <Card className="sum-inner-card text-center">
                                                        <Card.Header>
                                                            <b>Needed Items</b>
                                                        </Card.Header>
                                                        <Card.Body>                                
                                                            {imageWithToolTipIfAmount('Item',item.domain.item_rarity2, item.domain.rarity2)}
                                                            {imageWithToolTipIfAmount('Item',item.domain.item_rarity3, item.domain.rarity3)}
                                                            {imageWithToolTipIfAmount('Item',item.domain.item_rarity4, item.domain.rarity4)}
                                                            {imageWithToolTipIfAmount('Item',item.domain.item_rarity5, item.domain.rarity5)}
                                                            {imageWithToolTipIfAmount('Item',item.common1.item_rarity2, item.common1.rarity2)}
                                                            {imageWithToolTipIfAmount('Item',item.common1.item_rarity3, item.common1.rarity3)}
                                                            {imageWithToolTipIfAmount('Item',item.common1.item_rarity4, item.common1.rarity4)}
                                                            {imageWithToolTipIfAmount('Item',item.common2.item_rarity1, item.common2.rarity1)}
                                                            {imageWithToolTipIfAmount('Item',item.common2.item_rarity2, item.common2.rarity2)}
                                                            {imageWithToolTipIfAmount('Item',item.common2.item_rarity3, item.common2.rarity3)}
                                                        </Card.Body>
                                                    </Card>  
                                                    <Card className="sum-inner-card text-center">
                                                        <Card.Header>
                                                            <b>Needed XP</b>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            {imageWithToolTipIfAmount('Item',"Mystic Enhancement Ore", item.xp.mystic)}
                                                            {imageWithToolTipIfAmount('Item',"Fine Enhancement Ore", item.xp.fine)}                                  
                                                            {imageWithToolTipIfAmount('Item',"Enhancement Ore", item.xp.regular)}
                                                        </Card.Body>
                                                    </Card>
                                                    <Card className="sum-inner-card text-center">
                                                        <Card.Header>
                                                            <b>Mora</b>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Row className="justify-content-md-between">
                                                                <Col>
                                                                    <p style={{margin: '0px'}}>Leveling</p>
                                                                    <Image fluid src={getItemImage('Item', 'Mora')} className='sum-image' style={{width: '15px', height: '15px', verticalAlign: 'baseline'}}/>{item.mora.leveling}
                                                                </Col>                                                          
                                                                <Col>
                                                                    <p style={{margin: '0px'}}>Ascension</p>
                                                                    <Image fluid src={getItemImage('Item', 'Mora')} className='sum-image' style={{width: '15px', height: '15px', verticalAlign: 'baseline'}}/>{item.mora.ascension}
                                                                </Col>
                                                            </Row>     
                                                        </Card.Body>
                                                    </Card>                                                                                                                       
                                            </div>
                                            </Card.Body> 
                                        </Card>
                                    </Fragment>
                                )
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Container>
    );
};

export default Items;
