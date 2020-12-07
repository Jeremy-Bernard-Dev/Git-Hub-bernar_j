import React from 'react'

const Poke_Info = ({pokemon}) => {
    return (
      <div className="card text-center mx-auto" style={{"maxWidth" : "18rem", "height" : "250px"}} key={pokemon.id}>
        <div className="card-header"><b>{pokemon.name}</b></div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Id: {pokemon.id}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Type: {pokemon.types[0].type.name}</h6>
          {pokemon.types.length > 1 &&
            <h6 className="card-subtitle mb-2 text-muted">Type 2: {pokemon.types[1].type.name}</h6>
          }
          {pokemon.sprites != null &&
            <img src={pokemon.sprites['front_default']} />
          }
        </div>
      </div>
    )
};

export default Poke_Info