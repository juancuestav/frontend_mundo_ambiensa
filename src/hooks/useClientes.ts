// src/hooks/useClients.ts
import { useEffect, useState } from "react";
import { filtrar } from "../api/clienteApi";
import { getClientes, deleteCliente } from "../services/clienteService";
import Cliente from "../models/Cliente";

const useClients = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerClientes = async () => {
    try {
      const response = await getClientes();
      setClientes(response.data.results);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  const eliminarCliente = async (cliente: Cliente) => {
    try {
      if (cliente.id) {
        await deleteCliente(cliente.id);
        setClientes(clientes.filter((c: Cliente) => c.id !== cliente.id));
      }
    } catch (error) {
      console.error("Error deleting cliente:", error);
    }
  };

  useEffect(() => {
    obtenerClientes();
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

  return {
    clientes,
    setClientes,
    loading,
    error,
    filtrarClientes,
    obtenerClientes,
    eliminarCliente,
  };
};

export default useClients;
