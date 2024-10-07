/* eslint-disable @typescript-eslint/no-explicit-any */
// Dependencias
import useClients from "../../hooks/useClientes";
import { Button } from "@mui/material";
import { useState } from "react";

// Componentes
import { Container, Row, Col, Form } from "react-bootstrap";
import AgregarClienteDialog from "./AgregarClienteDialog";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import Cliente from "../../models/Cliente";

const TablaClientes = () => {
  const {
    clientes,
    filtrarClientes,
    eliminarCliente,
    obtenerClientes,
  } = useClients();
  const [cliente, setCliente] = useState<Cliente>(new Cliente());
  const [openDialog, setOpenDialog] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // Estado para el cliente seleccionado (si es edición)

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
          disabled
        />
      ),
    },
    {
      name: "Acciones",
      cell: (row: any) => (
        <div style={{ display: "flex", gap: "10px", whiteSpace: "nowrap" }}>
          <Button color="primary" onClick={() => handleOpenDialog(row)}>
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

  const handleDelete = async (cliente: Cliente) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      eliminarCliente(cliente);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  // Función para generar la URL
  const handleSubmit = () => {
    // Genera los parámetros para la URL solo con los campos que tienen algún valor
    const params = Object.entries(cliente)
      .filter(([, value]) => value !== "" && value !== null)
      .map(([key, value]) => `${key}[like]=${encodeURIComponent(value)}`) // Genera la estructura clave[like]=valor
      .join("&"); // Une los parámetros con '&'

    filtrarClientes(params);
  };
  

  // Función para abrir el diálogo
  const handleOpenDialog = (cliente: any = null) => {
    setClienteSeleccionado(cliente); // Si es null, es para agregar. Si tiene valor, es para editar.
    setOpenDialog(true);
  };

  // Función para cerrar el diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setCliente(new Cliente()); // Restablece el cliente a un nuevo objeto vacío
    filtrarClientes(""); // Limpia el filtro enviando un string vacío
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

      <Row className="mb-4 justify-content-end">
        <Col md={12} className="text-end">
          <Button
            variant="contained"
            style={{ backgroundColor: "green", color: "#fff" }}
            className="me-2"
            onClick={() => handleSubmit()}
          >
            <SearchIcon /> Buscar
          </Button>

          <Button
            variant="contained"
            style={{ backgroundColor: "gray", color: "#fff" }}
            onClick={handleClearFilters}
          >
            <DeleteIcon /> Limpiar Filtros
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Agregar Cliente
          </Button>

          {/* Diálogo para agregar cliente */}
          <AgregarClienteDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onSave={obtenerClientes}
            clienteData={clienteSeleccionado} // Pasa el cliente si se va a editar, null si se va a agregar
          />
        </Col>

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
