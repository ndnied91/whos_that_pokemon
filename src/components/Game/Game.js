import React from 'react'

import axios from 'axios'
import './game.scss';

import { checkWinner } from "./functions";
import { checkDesc } from "./functions";
import {typeRender} from "./functions"


class Game extends React.Component{
      constructor(){
        super()
        this.state = { value: '' , name: null  , desc: null , type: null , img: null , show: false , reveal: false , toggle: 'toggleIn'}
      }


  render(){

      let cn1 = ''

      const getPokemon = async () => {
          try {
            const res = await axios.get( `https://app.pokemon-api.xyz/pokemon/random` )
            console.log(res.data.name.english);
            let desc =  res.data.description
            let name = res.data.name.english
            let type = res.data.type
            let img = res.data.hires
            this.setState({  name , desc , type , img, show: true  , reveal: false})

            this.state.toggle === 'toggleIn' ? this.setState({ toggle :'toggleOut'}) : this.setState({ toggle :'toggleIn'})
            console.log('toggle is' , this.state.toggle)

          } catch (error) {
                console.error(error);
          }
        }

          const renderPokemon = () =>{
            return(
              <div className={`content ${this.state.toggle}` } >
                      <img id= {this.state.reveal ? "show" : null }
                       src={this.state.img} />
              </div>
            )
          }


          const renderInfo = ()=>{
            return(
              <div className="content">
                <p> {checkDesc(this.state.desc , this.state.name)} </p>

                <form onSubmit={handleSubmit}>
                <div className="ui input guess">
                   <input type="text" placeholder="Enter Pokemon name" value={this.state.value} onChange={handleChange} />
                   </div>
                 </form>


              </div>
            )
          }



          const handleChange=(event)=> {
            this.setState({value: event.target.value});
          }

          const handleSubmit=(event)=> {
               checkWinner(this.state.value.toLowerCase(), this.state.name.toLowerCase()) ? this.setState({reveal: true }) : this.setState({reveal: false });
               event.preventDefault();
               this.setState({value: '' }); //reset value back to an empty string
             }


               // console.log('toggle is' , this.state.toggle)

    return(
      <div className="ui vertical center aligned segment">
         <div className="main ui container">


                <div id= {this.state.show ? `${this.state.toggle}`:  'onLoad' } > </div>

                  {this.state.show ? null :
                    <button className="onLoadBtn" style={{ 'color' :'white'}}
                      onClick={getPokemon} > Start Game! </button>
                  }

                    {this.state.show? <div className="pic"> {renderPokemon() }</div>  : null}
                    {this.state.show? <div className="info"> {renderInfo() }</div>  : null}

                          <div className="interact">
                              {this.state.show? <div className="type">  {typeRender(this.state.type)} </div>  : null}

                            {this.state.show ?
                              <button className="ui huge button btn" style={{'backgroundColor': '#3B4CCA'  , 'color' :'white'}}
                                        onClick={getPokemon}>  Get Pokemon! </button> : null
                              }

                          </div>

            </div>
        </div>
    )
  }
}


export default Game
