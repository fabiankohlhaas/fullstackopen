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


  const handleChange = event => {
    setSelection(event.target.value)
    console.log('selection in handler:', selection)
  }

  console.log('selection after handler:', selection)

  console.log('countries = ', countries.length)
  console.log('countriesToShow = ', countriesToShow.length)

  const contentToDisplay = 
    selection.length === 0
      ? []
      : countries.filter(countrie => countrie.name.common.toLowerCase().includes(selection.toLowerCase()))

  return (
    <div>
      <form>
        find countries <input value={selection} onChange={handleChange} />
      </form>
      <div>
          {contentToDisplay.map(countrie => (
            <CountryName key={countrie.ccn3 + countrie.cca3} countryName={countrie.name.common}></CountryName>
          ))}
      </div>
    </div>
  )
}

export default App