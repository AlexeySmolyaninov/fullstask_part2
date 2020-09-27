import React from 'react'

const Notificatoin = ({notification}) => {
  if(notification.msg === null){
    return null
  }

  const className = notification.isError ? 'notification error' : 'notification announcement'
  
  return (
  <div className={className}>
    {notification.msg}
  </div>)
}

export default Notificatoin