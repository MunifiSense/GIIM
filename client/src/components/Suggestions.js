import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {FaHeart} from 'react-icons/fa';

function Home(){
    return(
        <Container fluid className="inner-container">
          <Row className="justify-content-md-center" style={{paddingLeft: '10px', paddingTop: '30px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FaHeart size='64' color='white' style={{display: "inline-block", verticalAlign: 'middle !important', marginRight: '10px'}}/>
                    <h1 style={{display: "inline-block"}}>Suggestions/Feedback</h1>
                </div>   
            </Row>
            <Row className="justify-content-md-center" style={{paddingLeft: '10px'}}>
                <p>Have any suggestions/feedback/bug reports for me? Fill out this form!</p>
            </Row>
          <Row className="justify-content-md-center">
            <div style={{backgroundColor: 'white', borderRadius: '5px'}}>
                <iframe title="Suggestion Form" src="" width="640" height="750" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
          </Row>                
        </Container>
    );
};

export default Home;