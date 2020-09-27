import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notificatoin from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [notification, setNotification] = useState({msg:null, isError: false})

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  },[])

  const inputNameOnChange = (event) => setNewName(event.target.value)
  const inputNumberOnChange = (event) => setNewNumber(event.target.value)
  const filterNumberOnChange = (event) => setFilterBy(event.target.value)

  const addContact = (event) => {
    event.preventDefault();

    const existedPerson = persons
        .find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())

    if(existedPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update({...existedPerson, number: newNumber})
        .then(data => {
          setPersons(
            persons
            .filter(person => person.id !== existedPerson.id)
            .concat(data)
          )
          setNotification({msg: `${newName}'s number has been updated`, isError: false})
          setTimeout(() => setNotification({msg: null, isError: false}), 3000)
          setNewName('')
          setNewNumber('')
        })
        return
      }
      return
    }

    personService
      .create({ name: newName, number: newNumber})
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setNotification({msg: `Added ${newName}`, isError: false})
        setTimeout(() => setNotification({msg:null, isError:false}), 3000)
      })
  }

  const handleDeletePerson = delPerson =>{
    if(window.confirm(`Delete ${delPerson.name} ?`)){
      personService
        .deletePerson(delPerson.id)
        .then(response => {
          if(response.status === 200)
            setPersons(persons.filter(person => person.id !== delPerson.id))
        })
        .catch(error => {
          setNotification({msg: `Information of ${delPerson.name} has alreayd been removed from server`, isError: true})
          setTimeout(() => setNotification({msg: null, isError: false}), 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notificatoin notification={notification}/>
      <Filter onChangeHandler={filterNumberOnChange} />

      <h3>add a new</h3>

      <PersonForm
        inputNameOnChange={inputNameOnChange}
        newName={newName}
        inputNumberOnChange={inputNumberOnChange}
        newNumber={newNumber}
        addContact={addContact}/>
      
      <h3>Numbers</h3>
      
      <Persons persons={persons} filterBy={filterBy} handleDeletePerson={handleDeletePerson}/>
      
    </div>
  )
}

export default App