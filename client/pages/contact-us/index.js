import React from 'react';
import { Form, Input, Button, Card, Col, Row } from 'antd';
import styles from "./contact.module.css";

const ContactUsPage = () => {
    return (
        <div className={styles.contactPage}>
            <Row gutter={16} justify="center">
                <Col xs={24} md={14} className={styles.formCol}>
                    <Form
                        layout="vertical"
                        name="contact_form"
                        initialValues={{ remember: true }}
                        className={styles.form}
                    >
                        <h1>Contact Us</h1>
                        <p className='mb-4'>If you have any questions or need further information, please feel free to reach out to us. Our team is here to assist you.</p>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Message"
                            name="message"
                            rules={[{ required: true, message: 'Please enter your message!' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Send
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <div className={styles.contactCards}>
                <Row gutter={16}>
                    <Col xs={24} md={8}>
                        <Card title="Email" bordered={false} className={styles.contactCard}>
                            <p>Info@shahparts.com</p>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card title="Phone" bordered={false} className={styles.contactCard}>
                            <p>+81-80-5082-1650</p>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card title="Address" bordered={false} className={styles.contactCard}>
                            <p> 2-5 UZUMORIDAI HIGASHI NADA KU KOBE CITY, HYOGO. JAPAN</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ContactUsPage;
