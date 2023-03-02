// Component to display the entrys of the phonebook as jsx paragraphs
const Entry = ({ name, number, deleteEntry }) => {
  return (
    <p style={{ margin: 0, padding: 0 }}>
      {name} {number}
      <button onClick={deleteEntry}>Delete</button>
    </p>
  )
}

export default Entry
