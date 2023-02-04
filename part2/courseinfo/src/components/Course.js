// To display the Header of a course.
const Header = ({ name }) => <h1>{name}</h1>


// To display the parts of a course, this component is used with the map function of the content component.
const Part = ({part}) => <p>{part.name} {part.exercises}</p>

/* Parrent of the individual parts of the course. parts.map is used to be able to render a variable number of parts. 
Map takes an array and applys a function to each of the arrys elements, to modify the element. In this case, the applied function is the Part component.
It returns the part.name and part.exercise as a jsx(html) paragraph(<p></p>) 
It's further explained here: https://www.youtube.com/watch?v=bCqtb-Z5YGQ&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84&index=2 */
const Content = ({parts}) => <div>{parts.map( part => <Part key={part.id} part={part}/>)}</div>

/*To display the total amount of exercises. reduce is used to calculate the sum. 
The sum starts at zero, wich is declared after the comma. The zero has the variable name sum wich is the first prameter
given to the reduce function. The second parameter given is each part of courses.parts. Reduce will add the amout of part.exercises to
the sum for each element in parts. Reduce is further explained here: https://www.youtube.com/watch?v=Wl98eZpkp-c&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84&index=3 */ 
const Total = ({parts}) => <b>total of {parts.reduce((sum, part) => sum + part.exercises,0)} exercises</b>

// Parrent component for the rest of the course data
const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course