import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',

    })


    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    let history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);

        let isvalid = true;

        let validationErrors = {}

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


       


        setErrors(validationErrors)
        setValid(isvalid)

        axios.get('http://localhost:8000/users')
            .then(result => {
                result.data.map(user => {
                    if (user.email === formData.email) {
                        if (user.password === formData.password) {
                            alert("Login Successfully")
                            history('/')
                        } else {
                            isvalid = false
                            validationErrors.password = "Wrong Password"
                        }
                    } 
                })
            })
            .catch(err => console.log(err))

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
                                        Login
                                    </h2>
                                    <div className="mb-3">
                                        {
                                            valid ? <></> :
                                                <span className='text-danger'>
                                                    {errors.email};  &nbsp; 
                                                    {errors.password};
                                                   
                                                </span>
                                        }
                                        <Form onSubmit={handleSubmit}>
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
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Login Now
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                If you don't have an account??{' '}
                                                <Link to='/register' className="text-primary fw-bold">
                                                    Register
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

export default Login