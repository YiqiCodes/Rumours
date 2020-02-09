function twilioText() {
  const accountSid = "ACac4d347ed2aaf78e93efc8c5d433679e";
  const authToken = "c869687ac5ca51903c0af8313d3945d7";
  const client = require("twilio")(accountSid, authToken);

  let numbersToMessage = ["+16133714897", "+16475287504"];
  numbersToMessage.forEach(function(number) {
    client.messages
      .create({
        body:
          "Thank you for ordering. Customer's order will be ready in x minutes",
        from: "+19548748565", //twilio #
        to: number // #'s - resturant and customer
      })
      .then(message => console.log(message.status))
      .done();
  });
}

module.exports = twilioText;
