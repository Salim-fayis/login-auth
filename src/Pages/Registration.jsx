import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Registration() {

    const [formData, setFormData] = useState({
        fname: "",
        lname: '',
        email: '',
        password: '',
        cpassword: '',
    })

    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    let history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);

        let isvalid = true;

        let validationErrors = {}

        if (formData.fname === "" || formData.fname === null) {
            isvalid = false;
            validationErrors.fname = "First name required"
        }
        if (formData.lname === "" || formData.lname === null) {
            isvalid = false;
            validationErrors.lname = "Last name required"
        }
        if (formData.email === "" || formData.email === null) {
            isvalid = false;
            validationErrors.email = "Email required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false;
            validationErrors.email = 'Email is not valid'

        }

        if (formData.password === "" || formData.password === null) {
            isvalid = false;
            validationErrors.password = "Password required"
        }
        else if (formData.password.length < 6) {
            isvalid = false;
            validationErrors.password = 'password length atleast 6 char'

        }
        if (formData.cpassword !== formData.password) {
            isvalid = false;
            validationErrors.cpassword = " password do not match"
        }


        setErrors(validationErrors)
        setValid(isvalid)

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8000/users', formData)
                .then(result => {
                    alert("Registered Successfully");
                    history("/login");
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                        Registration
                                    </h2>
                                    <div className="mb-3">
                                        {
                                            valid ? <></> :
                                                <span className='text-danger'>
                                                    {errors.fname};  &nbsp;
                                                    {errors.lname}; &nbsp;
                                                    {errors.password};
                                                    {errors.cpassword}
                                                </span>
                                        }
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="Name">
                                                <Form.Label className="text-center">First Name</Form.Label>
                                                <Form.Control type="text" name='fname' placeholder="Enter First Name"

                                                    onChange={(e) => setFormData({ ...formData, fname: e.target.value })}

                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="Name">
                                                <Form.Label className="text-center">Last Name</Form.Label>
                                                <Form.Control type="text" name='lname' placeholder="Enter Last Name"
                                                    onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" name='email' placeholder="Enter email"
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" name='password' placeholder="Password"
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" name='cpassword' placeholder="Password"
                                                    onChange={(e) => setFormData({ ...formData, cpassword: e.target.value })}

                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Create Account
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account??{' '}
                                                <Link to='/login' className="text-primary fw-bold">
                                                    Sign In
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Registration