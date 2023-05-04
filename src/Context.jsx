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
  
        const initialVoteCount = {}
        data.comments.forEach(comment => {
          initialVoteCount[comment.id] = {
            user: comment.user.username,
            count: comment.score || 0 // Initialize with the score from JSON or zero if not present
          }
  
          if (comment.replies && comment.replies.length > 0) {
            comment.replies.forEach(reply => {
              initialVoteCount[reply.id] = {
                user: reply.user.username,
                count: reply.score || 0 // Initialize with the score from JSON or zero if not present
              }
            })
          }
        })
        setVoteCounts(initialVoteCount)
      })
      .catch(err => console.error(err))
  }, [])
  


  function increment(id) {
    setVoteCounts(prevCounts => {
      const count = prevCounts[id] ? prevCounts[id].count + 1 : 1;
      return {
        ...prevCounts,
        [id]: {
          ...prevCounts[id],
          count
        }
      };
    });
  }
  
  function decrement(id) {
    setVoteCounts(prevCounts => {
      const count = prevCounts[id] ? prevCounts[id].count - 1 : -1;
      return {
        ...prevCounts,
        [id]: {
          ...prevCounts[id],
          count
        }
      };
    });
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
