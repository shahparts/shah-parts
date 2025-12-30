import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeOutlined, LogoutOutlined, OrderedListOutlined, ShopFilled } from '@ant-design/icons';
import { logout } from '@/components/Commons/Auth/Auth';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
    const router = useRouter();

    return (
        <div className={styles.AdminSidebar}>
            <div>
                <div className={styles.linkContainer}>
                    <div className={styles.linkWrapper}>
                        <Link to="/admin/dashboard">
                            <button className={`${router.pathname === "/admin/dashboard" ? styles.activeLink : styles.inactiveLink}`}>
                                <HomeOutlined />
                                <span>Dashboard</span>
                            </button>
                        </Link>
                    </div>
                    <div className={styles.linkWrapper}>
                        <Link to="/admin/products">
                            <button className={`${router.pathname === "/admin/products" ? styles.activeLink : styles.inactiveLink}`}>
                                <ShopFilled />
                                <span>Products</span>
                            </button>
                        </Link>
                    </div>
                    <div className={styles.linkWrapper}>
                        <Link to="/admin/orders">
                            <button className={`${router.pathname === "/admin/orders" ? styles.activeLink : styles.inactiveLink}`}>
                                <OrderedListOutlined />
                                <span>Orders</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={styles.logoutWrapper}>
                    <a to="/login" onClick={logout} className={styles.logoutButton}>
                        <span className={styles.logoutText}>Logout</span>
                        <LogoutOutlined />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar;
