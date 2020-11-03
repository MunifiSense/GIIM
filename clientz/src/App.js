import React from "react";
import { ProSidebar, Menu, MenuItem, SidebarContent} from 'react-pro-sidebar';
import { IconContext } from 'react-icons';
import { FaBars, FaGem, FaHeart } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GrDomain } from 'react-icons/gr';
import { RiSwordFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-pro-sidebar/dist/css/styles.css';
import "./App.css";

import Home from "./components/Main";
import Characters from "./components/Characters";

import Collapse from "react-bootstrap/esm/Collapse";

function App (){
  const [collapsed, setCollapsed] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return(
    <>
        <IconContext.Provider value={{className : 'react-icons'}}>
          <div className="navbar">
              <Navbar bg="dark" variant="dark">
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
                  <Navbar.Brand>
                  Genshin Impact Item Manager
                  </Navbar.Brand>
                </div>
              </Navbar>
          </div>
          <Collapse className={menuOpen ? "sidebar-open" : "sidebar-collapse"} dimension="width" in={menuOpen}>
              <div className="sidebar">
                <ProSidebar collapsed={collapsed}>
                  <SidebarContent>
                    <Menu iconShape="circle">
                      <MenuItem icon={<GrDomain />}>
                        Main
                        <Link to ="/"/>
                      </MenuItem>
                      <MenuItem icon={<BsFillPeopleFill />}>
                        Team Roster
                        <Link to ="/team"/>
                      </MenuItem>
                      <MenuItem icon={<RiSwordFill />}>Weapon Roster</MenuItem>
                      <MenuItem icon={<FaGem />}>Item Inventory</MenuItem>
                      <MenuItem icon={<FaHeart />}>Suggestions</MenuItem>
                    </Menu>
                  </SidebarContent>
                </ProSidebar>
              </div>
          </Collapse>
        </IconContext.Provider>
        <div className={menuOpen ? 
          (collapsed? "content-shift-collapsed" : "content-shift" )
          : "content"}>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/team" component={Characters} />
        </Switch>
        </div>
      </>
  );
};

export default App;