

export const checkWinner = (name,pokemon)=> name === pokemon


export const checkDesc = (desc , pokemon) => {
  if( desc.indexOf(pokemon) >=0){  return desc.replaceAll(pokemon, '___') }
  return desc
}

export const typeRender = type =>{
  let str =''

    for ( let i in type){
      str = str + type[i] + " "
   }
  return str
}
