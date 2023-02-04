const Header = ({ name }) => <h1>{name}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => <div>{parts.map( part => <Part key={part.id} part={part}/>)}</div>

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course