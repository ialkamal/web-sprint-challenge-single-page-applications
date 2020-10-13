import React from "react";
import styled from "styled-components";

const SuccessDiv = styled.div`
  background-image: url("https://images.unsplash.com/photo-1583611722699-12add5555b23?ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  height: 50vh;
  width: 100%;
  text-align: center;
`;

const OrderTitle = styled.h3`
  color: white;
  text-shadow: 1px 1px black;
  font-size: 2rem;
  margin: auto auto;
  padding-top: 150px;
`;

const Success = (props) => {
  return (
    <div>
      <SuccessDiv>
        <OrderTitle>Congrats! Pizza is on its way!</OrderTitle>
      </SuccessDiv>
      {/* {props.orders.map((myOrder) => {
        return (
          <div key={myOrder.id}>
            {<pre>{JSON.stringify(myOrder, 2, null)}</pre> }
          </div>
        );
      })} */}
    </div>
  );
};

export default Success;
