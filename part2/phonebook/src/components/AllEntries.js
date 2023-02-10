import Entry from "./Entry"

const AllEntries = ({persons}) => {
    return (
        <div>
        {persons.map(entry =>
        <Entry key={entry.id} entry={entry}/>)}
      </div>
    )
}

export default AllEntries