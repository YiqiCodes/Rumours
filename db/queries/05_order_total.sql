select SUM(total) FROM (
SELECT order_id,dishes.name AS item,quantity,price,price*quantity as total
FROM ordered_items
JOIN dishes ON dishes.id = dish_id
WHERE order_id = 129
GROUP BY order_id,dishes.name,quantity,price
) as tot;
