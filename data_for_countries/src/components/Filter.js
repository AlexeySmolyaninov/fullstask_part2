import React from 'react'

const Filter = ({filter, changeFilterValue}) => 
  (<div id="filter">
    find countries <input value={filter} onChange={changeFilterValue}/ >
  </div>)

export default Filter