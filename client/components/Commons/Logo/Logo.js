import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../../public/assets/logo.png"

const Logo = () => {
    return (
        <div className='w-full'>
            <Link href="/">
                <Image src={logo} alt="Logo" />
            </Link>
        </div>
    )
}

export default Logo
