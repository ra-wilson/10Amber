import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
export default function Dashboard() {
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const { logout } = useAuth()

  async function handleLogout() {
      setError('')

      try {
        await logout()
        navigate("./login")
      }
      catch{
          setError('Failed to log out')
      }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
