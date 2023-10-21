import React, { useState, useEffect } from 'react'
import {GiCampfire,GiWaterfall,GiElectric
  ,GiIceBolt,GiBoxingGlove,GiPsychicWaves,GiGrassMushroom,
  GiPoisonBottle,GiFlyingTrout,GiHieroglyphLegs,GiDesert,GiFallingRocks,GiLongAntennaeBug,GiGhost,GiSteelClaws,GiSeaDragon,GiPortal} from 'react-icons/gi'
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
          <div className='tarjeta' key={pokemon.name}>
            <div className='imageContent'>
                <div className="image-card">
                 <img className='card-img' src={(pokemon.details)?pokemon.details.sprites.front_default:pokemon.sprites.front_default} />
                </div>  
            </div>
            <div className='pokemonContent'>
              <p className='name'>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</p>
              <div className="descripcion">
                <TypePokemon pokemon={(pokemon.details)?pokemon.details.types:pokemon.types} />
              </div>
            </div>
         </div>
        ))}
     </>
      
    );
  }

  return (
    <>  <div className='contenedorHeader'>
              <h1>Busca Pokémon</h1>
              <input
              className='inputPokemon'
              type="text"
              onChange={handleInputChange}
              placeholder=" Buscar Pokémon"
            />
        </div>
        <div className='contenedor'>
          {renderResults()}
         </div>
    </>
  );
}


function TypePokemon(props){
  return (
    <>
      {props.pokemon.map((typePokemon) => (
        <ul>
            <GetTypeClass type={typePokemon.type.name} />
        </ul>
      ) )
      }
    
    </>

  )
}

function GetTypeClass({type}){
  let typeClass;
  let typeImg;

  switch (type.toLowerCase()) {
    case "water":
      typeClass = "water-type";
      typeImg = <GiWaterfall />;
      break;
    case "fire":
      typeClass = "fire-type";
      typeImg = <GiCampfire />;
      break;
    case "grass":
      typeClass = "grass-type";
      typeImg = <GiGrassMushroom />; 
      break;
    case "electric":
      typeClass = "electric-type";
      typeImg = <GiElectric />
      break;
    case "ice":
      typeClass = "ice-type";
      typeImg = <GiIceBolt />
      break;
    case "fighting":
      typeClass = "fighting-type";
      typeImg = <GiBoxingGlove />
      break;
    case "psychic":
      typeClass = "psychic-type";
      typeImg = <GiPsychicWaves />
      break;
    case "poison":
      typeClass = "poison-type";
      typeImg = <GiPoisonBottle />
      break;
    case "flying":
      typeClass = "flying-type";
      typeImg = <GiFlyingTrout />
      break;
    case "normal":
      typeClass = "normal-type";
      typeImg = <GiHieroglyphLegs />
      break;
    case "ground":
      typeClass = "ground-type";
      typeImg = <GiDesert />
      break;
    case "rock":
      typeClass = "rock-type";
      typeImg = <GiFallingRocks />
      break;
    case "bug":
      typeClass = "bug-type";
      typeImg = <GiLongAntennaeBug />
      break;
    case "ghost":
      typeClass = "ghost-type";
      typeImg = <GiGhost />
      break;
    case "steel":
      typeClass = "steel-type";
      typeImg = <GiSteelClaws />
      break;
    case "dragon":
      typeClass = "dragon-type";
      typeImg = <GiSeaDragon /> 
      break;
    case "dark":
      typeClass = "dark-type";
      typeImg = <GiPortal />
      break;
    case "fairy":
      typeClass = "fairy-type";
      typeImg = <GiFairyWand />
      break;
    default:
      typeClass = "unknown-type";
      typeImg = ''
  }

  return <li className={typeClass}>{type} {typeImg}</li>
}


export default PokemonSearch;
