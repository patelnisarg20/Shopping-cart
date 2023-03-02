import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartSlice, { addToCart } from "../../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllLaptopQuery, useGetAllProductsQuery } from "./AcApi";

const Mobile = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useNavigate();

  const { data, error, isLoading } = useGetAllProductsQuery();

  console.log("mera data", data);
  console.log("Api", isLoading);



  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history("/cart");
  };

  return (
    <>
      <div className="home-container">
        {status === "success" ? (
          <>
            <h2>New Arrivals</h2>
            <div className="">
              {data &&
                data?.map((item) => (
                  <div className="cart-items" key={item.id}>
                    <h3 className="">{item.cat_name}</h3>

                    {item?.products.map((product, index) => (
                      <div className="product">
                        <h3>{product.name}</h3>
                        <img
                          src={"http://localhost:1313/images/" + product.image}
                          alt={product.name}
                        />
                        <div className="details">
                          <span className="">{product.desc}</span>
                          <span className="price">${product.price}</span>
                        </div>
                        <button onClick={() => handleAddToCart(product)}>
                          Add To Cart
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </>
        ) : status === "pending" ? (
          <p>Loading...</p>
        ) : (
          <p>Unexpected error occured...</p>
        )}

        {/* <div><Cart /></div> */}
      </div>
    </>
  );
};

export default Mobile;
