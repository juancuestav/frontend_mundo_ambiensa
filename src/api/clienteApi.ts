import axios from "axios";

const API_URL = "http://mundo_ambiensa.test/api/clientes";

export const fetchClientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results; // Devuelve los datos de la respuesta
  } catch (error: any) {
    throw new Error("Error fetching clients: " + error.message);
  }
};

export const filtrar = async (url: string) => {
  try {
    const response = await axios.get(API_URL + '?' + url);
    return response.data.results; // Devuelve los datos de la respuesta
  } catch (error: any) {
    throw new Error("Error fetching clients: " + error.message);
  }
};
