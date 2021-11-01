import { useEffect, useState } from 'react';
import Head from 'next/head';

import SearchPokemonForm from '../shared/components/SearchPokemonForm';
import Loading from '../shared/components/Loading/Loading';
import DisplayPokemon from '../shared/components/DisplayPokemon';

export default function Home () {
    let [ pokemon, setPokemon ] = useState({});
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/ditto')
            .then(response => response.json())
            .then(pokemon => setPokemon({ image: pokemon.sprites.front_default, name: pokemon.name }));
    }, []);
  
    const [ isLoading, setIsLoading ] = useState(false);
    return (
        <div>
            <Head>
                <title>pokedex</title>
                <meta name="description" content="pokedex" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <SearchPokemonForm setIsLoading={ setIsLoading } setPokemon={ setPokemon } />

                { isLoading ? (
                    <div className="text-center">
                        <Loading />
                    </div>
                ) : (
                    <DisplayPokemon pokemon={ pokemon } />
                ) }
            </div>
        </div>
    );
}
