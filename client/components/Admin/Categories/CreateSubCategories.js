import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import { Input, Select } from "antd";
import { ErrorAlert, SuccessAlert } from "@/components/Commons/Messages/Messages";
import DragUpload from "@/components/Commons/DragUpload/DragUpload";
import { ButtonComp } from "@/components/Commons/ButtonComp/ButtonComp";

export const CreateSubCategories = ({ updateFunction, categories }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
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
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/sub/create`, formData, {
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
    <div>
      <ButtonComp onClick={showModal} text="Create Sub Category" />
      <Modal destroyOnClose title="New Sub Category" footer={false} open={isModalVisible} onCancel={handleCancel}>
        <form onSubmit={submitHandler} className="create-categories">
          <div className="mt-4">
            <Select className="w-full" placeholder="Choose parent category" onChange={(val) => handleChange("parentId", val)} options={categories} />
          </div>
          <div className="mt-4">
            <Input
              required
              type="text"
              className="form-control"
              placeholder="Enter Category Title"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="mt-4 text-left">
            <DragUpload noMultiple={true} updateFiles={(val) => handleChange("picture", val[0])} />
          </div>
          <div style={{ marginTop: '15px' }}>
            <ButtonComp type='primary' htmlType="submit" loading={loading} disabled={loading} onClick={showModal} text="Submit" />
          </div>
        </form>
      </Modal>
    </div>
  );
};