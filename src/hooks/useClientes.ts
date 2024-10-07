/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getClientes,
  deleteCliente,
  filtrar,
} from "../services/clienteService";
import { useEffect, useState } from "react";
import Cliente from "../models/Cliente";

const useClients = () => {
  const [error, setError] = useState<string | null>(null);
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const filtrarClientes = async (url: string) => {
    try {
      const response = await filtrar(url);
      setClientes(response.data.results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

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
