import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  if (value) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{0}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={good + neutral + bad} />
          <StatisticLine
            text={"average"}
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text={"positive"}
            value={(good / (good + neutral + bad)) * 100 + "%"}
          />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text={"good"} />
      <Button onClick={handleClickNeutral} text={"neutral"} />
      <Button onClick={handleClickBad} text={"bad"} />
      <h2>statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
