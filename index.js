import express from "express";
import {productos} from "./Contenedor.js";

//Creo el servidor
const app = express();
const PORT = process.env.PORT || 8080
const server = app.listen( PORT, ()=>{
    console.log(`Server UP on PORT:${server.address().port}`);
})

app.get("/productos", async (req, res)=>{
    const allProducts = await productos.getAll();
    res.json(allProducts)
})

app.get("/productosRandom", async (req, res)=>{
    const randomProduct = await productos.getRandom();
    res.json(randomProduct)
})
