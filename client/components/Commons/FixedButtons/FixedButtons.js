import React from 'react'
import styles from "./FixedButtons.module.css"
import Link from 'next/link';
import Image from 'next/image';

const FixedButtons = () => {
    return (
        <div className={styles.FixedButtons}>
            <Link className={styles.whatsappBanner} target="_blank" href="https://wa.me/818050821650">
                <Image className='h-[110px] object-contain' src="/assets/whatsapp-banner.jpg" alt="WhatsApp Banner" width={64} height={64} />
            </Link>
            <Link className="whatsapp" target="_blank" href="https://wa.me/818050821650">
                <Image className='h-[110px] object-contain' src="/assets/whatsapp.jpg" alt="WhatsApp Banner" width={64} height={64} />
            </Link>
            <Link className="facebook" target="_blank" href="https://www.facebook.com/shahpart">
                <Image className='h-[110px] object-contain' src="/assets/facebook.png" alt="Facebook Banner" width={64} height={64} />
            </Link>
            <Link className="" target="_blank" href="https://x.com/ShahPartsdotcom">
                <Image className='h-[110px] object-contain' src="/assets/twitter.webp" alt="Facebook Banner" width={64} height={64} />
            </Link>
        </div>
    )
}

export default FixedButtons
