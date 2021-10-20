# GIIM

Genshin Impact Item Manager (GIIM) is a project I worked on in end of 2020/early 2021. <br/>

It is an API and Website for managing what items a player needs to collect in Genshin Impact. <br/>
It is not being actively developed.

It has two main parts:
* Genshin Impact Item Manager React Website
* Genshin Impact Item Manager REST API (Needs to be hosted on a server)

The project uses:
* Node.js
* React
* axios
* React-Bootstrap
* React-Bootstrap-Table2
* react-dropdown-select
* react-google-login
* react-pro-sidebar
* ExpressJS
* Sequelize
* MariaDB

The API can be called with: <br/>
http://SERVERURL/api/characters/characterName <br/>
http://SERVERURL/api/weapons/weaponName <br/>
http://SERVERURL/api/items/itemName <br/>

These calls need authorization: <br/>
http://SERVERURL/api/auth <br/>
http://SERVERURL/api/usercharacters/userID <br/>
http://SERVERURL/api/userweapons/userID <br/>
http://SERVERURL/api/useritems/userID <br/>
