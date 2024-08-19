import { useState, useRef } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Input, List, Button } from 'antd';
import Link from 'next/link';
import styles from './SearchContainer.module.css';
import axios from 'axios';
import { ErrorAlert } from '../Messages/Messages';

const SearchContainer = ({ show, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const debounceTimeout = useRef(null);

    const getAllData = async (searchTerm) => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get`, { pageSize: "100", title: searchTerm });
            setLoading(false);
            if (res.status === 200) {
                setResults(res.data?.products);
                setTotalCount(res.data.products?.length);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            getAllData(value);
        }, 1000);
    };

    const handleLinkClick = () => {
        onClose();
        setSearchTerm("");
        setResults([]);
    }

    return (
        <div className={`${styles.searchOverlay} ${show ? styles.show : ''}`}>
            <Button className={styles.closeBtn} icon={<CloseOutlined />} onClick={onClose} />
            <Input
                placeholder="Type here to search..."
                id="searchbox"
                type="search"
                className={styles.searchbox}
                value={searchTerm}
                onChange={handleSearch}
            />
            {results?.length > 0 && (
                <List
                    className={styles.resultsList}
                    itemLayout="horizontal"
                    dataSource={results}
                    loading={loading}
                    renderItem={item => (
                        <List.Item>
                            <Link onClick={handleLinkClick} href={`/product/${item._id}`}>{item.Title}</Link>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default SearchContainer;
