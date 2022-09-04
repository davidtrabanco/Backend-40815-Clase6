import fs from "fs";

export class FileManager{
    constructor(filePath){
        this.filePath = filePath;
    }

    async readFileJSON(){
        try {
            const fileData = await fs.promises.readFile( this.filePath, "utf-8");
            return JSON.parse(fileData);
        } catch (error) {
            console.error(error);
        }
    }

    async writeFileJSON(data){
        try {
            const dataTxt = JSON.stringify(data);
            await fs.promises.writeFile( this.filePath, dataTxt )
            return "saved"
        } catch (error) {
            console.error(error);
        }
    }

    async appendFileJSON(data){
        try {
            const dataTxt = JSON.stringify(data);
            await fs.promises.appendFile( this.filePath, dataTxt )
            return "saved" 
        } catch (error) {
            console.error(error);
        }

    }

    async unlink(){
        try {
            await fs.promises.unlink( this.filePath )
            return "deleted"
        } catch (error) {
            console.error(error);
        }
    }
}