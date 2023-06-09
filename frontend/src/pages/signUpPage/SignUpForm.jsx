import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import routes from '../../routes/routes.js';
import useAuth from '../../hooks/useAuth.jsx';

const FormLogin = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup
      .string()
      .min(3, t('signup.outOfLenght'))
      .max(20, t('signup.outOfLenght'))
      .required(t('signup.required')),
    password: Yup
      .string()
      .min(6, t('signup.passMin'))
      .required(t('signup.required')),
    passwordConfirm: Yup
      .string()
      .required(t('signup.required'))
      .oneOf([Yup.ref('password'), null], t('signup.mustMatch')),
  });

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
          rollbar.err(err);
          return;
        }

        if (err.isAxiosError && err.response.status === 409) {
          inputRef.current.select();
          setAuthFailed(true);
          setExistingUser(true);
          rollbar.err(err);
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
  };

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signup.header')}</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <Form.Control
          name="username"
          type="text"
          placeholder={t('signup.username')}
          autoComplete="username"
          ref={inputRef}
          onChange={onChange}
          value={formik.values.username}
          isInvalid={(!!formik.errors.username && existingUser) || authFailed}
          disabled={formik.isSubmitting}
        />
        <Form.Label>{t('signup.username')}</Form.Label>
        {(existingUser || !!formik.errors.username)
          && (
          <Form.Control.Feedback type="invalid" tooltip>
            {existingUser ? t('signup.alreadyExists') : formik.errors.username}
          </Form.Control.Feedback>
          )}
      </Form.Group>

      <Form.Group className="form-floating mb-3" controlId="password">
        <Form.Control
          name="password"
          type="password"
          placeholder={t('signup.password')}
          autoComplete="new-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={(!!formik.errors.password && formik.touched.password) || authFailed}
          disabled={formik.isSubmitting}
        />
        <Form.Label>{t('signup.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-4" controlId="passwordConfirm">
        <Form.Control
          name="passwordConfirm"
          type="password"
          placeholder={t('signup.confirmPassword')}
          autoComplete="new-password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          isInvalid={
            (!!formik.errors.passwordConfirm && formik.touched.passwordConfirm) || authFailed
          }
          disabled={formik.isSubmitting}
        />
        <Form.Label>{t('signup.confirmPassword')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.passwordConfirm}</Form.Control.Feedback>
      </Form.Group>

      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={formik.isSubmitting}
      >
        {t('signup.signup')}
      </Button>
    </Form>
  );
};

export default FormLogin;
