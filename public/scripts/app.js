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
    let oldQty = parseInt($("#dish-item1-qty").val());
    let newQty = oldQty + 1;
    $("#dish-item1-qty").val(newQty);
    $("#ordered-qty1").text(newQty);
    $("#ordered-price1").text(newQty * 11.99);
    $("#sub-total1").text($("#ordered-price1").val());
  });

  $("#dish-item1-minus").click(function(e) {
    e.preventDefault();
    let oldQty = parseInt($("#dish-item1-qty").val());
    if (oldQty > 0) {
      let newQty = oldQty - 1;
      $("#dish-item1-qty").val(newQty);
      $("#ordered-qty1").text(newQty);
      $("#ordered-price1").text(newQty * 11.99);
    }
  });
});
