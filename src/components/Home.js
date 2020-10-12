import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HomeDiv = styled.div`
  background-image: url("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1428&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  text-align: center;
`;

const OrderTitle = styled.h3`
  color: white;
  text-shadow: 1px 1px black;
  font-size: 2rem;
  margin: auto auto;
  padding-top: 100px;
`;

const OrderButton = styled.button`
  padding: 10px;
  background-color: green;
  color: white;
  font-size: 1.5rem;
  margin-top: 20px;
  border-radius: 20px;
  :hover {
    background-color: white;
    color: green;
  }
`;

const Home = () => {
  return (
    <HomeDiv>
      <OrderTitle>Your favorite food, delivered while coding</OrderTitle>
      <NavLink to="/pizza">
        <OrderButton data-cy="HMOButton">Pizza?</OrderButton>
      </NavLink>
    </HomeDiv>
  );
};

export default Home;
