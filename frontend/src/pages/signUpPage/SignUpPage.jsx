import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';

import SignUpForm from './SignUpForm.jsx';

function SignUpPage() {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 d-flex align-items-center justify-content-center" md={6}>
                <Image className="rounded-circle" src="./avatar.jpg" alt="Enter" />
              </Col>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
