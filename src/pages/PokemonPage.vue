<template>
    <h1 v-if="!pokemon">Espere por favor... </h1>
    <div v-if="pokemon">
        <h1>Quien es el pokemon?</h1>
        <!-- TODO: IMG -->
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon = 'showPokemon'/>
        <!-- TODO: Opciones -->
        <PokemonOptions :pokemons='pokemonArr' 
            @selection="checkAnswer"
        />

        <template v-if="showAnswer">
            <h2 class="fade-in">
                {{message}}
            </h2>
            <button @click="newGame">Nuevo juego</button>
        </template>
    </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'
import getPokemonOptions from '@/helpers/helpers/getPokemonOptions'

// console.log(getPokemonOptions());
//getPokemonOptions()
export default {
    components:{
        PokemonOptions, PokemonPicture
    },
    data(){
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''

        }
    },
    methods:{
         async mixPokemonArray(){
            this.pokemonArr = await getPokemonOptions();
            // console.log(this.pokemonArr)
            const random = Math.floor( Math.random() * 4 );
            this.pokemon = this.pokemonArr[random];
        },
        checkAnswer(pokemonId){
            // console.log('pokemon check llamado',pokemonId)
            this.showAnswer = true;
            this.showPokemon = true;
            if(pokemonId === this.pokemon.id){
                this.message = `Correcto, ${this.pokemon.name}`;
            }else {
                this.message = `Incorrecto, era ${this.pokemon.name}`;
            }
        },
        newGame(){
            this.showAnswer = false;
            this.showPokemon = false;
            this.pokemon = null;
            this.mixPokemonArray();
        }
    },
    mounted(){
        this.mixPokemonArray()
    }

}
</script>

<style>

</style>