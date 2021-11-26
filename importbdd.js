const fs = require("fs")

const Mongoose = require("mongoose")

const donnees = JSON.parse(fs.readFileSync("./chanteurs.json", {encoding:"utf-8"}))


async function connect(){
    await Mongoose.connect("mongodb+srv://dark:59VDd1LoAJPvffTb@theya.oysor.mongodb.net/Pixelmage?retryWrites=true&w=majority")
    const db = Mongoose.connection;
    const images = db.collection("images")

    console.log(images.find({}))

    const categories = db.collection("categories")
    //let test = await categories.find({}).toArray()
    //console.log(test)
    categories.insertOne({category:"chanteurs", id:4})

    const formattedGames = donnees.map((e) => {
        return {
          answer: e.answer,
          aliases: null,
          url: e.url,
          categoryId: 4,
        };
      });
    
    images.insertMany(formattedGames);
}   



// async function main(){

// for (let i=0;i<pokemons.length;i++){
//     query = `INSERT INTO images (url, answer, aliases, "categoryId") VALUES ('${pokemons[i].image}', '${pokemons[i].name.replaceAll("'", "''").replaceAll("_", " ")}', '{"${pokemons[i].aliase.replaceAll("'", "''").replaceAll("_", " ")}"}', 2)`
//     console.log(query)
//     await client.query(query)
    
// }




connect()

console.log("ZAI FINI")

