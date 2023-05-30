import React, { useState, useNavigate } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Button,
  Form,
} from 'react-bootstrap';
import routes from '../../routes/routes.js';
import useAuth from '../../hooks/useAuth.jsx';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

function FormLogin() {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          return;
        }

        throw err;
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <Form.Control
          name="username"
          type="text"
          placeholder="Ваш ник"
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
        />
        <Form.Label>Ваш ник</Form.Label>
      </Form.Group>

      <Form.Group className="form-floating mb-4" controlId="password">
        <Form.Control
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
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
