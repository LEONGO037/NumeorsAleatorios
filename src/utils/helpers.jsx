// Calcular g para algoritmo lineal
export const calculateG = (P) => {
  if (!P || P < 1) throw new Error("El período P debe ser un número positivo");
  return Math.ceil(Math.log2(P));
};

// Calcular g para algoritmo multiplicativo
export const calculateGMultiplicative = (P) => {
  if (!P || P < 1) throw new Error("El período P debe ser un número positivo");
  
  let g = 2;
  while (Math.pow(2, g - 2) < P) {
    g++;
  }
  return g;
};

// Verificar si un número es primo
export const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  
  return true;
};

// Redondear número a dígitos específicos
export const roundNumber = (num, digits) => {
  return Number(num.toFixed(digits));
};