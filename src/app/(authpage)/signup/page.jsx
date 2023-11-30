'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/authpage.module.scss';
import useSignUp from '@/hooks/useSignup.jsx';
import { isEmailValid, isPasswordValid } from '@/utils/validation.js';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function LoginPage() {
  const router = useRouter();
  const { signUp, loading, success, error, setError } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: '',
    username: '',
    password: '',
    passwordCom: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('請輸入有效的電子郵件').required('請輸入電子郵件'),
    username: Yup.string().required('請輸入使用者名稱'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        '密碼必須包含至少一個小寫字母、一個大寫字母、一個數字，且長度至少為8個字元',
      )
      .required('請輸入密碼'),
    passwordCom: Yup.string().oneOf([Yup.ref('password'), null], '兩次輸入的密碼不一致'),
  });

  const handleFormSubmit = async (values) => {
    const { email, username, password, passwordCom } = values;

    if (!email || !username || !password || !passwordCom) {
      Swal.fire({
        icon: 'error',
        title: 'Please complete the form',
        text: 'Please make sure you have entered your email, username and password.',
      });
      return;
    }
    if (!isEmailValid(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Please check your email',
        text: 'Please make sure you have entered a valid email.',
      });
      return;
    }
    if (!isPasswordValid(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Please check your password',
        text: 'Please make sure your password contains at least one lowercase letter, one uppercase letter, one number, and is at least 8 characters long.',
      });
      return;
    }
    if (password !== passwordCom) {
      Swal.fire({
        icon: 'error',
        title: 'Please check your password',
        text: 'Please make sure you have entered the same password twice.',
      });
    }

    signUp(email, username, password);
  };

  useEffect(() => {
    if (error !== null) {
      if (error >= 500 && error < 600) {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: 'Please try again later or notify our engineering team.',
        });
      } else if (error === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Email has been registered',
          text: 'Please try another email.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Email or password is invalid',
          text: 'Please check your email or password.',
        });
      }
      setError(null);
    }
  }, [signUp]);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [loading]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Sign up successfully',
        text: 'Please login to continue.',
      }).then(() => {
        router.push('/login');
      });
    }
  }, [success]);

  return (
    <div className={styles.formFrame}>
      <div className={styles.formTitle}>會員註冊</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.formItem}>
            <div className={styles.formLabel} htmlFor="email">
              電子郵件
              <Field
                className={styles.formInput}
                type="email"
                id="email"
                name="email"
                placeholder="例：helloworld@gmail.com"
              />
              <ErrorMessage name="email" component="div" className={styles.errorMsg} />
            </div>
            <div className={styles.formLabel} htmlFor="username">
              使用者名稱
              <Field
                className={styles.formInput}
                type="text"
                id="username"
                name="username"
                placeholder="例：HaHaHaIsMe"
              />
              <ErrorMessage name="username" component="div" className={styles.errorMsg} />
            </div>
            <div className={styles.formLabel} htmlFor="password">
              密碼
              <Field
                className={styles.formInput}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className={styles.errorMsg} />
            </div>
            <div className={styles.formLabel} htmlFor="passwordCom">
              請再次輸入密碼
              <Field
                className={styles.formInput}
                type={showPassword ? 'text' : 'password'}
                id="passwordCom"
                name="passwordCom"
              />
              <ErrorMessage name="passwordCom" component="div" className={styles.errorMsg} />
              <button
                type="button"
                style={{ alignSelf: 'flex-end' }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '隱藏密碼' : '顯示密碼'}
              </button>
            </div>
            {loading && <div className={styles.grayBtn}>註冊中...</div>}
            {!loading && (
              <button className={styles.formButton} type="submit" disabled={isSubmitting}>
                註冊
              </button>
            )}
          </Form>
        )}
      </Formik>
      <div className={styles.formHint}>
        已經是會員了？
        <Link href="/login" className={styles.text}>
          <span>會員登入</span>
        </Link>
      </div>
    </div>
  );
}
