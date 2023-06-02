import React, {
  useState,
  useNavigate,
  useEffect,
  useRef,
} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../routes/routes.js';
import useAuth from '../../hooks/useAuth.jsx';

const FormLogin = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const loginSchema = Yup.object().shape({
    username: Yup.string().required(t('signup.required')),
    password: Yup.string().required(t('signup.required')),
  });

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
          inputRef.current.select();
          return;
        }

        throw err;
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('login.header')}</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <Form.Control
          name="username"
          type="text"
          placeholder={t('login.username')}
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
          disabled={formik.isSubmitting}
        />
        <Form.Label>{t('login.username')}</Form.Label>
      </Form.Group>

      <Form.Group className="form-floating mb-4" controlId="password">
        <Form.Control
          name="password"
          type="password"
          placeholder={t('login.password')}
          autoComplete="current-password"
          ref={inputRef}
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
          disabled={formik.isSubmitting}
        />
        <Form.Label>{t('login.password')}</Form.Label>
        <Form.Control.Feedback type="invalid">{t('login.authFailed')}</Form.Control.Feedback>
      </Form.Group>

      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
        {t('login.submit')}
      </Button>
    </Form>
  );
};

export default FormLogin;
