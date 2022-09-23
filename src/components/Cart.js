import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_51KyamFSJoO4qY0eGayKcCpy64EYF5FI5ixCiYAcLtGW4vNppt1NmsKHxwA1zp5HPNowORJqlxAEVVPD2Iys3Dj3V0029WvHFlE')

const successMessage = () => {
    return (
        <div className="success-msg">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
            <div className="title">Payment Successful</div>
        </div>
    )
}

const Cart = (props) => {
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    let description = (Math.random() + 2).toString(36).substring(7);
    return (

        <Row className="s-box mt-5">
            {paymentCompleted ? (
                successMessage()
            ) : (
                <>
                    <Col md={5} className="mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            {/* <span className="badge bg-secondary badge-pill">3</span> */}
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{props.productInfo.cc_productName}</h6>
                                    <small className="text-muted">{description}</small>
                                </div>
                                <span className="text-muted">₹{props.productInfo.cc_productPrice}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (INR)</span>
                                <strong>₹{props.productInfo.cc_productPrice}</strong>
                            </li>
                        </ul>
                    </Col>
                    <Col md={7}>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm amount={props.productInfo.cc_productPrice} setPaymentCompleted={setPaymentCompleted} />
                        </Elements>
                    </Col>
                </>
            )}
        </Row>
    )
}

export default Cart