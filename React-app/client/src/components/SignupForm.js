import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .matches(/[A-Z]/, 'Needs uppercase letter')
    .required('Required')
});

const SignupForm = () => (
  <Formik
    initialValues={{ name: '', email: '', password: '' }}
    validationSchema={SignupSchema}
    onSubmit={async (values, { setSubmitting }) => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        const data = await response.json();
        if (response.ok) {
          alert('User created successfully!');
        } else {
          alert(data.error || 'Registration failed');
        }
      } catch (error) {
        alert('An error occurred');
      } finally {
        setSubmitting(false);
      }
    }}
  >
    {({ errors, touched, isSubmitting }) => (
      <Form>
        <div>
          <Field name="name" placeholder="Name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit" disabled={isSubmitting}>
          Sign Up
        </button>
      </Form>
    )}
  </Formik>
);

export default SignupForm;