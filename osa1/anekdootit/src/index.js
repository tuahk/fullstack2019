import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anectode = ({ text }) => <div>{text}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Votes = ({ text }) => <p>{text}</p>;

const Header = ({ text }) => <h1>{text}</h1>;

const MostVoted = ({ anecdotes, votes }) => {
  let index = votes.reduce((max_i, curr_value, curr_i, arr) => {
    if (curr_value > arr[max_i]) return curr_i;
    else return max_i;
  }, 0);

  return <Anectode text={anecdotes[index]} />;
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const random_index = list => {
    return Math.floor(Math.random() * list.length);
  };

  const voted = () => {
    let updated = [...votes];
    updated[selected] += 1;
    console.log(updated);
    setVotes(updated);
  };

  return (
    <div>
      <Anectode text={props.anecdotes[selected]} />
      <Votes text={votes[selected]} />
      <Button text='vote' onClick={voted} />
      <Button text='next anectode' onClick={() => setSelected(random_index(props.anecdotes))} />
      <Header text='Most Popular' />
      <MostVoted anecdotes={props.anecdotes} votes={votes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
