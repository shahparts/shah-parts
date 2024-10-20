import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import { Button, Select, Table, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from "./orders.module.css";

const { Title, Text } = Typography;
const { Option } = Select;

const Categories = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');
    const [sort, setSort] = useState('6');

    const getAllOrders = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/admin/all-orders`, {
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

    useEffect(() => {
        getAllOrders();
        return () => {

        }
    }, []);

    function handleChange(value) {
        setOrderStatus(value);
    }


    const orderStatusHandler = async (orderId) => {
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/set/status`, { status: orderStatus, orderId, updateTime: moment().format("DD/MM/YYYY, h:mm:ss a") }, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
            } else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
            console.log(err)
            ErrorAlert(err?.message);
        })
    }


    // /************************************************** Cancel Orders ***********************************************/
    // const cancelOrder = async (orderId) => {
    //     await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/order/cancel/${orderId}`, {
    //         headers: {
    //             'authorization': 'Bearer ' + localStorage.getItem('token')
    //         }
    //     }).then(res => {
    //         if (res.status === 200) {
    //             SuccessAlert(res.data.successMessage);
    //         }
    //         else {
    //             ErrorAlert(res.data.errorMessage)
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //         ErrorAlert(err?.message);
    //     })
    // }


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
                <div className="flex items-center gap-2">
                    <div>
                        <Select className='p-0' defaultValue={record?.status} onChange={handleChange}>
                            <Option value={"1"}>Just Placed</Option>
                            <Option value={"2"}>Confirmed</Option>
                            <Option value={"3"}>Prepared</Option>
                            <Option value={"4"}>Delivered</Option>
                            <Option value={"5"}>Complete</Option>
                            <Option value={"0"}>Cancelled</Option>
                        </Select>
                    </div>
                    <div>
                        <Button size='large' className={styles.antBtn} onClick={() => orderStatusHandler(record?._id)}>Set</Button>
                    </div>
                </div>
            )
        },
        {
            title: 'Updated At',
            dataIndex: 'statusUpdateTime',
            key: 'statusUpdateTime',
        }
    ];

    return (
        <AdminLayout sidebar>
            <div className={styles.orders}>
                <div className='w-full max-w-[400px]'>
                    <h2 className='text-[23px]'>Filter Orders:</h2>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Sort Orders"
                        allowClear
                        treeDefaultExpandAll
                        value={sort}
                        onChange={(val) => setSort(val)}
                        className='mb-3'
                    >
                        <Option value={"6"}>All</Option>
                        <Option value={"1"}>Pending</Option>
                        <Option value={"2"}>Confirmed</Option>
                        <Option value={"3"}>Prepared</Option>
                        <Option value={"4"}>Delivered</Option>
                        <Option value={"5"}>Completed</Option>
                        <Option value={"0"}>Cancelled</Option>
                    </Select>
                </div>
                <div className='table-container border orders p-2 mb-10'>
                    <Table
                        columns={columns}
                        loading={loading}
                        dataSource={(sort === "6" || !sort) ? orders : orders?.filter(order => order?.status === sort)}
                        expandable={{
                            expandedRowRender: record => (
                                <div className={styles.orderDetails}>
                                    <div className={styles.orderProducts}>
                                        {record?.products?.map((product, index) => (
                                            <div key={index} className="my-0">
                                                <b>#{index + 1}</b>
                                                <Image src={product?.Pictures[0]} height={64} width={64} alt='Product' />
                                                <a href={"/product/"+product._id}>{product?.Title}</a>
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
                                            {record?.billingAddress?.address}, {record?.billingAddress?.city},<br />
                                            {record?.billingAddress?.state}, {record?.billingAddress?.country}, {record?.billingAddress?.postalCode}<br /><br />
                                            {record?.billingAddress?.fullName}<br />
                                            <a href={`mailto: ${record?.billingAddress?.email}`}>{record?.billingAddress?.email}</a> <br />
                                            <a href={`tel: ${record?.billingAddress?.phone}`}>{record?.billingAddress?.phone}</a>
                                        </Text>
                                    </div>
                                    {record?.shippingAddress && (
                                        <div className='border p-3'>
                                            <Title level={6}>Shipping Address:</Title>
                                            <Text>
                                                {record?.shippingAddress?.address}, {record?.shippingAddress?.city},<br />
                                                {record?.shippingAddress?.state}, {record?.shippingAddress?.country}, {record?.shippingAddress?.postalCode}<br /><br />
                                                {record?.shippingAddress?.fullName}<br />
                                                <a href={`mailto: ${record?.shippingAddress?.email}`}>{record?.shippingAddress?.email}</a> <br />
                                                <a href={`tel: ${record?.shippingAddress?.phone}`}>{record?.shippingAddress?.phone}</a>
                                            </Text>
                                        </div>
                                    )}
                                    {
                                        record?.notes &&
                                        <div className='border p-3'>
                                            <Title level={6}>Order Notes:</Title>
                                            <Text>
                                                {record?.notes}
                                            </Text>
                                        </div>
                                    }
                                </div>
                            )
                        }}
                        rowKey={record => record._id}
                    />
                </div>
            </div>
        </AdminLayout>
    )
}


export default Categories;