import React, { useState } from 'react'
import { Form, Input, Button } from "antd";
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import axios from 'axios';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/send/forgot-email`, { email: values.email }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
                setSubmitted(true);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    };


    return (
        <div className={styles.auth}>
            <div className={styles.container}>
                <div>
                    {
                        !submitted ?
                            <>
                                <p>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="nest-messages"
                                    className={styles.form}
                                    requiredMark={false}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name='email'
                                        label="Email"
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
                                        <Input placeholder='Enter email' />
                                    </Form.Item>
                                    <Form.Item>
                                        <ButtonComp type='submit' text="Submit" loading={loading} disabled={loading} />
                                    </Form.Item>
                                </Form>
                            </>
                            :
                            <div>
                                <p className='mt-0 text-center mb-[24px]'>
                                    Reset password link has been sent to {form.getFieldValue('email')}. Check your spam and promotions folder if it doesn’t appear in your inbox.
                                </p>
                                <div className='flex justify-center gap-2'>
                                    <div>Didn’t received the reset instructions?</div>
                                    <Link href="#" onClick={() => setSubmitted(false)}>Resend Email</Link>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
