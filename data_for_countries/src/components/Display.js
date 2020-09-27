import React from 'react'
import Country from './Country'


const Display = ({countries, filter, showCountry, updateShowCountryClosure}) => {
  const countriesFound = countries.filter(countrie => {
    return countrie.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  })

  if(JSON.stringify(showCountry) !== JSON.stringify({}))
    return(<Country country={showCountry} />)
  else if(filter === '')
    return(<p>Use filter input field to find countries</p>)
  
    else if(countriesFound.length > 10)
    return(<p>Too many matches, specify another filter</p>)
  
  else if(countriesFound.length > 1)
    return(countriesFound.map(country => 
      <p key={country.name}>{country.name} 
       <button onClick={updateShowCountryClosure(country)}>show</button>
      </p>)
    )
  
  else if(countriesFound.length === 1)
    return(<Country country={countriesFound[0]} />)
  
  else
    return(<p>We haven't found country with that name</p>)
}

export default Display