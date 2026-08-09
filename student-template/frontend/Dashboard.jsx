import React, { useEffect, useState } from "react";

function Dashboard() {
  // Store API data
  const [alerts, setAlerts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/inventory/alerts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch inventory alerts");
        }
        return response.json();
      })
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory Alerts</h2>

      {alerts.length === 0 ? (
        <h3>All inventory levels are healthy.</h3>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((item) => (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{item.reorder_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
