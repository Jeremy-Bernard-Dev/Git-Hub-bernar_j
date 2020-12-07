import React from 'react';
import {Component} from 'react';
import "./App.css"
import PokemonList from './PokemonList';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pokemons : [],
      pokemonDetails : [],
      offset : 0,
      loadNumber : 50,
      type : ""
    }
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.handleChangeNumber20Click = this.handleChangeNumber20Click.bind(this);
    this.handleChangeNumber40Click = this.handleChangeNumber40Click.bind(this);
    this.handleChangeNumber50Click = this.handleChangeNumber50Click.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchPokemon();
  }
  
  fetchPokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon?offset="+ this.state.offset + "&limit=" + this.state.loadNumber;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        this.setState({pokemons : data.results}, () => {
          this.state.pokemons.map(pokemon => {
            fetch(pokemon.url)
            .then(response => response.json())
            .then(data => {
              if (data) {
                console.log(data)
                var temp = this.state.pokemonDetails
                temp.push(data)
                this.setState({pokemonDetails: temp})
              }            
            })
            .catch(console.log)
            return 1
          })
          console.log(data)
        })        
      }  
    })
    .catch(console.log)
  }

  fetchByTypes() {
    let url = "https://pokeapi.co/api/v2/type/" + this.state.type;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        this.setState({pokemons : data.pokemon}, () => {
          this.state.pokemons.map(pokemon => {
              fetch(pokemon.pokemon.url)
              .then(response => response.json())
              .then(data => {
                if (data) {
                  var temp = this.state.pokemonDetails
                  temp.push(data)
                  this.setState({pokemonDetails: temp})
                }
              })
              .catch(console.log)
            return 1
          })
          console.log(data)
        })
      }
    })
    .catch(console.log)
  }

  handleNextClick() {
    let newOffset = this.state.offset+this.state.loadNumber;
    if(newOffset > 0 || newOffset < 1050) {
      this.setState({offset: newOffset, pokemonDetails: []}, () => {
        console.log("Offset: " + this.state.offset)
        this.fetchPokemon();
      });
    }
  }

  handlePreviousClick() {
    let newOffset = this.state.offset-this.state.loadNumber;
    if(newOffset < 0) {
      newOffset = 0
    }
    if(newOffset > 0 || newOffset === 0 ) {
      this.setState({offset: newOffset, pokemonDetails: []}, () => {
        console.log("Offset: " + this.state.offset)
        this.fetchPokemon();
      });
    }

  }

  handleTypeClick() {
    if(this.state.type !== null && this.state.type !== "") {
      this.setState({pokemonDetails: []}, () => {
        this.fetchByTypes();
      });
    }
  }

  handleChangeNumber20Click() {
    this.setState({loadNumber: 20, pokemonDetails: []}, () => {
      this.fetchPokemon();
    });
  }
  handleChangeNumber40Click() {
    this.setState({loadNumber: 40, pokemonDetails: []}, () => {
      this.fetchPokemon();
    });
  }
  handleChangeNumber50Click() {
    this.setState({loadNumber: 50, pokemonDetails: []}, () => {
      this.fetchPokemon();
    });
  }

  handleChange(event) {
    this.setState({type: event.target.value});
  }

  render() {
    const {pokemonDetails} = this.state;

    this.state.pokemonDetails.sort((a, b) => (a.id > b.id) ? 1 : -1);

    const renderedPokemonList = pokemonDetails.map((pokemon) => {
      return (<PokemonList pokemon={pokemon} />);
    });

    return (
      <div style={{"text-align" : "center"}}>
        <header style={{"height" : "100px", "backgroundColor" : "#2e2e82", "color" : "white", "display" : "flex", "margin-bottom" : "10px"}}>
        <div style={{"margin" : "auto auto"}}><h2>POKEDEX</h2></div>
        </header>
        <div style={{"height" : "40px", "backgroundColor" : "#f7f7f7", "color" : "white", "display" : "flex", "margin-bottom" : "10px"}}>
          <button type="button" class="btn btn-primary"style={{"margin-right" : "auto", "width": "180px"}}  onClick={this.handlePreviousClick}>Load Previous Page</button>
          <div>
            <button type="button" class="btn btn-primary" onClick={this.handleChangeNumber20Click}>20</button>
            <button type="button" class="btn btn-primary" onClick={this.handleChangeNumber40Click}>40</button>
            <button type="button" class="btn btn-primary" onClick={this.handleChangeNumber50Click}>50</button>
          </div>
          <button type="button" class="btn btn-primary" style={{"margin-left" : "auto",  "width": "180px"}} onClick={this.handleNextClick}>Load Next Page</button>
        </div>
        <div style={{"height" : "40px", "backgroundColor" : "#f7f7f7", "color" : "white", "display" : "flex", "margin-bottom" : "50px"}}>
          <div style={{"margin-left" : "auto" , "margin-right" : "auto"}}>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleChange.bind(this)}
          />
          <button type="button" class="btn btn-primary" onClick={this.handleTypeClick}>Load type Page</button>

          </div>
          
        </div>
        

        <div className="card-columns">
          
          {renderedPokemonList}
          
        </div>

        <div style={{"height" : "40px", "backgroundColor" : "#f7f7f7", "color" : "white", "display" : "flex", "margin-top" : "50px"}}>
          <button type="button" class="btn btn-primary" onClick={this.handlePreviousClick}>Load Previous Page</button>
          <button type="button" class="btn btn-primary" style={{"margin-left" : "auto"}} onClick={this.handleNextClick}>Load Next Page</button>
        </div>
        <footer style={{"height" : "100px", "backgroundColor" : "#2e2e82", "color" : "white", "display" : "flex", "margin-top" : "20px"}}>
        <div style={{"margin" : "auto auto"}}>© 2020 Copyright: ETNA STUDENTS</div>
        </footer>
      </div>

      
      
    );
  }
}

export default App;