// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useGetAllProductsQuery } from "../slices/productsApi";
import Banner from "./pages/Banner";
// import Cart from "./Cart";

const Home = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useNavigate();

  const { data, isLoading } = useGetAllProductsQuery();

  console.log("mera data", data);
  console.log("Api", isLoading);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history("/cart");
  };

  return (
    <>
      <Banner />
      
      <div className="home-container">
        {status === "success" ? (
          <>
            <div className="products">
              {data &&
                data?.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <h1 className="">{item.cat_name}</h1>

                    {item?.products.map((product, index) => (
                      <div className="product">
                        <h3>{product.name}</h3>

                        <img
                          src={"http://localhost:1313/images/" + product.image}
                          alt={product.name}
                        />
                        <div className="details">
                          <span className="">{product.desc}</span>
                          <span className="price">₹{product.price}</span>
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

export default Home;
