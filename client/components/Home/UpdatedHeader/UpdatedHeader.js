import { logout } from '@/components/Commons/Auth/Auth';
import Logo from '@/components/Commons/Logo/Logo';
import SearchContainer from '@/components/Commons/SearchContainer/SearchContainer';
import { useCartContext } from '@/context/CartContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { LogoutOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Divider, Select } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from "./UpdatedHeader.module.css"

const sharedClasses = {
    flex: 'flex',
    itemsCenter: 'items-center',
    justifyBetween: 'justify-between',
    spaceX4: 'space-x-4',
    textZinc700: 'text-zinc-700',
    hoverTextBlack: 'hover:text-black',
    p2: 'p-2',
    roundedFull: 'rounded-full',
    border: 'border',
    borderZinc300: 'border-zinc-300',
    bgRed500: 'bg-red-500',
    textWhite: 'text-white',
    flexCol: 'flex flex-col',
    textLg: 'text-lg',
    fontSemibold: 'font-semibold',
    textZinc600: 'text-zinc-600',
    grid: 'grid',
    gridCols1: 'grid-cols-1',
    mdGridCols2: 'md:grid-cols-2',
    lgGridCols3: 'lg:grid-cols-3',
    gap4: 'gap-4',
    relative: 'relative',
    wFull: 'w-full',
    h48: 'h-48',
    objectCover: 'object-cover',
    roundedLg: 'rounded-lg',
    absolute: 'absolute',
    top2: 'top-2',
};

