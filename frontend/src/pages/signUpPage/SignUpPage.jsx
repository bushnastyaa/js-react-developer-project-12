import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';

import SignUpForm from './SignUpForm.jsx';
import avatar from './avatar.jpg';

const SignUpPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12" md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <Image className="rounded-circle" src={avatar} alt="Signup" />
            </div>
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignUpPage;
