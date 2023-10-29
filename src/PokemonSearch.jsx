import React, { useState, useEffect } from 'react'
import {WiDirectionRight,WiDirectionLeft} from 'react-icons/wi'
import './PokemonSearch.css';
import {TypePokemon,GetAbilitys} from './PokemonApiConsumer'


function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [pagineo, setPagineo] = useState(0);
  const [selectedValue,setSelectedValue] = useState('');
    

  //funcion que controla el evento change en el input
  const handleInputChange = (e) => {
    setResults([]);
    setSearchTerm(e.target.value.trim().toLowerCase());
  }

  const handelInputButtonNext = () =>{
    setPagineo(pagineo + 30);
  }

  const handelInputButtonBefore=()=>{
    const pagineoPrev = pagineo - 30;
    setPagineo((pagineoPrev<=0)?0:pagineoPrev);
  }

  

  const searchPokemonAPI = (searchTerm) => {
    if (searchTerm === '' && (selectedValue ==='' || selectedValue === 'ALL')) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${pagineo}`)
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
    }
    else if (searchTerm === '' && selectedValue !='ALL')    {
      console.log(selectedValue)
      fetch(`https://pokeapi.co/api/v2/type/${selectedValue.trim()}`)
        .then(response => response.json())
        .then(data => {
          const basicPokemonData = data.pokemon;
          const pokemonPromises = data.pokemon.map(pokemon => fetch(pokemon.pokemon.url).then(response => response.json()));
          
          Promise.all(pokemonPromises)
          .then(detailPokemonData =>{

            const pokemonWithDetails = basicPokemonData.map((basicInfo, index) => ({
              ...basicInfo.pokemon,
              details: detailPokemonData[index]
            }));
            console.log(pokemonWithDetails)
           setResults(pokemonWithDetails)
           //setResults([])
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
  }, [searchTerm,pagineo,selectedValue]);


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
                 <img className='card-img' 
                 src={(pokemon.details)?
                      pokemon.details.sprites.front_default:
                      pokemon.sprites.front_default} />
                </div>  
            </div>
            <div className='pokemonContent'>
              <p className='name'>{(pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1))}</p>
              <div className="descripcion">
                 
                <TypePokemon pokemon={(pokemon.details)?pokemon.details.types:pokemon.types} />
                <GetAbilitys abilities={(pokemon.details)?pokemon.details.abilities:pokemon.abilities}/> 
              </div>
            </div>
         </div>
        ))}
     </>
      
    );
  }

  
   const PokemonSelect = ()=>{
  
    
      // Datos en formato CSV
      const csvData = `type,typeClass
    ALL,all
    water,water-type
    fire,fire-type
    grass,grass-type
    electric,electric-type
    ice,ice-type
    fighting,fighting-type
    psychic,psychic-type
    poison,poison-type
    flying,flying-type
    normal,normal-type
    ground,ground-type
    rock,rock-type
    bug,bug-type
    ghost,ghost-type
    steel,steel-type
    dragon,dragon-type
    dark,dark-type
    fairy,fairy-type`;
    
      // Parsear los datos CSV
      const lines = csvData.split('\n');
      const options = [];
    
      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(',');
        options.push({ value: data[0], label: data[0] });
      }
    
    
  
    
    return (
        <select id="tipo" name="tipo" value={selectedValue} onChange={(e)=>setSelectedValue(e.target.value)}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
    
    );
    }    

  return (
    <>  <div className='contenedorHeader'>
              
              <h1>PokéPex</h1>
              <div className='contentButtons'>
              <button type="button" className='childButton' onClick={handelInputButtonBefore}><WiDirectionLeft/></button>
                <input
                  className='inputPokemon'
                  type="text"
                  onChange={handleInputChange}
                  placeholder=" Buscar Pokémon"
                />
                <button type="button" className='childButton' onClick={handelInputButtonNext}><WiDirectionRight/></button>
                <div className='content_select'>
                    <label htmlFor="tipo">Selecciona un tipo:</label>
                    <PokemonSelect/>
                </div>
            </div>

        </div>
        <div className='contenedor'>
          {renderResults()}
         </div>
    </>
  );
  }


    

export default PokemonSearch;
