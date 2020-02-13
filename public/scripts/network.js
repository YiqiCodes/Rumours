


//local storage for order-cart saving variables
function SaveItem() {
  let item = $("#ordered-item-${id}").val();
  let quantity = $("#ordered-qty-${id}").val();
  let price = $("#ordered-price-${id}").val();
  localStorage.setItem(item, quantity,price);
  doShowAll();
}
//------------------------------------------------------------------------------
//change an existing key=>value in the HTML5 storage
function ModifyItem() {
  let item1 = $("#ordered-item-${id}").val();
  let quantity1 = $("#ordered-qty-${id}").val();
  let price1 = $("#ordered-price-${id}").val();
  //Check if name already exists.
//Check if key exists.
       if (localStorage.getItem(item1) !=null)
       {
         //update
         localStorage.setItem(item1,quantity1,price1);
         let new_info=localStorage.getItem(item1);
         $("#ordered-qty-${id}").val(new_info);
         $("#ordered-price-${id}").val(new_info);
       }

  doShowAll();
}
//-------------------------------------------------------------------------
//delete an existing key=>value from the HTML5 storage
function RemoveItem() {
  let item = $("#ordered-item-${id}").val();
	document.forms.ShoppingList.data.value = localStorage.removeItem(item);
	doShowAll();
}
//-------------------------------------------------------------------------------------
//restart the local storage
function ClearAll() {
	localStorage.clear();
	doShowAll();
}


// dynamically populate the table with shopping list items
//below step can be done via PHP and AJAX too.
function doShowAll() {
	if (CheckBrowser()) {
		var key = "";
		var list = "<tr><th>Item</th><th>Value</th></tr>\n";
		var i = 0;
		//for more advance feature, you can set cap on max items in the cart
		for (i = 0; i <= localStorage.length-1; i++) {
			key = localStorage.key(i);
			list += "<tr><td>" + key + "</td>\n<td>"
					+ localStorage.getItem(key) + "</td></tr>\n";
		}
		//if no item exists in the cart
		if (list == "<tr><th>Item</th><th>Value</th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}
		//bind the data to html table
		//you can use jQuery too....
		document.getElementById('list').innerHTML = list;
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}
