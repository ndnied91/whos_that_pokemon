import React from 'react'

import Game from '../Game/Game'

import './app.scss'

class App extends React.Component{
  render(){
    return(
      <div >
          <h1 id="title"> WHOS THAT POKEMON </h1>
            <Game/>

       </div>
    )
  }
}


export default App
