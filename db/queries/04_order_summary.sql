SELECT order_id,dishes.name AS item,quantity,price,price*quantity AS sum
FROM ordered_items
JOIN dishes ON dishes.id = dish_id
WHERE order_id = 3
GROUP BY order_id,dishes.name,quantity,price;
