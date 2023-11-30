'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/authpage.module.scss';
import { useRouter } from 'next/navigation';
import useLogin from '@/hooks/useLogin.jsx';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, setError } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('請輸入有效的電子郵件').required('請輸入電子郵件'),
    password: Yup.string()
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      //   '密碼必須包含至少一個小寫字母、一個大寫字母、一個數字，且長度至少為8個字元',
      // )
      // 先暫時不套用密碼規則不然舊帳號會登不進去
      .required('請輸入密碼'),
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      await login(email, password, router);
    } catch (err) {
      console.error('登入失敗:', err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (error !== null) {
      if (error >= 500 && error < 600) {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: 'Please try again later or notify our engineering team.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Email or password is incorrect',
          text: 'Plaese make sure you have entered the correct email and password.',
        });
      }
      setError(null);
    }
  }, [login]);

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
    } else if (!loading && error === null) {
      Swal.close();
    }
  }, [loading]);

  return (
    <div className={styles.formFrame}>
      <div className={styles.formTitle}>會員登入</div>
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
            <div className={styles.formLabel} htmlFor="password">
              密碼
              <Field
                className={styles.formInput}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="請輸入密碼"
              />
              <button
                type="button"
                style={{ alignSelf: 'flex-end' }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '隱藏密碼' : '顯示密碼'}
              </button>
              <ErrorMessage name="password" component="div" className={styles.errorMsg} />
            </div>
            {loading && <div className={styles.formHint}>登入中...</div>}
            {!loading && (
              <button className={styles.formButton} type="submit" disabled={isSubmitting}>
                登入
              </button>
            )}
          </Form>
        )}
      </Formik>
      <div className={styles.formHint}>
        尚未成為會員？
        <Link href="/signup" className={styles.text}>
          <span>會員註冊</span>
        </Link>
      </div>
    </div>
  );
}