const UpdatedHeader = () => {
    const { cart } = useCartContext();
    const {
        userAuth,
        make,
        model,
        part,
        partAccessorries
    } = useGlobalContext();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [makesArray, setMakesArray] = useState([]);
    const [modelsArray, setModelsArray] = useState([]);
    const [partsArray, setPartsArray] = useState([]);
    const [partAccessoriesArray, setPartAccessoriesArray] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedPart, setSelectedPart] = useState("");
    const [selectedAccessory, setSelectedAccessory] = useState("");
    const [isSticky, setIsSticky] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const openSearch = (e) => {
        // e.preventDefault();
        setShowSearch(true);
    };

    const closeSearch = (e) => {
        // e.preventDefault();
        setShowSearch(false);
    };

    const handleScroll = () => {
        if (window.innerWidth > 800 && window.scrollY > 20) { // Adjust the scrollY value as needed
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getAllMakes = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/makes`).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                const sortedMakes = res.data?.sort((a, b) => a?.make?.localeCompare(b?.make));
                setMakesArray(sortedMakes?.map(f => ({ value: f?.make, label: f?.make })));
            }
            else {
                console.error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    };

    const getAllModelsByMake = async (Make) => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/models/make`, { Make }).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                const sortedModels = res.data?.sort((a, b) => a.localeCompare(b));
                setModelsArray(sortedModels.map(f => ({ value: f, label: f })));
            }
            else {
                console.error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    };

    const getAllPartByModel = async (Model) => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/parts/model`, { Model }).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                const sortedParts = res.data?.sort((a, b) => a.localeCompare(b));
                setPartsArray(sortedParts?.map(f => ({ value: f, label: f })));
            }
            else {
                console.error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    };

    const getAllPartAccessoriesByPart = async (Part) => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/partaccessories/part`, { Part }).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                const sortedAccessories = res.data?.sort((a, b) => a.localeCompare(b));
                setPartAccessoriesArray(sortedAccessories?.map(f => ({ value: f, label: f })));
            }
            else {
                console.error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    };

    useEffect(() => {
        setSelectedMake(make);
        setSelectedModel(model);
        setSelectedPart(part);
        setSelectedAccessory(partAccessorries);
        getAllMakes();
        if (make) {
            getAllModelsByMake(make);
        }
        if (model) {
            getAllPartByModel(model);
        }
        if (part) {
            getAllPartAccessoriesByPart(part);
        }
    }, [make, model, part, partAccessorries]);

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
        <div className={`bg-white mainNavHeader text-black w-full ${styles.UpdatedHeader}`}>
            <div className={`w-full ${isSticky ? styles.sticky : ''} ${styles.headerContainer}`}>
                {/* Header */}
                <header className={`w-full ${sharedClasses.flex} ${sharedClasses.justifyBetween} ${sharedClasses.itemsCenter} p-4 border-zinc-200`}>
                    <div className={`${styles.logo} ${sharedClasses.flex} ${sharedClasses.itemsCenter}`}>
                        <Logo />
                    </div>
                    <nav className="hidden md:block ml-8 space-x-4">
                        <div className="flex items-center gap-10">
                            <Link href="/about-us">
                                About
                            </Link>
                            <Link href="/contact-us">
                                Contact
                            </Link>
                        </div>
                    </nav>
                    <div className={`${styles.right}`}>
                        <Link href="#" onClick={openSearch}>
                            <SearchOutlined className='text-[23px]' />
                        </Link>
                        <SearchContainer show={showSearch} onClose={closeSearch} />
                        {
                            userAuth?.role === 1 &&
                            <Link href="/admin/products">
                                Dashboard
                            </Link>
                        }
                        <Link href="/cart" className="flex gap-2 items-center">
                            <Badge count={cart?.length}>
                                <ShoppingCartOutlined className='text-[23px]' />
                            </Badge>
                        </Link>
                        <Link href={userAuth ? "/user/profile" : "/login"} className={styles.accountBtn}>
                            <UserOutlined className='text-[23px]' />
                        </Link>
                        {
                            userAuth &&
                            <a href="/" onClick={logout}>
                                <LogoutOutlined className='text-[23px]' />
                            </a>
                        }
                    </div>
                </header>

                {/* Search Bar */}
                <div className={`flex pb-[30px] justify-center p-4 border-b border-zinc-200 ${styles.searchBar}`}>
                    <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.spaceX4} flex-col md:flex-row bg-white p-2 rounded-full shadow-md`}>
                        <div>
                            <label>Make</label>
                            <Select
                                allowClear
                                showSearch
                                className={styles.select}
                                placeholder="Make"
                                value={selectedMake || null}
                                onChange={(val) => {
                                    setSelectedMake(val);
                                    getAllModelsByMake(val);
                                    setSelectedModel("");
                                    setSelectedPart("");
                                    setSelectedAccessory("");
                                }}
                                options={makesArray}
                            />
                        </div>
                        <Divider className={styles.Divider} type='vertical' />
                        <div>
                            <label>Model</label>
                            <Select
                                allowClear
                                showSearch
                                className={styles.select}
                                placeholder="Model"
                                value={selectedModel || null}
                                onChange={(val) => {
                                    setSelectedModel(val);
                                    getAllPartByModel(val);
                                    setSelectedPart("");
                                    setSelectedAccessory("");
                                }}
                                options={modelsArray}
                            />
                        </div>
                        <Divider className={styles.Divider} type='vertical' />
                        <div>
                            <label>Part</label>
                            <Select
                                allowClear
                                showSearch
                                className={styles.select}
                                value={selectedPart || null}
                                placeholder="Part"
                                onChange={(val) => {
                                    setSelectedPart(val);
                                    getAllPartAccessoriesByPart(val);
                                    setSelectedAccessory("");
                                }}
                                options={partsArray}
                            />
                        </div>
                        <Divider className={styles.Divider} type='vertical' />
                        <div>
                            <label>Accessories</label>
                            <Select
                                allowClear
                                showSearch
                                value={selectedAccessory || null}
                                className={styles.select}
                                placeholder="Accessories"
                                onChange={(val) => setSelectedAccessory(val)}
                                options={partAccessoriesArray}
                            />
                        </div>
                        <button onClick={handleSearch} className={`w-[43px] h-[43px] flex justify-center items-center ${sharedClasses.p2} ${sharedClasses.bgRed500} ${sharedClasses.textWhite} ${sharedClasses.roundedFull}`}>
                            <SearchOutlined className='text-[21px]' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatedHeader;
