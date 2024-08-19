import React, { useEffect, useState } from 'react';
import { Select, Space } from 'antd';
import styles from "./SearchBar.module.css";
import { ButtonComp } from '../ButtonComp/ButtonComp';
import axios from 'axios';
import { useRouter } from 'next/router';

const SearchBar = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [makesArray, setMakesArray] = useState([]);
    const [modelsArray, setModelsArray] = useState([]);
    const [partsArray, setPartsArray] = useState([]);
    const [partAccessoriesArray, setPartAccessoriesArray] = useState([]);

    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedAccessory, setSelectedAccessory] = useState(null);

    const getAllMakes = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/makes`).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setMakesArray(res.data?.map(f => ({ value: f?.make, label: f?.make })));
            }
            else {
                console.error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }

    const getAllModelsByMake = async (Make) => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/models/make`, { Make }).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setModelsArray(res.data?.map(f => ({ value: f, label: f })));
                setSelectedModel("");
                setSelectedPart("");
                setSelectedAccessory("");
            }
            else {
                console.error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }

    const getAllPartByModel = async (Model) => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/parts/model`, { Model }).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setPartsArray(res.data?.map(f => ({ value: f, label: f })));
                setSelectedPart("");
                setSelectedAccessory("");
            }
            else {
                console.error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }

    const getAllPartAccessoriesByPart = async (Part) => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/partaccessories/part`, { Part }).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setPartAccessoriesArray(res.data?.map(f => ({ value: f, label: f })));
            }
            else {
                console.error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }

    useEffect(() => {
        getAllMakes();
    }, []);

    const handleSearch = () => {
        if (selectedMake) {
            const query = new URLSearchParams();

            if (selectedMake) query.append('Make', selectedMake);
            if (selectedModel) query.append('Model', selectedModel);
            if (selectedPart) query.append('Part', selectedPart);
            if (selectedAccessory) query.append('PartAccessory', selectedAccessory);

            router.push(`/shop?${query.toString()}`);
        }
    };

    return (
        <div className={styles.SearchBar}>
            <div className='flex gap-6 flex-wrap'>
                <Space wrap>
                    <label>Make</label>
                    <Select
                        allowClear
                        showSearch
                        className={styles.select}
                        placeholder="Make"
                        style={{ minWidth: 120 }}
                        onChange={(val) => {
                            setSelectedMake(val);
                            getAllModelsByMake(val);
                        }}
                        options={makesArray}
                    />
                </Space>
                <Space wrap>
                    <label>Model</label>
                    <Select
                        allowClear
                        showSearch
                        className={styles.select}
                        value={selectedModel}
                        placeholder="Model"
                        style={{ minWidth: 120 }}
                        onChange={(val) => {
                            setSelectedModel(val);
                            getAllPartByModel(val);
                        }}
                        options={modelsArray}
                    />
                </Space>
                <Space wrap>
                    <label>Part</label>
                    <Select
                        allowClear
                        showSearch
                        className={styles.select}
                        placeholder="Part"
                        value={selectedPart}
                        style={{ minWidth: 120 }}
                        onChange={(val) => {
                            setSelectedPart(val);
                            getAllPartAccessoriesByPart(val);
                        }}
                        options={partsArray}
                    />
                </Space>
                <Space wrap>
                    <label>Accessories</label>
                    <Select
                        allowClear
                        showSearch
                        className={styles.select}
                        value={selectedAccessory}
                        placeholder="Accessories"
                        style={{ minWidth: 120 }}
                        onChange={(val) => setSelectedAccessory(val)}
                        options={partAccessoriesArray}
                    />
                </Space>
                <Space className={styles.button}>
                    <ButtonComp text="Search" onClick={handleSearch} />
                </Space>
            </div>
        </div>
    );
};

export default SearchBar;



// import { DownOutlined } from '@ant-design/icons';
// import { Dropdown, Menu, Space } from 'antd';
// import axios from 'axios';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { ErrorAlert } from '../Messages/Messages';
// import styles from "./CategoriesBar.module.css";

// const CategoriesBar = () => {
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const getAllCategories = async () => {
//         setLoading(true);
//         await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/get`).then(res => {
//             setLoading(false);
//             if (res.statusText === "OK") {
//                 setCategories(res.data);
//             } else {
//                 ErrorAlert(res.data.errorMessage);
//             }
//         }).catch(err => {
//             setLoading(false);
//             console.log(err);
//             ErrorAlert(err?.message);
//         })
//     }

//     useEffect(() => {
//         getAllCategories();

//         return () => {
//         }
//     }, []);

//     const generateMenuItems = (children) => {
//         return (
//             <Menu className={styles.menu}>
//                 {children.map((child, index) => (
//                     <Menu.Item key={index + 1}>
//                         <Link href={`/products?category=${child?._id}`}>
//                             {child.title}
//                         </Link>
//                     </Menu.Item>
//                 ))}
//             </Menu>
//         );
//     };

//     return (
//         <div className={styles.CategoriesBar}>
//             {categories?.map(category => (
//                 <Dropdown
//                     key={category?._id}
//                     overlay={generateMenuItems(category?.children)}
//                 >
//                     <Link href="/" className={styles.title} onClick={(e) => e.preventDefault()}>
//                         {category?.title}
//                         <DownOutlined className={styles.icon} />
//                     </Link>
//                 </Dropdown>
//             ))}
//         </div>
//     )
// }

// export default CategoriesBar;