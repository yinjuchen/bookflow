import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storeUserData = localStorage.getItem('user')
    if (storeUserData) {
      return JSON.parse(storeUserData)
    }
    return {}
  })

  // Sign Out User
  const signOutUser = () => {
    setUser({})
  }

  return (
    <UserContext.Provider value={{ user, setUser, signOutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);
