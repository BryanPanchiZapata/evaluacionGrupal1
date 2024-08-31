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
    deshabilitarComponente("monto");
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
        deshabilitarComponente("monto");
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
        habilitarComponente("monto");
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
    if (cuentaAfectada != null) {
        cuentaAfectada.saldo += monto
        return cuentaAfectada;
    } else {
        alert("NO SE REALIZÓ EL DEPOSITO. CUENTA INEXISTENTE");
        return null
    }
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
        let cuentaAfectada = depositar(numeroCuenta, monto);
        if (cuentaAfectada != null) {
            //Muestra un mensaje TRANSACCION EXITOSA
            mostrarTexto("MsgMonto", "TRANSACCION DE DEPOSITO EXITOSA");
            //Muestra en pantalla el nuevo saldo de la cuenta
            mostrarTexto("ValorMonto", cuentaAfectada.saldo + "$");
        }
    }
}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada != null) {
        if (cuentaAfectada.saldo < monto) {
            alert("SALDO INSUFICIENTE");
        } else {
            cuentaAfectada.saldo -= monto;
            mostrarTexto("MsgMonto", "TRANSACCION DE RETIRO EXITOSA");
            mostrarTexto("ValorMonto", cuentaAfectada.saldo + "$");
        }
    } else {
        alert("NO SE REALIZÓ EL RETIRO. CUENTA INEXISTENTE");
    }
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
}

function ejecutarRetiro() {
    let numeroCuenta = recuperarTexto("nCuenta");
    let monto = recuperarFloat("monto");
    if (monto < 0 || isNaN(monto)) {
        alert("MONTO INCORRECTO")
    } else {
        retirar(numeroCuenta, monto);
    }

}