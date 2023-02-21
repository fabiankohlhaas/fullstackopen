import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryName from './components/CountryName'

const App = () => {
  const [selection, setSelection] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])


  useEffect(() => {
    console.log('fetching exchange countries...')
    axios.get(`https://restcountries.com/v3.1/all`).then(response => {
      setCountries(response.data)
      console.log('countries succesfully fetched')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const displayInformation = () => {
    if (countriesToShow.length === 1) {
      return <p>WORKING</p>
    } else if (countriesToShow.length <= 10) {
      return countriesToShow.map(selection => <CountryName countryName={selection.name.common} />)
    } else {
      return <p>Too many matches, specify another filter</p>
    }
  }

  

  const handleChange = event => {
    console.log('Name of first country = ', countries[0].name.common)
    setSelection(event.target.value)
    setCountriesToShow(
      countries.filter(c => c.name.common.toLowerCase().includes(selection.toLowerCase()))
    )
  }

  console.log('countries = ',countries.length)
  console.log('countriesToShow = ',countriesToShow.length)



  return (
    <div>
      <p>
        find countries <input value={selection} onChange={handleChange} />
      </p>
      <div>{displayInformation()}</div>
    </div>
  )
}

export default App

// {countriesToShow.length <= 10 ? (
//   countriesToShow.map(selection => <CountryName selectionName={selection.name.common} />)
// ) : (
//   <p>Too many matches, specify another filter</p>
// )}
