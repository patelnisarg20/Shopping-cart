import React from "react";

export default function CheckOut({ cartItems }) {
  const handleClick = () => {
    console.log(cartItems);
  };
  return (
    <div>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        checkout
      </button>
    </div>
  );
}
