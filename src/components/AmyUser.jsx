import React, { useContext, useEffect, useState } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import replyIcon from '/images/icon-reply.svg'
import { Context } from '../Context'
import './comments.css'

export default function AmyUser() {

  const {amyData, voteCounts, increment, decrement} = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (amyData.length) {
      setIsLoading(false)
    }
  }, [amyData])
  
  const amyObject = amyData.find(element => element.id === 1)
  

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='comments-container'>
          <div className='top-section'>
            <img className='amy-img' src={amyObject.user.image.png} alt="amy robson" />
            <p><span>{amyObject.user.username}</span></p>
            <p>{amyObject.createdAt}</p>
          </div>
          <p className='content'>{amyObject.content}</p>
          <div className='bottom-section'>

            <div className='vote-action'>

              <img onClick={() => increment(amyObject.user.username)} src={plusIcon} alt="plus icon" />

              <span>{voteCounts[amyObject.user.username]}</span>

              <img onClick={() => decrement(amyObject.user.username)} src={minusIcon} alt="minus icon" />

            </div>

            <div className='reply-action'>
              <img src={replyIcon} alt="reply icon" />
              <span>Reply</span>
            </div>

          </div>
        </div>
     )} 
    </>
  )
}
