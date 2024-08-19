import { Button } from 'antd'
import styles from './ButtonWithHoverComp.module.css'

export const ButtonWithHoverComp = ({ text, type, onClick, disabled, loading }) => {
  return (
    <Button
      className={styles.ButtonWithHoverComp}
      htmlType={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {text}
    </Button>
  )
}
