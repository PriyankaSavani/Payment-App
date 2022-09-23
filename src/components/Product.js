import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Cart from './Cart'
import Payment from './Payment'

const Product = () => {

    const [productInfo, setProductInfo] = useState({
        cc_productName: '',
        cc_productPrice: ''
    })

    const [isValid, setIsValid] = useState(false)

    // handle change
    const handleChange = (e) => {
        setProductInfo({ ...productInfo, [e.target.id]: e.target.value })
    }

    // handle payment detail
    const handlePaymentDetail = () => {
        let check = Object.keys(productInfo).every((e) => productInfo[e].trim() !== '')
        if (check) {
            if (productInfo.cc_productPrice > 0) {
                setIsValid(true)
            } else {
                console.log("Price must be more then 0");
            }
        } else {
            console.log("Please fill the detail");
        }
    }

    return (
        <>
            <Row className='s-box'>
                <Col md={12} className='mb-3'>
                    <label htmlFor="cc_productName">Product Name</label>
                    <input
                        id="cc_productName"
                        type="text"
                        className="form-control"
                        value={productInfo.cc_productName}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={12} className='mb-3'>
                    <label htmlFor="cc_productPrice">Product Price</label>
                    <input
                        id="cc_productPrice"
                        type="number"
                        className="form-control"
                        value={productInfo.cc_productPrice}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={12} className='mb-3'>
                    <hr className='mb-4' />
                    <Button className="btn-dark w-100" onClick={handlePaymentDetail}>Online Payment</Button>
                </Col>
            </Row>
            {isValid && <Cart productInfo={productInfo} />}
            <Payment />
        </>
    )
}

export default Product