import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { addCliente, updateCliente } from "../../services/clienteService";
import Cliente from "../../models/Cliente";

interface ClienteDialogProps {
  open: boolean;
  onClose: () => void;
  clienteData?: any; // Datos del cliente para editar
  onSave: () => void; // Callback para recargar la tabla de clientes después de guardar/editar
}

const AgregarClienteDialog = ({
  open,
  onClose,
  clienteData,
  onSave,
}: ClienteDialogProps) => {
  const [cliente, setCliente] = useState(clienteData || new Cliente());
  const initialClienteState = new Cliente();

  // Effect para actualizar el estado si el cliente cambia (en caso de edición)
  React.useEffect(() => {
    if (clienteData) {
      setCliente(clienteData);
    } else {
      setCliente(initialClienteState); // Resetea al valor inicial si se abre para agregar
    }
  }, [clienteData, open]);

  // Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({
      ...cliente,
      activo: e.target.checked, // Actualiza el estado del checkbox
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      if (clienteData) {
        // Si existe clienteData, es una edición
        if (clienteData.id) await updateCliente(clienteData.id, cliente);
      } else {
        // Si no hay clienteData, es un nuevo registro
        await addCliente(cliente);
      }

      onSave(); // Llamar al callback para refrescar la lista
      onClose(); // Cerrar el diálogo
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {cliente ? "Editar Cliente" : "Agregar Cliente"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="identificacion"
          label="Identificación"
          type="text"
          fullWidth
          value={cliente.identificacion}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="nombres"
          label="Nombres"
          type="text"
          fullWidth
          value={cliente.nombres}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="apellidos"
          label="Apellidos"
          type="text"
          fullWidth
          value={cliente.apellidos}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Correo"
          type="email"
          fullWidth
          value={cliente.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="telefono"
          label="Teléfono"
          type="tel"
          fullWidth
          value={cliente.telefono}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="direccion"
          label="Dirección"
          type="text"
          fullWidth
          value={cliente.direccion}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="fecha_nacimiento"
          label="Fecha de nacimiento"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={cliente.fecha_nacimiento}
          onChange={handleChange}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={cliente.activo}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Activo"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {cliente ? "Guardar Cambios" : "Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarClienteDialog;
