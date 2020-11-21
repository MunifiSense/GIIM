import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup'

function Home(){
    return(
        <Container fluid>
          <Row className="justify-content-md-center" style={{marginBottom: '20px'}}>
            <div>
              <img src={process.env.PUBLIC_URL + '/logo192.png'} style={{width: '50px', height: '50px', marginRight: '10px', display: 'inline-block', verticalAlign: 'top'}} alt="Website logo that looks like a heart"/>              
              <h1 style={{display: 'inline-block'}}>
              Genshin Item Manager
              </h1>
            </div>           
          </Row>
          <Row>
            <Col>
              <Card className="my-card">
                <Card.Body style={{overflowY: 'auto'}}>
                  <Card.Title><b>Welcome to Genshin Item Manager!</b></Card.Title>
                  <Card.Text>
                  This is a site for managing your Genshin Impact items! You can set your characters or weapons and find out exactly how many of each item you need to collect.<br></br>
                  <br></br>  
                  Click the menu bar on the top left to access the important stuff.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="my-card">
                <Card.Header><b>Changelog</b></Card.Header>
                <ListGroup style={{overflowY: 'auto'}}>
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