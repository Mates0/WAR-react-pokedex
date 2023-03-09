import {useState, useEffect} from 'react';
import styles from '../styles/Pokemonlist.module.css';

function PokemonList() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=42')
            .then((response) => response.json())
            .then(({results}) => Promise.all(results.map(({url}) => fetch(url).then((response) => response.json()))))
            .then((pokemonData) => setPokemon(pokemonData));
    }, []);

    return (
        <div>
            <h1 className={styles.title}>Pokemon List</h1>
            <div className={styles.pokemonlist}>
                {pokemon.map(({id, name, sprites, types}) => (
                    <div className={styles.pokemoncard} key={id}>
                        <img src={sprites.front_default} className={styles.image}/>
                        <h1 className={styles.name}>{name}</h1>
                        <h2 className={styles.type}>Type: {types[0].type.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
