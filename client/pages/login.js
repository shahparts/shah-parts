import React, { useEffect, useState } from 'react'
import { Form, Input, Checkbox } from "antd";
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setAuthentication } from '@/components/Commons/Auth/Auth';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveCredentials = (email, password) => {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  const addToCartFromLS = async (userId) => {
    var allEntries = localStorage.getItem("products") && JSON.parse(localStorage.getItem("products")) || [];
    if (allEntries?.length > 0) {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/ls-add-to-cart`, { products: allEntries, userId }).then(res => {
        if (res.status === 200) {
          SuccessAlert(res.data.successMessage);
          getCartProducts();
        }
        else {
          ErrorAlert(res.data.errorMessage)
        }
      }).catch(err => {
        console.log(err)
        ErrorAlert(err?.message);
      })
    }
  };


  const onFinish = async (values) => {
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, { email: values.email, password: values.password }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setAuthentication(res.data?.user, res.data?.token);
        const redirectUrl = localStorage.getItem("redirectUrl");
        if (remember) {
          saveCredentials(form.getFieldValue("email"), form.getFieldValue("password"));
          if (redirectUrl) {
            router.push(redirectUrl)
          } else {
            router.push('/');
          }
          setTimeout(() => {
            document.location.reload();
          }, 1000);

        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          if (redirectUrl) {
            router.push(redirectUrl)
          } else {
            router.push('/');
          }
          setTimeout(() => {
            document.location.reload();
          }, 1000);
        }
        addToCartFromLS(res.data?.user?._id);
        SuccessAlert(res.data.successMessage);
      } else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
      ErrorAlert(err?.message);
    })
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      form.setFieldsValue({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), })
    }
    return () => {

    }
  }, [])


  return (
    <div className={styles.auth}>
      <div>
        <div className={styles.container}>
          <div>
            <h4>Log in to your account</h4>
            <Form
              layout="vertical"
              form={form}
              name="nest-messages"
              className={styles.form}
              onFinish={onFinish}
            >
              <Form.Item
                name='email'
                label="Username or email address"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <ButtonComp type='submit' text="Login" loading={loading} disabled={loading} />
              </Form.Item>
              <Form.Item>
                <div className='flex justify-between items-center mt-[-28px]'>
                  <div>
                    <Checkbox onChange={(e) => setRemember(e.target.checked)}>Remember me</Checkbox>
                  </div>
                  <div>
                    <Link href="/forgot-password">Forgot Password?</Link>
                  </div>
                </div>
              </Form.Item>
            </Form>
            <div className='flex justify-center gap-2'>
              <div>Don’t have an account?</div>
              <Link href="/signup">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
