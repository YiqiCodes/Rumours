$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    for (user of users) {
      $("<div>")
        .text(user.name)
        .appendTo($("body"));
    }
  });
});

$(document).ready(function() {
  $("#dish-item1-add").click(function(e) {
    e.preventDefault();
    let dishTitle = $("#dish-title-pizza").html();
    $("#ordered-item1").html(dishTitle);
    let oldQty = parseInt($("#dish-item1-qty").val());
    let newQty = oldQty + 1;
    addMinus(newQty);
  });

  $("#dish-item1-minus").click(function(e) {
    e.preventDefault();
    let oldQty = parseInt($("#dish-item1-qty").val());
    if (oldQty > 0) {
      let newQty = oldQty - 1;
      addMinus(newQty);
    }
  });
});

const addMinus = newQty => {
  $("#dish-item1-qty").val(newQty);
  $("#ordered-qty1").text(newQty);
  $("#ordered-price1").text(newQty * 11.99);
  let orderSubTotal = $("#ordered-price1").html();
  $("#sub-total-price").html(orderSubTotal);
  let orderTotal = Number($("#sub-total-price").html());
  let orderTotalTax = (orderTotal * 1.13).toFixed(2);
  $("#total-price").html(orderTotalTax);
};
