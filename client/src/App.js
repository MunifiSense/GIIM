import React from "react";
import { ProSidebar, Menu, MenuItem, SidebarContent} from 'react-pro-sidebar';
import { IconContext } from 'react-icons';
import { FaBars, FaGem, FaHeart, FaHome } from 'react-icons/fa';
import { GiTargetArrows } from 'react-icons/gi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiSwordFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Switch, Route, Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-pro-sidebar/dist/css/styles.css';
import "./App.css";

import Home from "./components/Main";
import Characters from "./components/Characters";
import Weapons from "./components/Weapons";
import Items from "./components/Items";
import ItemSummary from "./components/ItemSummary";
import Suggestions from "./components/Suggestions";

import Collapse from "react-bootstrap/esm/Collapse";
import Container from "react-bootstrap/esm/Container";

function App (){
  const [collapsed, setCollapsed] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return(
    <div className="page-content">
        <IconContext.Provider value={{className : 'react-icons'}}>
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
                      <MenuItem icon={<FaGem size='35'/>}>
                        <b>Item Inventory</b>
                        <Link to ="/items"/>
                      </MenuItem>
                      <MenuItem icon={<GiTargetArrows size='35'/>}>
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
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/team" component={Characters} />
              <Route exact path="/weapons" component={Weapons} />
              <Route exact path="/items" component={Items} />
              <Route exact path="/itemsummary" component={ItemSummary} />
              <Route exact path="/suggestions" component={Suggestions} />
          </Switch>
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
                    <a href="url">Contact</a>
                </Col>
                <Col md={{ span: 3}} style={{marginTop: '20px'}}>
                    <p><b>Community Links</b></p>
                    <a href="url">Discord</a><br></br>
                    <a href="url">Twitter</a>
                </Col>
              </Row>
            </Container>
          </div>
      </div>
  );
};

export default App;