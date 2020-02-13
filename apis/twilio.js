function twilioText(orderConfirmation) {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
  const resturantNumber = process.env.resturantNumber;
  const customerNumber = process.env.customerNumber;
  const twilioNumber = process.env.twilioNumber;
  const client = require("twilio")(accountSid, authToken);

  // const dish = Object.values(orderConfirmation);
  // const totalOrder = [];
  // dish.forEach(element => {
  //   totalOrder.push(element);
  // });
  // let msg = "";
  // for (let item of totalOrder) {
  //   msg += `${item[0]} - Quantity : ${item[1]}\n`;
  // }

  // // resturant
  // client.messages.create({
  //   body: `Order Received: \n ${msg}`,
  //   from: twilioNumber,
  // to: resturantNumber
  // });

  // // customer text
  // client.messages.create({
  //   body: `Thank you for ordering. Your order will be ready in 20 minutes`,
  //   from: twilioNumber,
  //   to: customerNumber
  // });

  //customer call - NEED TO SOMEHOW GET HTML INTO URL?

  // client.calls.create({
  //   url: "/twilio",
  //   from: twilioNumber,
  //   to: customerNumber
  // });
}

module.exports = twilioText;
