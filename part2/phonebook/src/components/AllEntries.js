import Entry from "./Entry"

const AllEntries = ({persons}) => {
    return (
        <div>
        {persons.map(entry =>
        <Entry key={entry.name + entry.number} entry={entry}/>)}
      </div>
    )
}

export default AllEntries