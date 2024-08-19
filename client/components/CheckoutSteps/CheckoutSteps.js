import React from 'react';
import { Steps, Spin } from 'antd';
import { CreditCardFilled, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const CheckoutSteps = ({ loading, step }) => (
    <Spin spinning={loading}>
        <Steps current={step}>
            <Step title="Cart" icon={<ShoppingCartOutlined />} description="Items added to cart" />
            <Step title="Checkout and Payment" icon={<CreditCardFilled />} description="Address is filled and Payment is done" />
            <Step title="Order Complete" icon={<SmileOutlined />} description="Order is completed" />
        </Steps>
    </Spin>
);

export default CheckoutSteps;
