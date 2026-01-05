import { useState, useRef } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Input, List, Button } from 'antd';
import Link from 'next/link';
import styles from './SearchContainer.module.css';
import axios from 'axios';
import { ErrorAlert } from '../Messages/Messages';
import { useRouter } from 'next/router';

const SearchContainer = ({ show, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const debounceTimeout = useRef(null);

    const router = useRouter();
    
    const searchRelevantProducts = async (searchTerm) => {
        setLoading(true);
        try {
            console.log("Line 36: ", searchTerm);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search`,
                { q: searchTerm, perPage: 100 }
            );
            setLoading(false);
            if (res.status === 200) {
                console.log("Line 43: ", res.data.results);
                setResults(res.data.results);
                setTotalCount(res.data.results.length);
            } else {
                ErrorAlert(res.data.errorMessage);
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
            if (value.trim()) {
                console.log("Line 78: ", value);
                searchRelevantProducts(value);
            } else {
                setResults([]);
                setTotalCount(0);
            }
        }, 500); // 500ms debounce
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
            <Button
                className="text-white"
                color='white'
                onClick={() => {
                    onClose();
                    setSearchTerm("");
                    setResults([]);
                    // Collect IDs from results
                    const ids = results.map(item => item.id);
                    // Pass IDs as a query param (if not too many) or use state management
                    router.push({
                        pathname: '/shop',
                        query: { ids: ids.join(',') }
                    });
                }}
                >
                View All
            </Button>
            {results?.length > 0 && (
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
            )}
        </div>
    );
};

export default SearchContainer;
