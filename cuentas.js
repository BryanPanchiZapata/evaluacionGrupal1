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

