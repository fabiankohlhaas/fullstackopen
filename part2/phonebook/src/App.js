import { useState } from 'react'
import Entry from './components/Entry'

const App = () => {
  // State that contains an array with the phonebooks entrys.
  // The default entry is: name: 'Arto Hellas'
  // setPersons updates the state with new entrys
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 

  // State that contains the default content of the form,
  // in this case an empty string. setNewName updates the
  // content for every new input
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  // Function to check if a value (name) is already in the persons array
  const objectInPersons = (object) =>
    // The some() method works similar to the find() method, but returns a boolean
    // instead of the found object: 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    // JSON.stringify is used to compare the two objects without false results
    // More on this here: https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/
    persons.some(p => JSON.stringify(p) === JSON.stringify(object))
    
  // Function to control the submit behavior of the input element.
  const addInput = (event) => {
    // Prevents the default action of submitting a form
    event.preventDefault()
    // Object that contains the input of the form field
    const phoneBookObject = {
      name: newName,
      number: newNumber
    }

    // Conditional as a ternary operator instead of a if else statement
    // ObjectInPersons returns either true or false
    // The expression after the queston mark is executet if true
    // The expression after the collon is executed if false
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    objectInPersons(phoneBookObject)
      // The alert uses a Template string, similiar to an f string in python
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
      ? alert(`This combination of name: ${phoneBookObject.name} and number:${phoneBookObject.number} is already added to the phonebook`)
      // Used to create a copy of the persons array and add the new
      // entry to it. THEN the COPY is used to update the stat. 
      // DO NOT MUTATE STATE DIRECTLY!
      : setPersons(persons.concat(phoneBookObject))

    // Resets the value of the name input field to an empty string
    setNewName('')
    // Resets the value of the number input field to an empty string
    setNewNumber('')
  }
  // Updates the content of the name input field for every new entry
                                  // Passes the input on to the state
  const handleNameInput = event => setNewName(event.target.value)  

  // Updates the content of the number input field for every new entry
                                    // Passes the input on to the state
  const handleNumberInput = event => setNewNumber(event.target.value)
  
  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(entry =>
        <Entry key={entry.name} entry={entry}/>)}
      </div>
    </div>
  )
}

export default App