import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
)

const Statistics = ({ text, value }) => {
  if (value) {
    return (
      <div>
        {text} {value}
      </div>
    )
  }
  return <div>{text} 0</div>
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
      <Display text={"good"} value={good} />
      <Display text={"neutral"} value={neutral} />
      <Display text={"bad"} value={bad} />
      <Display text={"all"} value={good + neutral + bad} />
      <Statistics
        text={"average"}
        value={(good - bad) / (good + neutral + bad)}
      />
      <Statistics
        text={"positive"}
        value={(good / (good + neutral + bad)) * 100}
      />
    </div>
  )
}

export default App
