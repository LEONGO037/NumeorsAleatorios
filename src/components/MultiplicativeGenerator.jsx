import React, { useState } from 'react';
import { calculateGMultiplicative, roundNumber } from '../utils/helpers';
import { validateMultiplicativeParams } from '../utils/validations';

import './MultiplicativeGenerator.css';

// Función para verificar si un número es potencia de 2
const isPowerOfTwo = (n) => n > 0 && (n & (n - 1)) === 0;

const MultiplicativeGenerator = () => {
  const [params, setParams] = useState({
    seed: '',
    P: '',
    k: '',
    aOption: '3',
    digits: '4'
  });
  
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [periodMsg, setPeriodMsg] = useState('');

  // Calcular valores de g, m y a en tiempo real si los parámetros existen
  const P = parseInt(params.P);
  const k = parseInt(params.k);
  const g = !isNaN(P) && P > 0 ? calculateGMultiplicative(P) : '';
  const m = g !== '' ? Math.pow(2, g) : '';
  const a = !isNaN(k)
    ? (params.aOption === '3'
        ? 3 + 8 * k
        : 5 + 8 * k)
    : '';

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value
    });
  };

  const generateNumbers = () => {
    try {
      // Validar parámetros
      validateMultiplicativeParams(params);
      
      const seed = parseInt(params.seed);
      const P = parseInt(params.P);
      const k = parseInt(params.k);
      const digits = parseInt(params.digits);
      const aOption = params.aOption;
      
      // Calcular g y m automáticamente
      const g = calculateGMultiplicative(P);
      const m = Math.pow(2, g);
      
      // Calcular a automáticamente según la opción seleccionada
      const a = aOption === '3' ? 3 + 8 * k : 5 + 8 * k;

      // Verificar si el periodo es potencia de 2
      const isPot2 = isPowerOfTwo(P);

      // Mensaje según el periodo
      if (isPot2) {
        setPeriodMsg("El período ingresado ES potencia de 2, por lo que se puede llegar al final del ciclo y se muestra la fila extra para verificar el periodo.");
      } else {
        setPeriodMsg("El período ingresado NO es potencia de 2, por lo que no se cumple todo el ciclo de vida y NO se muestra la fila extra en la tabla.");
      }

      const limit = isPot2 ? P + 1 : P;

      const numbers = [];
      let x = seed;
      let prevX = seed; // Para guardar x_{i-1}

      // Generar números hasta completar el período (+1 si es potencia de 2)
      for (let i = 0; i < limit; i++) {
        const operation = `(${a} * ${prevX}) MOD ${m}`;
        x = (a * prevX) % m;
        const r = x / (m - 1);
        const roundedR = r.toFixed(digits);

        numbers.push({
          iteration: i + 1,
          prevX: prevX,
          operation: operation,
          x: x,
          r: roundedR
        });

        prevX = x;
      }
      
      setResults(numbers);
      setError('');
    } catch (err) {
      setError(err.message);
      setResults([]);
      setPeriodMsg('');
    }
  };

  const handleClear = () => {
    setParams({
      seed: '',
      P: '',
      k: '',
      aOption: '3',
      digits: '4'
    });
    setResults([]);
    setError('');
    setPeriodMsg('');
  };

  return (
    <div className="multiplicativo-theme">
        <div className="card">
        <div className="card-header bg-primary text-white">
            <h2 className="h5 mb-0">Algoritmo Congruencial Multiplicativo</h2>
        </div>
        <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="row mb-3">
            <div className="col-md-6">
                <label htmlFor="seed" className="form-label">Semilla (X₀) - Impar</label>
                <input 
                type="number" 
                className="form-control" 
                id="seed" 
                name="seed"
                value={params.seed}
                onChange={handleChange}
                min="1"
                step="2"
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="P" className="form-label">Período (P)</label>
                <input 
                type="number" 
                className="form-control" 
                id="P" 
                name="P"
                value={params.P}
                onChange={handleChange}
                min="1"
                />
            </div>
            </div>
            
            <div className="row mb-3">
            <div className="col-md-6">
                <label htmlFor="k" className="form-label">Valor de k</label>
                <input 
                type="number" 
                className="form-control" 
                id="k" 
                name="k"
                value={params.k}
                onChange={handleChange}
                min="0"
                />
                <div className="form-text">a = 3 + 8k o a = 5 + 8k (según selección)</div>
            </div>
            <div className="col-md-6">
                <label htmlFor="aOption" className="form-label">Opción para a</label>
                <select 
                className="form-select" 
                id="aOption" 
                name="aOption"
                value={params.aOption}
                onChange={handleChange}
                >
                <option value="3">a = 3 + 8k</option>
                <option value="5">a = 5 + 8k</option>
                </select>
            </div>
            </div>
            
            <div className="row mb-3">
            <div className="col-md-6">
                <label htmlFor="digits" className="form-label">Dígitos para redondeo</label>
                <input
                type="number"
                className="form-control"
                id="digits"
                name="digits"
                value={params.digits}
                onChange={handleChange}
                min="1"
                max="10"
                />
                <div className="form-text">Introduce la cantidad de dígitos decimales (1-10)</div>
            </div>
            </div>

            {/* Mostrar valores calculados de g, m y a */}
            <div className="row mb-3">
            <div className="col-md-4">
                <div className="alert alert-info py-2 mb-2">
                <strong>g:</strong> {g !== '' ? g : '-'}
                </div>
            </div>
            <div className="col-md-4">
                <div className="alert alert-info py-2 mb-2">
                <strong>m:</strong> {m !== '' ? m : '-'}
                </div>
            </div>
            <div className="col-md-4">
                <div className="alert alert-info py-2 mb-2">
                <strong>a:</strong> {a !== '' ? a : '-'}
                </div>
            </div>
            </div>
            
            <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={generateNumbers}>
                Generar Números Aleatorios
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
                Limpiar
            </button>
            </div>

            {periodMsg && (
            <div className={`alert ${periodMsg.includes('NO') ? 'alert-warning' : 'alert-success'} mt-3`}>
                {periodMsg}
            </div>
            )}
            
            {results.length > 0 && (
            <div className="mt-4">
                <h3 className="h5">Resultados</h3>
                <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>Iteración</th>
                        <th>X<sub>i-1</sub></th>
                        <th>Operación</th>
                        <th>Xᵢ</th>
                        <th>rᵢ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((item, index) => (
                        <tr key={index} className={index === results.length - 1 && isPowerOfTwo(P) ? "table-warning" : ""}>
                        <td>{item.iteration}</td>
                        <td>{item.prevX}</td>
                        <td>{item.operation}</td>
                        <td>{item.x}</td>
                        <td>{item.r}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            )}
        </div>
        </div>
    </div>
  );
};

export default MultiplicativeGenerator;