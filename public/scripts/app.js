// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done(users => {
//     for (user of users) {
//       $("<div>")
//         .text(user.name)
//         .appendTo($("body"));
//     }
//   });
// });

$(document).ready(function() {
  let orderSubTotal = 0;
  $(".dish-add").click(function(e) {
    e.preventDefault();
    let id = $(this)
      .closest(".dish-item")
      .attr("id");
    let dishTitle = $(`#dish-title-${id}`).html();
    let oldQty = Number($(`#dish-item${id}-qty`).val());
    let newQty = oldQty + 1;
    let itemPrice = Number($(`#dish-price-${id}`).html());
    let orderPrice = Number(newQty * itemPrice).toFixed(2);
    $(`#dish-item${id}-qty`).val(newQty);
    if ($(`#order-${id}`).length === 0) {
      $(".order-list").append(
        ` <div id="order-${id}" class="ordered-detail">
          <input class="ordered-item dish-name" id="ordered-item-${id}" name="${id}" value="${dishTitle}">
          <input class="ordered-item" id="ordered-qty-${id}" name="${id}"  value="${newQty}">
          <input class="ordered-item price" name="${id}" id="ordered-price-${id}" value="$${orderPrice}">
          </div>`
      );
    } else {
      $(`#ordered-qty-${id}`).val(newQty);
      $(`#ordered-price-${id}`).val(`$${orderPrice}`);
    }

    orderSubTotal += Number(itemPrice);

    let subTotal = orderSubTotal.toFixed(2);
    $("#sub-total-price").html(`$${subTotal}`);

    let orderTotal = subTotal;
    let taxTotal = (orderTotal * 0.13).toFixed(2);
    $("#tax-price").html(`$${taxTotal}`);
    let orderTotalTax = (orderTotal * 1.13).toFixed(2);
    $("#total-price").html(`$${orderTotalTax}`);
  });

  $(".dish-minus").click(function(e) {
    e.preventDefault();

    let id = $(this)
      .closest(".dish-item")
      .attr("id");
    let dishTitle = $(`#dish-title-${id}`).html();
    let oldQty = Number($(`#dish-item${id}-qty`).val());
    if (oldQty > 0) {
      let newQty = oldQty - 1;
      let itemPrice = Number($(`#dish-price-${id}`).html());
      let orderPrice = Number(newQty * itemPrice).toFixed(2);
      $(`#dish-item${id}-qty`).val(newQty);
      if ($(`#order-${id}`).length === 0) {
        $(".order-list").append(
          ` <div id="order-${id}" class="order-detail ordered-detail">
          <input id="ordered-item-${id}" name="${id}" value="${dishTitle}">
          <input id="ordered-qty-${id}" name="${id}"  value="${newQty}">
          <input class="ordered-price" name="${id}" id="ordered-price-${id}" value="$${orderPrice}">
          </div>`
        );
      } else if (newQty === 0) {
        $(`#order-${id}`).remove();
      } else {
        $(`#ordered-qty-${id}`).val(newQty);
        $(`#ordered-price-${id}`).val(`$${orderPrice}`);
      }
      orderSubTotal -= Number(itemPrice);

      let subTotal = orderSubTotal.toFixed(2);
      $("#sub-total-price").html(`$${subTotal}`);
      let orderTotal = subTotal;
      let taxTotal = (orderTotal * 0.13).toFixed(2);
      $("#tax-price").html(`$${taxTotal}`);
      let orderTotalTax = (orderTotal * 1.13).toFixed(2);
      $("#total-price").html(`$${orderTotalTax}`);
    }
  });
});
