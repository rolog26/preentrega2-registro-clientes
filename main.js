document.getElementById('clientes').addEventListener('submit', function(e) {
    e.preventDefault();
    const ingreso = document.getElementById('ingreso').value;
    const nombre = document.getElementById('nombre').value;
    const numero = document.getElementById('numero').value;
    const dispositivo = document.getElementById('dispositivo').value;
    const diagnostico = document.getElementById('diagnostico').value;
    const presupuesto = document.getElementById('presupuesto').value;
    const estado = document.getElementById('estado').value;
    const id = obtenerId();
    
    const nuevoCliente = {
        id: id,
        ingreso: ingreso,
        nombre: nombre,
        numero: numero,
        dispositivo: dispositivo,
        diagnostico: diagnostico,
        presupuesto: presupuesto,
        estado: estado
    }
    
    guardarCliente(nuevoCliente);
    
    agregarCliente(nuevoCliente);
    
    document.getElementById('clientes').reset();
})

const registrados = document.getElementById('registrados');
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

const obtenerId = () => {
    let contador = parseInt(localStorage.getItem('contadorClientes'));
    let nuevoId = contador;
    contador++;
    localStorage.setItem('contadorClientes', contador.toString());
    return nuevoId;
}

const guardarCliente = (cliente) => {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

document.getElementById('botonBuscar').addEventListener('click', () => {
    const clienteBuscado = document.getElementById('clienteABuscar').value;
    buscarCliente(clienteBuscado);
})

const buscarCliente = (clienteBuscado) => {
    const clienteEncontrado = clientes.find(cliente => cliente.nombre.toLowerCase() == clienteBuscado.toLowerCase() || cliente.id == clienteBuscado);
    const resultadoBusqueda = document.getElementById('resultadoBusqueda')
    if(clienteEncontrado) {
        resultadoBusqueda.classList.add('cliente');
        resultadoBusqueda.innerHTML = `
        <ul>
            <li>ID: ${clienteEncontrado.id}</li>
            <li>Nombre: ${clienteEncontrado.nombre}</li>
            <li>Número de teléfono: ${clienteEncontrado.numero}</li>
            <li>Fecha de ingreso: ${clienteEncontrado.ingreso}</li>
            <li>Dispositivo: ${clienteEncontrado.dispositivo}</li>
            <li>Diagnostico: ${clienteEncontrado.diagnostico}</li>
            <li>Presupuesto: ${clienteEncontrado.presupuesto}</li>
            <li>Estado de la reparación: ${clienteEncontrado.estado}</li>
        </ul>
        `;
    } else {
        resultadoBusqueda.classList.remove('cliente');
        resultadoBusqueda.innerHTML = `<p>No se encontró el cliente</p>`;
    }
}
    

const agregarCliente = (cliente) => {
    const div = document.createElement('div');
    div.classList.add('cliente');
    div.innerHTML = ` 
        <ul>
            <li>ID: ${cliente.id}</li>
            <li>Nombre: ${cliente.nombre}</li>
            <li>Número de teléfono: ${cliente.numero}</li>
            <li>Fecha de ingreso: ${cliente.ingreso}</li>
            <li>Dispositivo: ${cliente.dispositivo}</li>
            <li>Diagnóstico: ${cliente.diagnostico}</li>
            <li>Presupuesto: ${cliente.presupuesto}</li>
            <li>Estado de la reparación: ${cliente.estado}</li>
            </ul>
            <button class="eliminarCliente">Eliminar cliente</button>
            `
            registrados.appendChild(div);
            
            const botonEliminar = div.querySelector('.eliminarCliente');
            botonEliminar.addEventListener('click', () => {
                eliminarCliente(cliente);
                div.remove();
            })
        }
        
const eliminarCliente = (clienteAEliminar) => {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = clientes.find(cliente => cliente.id == clienteAEliminar.id);
    const index = clientes.indexOf(cliente);
    clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

const body = document.getElementsByTagName('body');
const botonModo = document.getElementById('modo');
let modoOscuro = localStorage.getItem('oscuro');
let modo;

if(modoOscuro == null){
    localStorage.setItem('oscuro', 'desactivado');
    modo = "oscuro";
} else if(modoOscuro == 'activado'){
    body[0].classList.add('modoOscuro');
    modo = "claro";
} else {
    modo = "oscuro";
}

botonModo.textContent = `Modo ${modo}`;

botonModo.addEventListener('click', () => {
    body[0].classList.toggle('modoOscuro')
    if(body[0].classList.contains('modoOscuro')) {
        localStorage.setItem('oscuro', 'activado');
        modo = "claro"
    } else {
        localStorage.setItem('oscuro', 'desactivado');
        modo = "oscuro"
    }
    botonModo.textContent = `Modo ${modo}`;
})

document.addEventListener('DOMContentLoaded', () => {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.forEach(cliente => {
        agregarCliente(cliente);
    });
    if (localStorage.getItem('contadorClientes') == null) {
        localStorage.setItem('contadorClientes', 1);
    }
})
