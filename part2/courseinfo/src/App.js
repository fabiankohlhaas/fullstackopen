// To import the Course component from the components folder
import Course from './components/Course'

const App = () => {
  // Variable that contains the information of a course
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  // To display the return value of the Course component
  return <Course course={course} />
}

export default App