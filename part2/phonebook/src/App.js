import { useState, useEffect } from 'react'
import entryService from './services/entries'
import Searchbar from './components/Searchbar'
import InputField from './components/InputField'
import Entry from './components/Entry'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'

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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Function to check if a value (name) is already in the persons array
  // The some() method works similar to the find() method, but returns a boolean
  // instead of the found object:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  // JSON.stringify is used to compare the two objects without false results
  // More on this here: https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/
  // const objectInPersons = object => persons.some(p => JSON.stringify(p) === JSON.stringify(object))

  const nameInPersons = object => {
    const filteredPersons = persons.filter(person => {
      return person.name === object.name
    }).length

    let result = false
    filteredPersons > 0 ? (result = true) : (result = false)
    return result
  }

  const numberInPersons = object => {
    const filteredPersons = persons.filter(person => {
      return person.number === object.number
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

    if (nameInPersons(phoneBookObject) && !numberInPersons(phoneBookObject)) {
      const person = phoneBookObject.name
      const id = persons.find(entry => entry.name === person).id
      window.confirm(
        `${person} is already added to phonebook, replace the old number with a new one?`
      )
      entryService
        .update(id, phoneBookObject)
        .then(returnedPhoneBookObject => {
          setSuccessMessage(
            `Changed the Number of ${phoneBookObject.name} to ${phoneBookObject.number}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
          setPersons(persons.map(entry => (entry.id !== id ? entry : returnedPhoneBookObject)))
        })
        .catch(error => {
          setErrorMessage(`Information of '${person}' has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setPersons(persons.filter(entry => entry.id !== id))
        })

      setNewName('')
      setNewNumber('')

      //TODO Succes message after delete
    } else if (nameInPersons(phoneBookObject) && numberInPersons(phoneBookObject)) {
      setErrorMessage(`The name: (${phoneBookObject.name}) has already been added to the phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setNewName('')
      setNewNumber('')
    } else {
      // To send the phoneBookObject to the JSON-Server
      entryService.create(phoneBookObject).then(returnedPhoneBookObject => {
        setPersons(persons.concat(returnedPhoneBookObject))

        setSuccessMessage(`Added ${phoneBookObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
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
  }

  // To select which entrys are to be shown. filter compares each persons name to nameFilter
  const personsToShow =
    nameFilter.length === 0
      ? persons
      : persons.filter(person =>
          person.name.toLocaleLowerCase().startsWith(nameFilter.toLowerCase())
        )

  const deleteTheEntry = id => {
    const entry = persons.find(person => person.id === id)
    window.confirm(`Delete ${entry.name}`)
      ? entryService
          .deleteEntry(id)

          .then(returnedPhoneBookObject => {
            setPersons(persons.filter(person => person !== entry))

            setSuccessMessage(`Deleted ${entry.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })

          .catch(error => {
            setErrorMessage(`Information of '${entry.name}' has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      : console.log(`Deletion of ${entry.name} canceled`)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
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

      {personsToShow.map(person => (
        <Entry
          key={person.id}
          name={person.name}
          number={person.number}
          deleteEntry={() => deleteTheEntry(person.id)}
        />
      ))}
    </div>
  )
}

export default App
