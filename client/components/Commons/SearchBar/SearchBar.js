import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, List, Select, Space } from 'antd';
import styles from "./SearchBar.module.css";
import { ButtonComp } from '../ButtonComp/ButtonComp';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CloseOutlined, SearchOutlined, SendOutlined } from '@ant-design/icons';
import Link from 'next/link';

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

const SearchBar = () => {
    const [loading, setLoading] = useState(false);
    // const [showResults, setShowResults] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const debounceTimeout = useRef(null);

    const router = useRouter();

    const searchRelevantProducts = async (searchTerm) => {
        setLoading(true);
        try {
            if (searchTerm) {
                console.log("Line 36: ", searchTerm);
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search`,
                    { q: searchTerm, perPage: 200 }
                );
                setLoading(false);
                if (res.status === 200) {
                    console.log("Line 43: ", res.data.results);
                    setResults(res.data.results);
                    setTotalCount(res.data.results.length);
                } else {
                    ErrorAlert(res.data.errorMessage);
                }
            }
            else {
                setResults([]);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const handleSearch = (e) => {
        console.log("Line 68: ", e.target.value);
        const value = e.target.value;
        setSearchTerm(value);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            if (value?.trim()) {
                console.log("Line 78: ", value);
                searchRelevantProducts(value);
            } else {
                setResults([]);
                setTotalCount(0);
            }
        }, 500); // 500ms debounce
    };

    const handleLinkClick = () => {
        setSearchTerm("");
        setResults([]);
    }

    console.log(router.pathname)

    useEffect(() => {

        searchTerm && router.pathname !== "/shop" && setSearchTerm("");
        results?.length > 0 && setResults([]);

        return () => {

        }
    }, [router.pathname]);

    const handleSendClick = async () => {
        // setSearchTerm("");
        // Collect IDs from results
        const ids = await results.map(item => item.id);
        // Pass IDs as a query param (if not too many) or use state management
        router.push({
            pathname: '/shop',
            query: { searchQuery: searchTerm, ids: ids.join(',') }
        });
        ids?.length > 0 && setResults([]);
    }


    return (
        <div className={styles.SearchBar}>
            <div className='flex gap-4 flex-wrap items-center justify-between'>
                <div className='flex-1'>
                    <Input
                        placeholder="Type here to search..."
                        id="searchbox"
                        type="search"
                        className={styles.searchbox}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {results?.length > 0 && (
                        <div className={styles.resultsContainer}>
                            <List
                                className={styles.resultsList}
                                itemLayout="horizontal"
                                dataSource={results}
                                loading={loading}
                                renderItem={item => (
                                    <List.Item>
                                        <Link onClick={handleLinkClick} href={`/product/${item.id}`}>{item.source.Title}</Link>
                                    </List.Item>
                                )}
                            />
                        </div>
                    )}
                </div>
                {(results?.length > 0 || searchTerm) ?
                    <div>
                        <button onClick={handleSendClick} className={`w-[43px] h-[43px] flex justify-center items-center ${sharedClasses.p2} ${sharedClasses.bgRed500} ${sharedClasses.textWhite} ${sharedClasses.roundedFull}`}>
                            <SendOutlined className='text-[21px]' />
                        </button>
                    </div>
                    :
                    <div>
                        <button onClick={handleSearch} className={`w-[43px] h-[43px] flex justify-center items-center ${sharedClasses.p2} ${sharedClasses.bgRed500} ${sharedClasses.textWhite} ${sharedClasses.roundedFull}`}>
                            <SearchOutlined className='text-[21px]' />
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchBar;
