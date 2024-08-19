import { Input, Select } from 'antd'
import React, { useState } from 'react'
import { RightOutlined } from '@ant-design/icons'
import axios from 'axios'
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import Link from 'next/link';
import DragUpload from '@/components/Commons/DragUpload/DragUpload';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';


const CreateProduct = () => {
    const router = useRouter();
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
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/create`, formData, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                setLoading(false);
                SuccessAlert(res.data.successMessage);
                router.push("/admin/products")
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    }

    console.log(formData);


    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6 md:max-w-[60vw]'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>Admin</span> <RightOutlined /> <button className='text-[#0094DA]'>Create product</button>
                    </div>
                </div>
                <form onSubmit={submitHandler}>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h1 className='text-[33px] font-bold'>Create Products</h1>
                        </div>
                        <div>
                            <Link href='/admin/products' type="button" className="btn-close" aria-label="Close"></Link>
                        </div>
                    </div>
                    <div className="form-group mt-4">
                        <label>Title</label> < br />
                        <Input required type="text" className="form-control mb-2" placeholder="Enter Your Product Title" onChange={(e) => handleChange("Title", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Price</label> < br />
                        <Input required type="Number" className="form-control mb-2" placeholder="Enter Product's Price" onChange={(e) => handleChange("Price", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Description</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Description" onChange={(e) => handleChange("Description", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Make</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Make" onChange={(e) => handleChange("Make", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Model</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Model" onChange={(e) => handleChange("Model", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Part</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Part" onChange={(e) => handleChange("Part", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Part Accessories</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Part Accessories" onChange={(e) => handleChange("PartAccessorries", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Location</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Location" onChange={(e) => handleChange("Location", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Condition</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Condition" onChange={(e) => handleChange("Condition", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Model Code</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Model Code" onChange={(e) => handleChange("ModelCode", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Registration Year/Month</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Registration Year/Month" onChange={(e) => handleChange("RegistrationYear", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Mileage</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Mileage" onChange={(e) => handleChange("Mileage", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Mission Type</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Mission Type" onChange={(e) => handleChange("Missiontype", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Engine Model</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Engine Model" onChange={(e) => handleChange("EngineModel", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Engine Size</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Engine Size" onChange={(e) => handleChange("EngineSize", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Fuel</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Fuel" onChange={(e) => handleChange("Fuel", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Drive</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Drive" onChange={(e) => handleChange("Drive", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Autoparts Maker</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Autoparts Maker" onChange={(e) => handleChange("AutoPartsMaker", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Genuine Parts No</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Genuine Parts No" onChange={(e) => handleChange("GenuinePartsNo", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Chassis No</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Chassis No" onChange={(e) => handleChange("ChassisNo", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Reference No</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Reference No" onChange={(e) => handleChange("RefNo", e.target.value)} />
                    </div>
                    <div className="form-group mt-4">
                        <label>Gear Type</label> < br />
                        <Input type="text" className="form-control mb-2" placeholder="Enter Product's Gear Type" onChange={(e) => handleChange("GearType", e.target.value)} />
                    </div>
                    <div className='mt-3'>
                        <label>Featured</label> < br />
                        <Select className='w-full' placeholder="Featured" onChange={(value) => handleChange("Featured", value)} options={[
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" }
                        ]} />
                    </div>
                    <div className='mt-3'>
                        <label>Pictures</label> < br />
                        <DragUpload updateFiles={(val) => handleChange("Pictures", val)} />
                    </div>
                    <div className='mt-5'>
                        <ButtonComp type='primary' htmlType="submit" loading={loading} disabled={loading} text="Submit" />
                    </div>
                </form>
            </div>
        </AdminLayout >
    )
}

export default CreateProduct
