// Dependencias
import useClients from "../../hooks/useClientes";
import { Button } from "@mui/material";

// Componentes
import { Container, Row, Col, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Cliente from "../../models/Cliente";

const TablaClientes = () => {
  const { clientes, loading, error, filtrarClientes } = useClients();
  const [cliente, setCliente] = useState<Cliente>(new Cliente());

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    {
      name: "Identificación",
      selector: (row: any) => row.identificacion,
      sortable: true,
      filterable: true,
    },
    {
      name: "Nombres",
      selector: (row: any) => row.nombres,
      sortable: true,
      filterable: true,
    },
    {
      name: "Apellidos",
      selector: (row: any) => row.apellidos,
      filterable: true,
    },
    {
      name: "Correo",
      selector: (row: any) => row.email,
      filterable: true,
    },
    {
      name: "Telefono",
      selector: (row: any) => row.telefono,
      filterable: true,
    },
    {
      name: "Dirección",
      selector: (row: any) => row.direccion,
      filterable: true,
    },
    {
      name: "Fecha de nacimiento",
      selector: (row: any) => row.fecha_nacimiento,
      filterable: true,
    },
    {
      name: "Activo",
      selector: (row: any) => row.activo,
      cell: (row: any) => (
        <Checkbox
          checked={row.activo}
          color="primary"
          disabled // Deshabilita el checkbox si no necesitas que sea interactivo
        />
      ),
    },
    {
      name: "Acciones",
      cell: (row: any) => (
        <div style={{ display: "flex", gap: "10px", whiteSpace: "nowrap" }}>
          <Button color="primary" onClick={() => handleEdit(row)}>
            <EditIcon />
          </Button>
          <Button color="error" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  // Funciones de acciones
  const handleEdit = (row: any) => {
    console.log("Editar", row);
  };

  const handleDelete = (row: any) => {
    console.log("Eliminar", row);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
    console.log(cliente);
  };

  // Función para generar la URL
  const handleSubmit = () => {
    // Genera los parámetros para la URL solo con los campos que tienen algún valor
    const params = Object.entries(cliente)
      .filter(([key, value]) => value !== "" && value !== null)
      .map(([key, value]) => `${key}[like]=${encodeURIComponent(value)}`) // Genera la estructura clave[like]=valor
      .join("&"); // Une los parámetros con '&'

    const url = `backend_mundo_ambiensa.test/clientes?${params}`;
    console.log(cliente);
    console.log("URL Generada:", url); // Imprime la URL generada
    // Aquí puedes hacer una petición a la API con la URL generada, si es necesario
    filtrarClientes(params)
  };
 

  return (
    <Container fluid className="p-4">
      <Row>
        {columns
          .filter((col) => col.filterable)
          .map((column, index) => (
            <Col md={3} className="mb-2" key={index}>
              <Form.Control
                type="text"
                name={column.selector?.toString().split(".").pop()} // Obtiene el nombre del campo
                placeholder={`Filtrar por ${column.name}`}
                onChange={handleChange}
              />
            </Col>
          ))}
      </Row>

      <Row>
        <Col md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            <SearchIcon /> Buscar
          </Button>
        </Col>

        {/* onSelectedRowsChange={(data) => console.log(data)} */}
        <Col md={12}>
          <DataTable
            title="Clientes"
            columns={columns}
            data={clientes}
            fixedHeader
            pagination
            paginationPerPage={5}
            customStyles={{
              table: {
                style: {
                  width: "100%", // Asegura que la tabla ocupe el ancho completo
                },
              },
              headRow: {
                style: {
                  backgroundColor: "#eee", // Color de fondo del encabezado
                },
              },
            }}
          ></DataTable>
        </Col>
      </Row>
    </Container>
  );
};

export default TablaClientes;
