import {useState, useEffect} from 'react';
import styles from '../styles/Pokemonlist.module.css';

function PokemonList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [filteredpokemon, setFilteredpokemon] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
            .then((response) => response.json())
            .then(({results}) => Promise.all(results.map(({url}) => fetch(url).then((response) => response.json()))))
            .then((pokemonData) => {
                setPokemon(pokemonData)
                setFilteredpokemon(pokemonData)
            });
    }, []);

    const handleSearchClick = () => {
        console.log(searchTerm)
        if (searchTerm !== "") {
            const filtered = pokemon.filter((poke) =>
                poke.name.includes(searchTerm.toLowerCase())
            );
            setFilteredpokemon(filtered)
        } else {
            setFilteredpokemon(pokemon)
        }
        setSearchTerm("")
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div>
                <h1 className={styles.title}>Pokemon List</h1>
                <div className={styles.inputcontainer}>
                    <input
                        type="text"
                        placeholder="Search for a Pokemon"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className={styles.inputfield}
                    />

                    <button onClick={handleSearchClick} className={styles.searchbutton}>Search</button>
                </div>
            </div>
            <div className={styles.pokemonlist}>
                {filteredpokemon.map(({id, name, sprites, types, height, weight}) => (
                    <div className={styles.pokemoncard} key={id}>
                        <img src={sprites.front_default} className={styles.image}/>
                        <h1 className={styles.name}>{name}</h1>
                        <h2 className={styles.type}>Type: {types[0].type.name}</h2>
                        <h2 className={styles.height}>Height: {height}</h2>
                        <h2 className={styles.weight}>Weight: {weight}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
