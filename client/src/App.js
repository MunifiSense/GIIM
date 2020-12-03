import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarContent} from 'react-pro-sidebar';
import { IconContext } from 'react-icons';
import { FaBars, FaGem, FaHeart, FaHome } from 'react-icons/fa';
import { GiSwapBag } from 'react-icons/gi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiSwordFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Switch, Route, Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-pro-sidebar/dist/css/styles.css';
import "./App.css";
import {refreshTokenSetup} from './tools/refreshToken';
import {authenticate, authlogout} from './services/AuthService';
import {getLocalUserCharacters, addUserCharacter} from './services/CharacterService';
import {getLocalUserWeapons, addUserWeapon} from './services/WeaponService';
import {getLocalUserItems, updateUserItem} from './services/ItemService';

import Home from "./components/Main";
import Characters from "./components/Characters";
import Weapons from "./components/Weapons";
import Items from "./components/Items";
import ItemSummary from "./components/ItemSummary";
import Suggestions from "./components/Suggestions";

import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";

import {userContext} from './userContext';

function App (){
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();

  const loginSuccess = async (response) => {
    await refreshTokenSetup(response);
    authenticate(response.tokenId).then( (response) => {
      if(response.data.token){
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
      }
      // Check if local x exists
      const localUserCharacters = getLocalUserCharacters();
      const localUserWeapons = getLocalUserWeapons();
      const localUserItems = getLocalUserItems();
      if(localUserCharacters || localUserWeapons || localUserItems){
        setShowModal(true);
        if(localUserCharacters){
          localUserCharacters.forEach(element => {
            const data ={
              charid: element.character_id,
              level: element.Users[0].UserCharacters.level,
              desired_level: element.Users[0].UserCharacters.desired_level,
              ascended: element.Users[0].UserCharacters.ascended,
              ascend_next_max: element.Users[0].UserCharacters.ascend_next_max,
              normal_atk_level: element.Users[0].UserCharacters.normal_atk_level,
              normal_atk_desired_level: element.Users[0].UserCharacters.normal_atk_desired_level,
              q_atk_level: element.Users[0].UserCharacters.q_atk_level,
              q_atk_desired_level: element.Users[0].UserCharacters.q_atk_desired_level,
              e_atk_level: element.Users[0].UserCharacters.e_atk_level,
              e_atk_desired_level: element.Users[0].UserCharacters.e_atk_desired_level,
              managed: element.Users[0].UserCharacters.managed
            };
            addUserCharacter(data)
            .then(response => {
                
            })
            .catch(e => {
                console.log(e);
            });
          });
          localStorage.removeItem("userCharacters");
        } 
  
        if(localUserWeapons){
          localUserWeapons.forEach(element => {
            const data ={
              weaponid: element.weapon_id,
              level: element.Users[0].UserWeapons.level,
              desired_level: element.Users[0].UserWeapons.desired_level,
              ascended: element.Users[0].UserWeapons.ascended,
              ascend_next_max: element.Users[0].UserWeapons.ascend_next_max,
              managed: element.Users[0].UserWeapons.managed
            };
            addUserWeapon(data)
            .then(response => {
                
            })
            .catch(e => {
                console.log(e);
            });
          });
          localStorage.removeItem("userWeapons");
        }
  
        if(localUserItems){
          localUserItems.forEach(element => {
            const data ={
              itemid: element.item_id,
              amount: element.Users[0].UserItems.amount.amount,
              forge: element.Users[0].UserItems.amount.forge
            };
            updateUserItem(data)
            .then(response => {
                
            })
            .catch(e => {
                console.log(e);
            });
          });
          localStorage.removeItem("userItems");
        }
        setShowModal(false);
      }   
    }).catch(error => {
      console.log(error);
    });
  }

  const loginFail = (response) => {
    console.log(response);
  }

  const logout = () => {
    //logout
    authlogout();
    setUser(undefined);
  }

  return(
    <div className="page-content">      
        <IconContext.Provider value={{className : 'react-icons'}}>
          <Modal
                  show={showModal}
                  backdrop="static"
                  keyboard={false}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  size="lg"
              >
                  <Modal.Header>
                      <Modal.Title id="contained-modal-title-vcenter">
                          Uploading Local Data
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      GIM is currently uploading your local data to the database. <br></br>
                      Please wait...
                      <Spinner animation="border" variant="light" />
                  </Modal.Body>
          </Modal>
            <Navbar variant="dark" fixed="top" className='navbar'>
                <Button variant="dark" onMouseDown={e => e.preventDefault()} onClick={() => setMenuOpen(!menuOpen)} className="nav-btn">
                  <FaBars />
                </Button>
                <Button variant="dark" className="nav-btn" onMouseDown={e => e.preventDefault()} onClick={
                  () => {setCollapsed(!collapsed)}}>
                  {collapsed
                  ? <IoIosArrowForward/ >
                  : <IoIosArrowBack />}
                </Button>
                
              <div className="top-brand">
                <Navbar.Brand href="/">
                  <div style={{display: 'inline-block'}}>
                    <img src={process.env.PUBLIC_URL + '/logo192.png'} style={{height: '32px', width: '32px', marginRight: "10px", display: 'inline-block', verticalAlign: 'top'}} alt="Website logo that looks like a heart"/>
                  </div>
                    GIM
                </Navbar.Brand>
              </div>
              <div style={{position: 'fixed', right: '10px'}}>
                {!user? 
                  <GoogleLogin
                      clientId="871403107294-7if7ber7cm2po4t5nnrvvdogpsp09t0l.apps.googleusercontent.com"
                      buttonText="Login with Google"
                      onSuccess={loginSuccess}
                      onFailure={loginFail}
                      cookiePolicy={'single_host_origin'}
                      theme={'dark'}
                      isSignedIn={true}
                  /> : 
                  <GoogleLogout
                    clientId="871403107294-7if7ber7cm2po4t5nnrvvdogpsp09t0l.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    theme={'dark'}
                  />
                }
                              
              </div>

              
            </Navbar>
          <Collapse className={menuOpen ? "sidebar-open" : "sidebar-collapse"} dimension="width" in={menuOpen}>
              <div className="sidebar">
                <ProSidebar collapsed={collapsed}>
                  <SidebarContent style={{backgroundColor: '#424242'}}>
                    <Menu iconShape="none">
                      <MenuItem icon={<FaHome size='35'/>}>
                        <b>Home</b>
                        <Link to ="/"/>
                      </MenuItem>
                      <MenuItem icon={<BsFillPeopleFill size='35'/>}>
                        <b>Team Roster</b>
                        <Link to ="/team"/>
                      </MenuItem>
                      <MenuItem icon={<RiSwordFill size='35'/>}>
                        <b>Weapon Roster</b>
                        <Link to ="/weapons"/>
                      </MenuItem>
                      <MenuItem icon={<GiSwapBag size='35'/>}>
                        <b>Item Inventory</b>
                        <Link to ="/items"/>
                      </MenuItem>
                      <MenuItem icon={<FaGem size='35'/>}>
                        <b>Item Summary</b>
                        <Link to ="/itemsummary"/>
                      </MenuItem>
                      <MenuItem icon={<FaHeart size='35'/>}>
                        <b>Suggestions</b>
                        <Link to ="/suggestions"/>
                      </MenuItem>
                    </Menu>
                  </SidebarContent>
                </ProSidebar>
              </div>
          </Collapse>
        </IconContext.Provider>
        <div className={menuOpen ? 
          (collapsed? "content shift-collapsed" : "content shift" )
          : "content no-shift"}>
          <userContext.Provider value={user}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/team" component={Characters} />
                <Route exact path="/weapons" component={Weapons} />
                <Route exact path="/items" component={Items} />
                <Route exact path="/itemsummary" component={ItemSummary} />
                <Route exact path="/suggestions" component={Suggestions} />
            </Switch>
          </userContext.Provider>
        </div>
        <div className={menuOpen ? 
          (collapsed? "footer shift-collapsed" : "footer shift" )
          : "footer no-shift"}>
            <Container fluid>
              <Row>
                <Col md={{ span: 3, offset: 1 }} style={{marginTop: '20px'}}>
                    <div style={{display: 'inline-block'}}>
                      <img src={process.env.PUBLIC_URL + '/logo192.png'} style={{height: '64px', width: '64px', marginRight: "10px"}} alt="Website logo that looks like a heart"/>
                    </div>
                    <p style={{display: 'inline-block'}}><b>GIM</b></p> <br></br>
                    <p><b>Genshin Item Manager</b> is not affiliated with or endorsed by miHoYo.</p>
                </Col>
                <Col md={{ span: 3, offset: 2 }} style={{marginTop: '20px'}}>
                    <p><b>Links</b></p>              
                    <a href="mailto:GenshinItemManager@outlook.com">Contact</a>
                </Col>
                <Col md={{ span: 3}} style={{marginTop: '20px'}}>
                    <p><b>Social Links</b></p>
                    <a href="https://discordapp.com/users/Muni#4321">Discord</a><br></br>
                    <a href="https://twitter.com/MunifiS">Twitter</a>
                </Col>
              </Row>
            </Container>
          </div>
      </div>
  );
};

export default App;