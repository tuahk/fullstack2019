import React, { useState, useEffect } from 'react';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './services/persons';
import Notification from './components/Notification';

const NameFilter = props => (
  <div>
    filter shown with <input value={props.value} onChange={props.onChange} />
  </div>
);

const hideMessage = (updateFun, time) => {
  setTimeout(() => {
    updateFun(null);
  }, time);
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [FilterValue, setFilterValue] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('success'); // success or error

  useEffect(() => {
    personService.getAll().then(returnedObjects => {
      setPersons(returnedObjects);
    });
  }, []);

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFilterChange = event => {
    setFilterValue(event.target.value);
  };
  const handlePersonDelete = person => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
          setNotificationType('success');
          setNotificationMessage(`Removed ${person.name} succesfully`);
        })
        .catch(error => {
          setNotificationType('error');
          setNotificationMessage(
            `${person.name} has already been removed from server.`
          );
        });
      hideMessage(setNotificationMessage, 2000);
    }
  };

  const addPerson = event => {
    event.preventDefault();
    const existingPerson = persons.find(obj => obj.name === newName);
    if (existingPerson) {
      const changedPerson = { ...existingPerson, number: newNumber };
      const question = `${newName} already exists, replace the old number with a new one?`;
      if (window.confirm(question)) {
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNotificationMessage(`Number updated succesfully for ${newName}`);
            setNotificationType('success');
          })
          .catch(error => {
            setNotificationType('error');
            setNotificationMessage(
              `${existingPerson.name} has already been removed from server.`
            );
          });
        hideMessage(setNotificationMessage, 2000);
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      };
      personService.create(nameObject).then(returnedObj => {
        setPersons(persons.concat(returnedObj));
        setFilterValue('');
        setNewName('');
        setNewNumber('');
      });
      setNotificationType('success');
      setNotificationMessage(`Added ${newName} succesfully`);
      hideMessage(setNotificationMessage, 2000);
    }
  };

  const filterPersons = persons => {
    if (FilterValue.length > 0) {
      return persons.filter(person =>
        person.name.toLowerCase().includes(FilterValue.toLowerCase())
      );
    } else {
      return persons;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <NameFilter value={FilterValue} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        inputs={[
          { text: 'name', value: newName, onChange: handleNameChange },
          { text: 'number', value: newNumber, onChange: handleNumberChange }
        ]}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filterPersons(persons)}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
