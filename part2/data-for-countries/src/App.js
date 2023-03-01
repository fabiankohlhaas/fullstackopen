import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryName from './components/CountryName'
import CountryDetails from './components/CountryDetails.js'

const App = () => {
  const [selection, setSelection] = useState('')
  const [countries, setCountries] = useState([])

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
  // console.log('countriesToShow = ', countriesToShow.length)

  const contentToDisplay =
    selection.length === 0
      ? []
      : countries.filter(countrie =>
          countrie.name.common.toLowerCase().includes(selection.toLowerCase())
        )

  console.log('contentToDisplay = ', contentToDisplay)


  return (
    <div>
      <form>
        find countries <input value={selection} onChange={handleChange} />
      </form>
      <div>
        {contentToDisplay.length === 1 ? (
          <CountryDetails
            key={contentToDisplay[0].ccn3 + contentToDisplay[0].cca3}
            countryName={contentToDisplay[0].name.common}
            capital={contentToDisplay[0].capital}
            area={contentToDisplay[0].area}
            languages={Object.values(contentToDisplay[0].languages)}
            flag={contentToDisplay[0].flags.png}
            alt={contentToDisplay[0].flags.alt}></CountryDetails>
        ) : (
          contentToDisplay.map(countrie => (
            <CountryName
              key={countrie.ccn3 + countrie.cca3}
              countryName={countrie.name.common}
              setSelection={setSelection}
              ></CountryName>
          ))
        )}
      
      </div>
    </div>
  )
}

export default App
