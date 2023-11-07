import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Formik() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      dob: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
        .required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      dob: Yup.date()
        .max(new Date(), 'Date cannot be in the future')
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 120)), 'You cannot be more than 120 years old'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Use of Formik for Form Validation Example</h1>
      <label>
        Username:
        <input type="text" name="username" {...formik.getFieldProps('username')} />
      </label>
      {formik.touched.username && formik.errors.username ? (
        <div style={{ color: 'red' }}>{formik.errors.username}</div>
      ) : null}
      <br />

      <label>
        Email:
        <input type="email" name="email" {...formik.getFieldProps('email')} />
      </label>
      {formik.touched.email && formik.errors.email ? (
        <div style={{ color: 'red' }}>{formik.errors.email}</div>
      ) : null}
      <br />

      <label>
        Phone Number:
        <input type="tel" name="phoneNumber" {...formik.getFieldProps('phoneNumber')} />
      </label>
      {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
        <div style={{ color: 'red' }}>{formik.errors.phoneNumber}</div>
      ) : null}
      <br />

      <label>
        Password:
        <input type="password" name="password" {...formik.getFieldProps('password')} />
      </label>
      {formik.touched.password && formik.errors.password ? (
        <div style={{ color: 'red' }}>{formik.errors.password}</div>
      ) : null}
      <br />

      <label>
        Confirm Password:
        <input type="password" name="confirmPassword" {...formik.getFieldProps('confirmPassword')} />
      </label>
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
      ) : null}
      <br />

      <label>
        Date of Birth:
        <input type="date" name="dob" {...formik.getFieldProps('dob')} />
      </label>
      {formik.touched.dob && formik.errors.dob ? (
        <div style={{ color: 'red' }}>{formik.errors.dob}</div>
      ) : null}
      <br />

      <button type="submit">Register</button>
    </form>
  );
}
