import pokemonApi from "@/api/pokemonApi";

const getPokemons =() =>{
    const pokemonArr = Array.from(650);
    for (let i = 1; i <= 650; i++) {
        pokemonArr.push(i);
    }
    return pokemonArr
}
const getPokemonOptions = async () =>{
    let myArray = getPokemons();
    for (let i = myArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [myArray[i], myArray[j]] = [myArray[j], myArray[i]]; 
    }
    const pokemons = await getPokemonName(myArray.splice(0,4))
    console.table(pokemons)
    return pokemons
    
}
const getPokemonName = async ([a,b,c,d] = []) =>{
    // console.log(a,b,c,d)
    // const res = await pokemonApi.get(`/1`)
    // console.log(res.data.name) //saber el nombre del pokemon
    // console.log(a,b,c,d)\
    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
        
    ]
     const [p1,p2,p3,p4] = await Promise.all (promiseArr )
    
     return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id }
     ]
     
}
export default getPokemonOptions
