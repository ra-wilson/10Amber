import React, { useRef, useState } from "react";
// import ReactDOM from "react-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap";


export default function Login() {

  // declaring reference variables and action states  

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  async function handleSubmit(e) {
    e.preventDefault();

    // password validation function  

    

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/")
    } catch (error) {
      
        console.log(error);
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  // display log in card and render alert if error is caught

  return (
    <>
       <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
                      
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
              <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      </div>
      </Container>
    </>
  );
}

