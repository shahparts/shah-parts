import React, { useEffect, useState } from 'react';
import styles from "./Dragger.module.css";
import { message, Upload } from 'antd';
import { DeleteFilled, UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Loading from '../Loading/Loading';
const { Dragger } = Upload;

const DragUpload = ({ updateFiles, value, noMultiple }) => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const props = {
        name: 'file',
        multiple: true,
        action: `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload`,
        onChange: async (info) => {
            setUploading(true);
            const { status } = info.file;
            await info.fileList?.map(f => f?.response?.url);
            let trimmedFilesArray = info.fileList?.map(f => f?.response?.url);
            if (status !== 'uploading') {
                setUploading(false)
            }
            if (status === 'done') {
                if (noMultiple) {
                    updateFiles([trimmedFilesArray[0]])
                    setFileList([trimmedFilesArray[0]])
                } else {
                    if (fileList?.length > 0) {
                        // updateFiles(info.fileList?.map(f => f?.response));
                        // setFileList(info.fileList?.map(f => f?.response))
                        updateFiles([...fileList, trimmedFilesArray[trimmedFilesArray?.length - 1]]);
                        setFileList([...fileList, trimmedFilesArray[trimmedFilesArray?.length - 1]])
                    } else {
                        updateFiles([trimmedFilesArray[0]])
                        setFileList([trimmedFilesArray[0]])
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    useEffect(() => {
        if (value?.length > 0) {
            setFileList(value)
        }
    }, [value]);

    const handleDelete = (index) => {
        const updatedFiles = fileList.filter((file, i) => i !== index);
        setFileList(updatedFiles);
        updateFiles(updatedFiles);
    };

    return (
        <div>
            <Dragger maxCount={noMultiple ? 1 : 10} {...props} className={styles.dragger} showUploadList={false} previewFile={false}>
                <div className='flex justify-center gap-3'>
                    <UploadOutlined />
                    <div className="text-[14px] font-[600] flex items-center justify-center w-auto gap-1">
                        <div className='text-[#1796E3]'>Click to upload pictures</div>
                        <div>or drag and drop</div>
                    </div>
                </div>
            </Dragger>
            <div className="flex gap-4 flex-wrap items-center mt-4">
                {fileList?.length > 0 && fileList?.map((file, index) => (
                    <div key={index}>
                        <div className='text-end' >
                            <DeleteFilled onClick={() => handleDelete(index)} />
                        </div>
                        <Image src={file} alt="File" className={styles.image} width={64} height={64} />
                    </div>
                ))}
                {uploading &&
                    <div className='flex justify-center items-center h-[64px] w-[64px] border'>
                        <Loading />
                    </div>
                }
            </div>
        </div >
    );
}
export default DragUpload;
