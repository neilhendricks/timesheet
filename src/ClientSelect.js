import React, { useState, useEffect } from 'react';
import './Time.css';

const ClientSelect = ({selectedClient, setSelectedClient, setSelectedClientId}) => {
  // const [selectedClient, setSelectedClient] = useState("Select client");
  const [clients, setClients] = useState([]);

  const handleClientChange = (event) => {
    const clientName = event.target.value;
    const clientId = clients.find(item => item.ClientName === clientName).client_id;
    setSelectedClient(clientName);
    setSelectedClientId(clientId);
  }

  useEffect(() => {
    // Fetch data from server when component mounts
    fetch('http://localhost:3001/api') 
      .then(response => response.json())
      .then(data=>setClients(data))
  }, []);

  const handleChange = (e) => {
    setSelectedClient(e.target.value);
  };

  return (
    <div className="client-select">
      <label>Client</label>
      <select value={selectedClient} onChange={handleClientChange}>
        <option value="">Select Client</option>
        {clients.map(client => (
          <option key={client.client_id} value={client.ClientName}>
            {client.ClientName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClientSelect;
