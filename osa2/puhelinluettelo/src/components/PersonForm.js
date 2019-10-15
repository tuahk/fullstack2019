import React from 'react';

const PersonInputs = ({ inputs }) =>
  inputs.map(input => (
    <div key={input.text}>
      {input.text} <input value={input.value} onChange={input.onChange} />
    </div>
  ));

const PersonForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <PersonInputs inputs={props.inputs} />
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
