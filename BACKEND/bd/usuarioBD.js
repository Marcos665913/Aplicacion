const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../modelos/UsuarioModelo");
const {encryptPass, validarPass, usuarioAuto, adminAuto}= require("../middlewares/funcionesPass")

function validarDatos(usuario){
    var valido=false;
    if(usuario.nombre!=undefined && usuario.usuario!=undefined && usuario.password!=undefined){
        valido=true;
    }
    return valido;
}

async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get();
    //console.log(usuarios);
    usuariosValidos=[];
    usuarios.forEach(usuario => {
        const usuario1=new Usuario({id:usuario.id, ...usuario.data()});
        if(validarDatos(usuario1.getUsuario)){
            usuariosValidos.push(usuario1.getUsuario);
        }
    });
    //console.log(usuariosValidos);
    return usuariosValidos;
}

async function busXId(id){
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id, ...usuario.data()});
    var usuarioValido;
    if (validarDatos(usuario1.getUsuario)){
        usuarioValido=usuario1.getUsuario;
    }
    //console.log(usuarioValido);
    return usuarioValido;
}

async function newUser(data) {
    const {salt,hash}=encryptPass(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
    //console.log(usuario1.getUsuario);
    var usuarioValido=false;
    if (validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido=true;
    }
    return usuarioValido;
}

async function deleteUser(id) {
    var usuarioValido=await busXId(id);
    var usuarioBorrado=false;
    if(usuarioValido){
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true;
    }
    return usuarioBorrado;
}

async function editUser(id, newData) {
    // Obtener el usuario existente de la base de datos
    var usuarioExistente = await busXId(id);
    var usuarioEditado = false;

    // Si el usuario existe, proceder con la edición
    if (usuarioExistente) {
        // Crear un objeto con solo los campos permitidos para actualizar
        const usuarioActualizado = {};

        if (newData.nombre !== undefined) {
            usuarioActualizado.nombre = newData.nombre;
        }
        if (newData.usuario !== undefined) {
            usuarioActualizado.usuario = newData.usuario;
        }
        if (newData.password !== undefined) {
            usuarioActualizado.password = newData.password;
        }

        // Validar si hay al menos un campo que actualizar
        if (Object.keys(usuarioActualizado).length > 0) {
            // Actualizar el usuario en la base de datos
            await usuariosBD.doc(id).update(usuarioActualizado);
            usuarioEditado = true;
        }
    }

    return usuarioEditado;
}


module.exports = {
    mostrarUsuarios,
    busXId,
    deleteUser,
    newUser,
    editUser // Exportar la función
};

