import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup'

function Home(){
    return(
        <Container fluid>
          <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
                <h1>Suggestions/Feedback</h1>
            </Row>
            <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
                <p>Have any suggestions/feedback/bug reports for me? Fill out this form!</p>
            </Row>
          <Row className="justify-content-md-center">
            <div style={{backgroundColor: 'white', borderRadius: '5px'}}>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScNsOJc5NGtB2R12uum1-m_GedQXR7f8u8WpP9fYxK_E69Z7w/viewform?embedded=true" width="640" height="750" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
          </Row>                
        </Container>
    );
};

export default Home;