import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Home(){
    return(
        <Container fluid>
          <Row className="justify-content-md-center">
            <h1>
            Welcome to the Genshin Impact Item Manager!
            </h1>
          </Row>
          <Row className="justify-content-md-center">
            <p className="center-text">
              This is a site for managing your Genshin Impact items! You can set your characters or weapons and find out exactly how many of each item you need to collect.<br></br> 
              Click the menu bar on the top left to access the important stuff.
            </p>
          </Row>
          <Container fluid="lg">
            <Row>
              <h2>
                Changelog
              </h2>
            </Row>
            <Row className="border">
              <p>
                v1.0<br></br>
                First release!<br></br>
                Nothing much to put here yet because its the first release...
              </p>
            </Row>
          </Container>
        </Container>
    );
};

export default Home;