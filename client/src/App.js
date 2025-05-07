import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3300/api/assets';

function App() {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({ symbol: '', quantity: '', price: '', category: '' });
  const [editId, setEditId] = useState(null);

  const fetchAssets = async () => {
    const res = await axios.get(baseURL);
    setAssets(res.data);
  };

  useEffect(() => { fetchAssets(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${baseURL}/${editId}`, form);
    } else {
      await axios.post(baseURL, form);
    }
    setForm({ symbol: '', quantity: '', price: '', category: '' });
    setEditId(null);
    fetchAssets();
  };

  const handleEdit = (asset) => {
    setForm(asset);
    setEditId(asset._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    fetchAssets();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Portfolio Asset Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="Symbol" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required type="number" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required type="number" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <button type="submit">{editId ? 'Update' : 'Add'} Asset</button>
      </form>

      <ul>
        {assets.map(asset => (
          <li key={asset._id}>
            {asset.symbol} - {asset.quantity} @ ₹{asset.price} ({asset.category})
            <button onClick={() => handleEdit(asset)}>Edit</button>
            <button onClick={() => handleDelete(asset._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
