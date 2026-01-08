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
    const [searchTerm, setSearchTerm] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const debounceTimeout = useRef(null);

    const router = useRouter();
    const inputRef = useRef(null);


    console.log(router.pathname)

    useEffect(() => {

        searchTerm && router.pathname !== "/shop" && setSearchTerm("");
        return () => {

        }
    }, [router.pathname]);

    const handleSendClick = () => {
        router.push({
            pathname: '/shop',
            query: { searchQuery: searchTerm }
        });
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // If there is a search term, trigger same action as send
            if (searchTerm?.trim()) {
                handleSendClick();
                e.target.blur();
            }
        }
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                    />
                    
                </div>
                {searchTerm ?
                    <div>
                        <button onClick={handleSendClick} className={`w-[43px] h-[43px] flex justify-center items-center ${sharedClasses.p2} ${sharedClasses.bgRed500} ${sharedClasses.textWhite} ${sharedClasses.roundedFull}`}>
                            <SendOutlined className='text-[21px]' />
                        </button>
                    </div>
                    :
                    <div>
                        <button onClick={() => {
                            // If there's a query, act like send. Otherwise focus input.
                            if (searchTerm?.trim()) {
                                handleSendClick();
                            } else if (inputRef.current) {
                                inputRef.current.focus();
                            }
                        }} className={`w-[43px] h-[43px] flex justify-center items-center ${sharedClasses.p2} ${sharedClasses.bgRed500} ${sharedClasses.textWhite} ${sharedClasses.roundedFull}`}>
                            <SearchOutlined className='text-[21px]' />
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchBar;
