require("dotenv").config();
const express = require("express");
const axios = require("axios");

const options = {
  method: "POST",
  url: "https://a.khalti.com/api/v2/epayment/initiate/",
  headers: {
    Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
  data: JSON.stringify({
    return_url: "http://localhost:8080/success",
    website_url: "http://localhost:8080/",
    amount: "1000",
    purchase_order_id: "Order01",
    purchase_order_name: "test",
    customer_info: {
      name: "Customer Name",
      email: "customeremail@gmail.com",
      phone: "9800000001",
    },
  }),
};

const app = express();

app.get("/", async (req, res) => {
  return res.json({ "/payment": "KHALTI PAYMENT UI" });
});

app.get("/payment", async (req, res) => {
  try {
    const result = await axios(options);
    return res.redirect(result.data.payment_url);
  } catch (error) {
    console.log(error);
    return res.json({ error: "ERROR OCCOURED!" });
  }
});

app.get("/success", async (req, res) => {
  return res.json({ message: "Transaction Success!!" });
});

app.listen(8080, () => console.log(`http://localhost:8080/payment`));
