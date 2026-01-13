import {useState, useEffect} from 'react'

import styles from './Message.module.css'


interface MessageProps {
  type: string;
  msg: string;
}

function Message({ type, msg }: MessageProps) {
    const[visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg) {
        setVisible(false)
        return    
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
        setVisible(false)
    },[msg])

    return (
        <>
            {visible &&(
                <div className={`${styles.message} ${styles[type ?? '']}`}>{msg}</div>
            )}
        </>
    )
}

export default Message