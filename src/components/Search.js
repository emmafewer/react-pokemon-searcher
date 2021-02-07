import React from 'react'

const Search = props => {
  return (
    <div className="ui search" onChange={(e) => props.filterPokemon(e, props.pokemon)}>
      <div className="ui icon input">
        <input className="prompt"/>
        <i className="search icon" />
      </div>
    </div>
  )
}



export default Search
