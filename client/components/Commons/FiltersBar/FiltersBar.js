import React, { useEffect, useState, useRef } from 'react';
import { Select, Space } from 'antd';
import styles from "./FiltersBar.module.css";
import { ButtonComp } from '../ButtonComp/ButtonComp';
import axios from 'axios';

const FiltersBar = ({ initialMake, initialModel, initialPart, initialAccessory, onSearch }) => {
    const [loading, setLoading] = useState(false);
    const [makesArray, setMakesArray] = useState([]);
    const [modelsArray, setModelsArray] = useState([]);
    const [partsArray, setPartsArray] = useState([]);
    const [partAccessoriesArray, setPartAccessoriesArray] = useState([]);

    const [selectedMake, setSelectedMake] = useState(initialMake || null);
    const [selectedModel, setSelectedModel] = useState(initialModel || null);
    const [selectedPart, setSelectedPart] = useState(initialPart || null);
    const [selectedAccessory, setSelectedAccessory] = useState(initialAccessory || null);

    // Ref to track if initial load is complete
    const isInitialLoad = useRef(true);

    const getAllMakes = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/makes`);
            setLoading(false);
            if (res.status === 200) {
                setMakesArray(res.data?.map(f => ({ value: f?.make, label: f?.make })));
            } else {
                console.error(res.data.errorMessage);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const getAllModelsByMake = async (Make) => {
        if (!Make) {
            setModelsArray([]);
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/models/make`, { Make });
            setLoading(false);
            if (res.status === 200) {
                setModelsArray(res.data?.map(f => ({ value: f, label: f })));
            } else {
                console.error(res.data.errorMessage);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const getAllPartByModel = async (Model) => {
        if (!Model) {
            setPartsArray([]);
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/parts/model`, { Model });
            setLoading(false);
            if (res.status === 200) {
                setPartsArray(res.data?.map(f => ({ value: f, label: f })));
            } else {
                console.error(res.data.errorMessage);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const getAllPartAccessoriesByPart = async (Part) => {
        if (!Part) {
            setPartAccessoriesArray([]);
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/partaccessories/part`, { Part });
            setLoading(false);
            if (res.status === 200) {
                setPartAccessoriesArray(res.data?.map(f => ({ value: f, label: f })));
            } else {
                console.error(res.data.errorMessage);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    // Initial load: populate everything based on initial props
    useEffect(() => {
        const initializeFilters = async () => {
            // Always get makes first
            await getAllMakes();

            // Fetch models if initialMake exists
            if (initialMake) {
                await getAllModelsByMake(initialMake);
            }

            // Fetch parts if initialModel exists
            if (initialModel) {
                await getAllPartByModel(initialModel);
            }

            // Fetch accessories if initialPart exists
            if (initialPart) {
                await getAllPartAccessoriesByPart(initialPart);
            }

            isInitialLoad.current = false;
        };

        if (isInitialLoad.current) {
            initializeFilters();
        }
    }, []);

    // Update local state when initial props change (for external updates)
    useEffect(() => {
        if (!isInitialLoad.current) {
            setSelectedMake(initialMake || null);
            setSelectedModel(initialModel || null);
            setSelectedPart(initialPart || null);
            setSelectedAccessory(initialAccessory || null);
        }
    }, [initialMake, initialModel, initialPart, initialAccessory]);

    // Handle user interactions
    const handleMakeChange = (val) => {
        setSelectedMake(val);
        if (val) {
            getAllModelsByMake(val);
            // Clear dependent selections
            setSelectedModel(null);
            setSelectedPart(null);
            setSelectedAccessory(null);
            setPartsArray([]);
            setPartAccessoriesArray([]);
        } else {
            // Clear everything if make is cleared
            setSelectedModel(null);
            setSelectedPart(null);
            setSelectedAccessory(null);
            setModelsArray([]);
            setPartsArray([]);
            setPartAccessoriesArray([]);
        }
    };

    const handleModelChange = (val) => {
        setSelectedModel(val);
        if (val) {
            getAllPartByModel(val);
            // Clear dependent selections
            setSelectedPart(null);
            setSelectedAccessory(null);
            setPartAccessoriesArray([]);
        } else {
            // Clear parts and accessories if model is cleared
            setSelectedPart(null);
            setSelectedAccessory(null);
            setPartsArray([]);
            setPartAccessoriesArray([]);
        }
    };

    const handlePartChange = (val) => {
        setSelectedPart(val);
        if (val) {
            getAllPartAccessoriesByPart(val);
            // Clear dependent selections
            setSelectedAccessory(null);
        } else {
            // Clear accessories if part is cleared
            setSelectedAccessory(null);
            setPartAccessoriesArray([]);
        }
    };

    const handleAccessoryChange = (val) => {
        setSelectedAccessory(val);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch({
                make: selectedMake || '',
                model: selectedModel || '',
                part: selectedPart || '',
                partAccessory: selectedAccessory || ''
            });
        }
    };

    return (
        <div className={styles.FiltersBar}>
            <div className='flex gap-6 flex-col w-full flex-wrap'>
                <Space direction="vertical">
                    <label>Make</label>
                    <Select
                        allowClear
                        showSearch
                        className={styles.select}
                        value={selectedMake}
                        placeholder="Make"
                        loading={loading}
                        style={{ minWidth: 120, width: "100%" }}
                        onChange={handleMakeChange}
                        options={makesArray}
                    />
                </Space>
                <Space direction="vertical">
                    <label>Model</label>
                    <Select
                        allowClear
                        showSearch
                        className={styles.select}
                        value={selectedModel}
                        placeholder="Model"
                        loading={loading}
                        disabled={!selectedMake || modelsArray.length === 0}
                        style={{ minWidth: 120, width: "100%" }}
                        onChange={handleModelChange}
                        options={modelsArray}
                    />
                </Space>
                <Space direction="vertical">
                    <label>Part</label>
                    <Select
                        allowClear
                        showSearch
                        className={styles.select}
                        placeholder="Part"
                        value={selectedPart}
                        loading={loading}
                        disabled={!selectedModel || partsArray.length === 0}
                        style={{ minWidth: 120, width: "100%" }}
                        onChange={handlePartChange}
                        options={partsArray}
                    />
                </Space>
                <Space direction="vertical">
                    <label>Accessories</label>
                    <Select
                        allowClear
                        showSearch
                        className={styles.select}
                        value={selectedAccessory}
                        placeholder="Accessories"
                        loading={loading}
                        disabled={!selectedPart || partAccessoriesArray.length === 0}
                        style={{ minWidth: 120, width: "100%" }}
                        onChange={handleAccessoryChange}
                        options={partAccessoriesArray}
                    />
                </Space>
                <div className={styles.button} style={{ width: "100%" }}>
                    <ButtonComp text="Search" onClick={handleSearch} />
                </div>
            </div>
        </div>
    );
};

export default FiltersBar;