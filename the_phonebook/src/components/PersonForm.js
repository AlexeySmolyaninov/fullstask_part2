import React from 'react'

const PersonForm = (props) => {
    const {
        inputNameOnChange, newName,
        inputNumberOnChange, newNumber,
        addContact} = props

    return(
        <form onSubmit={addContact}>
            <div>
                name: <input onChange={inputNameOnChange} value={newName} required/>
            </div>
            <div>
                nubmer: <input onChange={inputNumberOnChange} value={newNumber} required/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm