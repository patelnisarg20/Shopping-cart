import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useGetAllProductsQuery } from "./MyorderApi";

const MyOrder = () => {
  const [renderData, setRenderData] = useState([]);
  var userid = sessionStorage.getItem("UserInfoID");
  console.log(renderData);
  useEffect(() => {
    getAllData();
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:1313/myorder/${userid}`)
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          setRenderData(data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    fetchData();
  }, );

  const getAllData = () => {
    axios
      .get(`http://localhost:1313/myorder/${userid}`)
      .then((res_new) => {
        //  const allData = res.data.orderData.allData;

        console.log(res_new?.data);
        //  setorderData(allData)
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>order ID</th>
            <th>Total</th>
            <th>subTotal</th>
            <th>Transication id</th>
          </tr>
        </thead>
        <tbody>
          {renderData?.map((data, index) => {
            return (
              <tr key={index}>
                <td>#ONS00{data.id}</td>
                <td>{data.total}</td>
                <td>{data.subtotal}</td>
                <td>{data.txn_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MyOrder;
