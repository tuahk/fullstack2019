import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p key={props.part}>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return props.course.parts.map(
     obj => <Part key={obj.name} part={obj.name} exercises={obj.exercises} />
  )
}

const Total = (props) => {
  let result = props.course.parts.map(
    obj => obj.exercises).reduce(
      (x,y) => x + y)

  return(
    <p>Number of exercises {result}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))