const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../backend/db");
const port = 1313;
//stripe payment

const bodyparser = require("body-parser");

const stripe = require("stripe")("sk_test_3p4QmbGHGVIKsOmWxynXXIk800WIavZj5X");
const uuid = require("uuid").v4;

app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post("/checkout", async (req, res) => {
  const { amount, token, userid } = req.body;

  try {
    const charge = await stripe.charges.create({
      currency: "INR",
      amount: req.body.cart.cartTotalAmount,
      source: token.id,
    });
    if (charge) {
      let insertQuery = `insert into order_main(order_id, total, subtotal,tax,txn_id,user_id) 
      values('0', '${charge.amount}', '${charge.amount}','0.00','${charge.id}','${userid}')`;
      console.log(insertQuery);
      4;
      pool.query(insertQuery, (err, result) => {
        if (!err) {
          let getID = "SELECT * FROM order_main ORDER BY id desc limit 1";
          console.log(getID);
          pool.query(getID, (err, result) => {
            if (!err) {
              console.log(result.rows[0].id);
              for (var i in req.body.cart.cartItems) {
                console.log("cart", req.body.cart.cartItems[i].name);
                const total =
                  req.body.cart.cartItems[i].price *
                  req.body.cart.cartItems[i].cartQuantity;
                console.log(total);
                const order_data = `INSERT INTO order_details(order_id, price, product_id, qty, total) values (${result.rows[0].id},${req.body.cart.cartItems[i].price},${req.body.cart.cartItems[i].id},${req.body.cart.cartItems[i].cartQuantity}, ${total})`;
                console.log(order_data);
                pool.query(order_data, (err, result) => {
                  if (!err) {
                  } else {
                  }
                });
              }
              // res.send("Insertion was successful");
            } else {
              console.log(err.message);
            }
          });
        } else {
        }
      });
    }

    res.json({ charge: charge, message: "payment initiated successed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/myorder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const order = await pool.query(
      "SELECT * FROM order_main WHERE user_id = $1",
      [id]
    );
    res.json(order.rows);
    console.log(req.params);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/regi", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into register(fullname, email, password) 
values('${user.fullname}', '${user.email}', '${user.password}')`;

  pool.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
});

app.post("/login", (req, res) => {
  const user = req.body;
  let getuser =
    "SELECT * FROM register where email = '" +
    user.email +
    "' AND password='" +
    user.password +
    "'";

  pool.query(getuser, (err, result) => {
    if (!err) {
      if (result?.rows.length > 0) {
        // req.session.loggedin = true;
        // req.session.user = user;
        res
          .status(200)
          .json({ success: true, data: result?.rows, message: "user found" });
      } else {
        res.status(200).json({
          success: false,
          data: "",
          message: "incorrect email and password",
        });
        //res.send("incorrect email and password");
      }
      res.end();
      // res.send(result);
    } else {
      console.log(err.message);
    }
  });
});

app.post("/ecom", async (req, res) => {
  try {
    console.log(req.body);
    const { cat_name } = req.body;
    console.log("DESC ==> " + cat_name);
    const newTodo = await pool.query(
      "INSERT INTO category (cat_name) VALUES('" + cat_name + "')",
      res.json(newTodo.rows)
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/laptop", async (req, res) => {
  const result = await pool.query("SELECT * FROM category where id=" + 2 + "");
  for (var i in result.rows) {
    const product_data = await pool.query(
      "SELECT * FROM product where cat_id = " + result.rows[i].id + ""
    );
    result.rows[i].products = product_data.rows;
    console.log("=====>", result);
  }
  console.log(result?.rows);
  //res.status(200).json({ success: true, data: result?.rows });
  res.send(result?.rows);
});
app.get("/mobile", async (req, res) => {
  const result = await pool.query("SELECT * FROM category where id=" + 1 + "");
  for (var i in result.rows) {
    const product_data = await pool.query(
      "SELECT * FROM product where cat_id = " + result.rows[i].id + ""
    );
    result.rows[i].products = product_data.rows;
    console.log("=====>", result);
  }
  console.log(result?.rows);
  //res.status(200).json({ success: true, data: result?.rows });
  res.send(result?.rows);
});
app.get("/tv", async (req, res) => {
  const result = await pool.query("SELECT * FROM category where id=" + 3 + "");
  for (var i in result.rows) {
    const product_data = await pool.query(
      "SELECT * FROM product where cat_id = " + result.rows[i].id + ""
    );
    result.rows[i].products = product_data.rows;
    console.log("=====>", result);
  }
  console.log(result?.rows);
  //res.status(200).json({ success: true, data: result?.rows });
  res.send(result?.rows);
});
app.get("/watch", async (req, res) => {
  const result = await pool.query("SELECT * FROM category where id=" + 4 + "");
  for (var i in result.rows) {
    const product_data = await pool.query(
      "SELECT * FROM product where cat_id = " + result.rows[i].id + ""
    );
    result.rows[i].products = product_data.rows;
    console.log("=====>", result);
  }
  console.log(result?.rows);
  //res.status(200).json({ success: true, data: result?.rows });
  res.send(result?.rows);
});
app.get("/ac", async (req, res) => {
  const result = await pool.query("SELECT * FROM category where id=" + 5 + "");
  for (var i in result.rows) {
    const product_data = await pool.query(
      "SELECT * FROM product where cat_id = " + result.rows[i].id + ""
    );
    result.rows[i].products = product_data.rows;
    console.log("=====>", result);
  }
  console.log(result?.rows);
  //res.status(200).json({ success: true, data: result?.rows });
  res.send(result?.rows);
});

app.get("/products", async (req, res) => {
  res.header({
    "Access-Control-Allow-Headers": "X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET",
    "Access-Control-Allow-Headers": "application/json",
  });
  const result = await pool.query("SELECT * FROM category");
  //console.log('my result',result.rows);
  for (var i in result.rows) {
    // console.log(result.rows[i]);
    const product_data = await pool.query(
      "SELECT * FROM product where cat_id = " + result.rows[i].id + ""
    );
    // const oreder_data =await connect_db.query("SELECT * FROM order_details where order_id = "+result.rows[i].id+"");

    result.rows[i].products = product_data.rows;
    // result.rows[i].order=(oreder_data.rows)
    console.log("=====>", result);
  }
  console.log(result?.rows);
  //res.status(200).json({ success: true, data: result?.rows });
  res.send(result?.rows);
});
app.delete("/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM  WHERE todo_id = $1", [
      id,
    ]);
    res.json("todo was deleted!! ");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/regi", async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log("regi", email);
  const sqlInsert = await pool.query(
    "INSERT INTO register (fullname,email,password) VALUES(?,?,?)"
  );
});

app.listen(port, () => console.log(`connected on ${port}`));
