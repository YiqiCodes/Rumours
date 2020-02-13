function twilioText(orderConfirmation) {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
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
  //   from: "+14242887153",
  //   to: "+16475320880"
  // });

  // // customer text
  // client.messages.create({
  //   body: `Thank you for ordering. Your order will be ready in 20 minutes`,
  //   from: "+14242887153",
  //   to: "+16133714897"
  // });

  //customer call

  client.calls.create({
    url: "/twilio",
    from: "+14242887153",
    to: "+16133714897"
  });
}

module.exports = twilioText;
