import React, { useEffect, useState } from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {

  const [currentUserData, SetCurrentUserData] = useState({})
  const [amyData, SetAmyData] = useState([])
  const [maxData, SetMaxData] = useState([])
  const [voteCounts, setVoteCounts] = useState({})

  const url = 'data.json'

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      SetCurrentUserData(data.currentUser)
      SetAmyData(data.comments)
      SetMaxData(data.comments)

      const initialVoteCount = {} //create an empty object to store each user's vote count
      data.comments.forEach(comment => {
        //iterated over the comments array to get each object
        //and set each object with username as the key and the 0 as the value to initialVoteCount
        initialVoteCount[comment.user.username] = 0 

        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach(reply => {
            initialVoteCount[reply.user.username] = 0
          })
        }
      })
      setVoteCounts(initialVoteCount)
    })
    .catch(err => console.error(err))
  }, [])


  function increment(username) {
    setVoteCounts(prevCounts => ({
      ...prevCounts,
      [username]: prevCounts[username] + 1
    }))
  }
  
  function decrement(username) {
    setVoteCounts(prevCounts => ({
      ...prevCounts,
      [username]: prevCounts[username] - 1
    }))
  }

  return (
    <Context.Provider value={{
      currentUserData,
      amyData,
      maxData,
      voteCounts,
      increment,
      decrement,
      }
      }>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}
