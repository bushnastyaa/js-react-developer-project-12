import React, { 
  useState, 
  useNavigate, 
  useEffect, 
  useRef,
} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import routes from '../../routes/routes.js';
import useAuth from '../../hooks/useAuth.jsx';

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup
    .string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

function FormLogin() {
  const [authFailed, setAuthFailed] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirm: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signupPath(), values);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          inputRef.current.select();
          setAuthFailed(true);
          return;
        }

        if (err.isAxiosError && err.response.status === 409) {
          inputRef.current.select();
          setAuthFailed(true);
          setExistingUser(true);
          return;
        }

        throw err;
      }
    },
  });

  const onChange = (e) => {
    if (existingUser) {
      setExistingUser(false);
    }
    formik.handleChange(e);
  }

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <Form.Control
          name="username"
          type="text"
          placeholder="Имя пользователя"
          autoComplete="username"
          ref={inputRef}
          onChange={onChange}
          value={formik.values.username}
          isInvalid={(!!formik.errors.username && existingUser) || authFailed}
          disabled={formik.isSubmitting}
        />
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-4" controlId="password">
        <Form.Control
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="new-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={(!!formik.errors.password && formik.touched.password) || authFailed}
          disabled={formik.isSubmitting}
        />
        <Form.Label>Пароль</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-4" controlId="password">
        <Form.Control
          name="passwordConfirm"
          type="password"
          placeholder="Подтвердите пароль"
          autoComplete="new-password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          isInvalid={
            (!!formik.errors.passwordConfirm && formik.touched.confirmPassword) || authFailed
          }
          disabled={formik.isSubmitting}
        />
        <Form.Label>Подтвердите пароль</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.passwordConfirm}</Form.Control.Feedback>
      </Form.Group>

      {existingUser ? <Alert variant="danger">Такой пользователь уже существует</Alert> : null}

      <Button 
        type="submit" 
        variant="outline-primary" 
        className="w-100 mb-3" 
        disabled={formik.isSubmitting}
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default FormLogin;
