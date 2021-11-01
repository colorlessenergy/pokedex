import { useState } from 'react';

const searchPokemonForm = ({ setIsLoading, setPokemon }) => {
    const [ pokemonData, setPokemonData ] = useState({
        name: '',
        isShiny: false,
    });

    const [ formValidation, setFormValidation ] = useState({
        name: ''
    });

    const handleInputChange = (event) => {
        setPokemonData(previousPokemonData => ({ ...previousPokemonData, name: event.target.value.toLowerCase().trim() }));
    }
  
    const handleCheckboxChange = (event) => {
        setPokemonData(previousPokemonData => ({...previousPokemonData, isShiny: event.target.checked }));
    }
  
    const searchPokemon = (event) => {
        event.preventDefault();
        setFormValidation('');

        if (pokemonData.name === '') {
            return setFormValidation(previousFormValidation => ({ ...previousFormValidation, name: 'pokemon name is missing' }));
        }
        
        setIsLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemonData.name }`)
            .then(response => {
                if (response.ok === false) {
                    return fetch('https://pokeapi.co/api/v2/pokemon/unown').then(response => response.json());
                }

                return response.json();
            })
            .then(pokemon => {
                setIsLoading(false);
                
                const image = pokemonData.isShiny ? (pokemon.sprites.front_shiny) : (pokemon.sprites.front_default);
                setPokemon({ image: image, name: pokemon.name });
                setPokemonData({ name: '', isShiny: false });
            });
    }
  
    return (
        <form onSubmit={ searchPokemon }>
            <div className="flex flex-direction-column align-items-start">
                <label htmlFor="pokemon">
                    pokemon name
                </label>
                <input 
                    onChange={ handleInputChange }
                    value={ pokemonData.name }
                    autoComplete="off"
                    type="text"
                    id="pokemon" />

                { formValidation.name ? (
                    <div className="text-red">
                        { formValidation.name }
                    </div>
                ) : (null) }
            </div>
            <div className="flex flex-direction-column align-items-start mt-1">
                <label htmlFor="shiny">
                    shiny
                </label>
                <input
                    onChange={ handleCheckboxChange }
                    value="shiny"
                    checked={ pokemonData.isShiny }
                    type="checkbox"
                    id="shiny" />
            </div>
            
            <button className="mt-1">search pokemon</button>
        </form>
    );
}

export default searchPokemonForm;