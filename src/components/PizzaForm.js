import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";

const PizzaH3 = styled.h3`
  text-align: center;
`;

const PizzaNiceForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px auto;
  border-radius: 20px;
  border: 1px solid black;
  width: 600px;
  background-color: lightgreen;

  p {
    margin: 10px auto;
  }

  h3 {
    margin: 20px auto;
  }

  label {
    margin: 10px 30px;
  }

  label input {
    margin-left: 10px;
  }

  div label input {
    margin-left: 0px;
  }

  label select {
    margin-left: 10px;
  }

  label textarea {
    margin-top: 10px;
  }

  button {
    padding: 10px;
    margin: 10px auto;
    background: white;
    font-size: 1.2rem;
    :hover {
      opacity: 0.7;
    }
  }
`;

const PizzaCard = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  background-color: lightyellow;
  margin: 10px auto;
  width: 300px;

  p {
    margin: 5px 10px;
  }

  button {
    margin: 10px;
    padding: 10px;
    background-color: white;
    :hover {
      opacity: 0.7;
    }
  }
`;

const PizzaForm = () => {
  const defaultOrder = {
    id: "",
    name: "",
    pizzaSize: "Medium",
    pepperoni: false,
    sausage: false,
    dicedTomatoes: false,
    blackOlives: false,
    special: "",
  };

  const schema = yup.object().shape({
    name: yup.string().min(2).required("Enter a Name"),
    pizzaSize: yup.string().required("Select Pizza Size"),
    sausage: yup.boolean(),
    pepperoni: yup.boolean(),
    dicedTomatoes: yup.boolean(),
    blackOlives: yup.boolean(),
    special: yup.string(),
  });

  const [order, setOrder] = useState(defaultOrder);
  const [orders, setOrders] = useState([]);
  const [edit, setEdit] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errors, setErrors] = useState({
    ...defaultOrder,
    pepperoni: "",
    sausage: "",
    dicedTomatoes: "",
    blackOlives: "",
    pizzaSize: "",
    special: "",
  });

  useEffect(() => {
    schema.isValid(order).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [order]);

  const validate = (e) => {
    e.persist();

    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => setErrors({ ...errors, [e.target.name]: "" }))
      .catch((error) => {
        setErrors({ ...errors, [e.target.name]: error.errors[0] });
      });
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setOrder({ ...order, [e.target.name]: value });
    validate(e);
  };

  const addOrder = (e) => {
    e.preventDefault();
    setOrder(defaultOrder);
    axios
      .post("https://reqres.in/api/users", order)
      .then((response) => {
        setOrders([...orders, response.data]);
      })
      .catch((err) => console.log(err));
  };

  const saveOrder = (e) => {
    e.preventDefault();
    const listOfOrders = orders.map((singleOrder) => {
      if (singleOrder.id === order.id) return order;
      else return singleOrder;
    });
    setOrders(listOfOrders);
    setOrder(defaultOrder);
    setEdit(false);

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((button) => {
      button.disabled = false;
    });
    document.querySelector(".Order__Button").textContent = "Order";
  };

  const editOrder = (myOrder) => {
    document.querySelector(".Order__Button").textContent = "Save";
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((button) => {
      button.disabled = true;
    });

    setEdit(true);
    setOrder(myOrder);
  };

  const cancelOrder = (myOrder) => {
    const listOfOrders = [...orders];
    listOfOrders.splice(listOfOrders.indexOf(myOrder), 1);
    setOrders(listOfOrders);
  };

  return (
    <div>
      <PizzaNiceForm
        onSubmit={(e) => {
          if (edit === true) saveOrder(e);
          else addOrder(e);
        }}
      >
        <h3>Build Your Own Pizza</h3>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            data-cy="name"
            value={order.name || ""}
            onChange={handleChange}
          />
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.name}</p>
        <label htmlFor="pizzaSize">
          Type:
          <select
            id="pizzaSize"
            name="pizzaSize"
            data-cy="pizzaSize"
            value={order.pizzaSize || ""}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.pizzaSize}</p>
        <p>Add Toppings:</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <label>
            <input
              type="checkbox"
              name="sausage"
              checked={order.sausage}
              value={order.sausage}
              data-cy="sausage"
              onChange={handleChange}
            />
            Sausage
          </label>
          <p style={{ color: "red", fontSize: ".8rem" }}>{errors.sausage}</p>
          <label>
            <input
              type="checkbox"
              name="pepperoni"
              checked={order.pepperoni}
              value={order.pepperoni}
              data-cy="pepperoni"
              onChange={handleChange}
            />
            Pepperoni
          </label>
          <p style={{ color: "red", fontSize: ".8rem" }}>{errors.pepperoni}</p>
          <label>
            <input
              type="checkbox"
              name="dicedTomatoes"
              checked={order.dicedTomatoes}
              value={order.dicedTomatoes}
              data-cy="dicedTomatoes"
              onChange={handleChange}
            />
            Diced Tomatoes
          </label>
          <p style={{ color: "red", fontSize: ".8rem" }}>
            {errors.dicedTomatoes}
          </p>
          <label>
            <input
              type="checkbox"
              name="blackOlives"
              checked={order.blackOlives}
              value={order.blackOlives}
              data-cy="blackOlives"
              onChange={handleChange}
            />
            BlackOlives
          </label>
          <p style={{ color: "red", fontSize: ".8rem" }}>
            {errors.blackOlives}
          </p>
        </div>

        <label htmlFor="special">
          Special Instructions:
          <textarea
            id="special"
            name="special"
            data-cy="special"
            value={order.special || ""}
            onChange={handleChange}
            cols="60"
            rows="5"
          />
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.special}</p>
        <button
          type="submit"
          name="submit"
          className="Order__Button"
          disabled={buttonDisabled}
          data-cy="submit"
        >
          Order
        </button>
      </PizzaNiceForm>
      <PizzaH3>List of Orders</PizzaH3>
      {orders.map((myOrder) => {
        return (
          <PizzaCard key={myOrder.id}>
            {/* <pre>{JSON.stringify(myOrder, 2, null)}</pre> */}
            <p>Name: {myOrder.name}</p>

            <p>Pizza Size: {myOrder.pizzaSize}</p>

            <p>Pepperoni: {myOrder.pepperoni === true ? "Yes" : "No"}</p>

            <p>Sausage: {myOrder.sausage === true ? "Yes" : "No"}</p>
            <p>
              Diced Tomatoes: {myOrder.dicedTomatoes === true ? "Yes" : "No"}
            </p>

            <p>Black Olives: {myOrder.blackOlives === true ? "Yes" : "No"}</p>
            <p>Special Instructions: {myOrder.special}</p>

            <button
              name="edit"
              className="edit"
              data-cy="edit"
              onClick={() => editOrder(myOrder)}
            >
              Edit
            </button>
            <button
              name="cancel"
              data-cy="cancel"
              onClick={() => cancelOrder(myOrder)}
            >
              Cancel
            </button>
          </PizzaCard>
        );
      })}
    </div>
  );
};

export default PizzaForm;
