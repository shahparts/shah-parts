import React, { useState } from 'react'
import { Modal } from 'antd'
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ deleteBtn, deleteFun, id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className='p-0' onClick={showModal}>
                {deleteBtn}
            </button>
            <Modal centered title={false} footer={false} open={isModalOpen} onCancel={handleCancel}>
                <div className={styles.DeleteModal}>
                    <div className='text-center'>
                        <h2 className='mt-4 text-[19px]'>
                            Are you sure you want to delete?
                        </h2>
                        <div className={styles.buttons}>
                            <button onClick={handleCancel}>No</button>
                            <button onClick={() => { deleteFun(id); handleCancel() }}>Yes</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteModal
