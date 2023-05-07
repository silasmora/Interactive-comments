import React, { useContext, useState, useRef, useEffect } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import replyIcon from '/images/icon-reply.svg'
import { Context } from '../Context'
import { nanoid } from 'nanoid'

export default function RamsesUser({ reply, setReplies }) {

  const {voteCounts, increment, decrement, currentUserData} = useContext(Context)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')

  function handleReplyClick() {
    setIsReplying(true)
  }

  function handleReplyChange(e) {
    const newValue = e.target.value
    setReplyText(newValue)
  }

  function handleReplySave() {
    const newReply = {
      id: nanoid(),
      content: replyText,
      createdAt: new Date().toISOString(),
      score: 0,
      replyingTo: reply.user.username,
      user: {
        image: {
          png: './images/avatars/image-juliusomo.png',
          webp: './images/avatars/image-juliusomo.webp'
        },
        username: 'juliusomo',
      },
    };
    setReplies(prevReplies => [...prevReplies, newReply])
    setIsReplying(false);
    setReplyText('')
  }

  function handleCancelClick() {
    setIsReplying(false)
    setReplyText('')
  }

  const ramsesTextAreaRef = useRef(null)

  useEffect(() => {
    if (isReplying && ramsesTextAreaRef.current) {
      ramsesTextAreaRef.current.focus()
    }
  }, [isReplying])

  return (
    <>
      <div className='replies-container'>
        <div className='top-section'>
          <img className='user-img' src={reply?.user.image.png} alt="ramses miron img" />
          <p><span>{reply?.user.username}</span></p>
          <p>{reply?.createdAt}</p>
        </div>
        <p className='content'><span className='replying-to'>{`@${reply?.replyingTo}`}</span>{reply?.content}</p>
        <div className='bottom-section'>

          <div className='vote-action'>

            <img onClick={() => increment(reply?.id)} src={plusIcon} alt="plus icon" />

            <span>{voteCounts[reply?.id] ? voteCounts[reply?.id].count : 0}</span>

            <img onClick={() => decrement(reply?.id)} src={minusIcon} alt="minus icon" />

          </div>

          <div className='reply-action'>
            <img src={replyIcon} alt="reply icon" />
            <span onClick={handleReplyClick}>Reply</span>
          </div>

        </div>
      </div>

      {isReplying && (
      <div className='current-user-container'>
        <textarea
          ref={ramsesTextAreaRef} 
          value={replyText}
          onChange={handleReplyChange}
          cols="30"
          rows="5"
          placeholder={`Replying to ${reply?.user.username}`}
        ></textarea>
        <div className='current-bottom-section'>
          <img src={currentUserData.image.png} alt="juliusomo" />
          <div className='current-user-buttons'>
            <button onClick={handleCancelClick}>Cancel</button>
            <button onClick={handleReplySave}>Reply</button>
          </div>
        </div>
      </div>)}

   </>
  )
}
