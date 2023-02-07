import { useState } from 'react'
import Entry from './components/Entry'

const App = () => {
  // State that contains an array with the phonebooks entrys.
  // setPersons updates the state with new entrys
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

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
  const objectInPersons = (object) =>
    persons.some(p => JSON.stringify(p) === JSON.stringify(object))
    
  // Function to control the submit behavior of the input element.
  // prventDefault prevents the default action of submitting a form
  // phoneBookObject = object that contains the input of the form field
  const addInput = (event) => {
    event.preventDefault()
    const phoneBookObject = {
      name: newName,
      number: newNumber
    }
    // Conditional as a ternary operator instead of a if else statement
    // ObjectInPersons returns either true or false
    // The expression after the queston mark is executet if true
    // The expression after the collon is executed if false
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    // The alert uses a Template string, similiar to an f string in python
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    // set Persons is used to create a copy of the persons array and add the new
    // entry to it. THEN the COPY is used to update the stat. 
    // DO NOT MUTATE STATE DIRECTLY!
    objectInPersons(phoneBookObject)
      ? alert(`The combination of name: (${phoneBookObject.name}) and number: (${phoneBookObject.number}) has already been added to the phonebook`)
      : setPersons(persons.concat(phoneBookObject))
    // To reset the values of the input fields to an empty string
    setNewName('')
    setNewNumber('')
  }

  // Updates the content of theinput fields for every new entry
  const handleNameInput = event => setNewName(event.target.value)  
  const handleNumberInput = event => setNewNumber(event.target.value)

  // To update the filter on every input and set show all to false if 
  // there is any input i.e. the user choose a filter
  const handleFilterInput = event => {
    setFilter(event.target.value)
    nameFilter === ''
      ? setShowAll(true)
      : setShowAll(false)
  }

  // To select which entrys are to be shown. filter compares each persons name to nameFilter
  const personsToShow = showAll
    ? persons
    : persons.filter( person => person.name.toLocaleLowerCase().startsWith(nameFilter.toLowerCase()))
      
  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with: <input value={nameFilter} onChange={handleFilterInput}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addInput}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(entry =>
        <Entry key={entry.name + entry.number} entry={entry}/>)}
      </div>
    </div>
  )
}

export default App