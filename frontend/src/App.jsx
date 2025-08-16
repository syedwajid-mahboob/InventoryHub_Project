import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0 });

  const API_BASE = "http://localhost:5000"; // Replace with deployed backend URL

  useEffect(() => {
    fetchItems();
    fetchProducts();
  }, []);

  const fetchItems = async () => {
    const res = await fetch(`${API_BASE}/api/items`);
    const data = await res.json();
    setItems(data);
  };

  const fetchProducts = async () => {
    const res = await fetch(`${API_BASE}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity) return;
    const res = await fetch(`${API_BASE}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    const data = await res.json();
    setItems([...items, data]);
    setNewItem({ name: "", quantity: 0 });
  };

  const deleteItem = async (id) => {
    await fetch(`${API_BASE}/api/items/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="container">
      <h1>InventoryHub</h1>
      <h2>Inventory Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}{" "}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
          }
        />
        <button type="submit">Add Item</button>
      </form>

      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
