import React, { Component } from "react";
import "./Product.css";

const products = [
  {
    emoji: "🍦",
    name: "ice cream",
    price: 5,
  },
  {
    emoji: "🍩",
    name: "donuts",
    price: 2.5,
  },
  {
    emoji: "🍉",
    name: "watermelon",
    price: 4,
  },
];

export default class Product extends Component {
  //Values that will be changing
  state = {
    cart: [],
    // total: 0,
  };
  // upfate the product page to modify the state of buttons
  // Adding items to the cart
  // addItem = (product) => {
  //   this.setState(state => ({
  //     cart: [...state.cart, product.name],
  //     total: state.total + product.price,
  //   }));
  // };

  addItem = (product) => {
    this.setState(state => ({
      cart: [...state.cart, product],
      // total: state.total + product.price
    }))
  }

  currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  //remove Items from the cart
  // removeItem = (product) => {
  //   this.setState(state => {
  //     const cart = [...state.cart];
  //     cart.splice(cart.indexOf(product.name))
  //     return ({
  //       cart,
  //       total: state.total - product.price
  //     })
  //   })
  // }

  getTotal = () => {
    const total = this.state.cart.reduce((totalCost,item) => totalCost + item.price,0)
    return total.toLocaleString(undefined, this.currencyOptions);
  };

  removeItem = (product) => {
    this.setState(state => {
      const cart = [...state.cart];
      //check if the item exists before we can remove it, and return nothing, that way, we will know that the 
      //state didn't change and the re-rendering won't be triggered.
      const productIndex = cart.findIndex(p => p.name  === product.name);
      if(productIndex < 0) {
        return;
      }
      //splice will removed (one) product from the cart
      cart.splice(productIndex,1)
      return({
        cart
      })
      // const cart = [...state.cart];
      // cart.splice(cart.indexOf(product.name))
      // return ({
      //   cart,
      //   total: state.total - product.price
      // })
    })
  }


  render() {
    return (
      <div className="wrapper">
        <h2>🛒 Shopping Cart</h2> 
        <h3> Total items: {this.state.cart.length}</h3>
        <h3> Total Cost: {this.getTotal()} </h3>
        {/*  Using map to loop over the products array and return the JSX that will display each element in your browser. */}
        <div>
          {products.map(product => (
            <div  className ="product-box" key={product.name}>
              <div className="product">
                <span role="img" arial-label={product.name}>
                  {product.emoji} 
                  <p>Product: {product.name}</p>
                  <p>Price:{product.price}</p>
                </span>
                

              </div>
              <button onClick={() =>this.addItem(product)}> Add </button>
              <button onClick={() => this.removeItem(product)}> Remove</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
