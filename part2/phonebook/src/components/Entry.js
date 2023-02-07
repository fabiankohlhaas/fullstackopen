// Component to display the entrys of the phonebook as jsx paragraphs
const Entry = ({entry}) => {
    return (
        <p style={{margin: 0, padding:0}}>{entry.name} {entry.number}</p>
    )
}

export default Entry