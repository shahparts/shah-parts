"use client";

import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import Loading from '@/components/Commons/Loading/Loading';
import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { AccountLayout } from '@/components/Layouts/AccountLayout/AccountLayout';
import { Table, Typography } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import Image from 'next/image';
import styles from "./orders.module.css";

const { Title, Text } = Typography;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllOrders = async () => {
        if (isAuthenticated() && isAuthenticated()?._id) {
            setLoading(true);
            await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/customer/orders/${isAuthenticated()?._id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setLoading(false);
                if (res.status === 200) {
                    setOrders(res.data);
                } else {
                    ErrorAlert(res.data.errorMessage);
                }
            }).catch(err => {
                setLoading(false);
                console.log(err)
                ErrorAlert(err?.message);
            })
        }
    }

    useEffect(() => {
        getAllOrders();
        return () => {

        }
    }, []);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => <span>${record?.totalPrice}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <span className={`font-bold ${record?.status !== '0' ? "text-[#000]" : "text-[red]"}`}>
                    {
                        record?.status === '0' ? <CloseCircleFilled className='text-[red]' /> :
                            record?.status === '1' ? 'Just Placed' :
                                record?.status === '2' ? 'Confirmed' :
                                    record?.status === '3' ? 'Prepared' :
                                        record?.status === '4' ? 'Out for delivery' :
                                            record?.status === '5' ? 'Complete' : null
                    }
                </span>
            )
        },
        {
            title: 'Updated At',
            dataIndex: 'statusUpdateTime',
            key: 'statusUpdateTime',
        },
        {
            title: 'Placed At',
            dataIndex: 'placed',
            key: 'placed',
        }
    ];

    return (
        <AccountLayout sidebar>
            <div className={styles.orders}>
                {
                    loading ?
                        <Loading />
                        :
                        <div className='table-container border orders p-2 mb-10'>
                            <Table
                                columns={columns}
                                loading={loading}
                                dataSource={orders}
                                expandable={{
                                    expandedRowRender: record => (
                                        <div className={styles.orderDetails}>
                                            <div className={styles.orderProducts}>
                                                {record?.products?.map((product, index) => (
                                                    <div key={index} className="my-0">
                                                        <b>#{index + 1}</b>
                                                        <Image src={product?.Pictures[0]} height={64} width={64} alt='images' />
                                                        <span>{product?.Title}</span>
                                                        <span>Qty: {product?.qtyToShop}</span>
                                                        <span>${parseInt(product?.Price * product?.qtyToShop)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='border p-3 max-w-[300px]'>
                                                <Title level={6}>Order Details:</Title>
                                                <div className='flex justify-between gap-8'>
                                                    <b>Sub Total:</b>
                                                    <b>${record?.subTotal}</b>
                                                </div>
                                                <div className='flex justify-between gap-8 my-2'>
                                                    <b>Shipping Charges:</b>
                                                    <b>${record?.shipping}</b>
                                                </div>
                                                <div className='flex justify-between gap-8'>
                                                    <b>Order Total:</b>
                                                    <b>${record?.totalPrice}</b>
                                                </div>
                                            </div>
                                            <div className='border p-3'>
                                                <Title level={6}>Billing Address:</Title>
                                                <Text>
                                                    <b>Name:</b> {record?.billingAddress?.fullName} <br />
                                                    <b>Address1:</b> {record?.billingAddress?.address}, <br />
                                                    <b>Address2:</b> {record?.billingAddress?.address2},<br />
                                                </Text>
                                            </div>
                                        </div>
                                    )
                                }}
                                rowKey={record => record._id}
                            />
                        </div>
                }
            </div>
        </AccountLayout >
    );
}

export default Orders;
