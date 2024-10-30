function saludar(){
    console.log("Hola");
}
saludar();

function saludar2(nombre="anonimo") {
    console.log("Hola "+nombre);
}
saludar2("Diego");

function saludar3(nombre="anonimo") {
    var s = "Hola " + nombre;
    return s;
}
console.log(saludar3("Santiago"));

//Función de flecha
var saludo=(nombre)=>{
    console.log("Hola "+nombre);
}
saludo("Marco");

var saludo2=(nombre)=>{
    console.log("Hola "+nombre);
}
saludo2("Matias");

var saludo3=(nombre)=>{
    var s ="Hola "+nombre;
    return s;
}
console.log(saludo3("Ana"));

var saludo4=nombre=>"Hola "+nombre;
console.log(saludo4("Martin"));

console.log((nombre="anonimo")=>"Hola "+nombre);

var saludo5=function(){
    console.log("Hola");
}
saludo5();

var saludo6=()=>{
    console.log("Saludo6");
}

var saludo7=(nombre, s)=>{
    console.log("Hola "+nombre);
    s();
}

saludo7("Mozart", saludo6);