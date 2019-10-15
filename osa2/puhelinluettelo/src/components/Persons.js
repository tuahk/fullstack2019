import React from 'react';

const Persons = props =>
  props.persons.map(person => (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => props.handlePersonDelete(person)}>delete</button>
    </div>
  ));

export default Persons;
