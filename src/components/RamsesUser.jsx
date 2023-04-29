import React, { useContext, useEffect, useState } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import replyIcon from '/images/icon-reply.svg'
import RamsesReplies from './replies/RamsesReplies'
import { Context } from '../Context'
import { nanoid } from 'nanoid'

export default function RamsesUser({ reply, replies, setReplies }) {

  const {voteCounts, increment, decrement, juliusImg} = useContext(Context)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [addedReplyId, setAddedReplyId] = useState(null)

  // useEffect(() => {
  //   const savedReplies = JSON.parse(localStorage.getItem('replies'))
  //   if (savedReplies) {
  //     setReplies(savedReplies)
  //   }
  // }, [])
  
  // useEffect(() => {
  //   localStorage.setItem('replies', JSON.stringify(replies))
  // }, [replies])

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
      createdAt: new Date().toLocaleString(),
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
    setAddedReplyId(newReply.id)
    localStorage.setItem('addedReply', JSON.stringify(newReply))
  }

  function handleCancelClick() {
    setIsReplying(false)
    setReplyText('')
    setAddedReplyId('')
  }

  const addedReply = addedReplyId && replies.find(reply => reply.id === addedReplyId);

  return (
    <>
      <div className='comments-container-max'>
        <div className='top-section'>
          <img className='amy-img' src={reply.user.image.png} alt="amy robson" />
          <p><span>{reply.user.username}</span></p>
          <p>{reply.createdAt}</p>
        </div>
        <p className='content'><span className='replying-to'>{`@${reply.replyingTo}`}</span>{reply.content}</p>
        <div className='bottom-section'>

          <div className='vote-action'>

            <img onClick={() => increment(reply.user.username)} src={plusIcon} alt="plus icon" />

            <span>{voteCounts[reply.user.username]}</span>

            <img onClick={() => decrement(reply.user.username)} src={minusIcon} alt="minus icon" />

          </div>

          <div className='reply-action'>
            <img src={replyIcon} alt="reply icon" />
            <span onClick={handleReplyClick}>Reply</span>
          </div>

        </div>
      </div>

      {isReplying && (
      <div className='reply-container'>
        <div className='reply-top-section'>
          <img src={juliusImg.png} />
          <textarea 
            value={replyText}
            onChange={handleReplyChange}
            cols="30" 
            rows="5"
            placeholder={`Replying to ${reply.user.username}`}
            ></textarea>
        </div>
        <div className='reply-buttons'>
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleReplySave}>Reply</button>
        </div>
      </div>)}

      <RamsesReplies 
        addedReply={addedReply} 
        replies={replies} 
        setReplies={setReplies} 
        key={addedReply?.id}
        replyText={replyText}
        setReplyText={setReplyText}
        
        />
   </>
  )
}
