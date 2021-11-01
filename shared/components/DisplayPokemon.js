const DisplayPokemon = ({ pokemon }) => {
    return (
        <div  className="text-center">
            <h1>{ pokemon.name }</h1>
            <img
                className="pokemon-image"
                src={ pokemon.image }
                title={ pokemon.name }
                alt={ pokemon.name } />
        </div>
    );
}

export default DisplayPokemon;