import { isPrime } from './helpers';

export const validateLinealParams = (params) => {
  if (!params.seed || parseInt(params.seed) <= 0) {
    throw new Error("La semilla debe ser un número positivo");
  }
  
  if (!params.P || parseInt(params.P) <= 0) {
    throw new Error("El período P debe ser un número positivo");
  }
  
  if (!params.k || parseInt(params.k) < 0) {
    throw new Error("El valor de k debe ser un número no negativo");
  }
  
  if (!params.c || !isPrime(parseInt(params.c))) {
    throw new Error("La constante c debe ser un número primo");
  }
  
  if (!params.digits || parseInt(params.digits) < 2 || parseInt(params.digits) > 10) {
    throw new Error("Los dígitos de redondeo deben estar entre 2 y 10");
  }
};

export const validateMultiplicativeParams = (params) => {
  if (!params.seed || parseInt(params.seed) <= 0 || parseInt(params.seed) % 2 === 0) {
    throw new Error("La semilla debe ser un número impar positivo");
  }
  
  if (!params.P || parseInt(params.P) <= 0) {
    throw new Error("El período P debe ser un número positivo");
  }
  
  if (!params.k || parseInt(params.k) < 0) {
    throw new Error("El valor de k debe ser un número no negativo");
  }
  
  if (!params.digits || parseInt(params.digits) < 2 || parseInt(params.digits) > 10) {
    throw new Error("Los dígitos de redondeo deben estar entre 2 y 10");
  }
};