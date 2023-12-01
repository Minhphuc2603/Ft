import React from 'react'
import Header from './Header'
import { useState } from 'react'
import Post from './Post'
import Cart from './Cart'
import Modal from './Modal'

const TiktokScandal = () => {
    const [isShow, setIsShow] = useState(false)
    const showModal = () => {
        setIsShow(true)
    }
    const hiddenModal = () => {
        setIsShow(false)
    }
    return (
        <div style={{ backgroundColor: '#F0F2F5' }} className='w-full'>
            <Header />
            <Post showModal={showModal}/>
            <Cart/>
            {isShow && <Modal hiddenModal={hiddenModal} />}
        </div>
    )
}

export default TiktokScandal