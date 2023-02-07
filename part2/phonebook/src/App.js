import { useState } from 'react'
import Entry from './components/Entry'

const App = () => {
  // State that contains an array with the phonebooks entrys.
  // The default entry is: name: 'Arto Hellas'
  // setPersons updates the state with new entrys
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  // State that contains the default content of the form,
  // in this case an empty string. setNewName updates the
  // content for every new input
  const [newName, setNewName] = useState('')

  // Function to control the submit behavior of the input element.
  const addName = (event) => {
    // Prevents the default action of submitting a form
    event.preventDefault()
    // Object that contains the input of the form field
    const phoneBookObject = {
      name: newName
    }
    // Used to create a copy of the persons array and add the new
    // entry to it. THEN the COPY is used to update the stat. 
    // DO NOT MUTATE STATE DIRECTLY!
    setPersons(persons.concat(phoneBookObject))
    // Resets the value of the input field to an empty string
    setNewName('')
  }
  // Updates the content of the input field for every new entry
  const handleNameInput = (event) => {
    // Passes the input on to the state 
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameInput}
          />
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