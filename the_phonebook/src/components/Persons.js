import React from 'react'

const Person = ({person, handleDeletePerson}) => <p>{person.name} {person.number} <button onClick={() => handleDeletePerson(person)}>delete</button></p>

const Persons = ({persons, filterBy, handleDeletePerson}) => {
    return filterBy.length > 0 ? 
        persons
          .filter(person => person.name.toLocaleLowerCase().includes(filterBy))
          .map(person => <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>) :
        persons.map(person => <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>)
}

export default Persons