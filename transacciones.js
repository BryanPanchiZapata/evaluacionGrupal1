cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("depositar");
    deshabilitarComponente("retirar");
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    let buscaCuenta;
    let cuentaEncontrada = null;
    if (numeroCuenta.length != 8) {
        alert("NUMERO DE CUENTA INCORRECTA");
        mostrarTexto("MsgBuscar", "");
        deshabilitarComponente("depositar");
        deshabilitarComponente("retirar");
        return null
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
        return cuentaEncontrada;
    }
}
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
}

depositar = function (numeroCuenta, monto) {
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada.saldo += monto
}

ejecutarDeposito = function () {
    //Toma el numero de cuenta ingresado en la caja de texto
    let numeroCuenta = recuperarTexto("nCuenta");
    //Toma el monto ingresado en la caja de texto
    let monto = recuperarFloat("monto");
    if (monto < 0 || isNaN(monto)) {
        alert("MONTO INCORRECTO")
    } else {
        //invoca a depositar
        depositar(numeroCuenta, monto);
        //Muestra un mensaje TRANSACCION EXITOSA
        mostrarTexto("MsgMonto", "TRANSACCION EXITOSA");
        //Muestra en pantalla el nuevo saldo de la cuenta
        mostrarTexto("ValorMonto", monto + "$");
    }
}

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
}