// src/hooks/useClients.ts
import { useEffect, useState } from 'react';
import { fetchClientes, filtrar } from '../api/clienteApi';

const useClients = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClientes();
        setClientes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  // Función para realizar la consulta a la API
  const filtrarClientes = async (url: string) => {
    try {
        const data: any = await filtrar(url);
        setClientes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  };

  return { clientes, loading, error, filtrarClientes };
};

export default useClients;
