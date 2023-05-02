import React, { useContext, useState } from 'react'
import MaxReplies from './replies/MaxReplies'
import { nanoid } from 'nanoid'
import { Context } from '../Context'

export default function CurrentUser({ replies, setReplies, maxObject, isReplying, setIsReplying}) {

  const {currentUserData} = useContext(Context)
  const [replyText, setReplyText] = useState('')
  const [addedReplyMaxId, setAddedReplyMaxId] = useState(null)
  
  function handleReplyChange(e) {
    const newValue = e.target.value
    setReplyText(newValue)
  }

  function handleCancelClick() {
    setIsReplying(false)
  }

  function handleReplySave() {
    const newReply = {
      id: nanoid(),
      content: replyText,
      createdAt: new Date().toLocaleString(),
      score: 0,
      replyingTo: maxObject.user.username,
      user: {
        image: {
          png: './images/avatars/image-juliusomo.png',
          webp: './images/avatars/image-juliusomo.webp'
        },
        username: 'juliusomo',
      },
    };
    setReplies(prevReplies => [...prevReplies, newReply])
    setIsReplying(false)
    setReplyText('')
    setAddedReplyMaxId(newReply.id)
    localStorage.setItem('max replies', JSON.stringify(newReply))
  }

  const maxReply = addedReplyMaxId && replies.find(reply => reply.id === addedReplyMaxId);
  
  return (
    <>
      {isReplying && (
        <div className='current-user-container'>
          <textarea
            value={replyText}
            onChange={handleReplyChange} 
            placeholder='Add a comment...' 
            cols="30" 
            rows="5"
          ></textarea>
          <div className='current-bottom-section'>
            <img src={currentUserData.image.png} alt="juliusomo" />
            <div className='current-user-buttons'>
              <button onClick={handleCancelClick}>Cancel</button>
              <button onClick={handleReplySave}>Send</button>
            </div>
          </div>
        </div>
      )}
      <MaxReplies  
        maxReply={maxReply}
        replies={replies}
        setReplies={setReplies}
        key={maxReply?.id}
        replyText={replyText}
        setReplyText={setReplyText}
        />
    </>
  )
}
