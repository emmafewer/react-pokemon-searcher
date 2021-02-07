import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    filter: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(json => this.setState({pokemon: json, filter: json}))
  }

  filterPokemon = (e, pokemon) => {
    let target = e.target.value
    let length = e.target.value.length
    let searchResults = pokemon.filter(pokemon => pokemon.name.substring(0, length) === target)
    this.setState({filter: searchResults})
  }

  addPokemon = (e) => {
    e.preventDefault()
    let pokemon = {
      name: e.target.name.value,
      hp: e.target.hp.value,
      sprites: {
        front: e.target.frontUrl.value,
        back: e.target.backUrl.value
      }
    }
    this.postPokemon(pokemon)
  }

  postPokemon = (pokemon) => {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
    .then(resp => resp.json())
    .then(pokemon => this.setState({pokemon:[...this.state.pokemon, pokemon], filter:[...this.state.filter, pokemon]}))
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search pokemon={this.state.pokemon} filterPokemon={this.filterPokemon}/>
        <br />
        <PokemonCollection pokemon={this.state.filter}/>
      </Container>
    )
  }
}

export default PokemonPage
