import { useState, useEffect } from 'react'
import entryService from './services/entries'
import Searchbar from './components/Searchbar'
import InputField from './components/InputField'
import AllEntries from './components/AllEntries'

const App = () => {
  // State that contains an array with the phonebooks entrys.
  // setPersons updates the state with new entrys
  const [persons, setPersons] = useState([])

  // To fetch the data from a local JSON - server using effect hook: https://reactjs.org/docs/hooks-effect.html
  // The communication with the backend is done via the entries.js module.
  useEffect(() => {
    entryService.getAll().then(initialEntrys => {
      setPersons(initialEntrys)
    })
  }, [])

  // Other necessary state hooks [variable, setVariable]
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  // Function to check if a value (name) is already in the persons array
  // The some() method works similar to the find() method, but returns a boolean
  // instead of the found object:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  // JSON.stringify is used to compare the two objects without false results
  // More on this here: https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/
  // const objectInPersons = object => persons.some(p => JSON.stringify(p) === JSON.stringify(object))

  const objectInPersons = object => {
    const filteredPersons = persons.filter(person => {
      return person.name === newName && person.number === object.number
    }).length

    let result = false
    filteredPersons > 0 ? (result = true) : (result = false)
    return result
  }

  // Function to control the submit behavior of the input element.
  // prventDefault prevents the default action of submitting a form
  // phoneBookObject = object that contains the input of the form field
  const addInput = event => {
    event.preventDefault()
    const phoneBookObject = {
      name: newName,
      number: newNumber
    }

    // ObjectInPersons returns either true or false
    // The expression after the queston mark is executet if true
    // The expression after the collon is executed if false
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    // The alert uses a Template string, similiar to an f string in python
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    // set Persons is used to create a copy of the persons array and add the new
    // entry to it. THEN the COPY is used to update the stat.
    // DO NOT MUTATE STATE DIRECTLY!
    if (objectInPersons(phoneBookObject)) {
      alert(
        `The combination of name: (${phoneBookObject.name}) and number: (${phoneBookObject.number}) has already been added to the phonebook`
      )
    } else {
      // To send the phoneBookObject to the JSON-Server
      entryService.create(phoneBookObject).then(returnedPhoneBookObject => {
        setPersons(persons.concat(returnedPhoneBookObject))
        // To reset the values of the input fields to an empty string
        setNewName('')
        setNewNumber('')
      })
    }
  }

  // Updates the content of theinput fields for every new entry
  const handleNameInput = event => setNewName(event.target.value)
  const handleNumberInput = event => setNewNumber(event.target.value)

  // To update the filter on every input and set show all to false if
  // there is any input i.e. the user choose a filter
  const handleFilterInput = event => {
    setFilter(event.target.value)
    nameFilter === '' ? setShowAll(true) : setShowAll(false)
  }

  // To select which entrys are to be shown. filter compares each persons name to nameFilter
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().startsWith(nameFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Searchbar value={nameFilter} onChange={handleFilterInput} />
      <h2>Add a new</h2>
      <form onSubmit={addInput}>
        <InputField name={'name:'} value={newName} onChange={handleNameInput} />
        <InputField name={'number: '} value={newNumber} onChange={handleNumberInput} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <AllEntries persons={personsToShow} />
    </div>
  )
}

export default App
