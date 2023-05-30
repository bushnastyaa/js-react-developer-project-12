import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Form,
} from 'react-bootstrap';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

function FormLogin() {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <Form.Control
          name="username"
          type="text"
          placeholder="Ваш ник"
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Form.Label>Ваш ник</Form.Label>
      </Form.Group>

      <Form.Group className="form-floating mb-4" controlId="password">
        <Form.Control
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          required
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Form.Label>Пароль</Form.Label>
        <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        Войти
      </Button>
    </Form>
  );
};

export default FormLogin;
