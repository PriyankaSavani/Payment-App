import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            // lineHeight: "27px",
            // fontSize: "1.1rem",
            color: "#212529",
            fontSize: "17.6px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

const CheckoutForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true)
        setErrorMsg('')

        const paymentMethodObj = {
            type: 'card',
            card: elements.getElement(CardNumberElement),
            billing_details: {
                name,
                email
            },
        };
        const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);
        console.log("paymentMethodResult", paymentMethodResult);

        // sk_test_51KyamFSJoO4qY0eGCyCIj4JAjwLV8NZKfLPY7lspgW08ksL8VzL3JKR3sMvJ1IMmF0YLa2ioa22ncaNqmw701EuA00ZoQMdxkS
        // get payment info
        axios.get('https://api.stripe.com/v1/issuing/transactions', { headers: { 'Authorization': 'Bearer sk_test_51KyamFSJoO4qY0eGCyCIj4JAjwLV8NZKfLPY7lspgW08ksL8VzL3JKR3sMvJ1IMmF0YLa2ioa22ncaNqmw701EuA00ZoQMdxkS' } })
            .then(res => {
                const persons = res.data;
                console.log(persons);;
            })
    };

    return (
        <>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Pay with card</span>
            </h4>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6} className="mb-3">
                        <label htmlFor="cc-name">Name on card</label>
                        <input
                            id="cc-name"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Col>
                    <Col md={6} className="mb-3">
                        <label htmlFor="cc-email">Email</label>
                        <input
                            id="cc-email"
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mb-3">
                        <label htmlFor="cc-number">Card Number</label>
                        <CardNumberElement
                            id="cc-number"
                            className="form-control"
                            options={CARD_ELEMENT_OPTIONS}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="mb-3">
                        <label htmlFor="expiry">Expiration Date</label>
                        <CardExpiryElement
                            id="expiry"
                            className="form-control"
                            options={CARD_ELEMENT_OPTIONS}
                        />
                    </Col>
                    <Col md={6} className="mb-3">
                        <label htmlFor="cvc">CVC</label>
                        <CardCvcElement
                            id="cvc"
                            className="form-control"
                            options={CARD_ELEMENT_OPTIONS}
                        />
                    </Col>
                </Row>
                <hr className="mb-4" />
                <Button className="btn-dark w-100" type="submit" disabled={loading}>
                    PAY ₹{props.amount}
                </Button>
                {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
            </Form>
        </>
    )
}

export default CheckoutForm