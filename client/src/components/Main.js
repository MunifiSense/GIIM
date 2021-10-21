import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup'

function Home(){
    return(
        <Container fluid className="inner-container">
          <Row className="justify-content-md-center" style={{marginBottom: '20px'}}>
            <div>
              <img src={process.env.PUBLIC_URL + '/logo192.png'} style={{maxWidth: '50px', maxHeight: '50px', marginRight: '10px', display: 'inline-block', verticalAlign: 'top'}} alt="Website logo that looks like a heart"/>              
              <h1 style={{display: 'inline-block'}}>
              Genshin Item Manager
              </h1>
            </div>           
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6} style={{marginBottom: '10px'}}>
              <Card className="my-card">
                <Card.Body style={{overflowY: 'auto'}}>
                  <Card.Title><b>Welcome to Genshin Item Manager!</b></Card.Title>
                  <Card.Text>
                  This is a site for managing your Genshin Impact items! You can set your characters or weapons and find out exactly how many of each item you need to collect.
                  <br></br>
                  <br></br>  
                  Click the menu bar on the top left to access the important stuff.
                  <br></br>
                  <br></br>
                  You <b>DON'T</b> have to login to use this site! You can login if you want to access your data from anywhere though.
                  <br></br>
                  <br></br>        
                  If you want to contact me about any problems with the website or have any suggestions for me, you can visit the <a href="/suggestions">Suggestions</a> page, 
                  or you can DM me on Discord at <a href="https://discordapp.com/users/Muni#4321">Muni#4321</a>!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="my-card">
                <Card.Header><b>Changelog</b></Card.Header>
                <ListGroup style={{overflowY: 'auto'}}>
                <ListGroup.Item style={{backgroundColor: '#424242'}}>
                    v1.2<br></br>
                    Fixed Desired normal attack level and weapon adding.
                  </ListGroup.Item>
                  <ListGroup.Item style={{backgroundColor: '#424242'}}>
                    v1.1<br></br>
                    Fixed the footer and increased table column widths
                  </ListGroup.Item>
                  <ListGroup.Item style={{backgroundColor: '#424242'}}>
                    v1.0<br></br>
                    First release!<br></br>
                    Nothing much to put here yet because its the first release...
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col> 
          </Row>                
        </Container>
    );
};

export default Home;