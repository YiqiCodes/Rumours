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
  $(".dish-add").click(function(e) {
    e.preventDefault();
    let id = $(this)
      .closest(".dish-item")
      .attr("id");
    console.log(id);
    let dishTitle = $(`#dish-title-${id}`).html();
    $(`#ordered-item-${id}`).html(dishTitle);
    let oldQty = parseInt($(`#dish-item${id}-qty`).val());
    let newQty = oldQty + 1;
    addMinus(newQty, id);
  });

  $("#dish-item1-minus").click(function(e) {
    e.preventDefault();
    let dishTitle = $("#dish-title-pizza").html();
    $("#ordered-item1").html(dishTitle);
    let oldQty = parseInt($("#dish-item1-qty").val());
    if (oldQty > 0) {
      let newQty = oldQty - 1;
      addMinus(newQty);
    }
  });
});

const addMinus = (newQty, id) => {
  $(`#dish-item${id}-qty`).val(newQty);
  if (!$("#order-1")) {
  } else {
    console.log("hello");

    $("#ordered-qty1").html(newQty);
    let itemPrice = Number($(`#dish-price-${id}`).html());
    let orderPrice = Number(newQty * itemPrice).toFixed(2);
    $("#ordered-price1").text(orderPrice);
  }
  let orderSubTotal = $("#ordered-price1").html();
  $("#sub-total-price").html(orderSubTotal);
  let orderTotal = Number($("#sub-total-price").html());
  let orderTotalTax = (orderTotal * 1.13).toFixed(2);
  $("#total-price").html(orderTotalTax);
};
