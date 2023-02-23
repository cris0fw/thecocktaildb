import React from 'react'

const Card = ({info}) => {
  return (
    <div className="col-12 col-md-4 col-lg-3">
    <div className='card'>
      <img src={info.strDrinkThumb} className="card-img-top" height="160px" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{info.strDrink}</h5>
            <h2 className='lead'>Categoria: {info.strCategory}</h2>
        <div className='info'>
            <p>{info.strAlcoholic}</p>
            <p>{info.strGlass}</p>
        </div>
        <p>Tags: {info.strTags}</p>
    
        <button className="btn btn-primary">Ver</button> 
      </div>
    </div>
    </div>
  )
}

export default Card