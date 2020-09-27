import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState({})

  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const changeFilterValue = (event) => {
    setFilter(event.target.value)
    setShowCountry({})
  }
  const updateShowCountryClosure = (country) => {
    const updateShowCountry = () => setShowCountry(country)
    return updateShowCountry
  } 
  return(
    <>
      <Filter filter={filter} changeFilterValue={changeFilterValue} />
      <div id="display">
        <Display
          countries={countries}
          filter={filter}
          showCountry={showCountry}
          updateShowCountryClosure={updateShowCountryClosure}
          />
      </div>
    </>
  )
}

export default App