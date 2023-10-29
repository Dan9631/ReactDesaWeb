import {GiCampfire,GiWaterfall,GiElectric,GiFairyWand
  ,GiIceBolt,GiBoxingGlove,GiPsychicWaves,GiGrassMushroom,
  GiPoisonBottle,GiFlyingTrout,GiHieroglyphLegs,GiDesert,GiFallingRocks,GiLongAntennaeBug,GiGhost,GiSteelClaws,GiSeaDragon,GiPortal} from 'react-icons/gi'



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

//function return all types the pokemon
export function TypePokemon(props){
  return (
    <ul>
      {props.pokemon.map((typePokemon) => (
            <GetTypeClass type={typePokemon.type.name} />
      ) )
      }
    
    </ul>

  )
}



//function get Abilitis to pokemon
export function GetAbilitys({abilities}){
  return (
    <div>
      
      <ul className='abilities_pokemon'>
        <div className='header_abilities'>
          <h5 className='tittleAbilities'>Habilidades</h5>
        </div>
      <hr/>
      {abilities.map((abilitys) => (
           <li>{abilitys.ability.name}</li>
           
          ) 
        )
      }
       </ul>
    </div>

  )
}