import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = props => <button onClick={props.onClick}> {props.text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    return (
      <tbody>
        <tr>
          <StatisticRow name='Good' stat={good} />
        </tr>
        <tr>
          <StatisticRow name='Neutral' stat={neutral} />
        </tr>
        <tr>
          <StatisticRow name='Bad' stat={bad} />
        </tr>
        <tr>
          <StatisticRow name='Average' stat={calculate_avg(good, neutral, bad)} />
        </tr>
        <tr>
          <StatisticRow name='Positive' stat={calculate_positive(good, neutral, bad)} />
        </tr>
      </tbody>
    );
  } else {
    return <p>No input yet!</p>;
  }
};

const StatisticRow = ({ name, stat }) => (
  <>
    <td> {name} </td>
    <td> {stat} </td>
  </>
);

const calculate_avg = (good, neutral, bad) => {
  let avg = (good - bad) / (good + bad + neutral);
  if (avg) {
    return avg;
  } else {
    return 0;
  }
};

const calculate_positive = (good, neutral, bad) => {
  let avg = good / (good + bad + neutral);
  if (avg) {
    return avg;
  } else {
    return 0;
  }
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title='Give Feedback' />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <Header title='Statistic' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
