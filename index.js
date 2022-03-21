const fs = require('fs')
class Contenedor{
    constructor(archive){
        this.archive = archive
    }
    static id = 0
    save(object){
        //incorpora un id numerico autoincrementado
        if(Contenedor.id == 0 ){
            try {
                console.log('creando archivo...')
                fs.writeFileSync(`./${this.archive}.txt`, JSON.stringify([]))
                Contenedor.id++
                console.log('archivo creado exitosamente')
                const obj = {
                    title: object.title,
                    price: object.price,
                    thumbnail : object.thumbnail,
                    id: Contenedor.id
                }
                fs.writeFileSync(`./${this.archive}.txt`, JSON.stringify([obj]))
                console.log('objeto guardado')
                Contenedor.id++
            } catch (error) {
                throw error
            }
        }
        else{
            const obj = {
                title: object.title,
                price: object.price,
                thumbnail : object.thumbnail,
                id: Contenedor.id
            }
            try {
                console.log('archivo existente, guardando objeto...')
                const data = fs.readFileSync(`./${this.archive}.txt`, 'utf-8')
                const arrayObject = JSON.parse(data)
                arrayObject.push(obj)
                fs.writeFileSync(`./${this.archive}.txt`, JSON.stringify(arrayObject))
                console.log('objeto guardado correctamente')
                Contenedor.id++
            } catch (error) {
                throw error
            }

        }
    }
    getById(number){ // las funciones que retorna no lo hago con promesas porque imprimen pending
        //retorna un objeto
        try {
            const data = fs.readFileSync(`./${this.archive}.txt`, 'utf-8')
            const arrayObject = JSON.parse(data)
            const objFinded =  arrayObject.find(e=>e.id == number)
            if(objFinded == undefined) return 'no existe objeto con ese id'
            else return objFinded
        } catch (error) {
            console.log('error en getById() devido a que no existe el archivo buscado aun o no se espeficio la ruta')
            return '' 
        }
    }
    getAll(){
        //retorna un array de objetos
        try {
            const data = fs.readFileSync(`./${this.archive}.txt`, 'utf-8')
            const arrayObject = JSON.parse(data)
            return arrayObject
        } catch (error) {
            console.log('error en getAll() devido a que no existe el archivo buscado aun o no se espeficio la ruta')
        }
    }
    async deleteById(number){
        //elimina el objeto
        try {
            await fs.promises.readFile(`./${this.archive}.txt`, 'utf-8')
            .then(data =>{
                const arrayObject = JSON.parse(data)
                const arrayFiltered = arrayObject.filter(e=>e.id != number)
                return arrayFiltered
            })
            .then(array=>{
                fs.writeFile(`./${this.archive}.txt`, JSON.stringify(array), function(error){
                    if(error) console.log('ocurrio un error en deleteById()')
                    else console.log('object borrado')
                })
            })
        } catch (error) {
            console.log('error en dateteById() devido que no existe el archivo o no se especifico la ruta')
            
        }
    }
    async deleteAll(){
        //elimina todo
        try {
            await fs.promises.unlink(`./${this.archive}.txt`)
            console.log('archivo borrado correctamente')
        } catch (error) {
            console.log('error en dateteAll() devido que no existe el archivo o no se especifico la ruta')
        }
    }
}
/* new Contenedor('productos').save({
    title: 'sandia',
    price: 20,
    thumbnail: 'img'
})
new Contenedor('productos').save({
    title: 'sandia',
    price: 39,
    thumbnail: 'img'
})
new Contenedor('productos').save({
    title: 'mani',
    price: 20,
    thumbnail: 'img'
})
new Contenedor('productos').save({
    title: 'melon',
    price: 20,
    thumbnail: 'img'
})
console.log(new Contenedor('productos').getById(4))
console.log(new Contenedor('productos').getAll()) */
//new Contenedor('productos').deleteAll()
//new Contenedor('productos').deleteById(1)
console.log(new Contenedor('productos').getAll())
