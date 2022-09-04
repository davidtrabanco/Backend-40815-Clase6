import {FileManager} from "./FileManager.js";
class Contenedor extends FileManager{
    constructor(filePath){
        super(filePath);
        this.objects = [];
        this.lastId = 0;
    }

    async getAll(){
        //leo el contenido del archivo y lo cargo en la variable
        this.objects = await this.readFileJSON();
        
        //obtengo el último ID:
        if(this.objects.length != 0){
            this.lastId = this.objects[this.objects.length-1].id
        }

        return this.objects;
    }

    async save(object){
        //obtengo el último id:
        await this.getAll();

        //Agrego el ID al objeto enviado
        this.lastId++;
        object['id'] = this.lastId;

        //Agrego el objeto nuevo al array
        this.objects.push(object);

        //guardo el objeto en el archivo
        await this.writeFileJSON(this.objects)

        return object.id;
    }

    async getById(id){
        //actualizo en memoria todos los registros
        await this.getAll();

        //retorno el objecto filtrado:
        const objFound = this.objects.filter( obj=> obj.id == id);
        
        return objFound[0] === undefined ? null : objFound[0];
    }

    async getRandom(){
        let idRandom = 0
        let product

        do {
            idRandom = parseInt(Math.random() * this.lastId + 1)
            product = await this.getById(idRandom);
            console.log(product);
        } while (product === null);

        return product
    }

    async deleteById(id){
        //actualizo en memoria todos los registros
        await this.getAll();

        //Elimino el registro indicado mediante filtro y lo guardo
        this.objects = this.objects.filter( (obj) => obj.id != id );
        await this.writeFileJSON( this.objects );
    }

    async deleteAll(){
        this.objects = [];
        this.writeFileJSON( this.objects );
    }
    
}

// let filePath = path.parse(__dirname); //obtengo el directorio de trabajo
// filePath = `${filePath.dir}\\${filePath.base}\\products.json`; //creo la ruta
const filePath = "./products.json"
export const productos = new Contenedor(filePath);