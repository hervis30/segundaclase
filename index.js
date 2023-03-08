import express from 'express';//const express=require('express)
const app = express();
const port = 5200;
let activo = false;

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

app.use(factivo)



//endpont para inicio (home page)
app.get('/', (req, res) => {
    res.send(`Inicio`)
})
app.get('/somos', (req, res) => {
    res.send(`Estamos en Quienes somos...`)
})

app.listen(port, () => {
    console.log(`server is runnin in http://localhost:${port}`)
})

