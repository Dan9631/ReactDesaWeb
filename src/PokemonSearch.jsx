import React, { useState, useEffect } from 'react';
import './PokemonSearch.css';

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setResults([]);
    setSearchTerm(e.target.value.trim().toLowerCase());
  }

  const searchPokemonAPI = (searchTerm) => {
    if (searchTerm === '') {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
        .then(response => response.json())
        .then(data => {
          const basicPokemonData = data.results;
          const pokemonPromises = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
          
          Promise.all(pokemonPromises)
          .then(detailPokemonData =>{

            const pokemonWithDetails = basicPokemonData.map((basicInfo, index) => ({
              ...basicInfo,
              details: detailPokemonData[index]
            }));
           
            setResults(pokemonWithDetails)
          })
        })

    } else {
       fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => response.json())
        .then(data => setResults([data]));
    }
  }



  const performSearch = () => {
    searchPokemonAPI(searchTerm)
  }

  //valida que el valor de searchTerm cambie
  useEffect(() => {
    performSearch();
  }, [searchTerm]);

  const renderResults = () => {
    if (results.length === 0) {
      return <p>No se encontraron resultados.</p>;
    }
    return (
      <>
        {results.map((pokemon) => (
          <div key={pokemon.name}>
          <p>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</p>
          <TypePokemon pokemon={(pokemon.details)?pokemon.details.types:pokemon.types} />
          <img src={(pokemon.details)?pokemon.details.sprites.front_default:pokemon.sprites.front_default} />
          </div>
        ))}
     </>
      
    );
  }

  return (
    <>
        <input
        type="text"
        onChange={handleInputChange}
        placeholder="Buscar Pokémon"
      />
        <div className='caja'>
          {renderResults()}
        </div>
    </>
  );
}


function TypePokemon(props){
  console.log(props.pokemon)
  return (
    <>
      {props.pokemon.map((typePokemon) => (
        <ul>
            <li>{typePokemon.type.name}</li>
        </ul>
      ) )
      }
    
    </>

  )
}

export default PokemonSearch;
