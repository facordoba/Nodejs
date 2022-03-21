const fs = require('fs')
class Contenedor{
    constructor(nameArchive){
        this.nameArchive = nameArchive
    }
    async save(obj){
        try {
            const object = {
                title: obj.title,
                price: obj.price,
                thumbnail : obj.thumbnail,
                id: this.getAll().length + 1
            }
            await fs.promises.appendFile(`./${this.nameArchive}.txt`, `;${JSON.stringify(object)}`)
        } catch (error) {
            throw error            
        }
    }
    getAll(){
        try {
            const content = fs.readFileSync(`./${this.nameArchive}.txt`, 'utf-8')
            if(content == '') return []
            else{
                const array = content.split(';')
                const newArray = array.splice(1,array.length).map(e=>JSON.parse(e))
                return newArray
            }
        } catch (error) {
            throw error
        }
    }
    getById(number){
        try {
            const content = this.getAll()
            if(content == '') return 'Aun no se han cargado productos'
            else{
                return content.find(e=>e.id == number)
            }
        } catch (error) {
            throw error
        }
    }
    async deleteById(number){
        try {
            await fs.promises.readFile(`./${this.nameArchive}.txt`, 'utf-8')
            .then(content => {
                const array = content.split(';')
                const newArray = array.splice(1,array.length).map(e=>JSON.parse(e))
                const arrayFiltered = newArray.filter(e=>e.id != number)
                return arrayFiltered
            })
            .then(arrayFiltered => {
                try {
                    fs.writeFileSync('./productos.txt', '')
                    arrayFiltered.map(e=>{
                        try {
                            fs.appendFileSync(`./${this.nameArchive}.txt`, `;${JSON.stringify(e)}`)
                        } catch (error) {
                            throw error
                        }
                    })
                } catch (error) {
                    throw error
                }
            })
        } catch (error) {
            throw error
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile('./productos.txt', '')
        } catch (error) {
            throw error
        }
    }
}
new Contenedor('productos').save({
    title: 'zanahoria',
    price: 120,
    thumbnail : 'img'
})

console.log(new Contenedor('productos').getAll())

          
   
