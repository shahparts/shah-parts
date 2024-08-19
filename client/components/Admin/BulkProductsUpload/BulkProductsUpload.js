import { useState } from 'react';
import axios from 'axios';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import styles from './BulkProductsUpload.module.css';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';

export const BulkProductsUpload = ({ updateParentData }) => {
    const [file, setFile] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const transformImages = (product) => {
        const imageKeys = Object.keys(product).filter(key => key.startsWith('Image'));
        const Pictures = imageKeys.map(key => product[key]).filter(link => link);

        return { Pictures };
    };

    // const transformKeysToLowerCase = (obj) => {
    //     if (!obj) return {};
    //     return Object.keys(obj).reduce((acc, key) => {
    //         acc[key.toLowerCase()] = obj[key];
    //         return acc;
    //     }, {});
    // };

    // let numberInLastTwoCat = data?.filter(product => {
    //     // Split the categories string into an array
    //     let categories = product?.Categories?.split(' > ');

    //     // Check if categories exist and there are at least two of them
    //     if (categories && categories.length >= 2) {
    //         // Get the last two categories
    //         let lastTwoCategories = categories.slice(-2);

    //         // Check if any of the last two categories is a number
    //         return lastTwoCategories.some(cat => !isNaN(cat) && !isNaN(parseFloat(cat)));
    //     }

    //     // If there are not enough categories or categories is undefined, return false
    //     return false;
    // });

    // console.log(JSON.stringify(numberInLastTwoCat));

    const handleUpload = async () => {
        if (!file) return;

        setFileLoading(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            setFileLoading(false);
            let data;
            try {
                data = JSON.parse(e.target.result);
            } catch (error) {
                ErrorAlert('Invalid JSON file');
                return;
            }

            const products = data.map(product => {
                let categories = product?.Categories?.split(' > ');
                let lastTwoCategories = categories?.slice(-2);
                let transformedLastTwo = lastTwoCategories.map(cat => {
                    return (!isNaN(cat) && !isNaN(parseFloat(cat))) ? "All Other Parts" : cat;
                });
                if (categories && categories.length > 0) {
                    return {
                        ...product,
                        Part: transformedLastTwo[0],
                        PartAccessorries: transformedLastTwo[1],
                        ...transformImages(product)
                    };
                }
                return product;
            });

            setLoading(true);
            if (!products?.includes(null)) {
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/bulk-upload`, { products }, {
                        headers: {
                            authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    });

                    setLoading(false);
                    if (res.statusText === 'OK') {
                        SuccessAlert(res.data.successMessage);
                        updateParentData();
                    } else {
                        ErrorAlert(res.data.errorMessage);
                    }
                } catch (err) {
                    setLoading(false);
                    console.log(err);
                    ErrorAlert(err?.message);
                }
            }
        };

        reader.readAsText(file);
    };

    return (
        <div className={styles.BulkProductsUpload}>
            <div>
                <h1>Bulk Upload JSON File</h1>
            </div>
            <div>
                <input type="file" accept=".json" onChange={handleFileChange} />
            </div>
            <div>
                <ButtonComp text="Upload" loading={loading || fileLoading} disabled={loading || fileLoading} onClick={handleUpload} />
            </div>
        </div>
    );
};
