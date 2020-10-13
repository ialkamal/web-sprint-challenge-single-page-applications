import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigationDiv = styled.div`
  width: 100%;
  background-color: green;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  align-items: center;
  div {
    display: flex;
    justify-content: flex-end;
    width: 500px;
  }
  a {
    text-decoration: none;
    margin-right: 3%;
    color: white;
    font-size: 1.4rem;
  }
  h1 {
    align-item: flex-start;
    color: white;
    margin-left: 3%;
    width: 500px;
  }
`;

const Navbar = () => {
  return (
    <NavigationDiv>
      <h1>Lambda Eats</h1>
      <div>
        <Link to="/pizza">Order</Link>
        <Link to="/">Home</Link>
      </div>
    </NavigationDiv>
  );
};

export default Navbar;
