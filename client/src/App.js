import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [msg, setMsg] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3300/api/test')
      .then(res => setMsg(res.data.message));

    axios.get('http://localhost:3300/api/testdata')
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1>{msg}</h1>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
