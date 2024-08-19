import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './RelatedProductCard.module.css'

export const RelatedProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <div className={styles.RelatedProductCard} onClick={() => router.push(`/product/${product?._id}`)}>
      <Image width={100} height={100} quality={100} src={product?.Pictures[0]} alt={product?.Title} />
      <div className={styles.rightPart}>
        <h2>{product?.Title}</h2>
        <p>${product?.Price}</p>
      </div>
    </div>
  )
}
