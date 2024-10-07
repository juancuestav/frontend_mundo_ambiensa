class Cliente {
  id: number | null;
  identificacion: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
  activo: boolean;

  constructor() {
    this.id = null;
    this.identificacion = "";
    this.nombres = "";
    this.apellidos = "";
    this.email = "";
    this.telefono = "";
    this.direccion = "";
    this.fecha_nacimiento = "";
    this.activo = true;
  }
}

export default Cliente;
