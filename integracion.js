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

movimientos = [
  { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
  { numeroCuenta: "02345211", monto: 45.9, tipo: "D" },
  { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
  { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
  { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
];

/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/
//CUENTA
cargar = function () {
  mostrarOpcionCuenta();
  /* mostrarComponente("divTransacciones");
  ocultarComponente("divCuentas");
  ocultarComponente("divMovimientos");
   */
};

mostrarCuentas = function () {
  //Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
  //Columnas: NUMERO CUENTA, NOMBRE, SALDO
  //En la columna NOMBRE concatenar el nombre y el apellido

  let cmpCuenta = document.getElementById("tablaCuentas");
  let contenidoTabla =
    "<table><tr>" +
    "<th>NUMERO CUENTA</th>" +
    "<th>NOMBRE</th>" +
    "<th>SALDO</th>" +
    "</tr>";
  let elementoCuenta;

  for (let i = 0; i < cuentas.length; i++) {
    elementoCuenta = cuentas[i];
    contenidoTabla +=
      "<tr><td>" +
      elementoCuenta.numeroCuenta +
      "</td>" +
      "<td>" +
      elementoCuenta.nombre +
      " " +
      elementoCuenta.apellido +
      "</td>" +
      "<td>" +
      elementoCuenta.saldo +
      "</td>" +
      "</tr>";
  }
  contenidoTabla += "</table>";
  cmpCuenta.innerHTML = contenidoTabla;
};

agregarCuenta = function (cuenta) {
  //Si ya existe mostrar un alert CUENTA EXISTENTE
  //Si se agrega, mostrar un alert CUENTA AGREGADA
  let resultado = buscarCuenta(cuenta.numeroCuenta);
  if (resultado == null) {
    cuentas.push(cuenta);
    alert("CUENTA AGREGADA");
  } else {
    alert("CUENTA EXISTENTE");
  }
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
  agregarCuenta(cuenta);
  //Invoca a mostrarCuentas
  mostrarCuentas();
};

//TRANSACCIONES
buscarCuenta = function (numeroCuenta) {
  let buscaCuenta;
  let cuentaEncontrada = null;
  if (numeroCuenta.length != 8) {
    alert("NUMERO DE CUENTA INCORRECTA");
    mostrarTexto("MsgBuscar", "");
    deshabilitarComponente("depositar");
    deshabilitarComponente("retirar");
    deshabilitarComponente("monto");
    return null;
  } else {
    mostrarTexto("MsgBuscar", "");
    for (let i = 0; i < cuentas.length; i++) {
      buscaCuenta = cuentas[i];
      if (buscaCuenta.numeroCuenta == numeroCuenta) {
        cuentaEncontrada = buscaCuenta;
        break;
      }
    }
    habilitarComponente("depositar");
    habilitarComponente("retirar");
    habilitarComponente("monto");
    return cuentaEncontrada;
  }
};
ejecutarBusqueda = function () {
  //toma el numero de cuenta de la caja de texto
  let numeroCuenta = recuperarTexto("nCuenta");
  //invoca a buscarCuenta y guarda el resultado en una variable
  let cuentaBuscada = buscarCuenta(numeroCuenta);
  //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
  if (cuentaBuscada != null) {
    mostrarTexto("MsgBuscar", "CUENTA ENCONTRADA");
  } else {
    alert("CUENTA NO ENCONTRADA");
  }
};

depositar = function (numeroCuenta, monto) {
  //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
  let cuentaAfectada = buscarCuenta(numeroCuenta);
  //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
  if (cuentaAfectada != null) {
    cuentaAfectada.saldo += monto;
    return cuentaAfectada;
  } else {
    alert("NO SE REALIZÓ EL DEPOSITO. CUENTA INEXISTENTE");
    return null;
  }
};
ejecutarDeposito = function () {
  //Toma el numero de cuenta ingresado en la caja de texto
  let numeroCuenta = recuperarTexto("nCuenta");
  //Toma el monto ingresado en la caja de texto
  let monto = recuperarFloat("monto");
  if (monto < 0 || isNaN(monto)) {
    alert("MONTO INCORRECTO");
  } else {
    //invoca a depositar
    let cuentaAfectada = depositar(numeroCuenta, monto);
    if (cuentaAfectada != null) {
      //Muestra un mensaje TRANSACCION EXITOSA
      mostrarTexto("MsgMonto", "TRANSACCION DE DEPOSITO EXITOSA");
      //Muestra en pantalla el nuevo saldo de la cuenta
      mostrarTexto("ValorMonto", cuentaAfectada.saldo.toFixed(2) + "$");
      agregarMovimientoDeposito(numeroCuenta, monto, "C")
    }
  }
};

retirar = function (numeroCuenta, monto) {
  let cuentaAfectada = buscarCuenta(numeroCuenta);
  if (cuentaAfectada != null) {
    if (cuentaAfectada.saldo < monto) {
      alert("SALDO INSUFICIENTE");
    } else {
      cuentaAfectada.saldo -= monto;
      mostrarTexto("MsgMonto", "TRANSACCION DE RETIRO EXITOSA");
      mostrarTexto("ValorMonto", cuentaAfectada.saldo.toFixed(2) + "$");
    }
  } else {
    alert("NO SE REALIZÓ EL RETIRO. CUENTA INEXISTENTE");
  }
  //Valida si la cuenta tiene el saldo suficiente para retirar el monto
  //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
  //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
  //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
};

function ejecutarRetiro() {
  let numeroCuenta = recuperarTexto("nCuenta");
  let monto = recuperarFloat("monto");
  if (monto < 0 || isNaN(monto)) {
    alert("MONTO INCORRECTO");
  } else {
    retirar(numeroCuenta, monto);
    agregarMovimientoRetiro(numeroCuenta, monto, "D")
  }
}

//MOVIMIENTOS
mostrarTablaMovimientos = function () {
  let numeroCuenta = recuperarTexto("txtCuentaMovimientos");
  filtrarMovimientos(numeroCuenta);
};

filtrarMovimientos = function (numeroCuenta) {
  let movimientosCuenta = [];
  //Se barre el arreglo de movimientos
  //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
  //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
  //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
  for (let i = 0; i < movimientos.length; i++) {
    if (numeroCuenta == movimientos[i].numeroCuenta) {
      movimientosCuenta.push(movimientos[i]);
    }
  }
  mostrarMovimientos(movimientosCuenta);
};

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/

mostrarMovimientos = function (misMovimientos) {
  //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
  //Columnas: NUMERO CUENTA, MONTO, TIPO
  //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
  //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
  //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
  let cmpTabla = document.getElementById("tablaMovimientos");
  let contenidoTabla =
    "<table><tr>" +
    "<th>NUMERO CUENTA</th>" +
    "<th>MONTO</th>" +
    "<th>TIPO</th>" +
    "</tr>";
  let elementoMovimiento;
  let monto;
  for (let i = 0; i < misMovimientos.length; i++) {
    elementoMovimiento = misMovimientos[i];
    if (elementoMovimiento.tipo == "D") {
      monto = "-" + elementoMovimiento.monto;
    } else {
      monto = "+" + elementoMovimiento.monto;
    }

    contenidoTabla +=
      "<tr><td>" +
      elementoMovimiento.numeroCuenta +
      "</td>" +
      "<td>" +
      monto +
      "</td>" +
      "<td>" +
      elementoMovimiento.tipo +
      "</td>" +
      "</td>";
  }

  contenidoTabla += "</table>";
  cmpTabla.innerHTML = contenidoTabla;
};

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte
mostrarOpcionCuenta = function () {
  mostrarComponente("divCuentas");
  ocultarComponente("divTransacciones");
  ocultarComponente("divMovimientos");
};

mostrarOpcionTransaccion = function () {
  mostrarComponente("divTransacciones");
  ocultarComponente("divCuentas");
  ocultarComponente("divMovimientos");
  deshabilitarComponente("depositar");
  deshabilitarComponente("retirar");
  deshabilitarComponente("monto");
};

mostrarOpcionMovimientos = function () {
    mostrarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    ocultarComponente("divCuentas");
  };

//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos
agregarMovimientoDeposito = function (numeroCuenta, monto, tipo) {
    let movimiento = {
        numeroCuenta: numeroCuenta,
        monto: monto,
        tipo: tipo
    }

    movimientos.push(movimiento)
}


//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos

agregarMovimientoRetiro = function (numeroCuenta, monto, tipo) {
    let movimiento = {
        numeroCuenta: numeroCuenta,
        monto: monto,
        tipo: tipo
    }

    movimientos.push(movimiento)
}