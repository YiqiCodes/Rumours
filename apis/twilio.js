function twilioText() {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
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

// module.exports = twilioText;
