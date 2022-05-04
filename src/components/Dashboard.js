import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import { getDrinksData } from "../firebase";
import "../stylesheets/style.css"

export default function Dashboard() {
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [drinksData, setDrinksData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [cart, setCart] = useState([]);
  // const addToCart = () => setCart((currentCart) => [...currentCart]);
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

  useEffect(() => {

    async function getData() {
      await getDrinksData(async (data) => {
        console.log("DATA" , data);
        await setDrinksData(data);
        await setLoading(false);
      });
      
    }

    getData();

    
  }, [])


  if(isLoading){
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }else{
    return (
      <>
   
        <header>
            <div class="container">

                <img src="mmulogo.jpg" alt="logo" class="logo"/>

                <nav>
                    <ul>
                        <li><a href="menu.html">Menu</a></li>
                        <li><a href="cart.html">Cart</a></li>
                    </ul>
                </nav>

            </div>
        </header>
            <h2 className="text-center mb-4">Welcome to MMUCoffee</h2>
            {error && <Alert variant="danger">{error}</Alert>}


            {console.log("DRINKS", drinksData)}
            {/* <ol>
              {drinksData.map((drink) => (
                <li>{drink.name}</li>
              ))}
            </ol> */}
          <Container className="center-items">
            {drinksData.map((drink) => (
             <div class="dropdown">
             <button class="dropbtn">{drink.name}</button>
             <div class="dropdown-content">
             <Button 
            // onClick={() => {
            //   setItemCount(currentCart + "price-reg");
            // }}
          >Regular 12oz - £{drink["price-reg"]} 
            {" "}
            {/* <AddIcon fontSize="small" /> */}
          </Button>
          <Button
            // onClick={() => {
            //   setItemCount(currentCart + "price-large");
            // }}
          >Large 16oz - £{drink["price-large"]}
            {" "}
            {/* <AddIcon fontSize="small" /> */}
          </Button>
           
          
             </div>
           </div>
            ))}
      </Container>

          
    
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </>


      
    );
  }
}
