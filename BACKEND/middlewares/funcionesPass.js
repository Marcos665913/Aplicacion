var crypto= require("crypto");
const { Model } = require("firebase-admin/machine-learning");

function encryptPass(password){
    var salt=crypto.randomBytes(32).toString("hex");
    //console.log(salt);
    const hash=crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    //console.log(hash);
    return {
        salt,
        hash
    }
}

function validarPass(password, hash, salt){
    const hashValid=crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    return hashValid==hash;
}

function usuarioAuto() {
    var autorizado=false;
    return autorizado;
}

function adminAuto(){
    var autorizado=false;
    return autorizado;
}

module.exports={
    encryptPass,
    validarPass,
    usuarioAuto,
    adminAuto
}
//encryptPass("hola");