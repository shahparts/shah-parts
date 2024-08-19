import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import { Button, Input } from "antd";
import { ErrorAlert, SuccessAlert } from "@/components/Commons/Messages/Messages";
import DragUpload from "@/components/Commons/DragUpload/DragUpload";
import { ButtonComp } from "@/components/Commons/ButtonComp/ButtonComp";

export const CreateBrands = ({ updateFunction }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    picture: ''
  });

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  }


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brands/create`, formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then((res) => {
        setLoading(false);
        if (res.statusText === "OK") {
          SuccessAlert(res.data.successMessage);
          updateFunction();
          handleCancel();
        } else {
          ErrorAlert(res.data.errorMessage)
        }
      }).catch(err => {
        setLoading(false);
        console.log(err)
        ErrorAlert(err?.message);
      })
  };

  return (
    <>
      <ButtonComp onClick={showModal} text="Create Brand" />
      {/* <button className='rounded-[12px] text-white h-[48px] px-6' onClick={showModal}>Create Brand</button> */}
      <Modal destroyOnClose title="New Brand" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        <form onSubmit={submitHandler} className="text-center create-posts">
          <div className="mt-4">
            <Input
              required
              type="text"
              className="form-control"
              placeholder="Enter Brand Title"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="mt-4 text-left">
            <DragUpload noMultiple={true} updateFiles={(val) => handleChange("picture", val[0])} />
          </div>
          <div style={{ marginTop: '15px' }}>
            <ButtonComp type='primary' htmlType="submit" loading={loading} disabled={loading} onClick={showModal} text="Submit" />          </div>
        </form>
      </Modal>
    </>
  );
};