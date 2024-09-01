cuentas = [
  {
    numeroCuenta: "02234567",
    cedula: "1714616123",
    nombre: "Juan",
    apellido: "Perez",
    saldo: 0.0,
  },
  {
    numeroCuenta: "02345211",
    cedula: "1281238233",
    nombre: "Felipe",
    apellido: "Caicedo",
    saldo: 0.0,
  },
];

cargar = function () {
  mostrarComponente("divCuentas");
  ocultarComponente("divMovimientos");
  ocultarComponente("divTransacciones");
};

mostrarCuentas = function () {
  //Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
  //Columnas: NUMERO CUENTA, NOMBRE, SALDO
  //En la columna NOMBRE concatenar el nombre y el apellido
};

/*
  Busca la cuenta en el arreglo en función del número de cuenta,
  si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
  let elementoCuenta;
  let cuentaEncontrada = null;
  for (let i = 0; i < cuentas.length; i++) {
    elementoCuenta = cuentas[i];
    if (elementoCuenta.numeroCuenta == numeroCuenta) {
      cuentaEncontrada = elementoCuenta;
      break;
    }
  }

  return cuentaEncontrada;
};

agregarCuenta = function (cuenta) {
  //Si ya existe mostrar un alert CUENTA EXISTENTE
  //Si se agrega, mostrar un alert CUENTA AGREGADA
};

agregar = function () {
  //Toma los valores de las cajas de texto, sin validaciones
  let valorCedula = recuperarTexto("lblCedula");
  let valorNombre = recuperarTexto("lblNombre");
  let valorApellido = recuperarTexto("lblApellido");
  let valorCuenta = recuperarTexto("lblCuenta");
  //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
  let cuenta = {
    numeroCuenta: valorCuenta,
    cedula: valorCedula,
    nombre: valorNombre,
    apellido: valorApellido,
    saldo: 0,
  };
  //Invoca a agregarCuenta
  //Invoca a mostrarCuentas
};
