import { Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import Link from 'next/link';
import DragUpload from '@/components/Commons/DragUpload/DragUpload';
import { useRouter } from 'next/router';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import Loading from '@/components/Commons/Loading/Loading';

const UpdateProduct = () => {
    const router = useRouter();
    let productId = router?.query?.id;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        Title: '',
        Price: '',
        Pictures: '',
        Description: '',
        Featured: '',
        Make: '',
        Model: '',
        Part: '',
        PartAccessorries: '',
        Location: '',
        Condition: '',
        ModelCode: '',
        RegistrationYear: '',
        Mileage: '',
        MissionType: '',
        EngineModel: '',
        EngineSize: '',
        Fuel: '',
        Drive: '',
        AutoPartsMaker: '',
        GenuinePartsNo: '',
        ChassisNo: '',
        RefNo: '',
        GearType: ''
    });

    /*********************************************** onChange *******************************************/
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    }

    /************************************************ Submit **********************************************/

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/update/${productId}`, formData, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
                router.push("/admin/products");
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
            ErrorAlert(err?.message);
        });
    }

    const getProductById = async (prId) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/product/${prId}`).then(res => {
            setLoading(false);
            if (res.statusText === "OK") {
                setFormData(res.data);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
            ErrorAlert(err?.message);
        });
    }

    useEffect(() => {
        productId !== undefined && getProductById(productId);

        return () => {

        }
    }, [productId]);

    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6 md:max-w-[60vw]'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>Admin</span> <RightOutlined /> <button className='text-[#0094DA]'>Update product</button>
                    </div>
                </div>
                {
                    loading ?
                        <Loading />
                        :
                        <form onSubmit={submitHandler}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h1 className='text-[33px] font-bold'>Update a Product</h1>
                                </div>
                                <div>
                                    <Link href='/admin/products' type="button" className="btn-close" aria-label="Close"></Link>
                                </div>
                            </div>
                            <div className="form-group mt-4">
                                <label>Title</label> <br />
                                <Input value={formData?.Title} required type="text" className="form-control mb-2" placeholder="Enter Your Product Title" onChange={(e) => handleChange("Title", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Price</label> <br />
                                <Input value={formData?.Price} required type="number" className="form-control mb-2" placeholder="Enter Product's Price" onChange={(e) => handleChange("Price", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Description</label> <br />
                                <Input value={formData?.Description} type="text" className="form-control mb-2" placeholder="Enter Product's Description" onChange={(e) => handleChange("Description", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Featured</label> <br />
                                <Select className='w-full' value={formData.Featured} placeholder="Featured" onChange={(value) => handleChange("Featured", value)} options={[
                                    { value: "yes", label: "Yes" },
                                    { value: "no", label: "No" }
                                ]} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Make</label> <br />
                                <Input value={formData?.Make} type="text" className="form-control mb-2" placeholder="Enter Product's Make" onChange={(e) => handleChange("Make", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Model</label> <br />
                                <Input value={formData?.Model} type="text" className="form-control mb-2" placeholder="Enter Product's Model" onChange={(e) => handleChange("Model", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Part</label> <br />
                                <Input value={formData?.Part} type="text" className="form-control mb-2" placeholder="Enter Product's Part" onChange={(e) => handleChange("Part", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Part Accessories</label> <br />
                                <Input value={formData?.PartAccessorries} type="text" className="form-control mb-2" placeholder="Enter Product's Part Accessories" onChange={(e) => handleChange("PartAccessorries", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Location</label> <br />
                                <Input value={formData?.Location} type="text" className="form-control mb-2" placeholder="Enter Product's Location" onChange={(e) => handleChange("Location", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Condition</label> <br />
                                <Input value={formData?.Condition} type="text" className="form-control mb-2" placeholder="Enter Product's Condition" onChange={(e) => handleChange("Condition", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Model Code</label> <br />
                                <Input value={formData?.ModelCode} type="text" className="form-control mb-2" placeholder="Enter Product's Model Code" onChange={(e) => handleChange("ModelCode", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Registration Year/Month</label> <br />
                                <Input value={formData?.RegistrationYear} type="text" className="form-control mb-2" placeholder="Enter Product's Registration Year/Month" onChange={(e) => handleChange("RegistrationYear", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Mileage</label> <br />
                                <Input value={formData?.Mileage} type="text" className="form-control mb-2" placeholder="Enter Product's Mileage" onChange={(e) => handleChange("Mileage", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Mission Type</label> <br />
                                <Input value={formData?.MissionType} type="text" className="form-control mb-2" placeholder="Enter Product's Mission Type" onChange={(e) => handleChange("MissionType", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Engine Model</label> < br />
                                <Input value={formData?.EngineModel} type="text" className="form-control mb-2" placeholder="Enter Product's Engine Model" onChange={(e) => handleChange("EngineModel", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Engine Size</label> <br />
                                <Input value={formData?.EngineSize} type="text" className="form-control mb-2" placeholder="Enter Product's Engine Size" onChange={(e) => handleChange("EngineSize", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Fuel</label> <br />
                                <Input value={formData?.Fuel} type="text" className="form-control mb-2" placeholder="Enter Product's Fuel" onChange={(e) => handleChange("Fuel", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Drive</label> <br />
                                <Input value={formData?.Drive} type="text" className="form-control mb-2" placeholder="Enter Product's DoDrive" onChange={(e) => handleChange("Drive", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Auto Parts MaMaker</label> <br />
                                <Input value={formData?.AutoPartsMaker} type="text" className="form-control mb-2" placeholder="Enter Product's Auto Parts MaMaker" onChange={(e) => handleChange("AutoPartsMaker", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Genuine Parts Number</label> <br />
                                <Input value={formData?.GenuinePartsNo} type="text" className="form-control mb-2" placeholder="Enter Product's Genuine Parts Number" onChange={(e) => handleChange("GenuinePartsNo", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Chassis Number</label> <br />
                                <Input value={formData?.ChassisNo} type="text" className="form-control mb-2" placeholder="Enter Product's Chassis Number" onChange={(e) => handleChange("ChassisNo", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Reference Number</label> <br />
                                <Input value={formData?.RefNo} type="text" className="form-control mb-2" placeholder="Enter Product's Reference Number" onChange={(e) => handleChange("RefNo", e.target.value)} />
                            </div>
                            <div className="form-group mt-4">
                                <label>Gear Type</label> < br />
                                <Input value={formData?.GearType} type="text" className="form-control mb-2" placeholder="Enter Product's Gear Type" onChange={(e) => handleChange("GearType", e.target.value)} />
                            </div>
                            <div className='my-3'>
                                <label>Pictures</label> < br />
                                <DragUpload value={formData?.Pictures} updateFiles={(val) => handleChange("Pictures", val)} />
                            </div>
                            <div className='mt-5'>
                                <ButtonComp type='primary' htmlType="submit" loading={loading} disabled={loading} text="Submit" />
                            </div>
                        </form>
                }
            </div>
        </AdminLayout>
    );
}

export default UpdateProduct;
