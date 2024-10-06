class Cliente {
  identificacion: string | null;
  nombres: string | null;
  apellidos: string | null;
  email: string | null;
  telefono: string | null;
  direccion: string | null;
  fecha_nacimiento: Date | null;
//   activo: boolean;

  constructor() {
    this.identificacion = null;
    this.nombres = null;
    this.apellidos = null;
    this.email = null;
    this.telefono = null;
    this.direccion = null;
    this.fecha_nacimiento = null;
    // this.activo = true;
  }
}

export default Cliente;
