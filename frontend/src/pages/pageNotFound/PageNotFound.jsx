import React from 'react';
import { Container } from 'react-bootstrap';

function PageNotFound() {
  return (
    <Container fluid className="h-100">
      <div className="text-center">
        <img alt="Страница не найдена" style={{ width: 400 }} className="img-fluid h-25" src="./notfoundImg.svg" />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          Но вы можете перейти
          <a href="/">на главную страницу</a>
        </p>
      </div>
    </Container>
  );
};

export default PageNotFound;
