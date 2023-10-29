import React,{useState,useEffect} from 'react';


export const PokemonSelect = ()=>{
const [options, setOptions] = useState([]);
const [selectedValue,setSelectedValue] = useState('');


const getSelectedvalue = ()=> {
    return selectedValue
}


useEffect(() => {
  // Datos en formato CSV
  const csvData = `type,typeClass
All,all
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

  setOptions(options);
}, []);

return (
    <select id="tipo" name="tipo" onChange={(e)=>console.log(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

);
}    


export default PokemonSelect;
