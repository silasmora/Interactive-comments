import React, { useContext, useEffect, useState, useRef } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import replyIcon from '/images/icon-reply.svg'
import RamsesUser from './RamsesUser'
import JuliusUser from './JuliusUser'
import { Context } from '../Context'
import CurrentUser from './CurrentUser'
import MaxReplies from './replies/MaxReplies'
import { nanoid } from 'nanoid'
import './comments.css'

export default function MaxUser() {

  const {maxData, voteCounts, increment, decrement} = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)
  
  const [replies, setReplies] = useState([])
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [addedReplyMaxId, setAddedReplyMaxId] = useState(null)

  useEffect(() => {
    if (maxObject) {   
      setReplies(maxObject.replies);
      setIsLoading(false);
    }
  }, [maxData]);
  
  const maxObject = maxData?.find(element => element.id === 2)

  //replies to max

  const ramsesReply = maxObject?.replies.find(reply => reply.id === 3)
  const juliusReply = maxObject?.replies.find(reply => reply.id === 4)

  function handleReplyClick() {
    setIsReplying(true)
  }

  function handleReplySave() {
    const newReply = {
      id: nanoid(),
      content: replyText,
      createdAt: new Date().toISOString(),
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

  const maxReply = addedReplyMaxId && replies.find(reply => reply.id === addedReplyMaxId)

  const additionalReplies = replies.filter(reply => reply.id !== 3 && reply.id !== 4);

  const maxTextAreaRef = useRef(null)

  useEffect(() => {
    if (isReplying && maxTextAreaRef.current) {
      maxTextAreaRef.current.focus()
    }
  }, [isReplying])

  return (
    <>
      {isLoading ? (
        <p>is loading...</p>
      ) : 
      <div>
          <div className='comments-container-max'>
            <div className='top-section'>
              <img className='amy-img' src={maxObject.user.image.png} alt="amy robson" />
              <p><span>{maxObject.user.username}</span></p>
              <p>{maxObject.createdAt}</p>
            </div>
            <p className='content'>{maxObject.content}</p>
            <div className='bottom-section'>

              <div className='vote-action'>

                <img onClick={() => increment(maxObject.id)} src={plusIcon} alt="plus icon" />

                <span>{voteCounts[maxObject.id] ? voteCounts[maxObject.id].count : 0}</span>

                <img onClick={() => decrement(maxObject.id)} src={minusIcon} alt="minus icon" />

              </div>

              <div className='reply-action'>
                <img src={replyIcon} alt="reply icon" />
                <span onClick={handleReplyClick}>Reply</span>
              </div>

            </div>
          </div>

          <div className={isReplying ? 'is-replying' : ''}>
            <div className='border-left'>
            <RamsesUser reply={ramsesReply} replies={replies} setReplies={setReplies}/>
            <JuliusUser reply={juliusReply} replies={replies} setReplies={setReplies}/>
            {additionalReplies.map(reply => (
              <MaxReplies  
                maxReply={maxReply}
                replies={replies}
                setReplies={setReplies}
                key={reply.id}
                replyText={replyText}
                setReplyText={setReplyText}
                /> 
            ))}
            </div>
          </div>

          <CurrentUser
            ref={maxTextAreaRef} 
            isReplying={isReplying}
            setIsReplying={setIsReplying}
            handleReplySave={handleReplySave}
            replyText={replyText}
            setReplyText={setReplyText}
            />

          
          
      </div>}
      
    </>
  )
}
