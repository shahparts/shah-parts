import { Pagination, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined, RightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages'
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import Image from 'next/image'
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp'
import DeleteModal from '@/components/Commons/DeleteModal/DeleteModal'
import { BulkProductsUpload } from '@/components/Admin/BulkProductsUpload/BulkProductsUpload'

const Products = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(1);
    const [totalCount, setTotalCount] = useState();

    let data = "TOYOTA > Mark X > Transmission & Drivetrain > Propeller Shafts";
    let categories = data.split(' > ');
    let lastTwoCategories = categories?.slice(-2);
    console.log(lastTwoCategories)

    const getAllData = async () => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get`, { page: current - 1, pageSize: "20" }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                setProducts(res.data?.products);
                setTotalCount(res.data.count)
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
        });
    }

    useEffect(() => {
        getAllData()

        return () => {

        }
    }, [current])



    const deleteHandler = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/delete/${id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.statusText === "OK") {
                SuccessAlert(res.data.successMessage)
                getAllData();
            } else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
            console.log(err);
            ErrorAlert(err?.message);
        })
    }

    const columns = [
        {
            title: '#',
            key: 'index',
            render: (_, __, index) => (
                <div>{(current - 1) * 20 + index + 1}</div>
            ),
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a?._id > b?._id,
            render: (_, { _id }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{_id}</div>
                </>
            ),
        },
        {
            title: "Title",
            dataIndex: 'Title',
            key: 'Title',
            sorter: (a, b) => a?.Title?.localeCompare(b?.Title),
            render: (_, { Title }) => (
                <p className='textElipsisTwoLines'>
                    {Title}
                </p>
            ),
        },
        {
            title: "Price",
            dataIndex: 'Price',
            key: 'Price',
            sorter: (a, b) => a?.Price - b?.Price,
        },
        {
            title: "Description",
            dataIndex: 'Description',
            key: 'Description',
            sorter: (a, b) => a?.Description?.localeCompare(b?.Description),
            render: (_, { Description }) => (
                <p className='textElipsisTwoLines'>
                    {Description}
                </p>
            ),
        },
        {
            title: "Make",
            dataIndex: 'Make',
            key: 'Make',
            sorter: (a, b) => a?.Make?.localeCompare(b?.Make),
        },
        {
            title: "Model",
            dataIndex: 'Model',
            key: 'Model',
            sorter: (a, b) => a?.Model?.localeCompare(b?.Model),
        },
        {
            title: "Part",
            dataIndex: 'Part',
            key: 'Part',
            sorter: (a, b) => a?.Part?.localeCompare(b?.Part),
        },
        {
            title: "Part Accessorries",
            dataIndex: 'PartAccessorries',
            key: 'PartAccessorries',
            sorter: (a, b) => a?.PartAccessorries?.localeCompare(b?.PartAccessorries),
        },
        {
            title: "Location",
            dataIndex: 'Location',
            key: 'Location',
            sorter: (a, b) => a?.Location?.localeCompare(b?.Location),
        },
        {
            title: "Condition",
            dataIndex: 'Condition',
            key: 'Condition',
            sorter: (a, b) => a?.Condition?.localeCompare(b?.Condition),
        },
        {
            title: "Model Code",
            dataIndex: 'ModelCode',
            key: 'ModelCode',
            sorter: (a, b) => a?.ModelCode?.localeCompare(b?.ModelCode),
        },
        {
            title: "Reg Year/Month",
            dataIndex: 'RegistrationYear',
            key: 'RegistrationYear',
            sorter: (a, b) => a?.RegistrationYear?.localeCompare(b?.RegistrationYear),
        },
        {
            title: "Mileage",
            dataIndex: 'Mileage',
            key: 'Mileage',
            sorter: (a, b) => a?.Mileage?.localeCompare(b?.Mileage),
        },
        {
            title: "Mission Type",
            dataIndex: 'MissionType',
            key: 'MissionType',
            sorter: (a, b) => a?.MissionType?.localeCompare(b?.MissionType),
        },
        {
            title: "Engine Model",
            dataIndex: 'EngineModel',
            key: 'EngineModel',
            sorter: (a, b) => a?.EngineModel?.localeCompare(b?.EngineModel),
        },
        {
            title: "Engine Size",
            dataIndex: 'EngineSize',
            key: 'EngineSize',
            sorter: (a, b) => a?.EngineSize?.localeCompare(b?.EngineSize),
        },
        {
            title: "Fuel",
            dataIndex: 'Fuel',
            key: 'Fuel',
            sorter: (a, b) => a?.Fuel?.localeCompare(b?.Fuel),
        },
        {
            title: "Drive",
            dataIndex: 'Drive',
            key: 'Drive',
            sorter: (a, b) => a?.Drive?.localeCompare(b?.Drive),
        },
        {
            title: "Auto Parts Maker",
            dataIndex: 'PutoPartsMaker',
            key: 'PutoPartsMaker',
            sorter: (a, b) => a?.PutoPartsMaker?.localeCompare(b?.PutoPartsMaker),
        },
        {
            title: "Genuine Parts No.",
            dataIndex: 'GenuinePartsNo',
            key: 'GenuinePartsNo',
            sorter: (a, b) => a?.GenuinePartsNo?.localeCompare(b?.GenuinePartsNo),
        },
        {
            title: "Chassis No.",
            dataIndex: 'ChassisNo',
            key: 'ChassisNo',
            sorter: (a, b) => a?.ChassisNo?.localeCompare(b?.ChassisNo),
        },
        {
            title: "Ref No.",
            dataIndex: 'RefNo',
            key: 'RefNo',
            sorter: (a, b) => a?.RefNo?.localeCompare(b?.RefNo),
        },
        {
            title: "Gear Type",
            dataIndex: 'GearType',
            key: 'GearType',
            sorter: (a, b) => a?.GearType?.localeCompare(b?.GearType),
        },
        {
            title: "Pictures",
            dataIndex: 'Pictures',
            key: 'Pictures',
            render: (_, { Pictures }) => (
                <div className='flex gap-2 flex-wrap items-center w-[130px]'>
                    {
                        Pictures?.length > 0 &&
                        Pictures?.map(pic => {
                            return (
                                <Image src={pic} width={32} height={32} style={{ width: "32px", height: "32px" }} alt="Product" />
                            )
                        })
                    }
                </div>
            ),
        },
        {
            title: "Actions",
            render: (_, product) => (
                <>
                    <div className='flex items-center gap-4'>
                        <Link href={"/product/" + product._id}><EyeOutlined /></Link>
                        <EditOutlined onClick={() => router.push(`/admin/update-product/${product._id}`)} />
                        <DeleteModal id={product?._id} deleteFun={deleteHandler} deleteBtn={<DeleteOutlined style={{ verticalAlign: "middle" }} />} />
                    </div>
                </>
            ),
        },
    ];
    let categoriesList = "TOYOTA > Soarer > 2001 > UA-UZZ40 > Body Parts > Fenders";
    console.log(categoriesList.split(" > ")[5]);


    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6'>
                <div className='md:flex justify-between flex-wrap items-start pb-8'>
                    <div>
                        <div className='flex gap-2 justify-start items-center pb-4'>
                            <span>Admin</span> <RightOutlined /> <div className='text-[#0094DA] bg-transparent'>Products</div>
                        </div>
                        <h1 className='text-[33px] font-bold'>Products</h1>
                    </div>
                    <div className='mt-8 md:mt-0'>
                        <ButtonComp type='primary' onClick={() => router.push("/admin/create-product")} htmlType="submit" loading={loading} disabled={loading} text="Add Product" />
                    </div>
                </div>
                <BulkProductsUpload updateParentData={getAllData} />
                <div className='hidden md:block bg-white'>
                    <h3 className='p-4 text-[28px]'>Total Results: {totalCount}</h3>
                    <Table loading={loading} showSorterTooltip columns={columns} pagination={false} dataSource={products} />
                </div>
                <div className='flex justify-center my-10'>
                    <Pagination current={current} defaultPageSize={20} showSizeChanger={false} onChange={(page) => setCurrent(page)} total={totalCount} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Products
