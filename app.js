function obtenerProductos() {
  return [
    { codigo: 'F001', nombre: 'Martillo', precio: 12.99 },
    { codigo: 'F002', nombre: 'Destornillador', precio: 6.50 },
    { codigo: 'F003', nombre: 'Llave inglesa', precio: 15.75 },
    { codigo: 'F004', nombre: 'Alicate', precio: 9.30 },
    { codigo: 'F005', nombre: 'Cinta métrica', precio: 4.20 },
    { codigo: 'F006', nombre: 'Sierra manual', precio: 14.40 },
    { codigo: 'F007', nombre: 'Taladro eléctrico', precio: 89.99 },
    { codigo: 'F008', nombre: 'Brocas', precio: 18.50 },
    { codigo: 'F009', nombre: 'Nivel de burbuja', precio: 7.25 },
    { codigo: 'F010', nombre: 'Llave de tubo', precio: 20.00 },
    { codigo: 'F011', nombre: 'Cincel', precio: 5.80 },
    { codigo: 'F012', nombre: 'Escalera', precio: 54.99 },
    { codigo: 'F013', nombre: 'Guantes de trabajo', precio: 3.75 },
    { codigo: 'F014', nombre: 'Casco de seguridad', precio: 16.50 },
    { codigo: 'F015', nombre: 'Mascarilla', precio: 2.99 },
    { codigo: 'F016', nombre: 'Gafas de protección', precio: 8.25 },
    { codigo: 'F017', nombre: 'Cúter', precio: 3.40 },
    { codigo: 'F018', nombre: 'Tornillos', precio: 5.00 },
    { codigo: 'F019', nombre: 'Clavos', precio: 4.00 },
    { codigo: 'F020', nombre: 'Tuercas y pernos', precio: 7.75 },
    { codigo: 'F021', nombre: 'Cinta aislante', precio: 1.99 },
    { codigo: 'F022', nombre: 'Silicona', precio: 6.99 },
    { codigo: 'F023', nombre: 'Lija', precio: 0.99 },
    { codigo: 'F024', nombre: 'Soplete', precio: 25.50 },
    { codigo: 'F025', nombre: 'Pintura', precio: 14.99 },
  ];
}



function generar() {
  const productos = obtenerProductos();
  let sql = "CREATE TABLE IF NOT EXISTS productos (codigo VARCHAR(255) NOT NULL UNIQUE, nombre VARCHAR(255) NOT NULL, precio FLOAT(9,2) UNSIGNED NOT NULL);<br>";
  sql += `INSERT INTO productos (nombre, codigo, precio) VALUES <br>`;
  for (let i = 0; i < productos.length; i++) {
    const { codigo, nombre, precio } = productos[i];
    sql += `('${codigo}', '${nombre}', '${precio}'),<br>`;
  }
  
  sql = sql.slice(0, -5);
  sql += ";<br>";

  sql += "CREATE TABLE IF NOT EXISTS ventas (id_venta INT(11) UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT, hora_venta TIME NOT NULL, fecha_venta DATE NOT NULL);<br>";

  sql += `INSERT INTO ventas (id_venta, hora_venta, fecha_venta) VALUES`; 
  for(let i = 1; i < 2001; i++) {
    sql += `('${i}', '${generarHora()}', '${generarFecha()}' ),<br>`;
  }

  sql = sql.slice(0, -5);
  sql += ";<br>";

  sql += `DROP TABLE IF EXISTS ventas_detalle <br>;
  CREATE TABLE IF NOT EXISTS ventas_detalle ( id_venta INT(11) UNSIGNED NOT NULL, codigo VARCHAR(255) NOT NULL, nombre VARCHAR(255) NOT NULL,
  precio FLOAT(9,2) UNSIGNED NOT NULL);<br>`;

  sql += `INSERT INTO ventas_detalle (id_venta, codigo, nombre, precio) VALUES <br>`;
  
  for(let i = 1; i < 2001; i++) {
    const cantidadDetalles = obtenerNumeroAleatorio(1, 20);

    for(let j = 1; j <= cantidadDetalles; j++) {
      const { codigo, nombre, precio } = productos[obtenerNumeroAleatorio(0, productos.length - 1)];
      sql += `('${i}', '${codigo}', '${nombre}', '${precio}'),<br>`;
    }
    sql+= `<br><br>`;
  }
  sql = sql.slice(0, -13);
  sql += ";<br>";
  document.getElementById("texto").innerHTML = sql;
}

function obtenerNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function descargarSQL() {
  let sql = "DROP DATABASE IF EXISTS pos;\n";
  sql += "CREATE DATABASE pos CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;\n";
  sql += "USE pos;\n";
  sql += document.getElementById("texto").innerHTML.replace(/<br>/g, "\n");

  const blob = new Blob([sql], { type: "text/sql;text/plain;charset=UTF-8" });
  const url = URL.createObjectURL(blob);

  // Descargar
  const a = document.createElement("a");
  a.href = url;
  a.download = "ventas.sql";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  console.log('descargando');


}


function generarFecha() {
  const inicio = '1900-01-01';
  const fin = '2024-12-31';

  const inicioMs = new Date(inicio).getTime();
  const finMs = new Date(fin).getTime();

  const fechaAleatoriaMs = Math.random() * (finMs - inicioMs) + inicioMs;
  
  const currentDate = new Date(fechaAleatoriaMs);

  const anio = currentDate.getFullYear();
  const mes = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const dia = String(currentDate.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
}

function generarHora() {

  const horas = Math.floor(Math.random() * 24);
  const minutos = Math.floor(Math.random() * 60);
  const segundos = Math.floor(Math.random() * 60);

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}