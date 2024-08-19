import { logout } from '@/components/Commons/Auth/Auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './AccountSidebar..module.css'


export const AccoutSidebar = () => {
    const router = useRouter();

    return (
        <div className={styles.AccoutSidebar} style={{ paddingRight: '23px' }}>
            <div>
                <div className={`${styles.item} ${router?.pathname === "/user/profile" ? styles.active : ""}`}>
                    <div className={styles.circle}></div>
                    <div>
                        <Link href='/user/profile'>Profile</Link>
                    </div>
                </div>
                <div className={`${styles.item} ${router?.pathname === "/user/change-password" ? styles.active : ""}`}>
                    <div className={styles.circle}></div>
                    <div>
                        <Link href='/user/change-password'>Change Password</Link>
                    </div>
                </div>
                <div className={`${styles.item} ${router?.pathname === "/user/orders" ? styles.active : ""}`}>
                    <div className={styles.circle}></div>
                    <div>
                        <Link href='/user/orders'>Orders</Link>
                    </div>
                </div>
                <div className={`${styles.item} ${router?.pathname === "/user/logout" ? styles.active : ""}`}>
                    <div className={styles.circle}></div>
                    <div>
                        <a href='/login' onClick={() => { logout(() => { }) }}>Logout</a>
                    </div>
                </div>
            </div>
        </div >
    )
}
