SELECT
    customer_id,
    SUM(total_amount) AS total_order_value
FROM orders
WHERE EXTRACT(YEAR FROM order_date) = 2025
GROUP BY customer_id
ORDER BY total_order_value DESC
LIMIT 5;
