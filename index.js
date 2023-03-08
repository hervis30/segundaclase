import express from 'express';//const express=require('express)
const app = express();
const port = 5200;
let activo = true;
let mName = "";

let dataPer = [
    { id: '47', email: 'pperez@gmail.com', name: 'Pepe perez' },
    { id: '74', email: 'mgomez@gmail.com', name: 'Maria gomez' }
]

function middSession() {
    return (req, res, next) => {
        let xFind = dataPer.find(dper => dper.id == "74" && dper.email == "mgomez@gmail.com")
        if (xFind != undefined) {
            next()
        }
    }
}
function middSessionp(id, email) {
    return (req, res, next) => {
        let xFind = dataPer.find(dper => dper.id == id && dper.email == email)
        if (xFind != undefined) {
            mName = xFind.name
            next()
        }
    }
}


// function seachPer(email) {
//     let findPer = dataPer.find(per => per.email == email);
//     return findPer;
// }

//esta funcion flecha no requiere retornar, el retorno esta implicito
let seachPer = (email) => dataPer.find(per => per.email == email)


// let seachPer=function(email){

// }

//funcion para capturar verificar si esta o no activo
function factivo(req, res, next) {
    if (activo) {
        next();
    }
}

//Middleware
app.use((req, res, next) => {
    if (activo) {
        next();
    } else {
        next(new Error('No puede acceder a ningun recurso del sistema'))
    }
})

//utilizar la funcion factivo como middleware
app.use((req, res, next) => {
    let mFind = seachPer("pperez@gmail.com");
    if (mFind != undefined) {
        //encuentra email
        next();
    }
})

app.use(factivo)



//endpont para inicio (home page)
app.get('/', (req, res) => {
    res.send(`Inicio`)
})
app.get('/somos', (req, res) => {
    res.send(`Estamos en Quienes somos...`)
})
app.get('/session', middSession(), (req, res) => {
    res.send("ha iniciado sesion");
})
app.get('/sessionp', middSessionp("47", "pperez@gmail.com"), (req, res) => {
    res.send(`ha iniciado sesion en ruta sessionp. Bienvenido ${mName}`);
})

app.listen(port, () => {
    console.log(`server is runnin in http://localhost:${port}`)
})

