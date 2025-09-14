import React, { useState } from 'react';
import LinealGenerator from './components/LinealGenerator';
import MultiplicativeGenerator from './components/MultiplicativeGenerator';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('lineal');

  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4">Generador de Números Aleatorios</h1>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item-lineal">
          <button 
            className={`nav-link ${activeTab === 'lineal' ? 'active' : ''}`}
            onClick={() => setActiveTab('lineal')}
          >
            Algoritmo Lineal
          </button>
        </li>
        <li className="nav-item-multiplicative">
          <button 
            className={`nav-link ${activeTab === 'multiplicative' ? 'active' : ''}`}
            onClick={() => setActiveTab('multiplicative')}
          >
            Algoritmo Multiplicativo
          </button>
        </li>
      </ul>
      
      {activeTab === 'lineal' ? <LinealGenerator /> : <MultiplicativeGenerator />}
    </div>
  );
}

export default App;