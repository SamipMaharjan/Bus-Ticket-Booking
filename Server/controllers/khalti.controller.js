const { StatusCodes } = require("http-status-codes");
const axios = require("axios");
// const { Order } = require("../../models/schema");
// const { ORDER_STATUS } = require("../../constants/order.constants");

// const verifyPayment = async (req, res) => {
//   const { token, amount } = req.body;
//   const orderID = req.params.orderID;

//   if (!orderID) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "Order ID is required" });
//   }
//   if (!token || !amount) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "Token and amount are required" });
//   }

//   const order = await Order.findById(orderID);

//   if (!order) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "Order not found" });
//   }

//   if (
//     order.status === ORDER_STATUS.CONFIRMED ||
//     order.status === ORDER_STATUS.DELIVERED
//   ) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "Order has already been paid" });
//   }

//   if (order.status === ORDER_STATUS.CANCELLED) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "Order was cancelled" });
//   }

//   if (order.total_amount < amount) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "Amount of the order not matched!" });
//   }

//   let config = {
//     headers: { Authorization: `Key ${process.env.KHALTI_SECRET_KEY}` },
//   };

//   try {
//     const response = await axios.post(
//       "https://khalti.com/api/v2/payment/verify/",
//       { token, amount },
//       config
//     );
//     if (response?.data?.idx && response.data?.state?.name === "Completed") {
//       await Order.findByIdAndUpdate(orderID, {
//         status: ORDER_STATUS.CONFIRMED,
//       });
//       return res.status(StatusCodes.OK).json({
//         success: true,
//         message: "Payment verified successfully",
//         khalti_response: response?.data,
//       });
//     } else {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         message: "Payment verification failed",
//         khalti_response: response?.data,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "Payment verification failed" });
//   }
// };

const initiatePayment = async (req, res) => {
  console.log("initiatePayment hit");
  const payload = req.body;
  // console.log("ret", payload.return_url, "webs", payload.website_url);
  if (!payload.return_url || !payload.website_url) {
    return res
      .status(400)
      .json({ message: "`return_url` and `website_url` are both required" });
  } else if (!payload.amount) {
    return res.status(400).json({ message: "`amount` is required" });
  } else if (!payload.purchase_order_id && !payload.purchase_order_name) {
    return res.status(400).json({
      message: "`purchase_order_name` and `purchase_order_id` are required",
    });
  }
  try {
    console.log("payload", payload);
    const khaltiResponse = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (khaltiResponse.ok) {
      const resData = await khaltiResponse.json();
      console.log("khalti response", resData);
      return res.status(200).json(resData);
    }
  } catch (err) {
    console.error("Khalti Payment Err:", err);
    return res.status(400);
  }
};

module.exports = {
  // verifyPayment,
  initiatePayment,
};
