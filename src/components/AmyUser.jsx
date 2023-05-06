import React, { useContext, useEffect, useState, useRef } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import replyIcon from '/images/icon-reply.svg'
import CurrentUser from './CurrentUser'
import AmyReplies from './replies/AmyReplies'
import { Context } from '../Context'
import { nanoid } from 'nanoid'
import './comments.css'

export default function AmyUser() {
  const {amyData, voteCounts, increment, decrement} = useContext(Context)
  const [amyReplies, setAmyReplies] = useState([])
  const [isReplyingToAmy, setIsReplyingToAmy] = useState(false)
  const [amyReplyText, setAmyReplyText] = useState('')

  useEffect(() => {
    const savedAmyReplies = JSON.parse(localStorage.getItem('amy replies'));
    console.log('retrieved from storage:', savedAmyReplies);
    if (savedAmyReplies) {
      setAmyReplies(savedAmyReplies);
    } else if (amyObject) {
      setAmyReplies(amyObject.replies);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('amy replies', JSON.stringify(amyReplies));
  }, [amyReplies]);


  const amyObject = amyData?.find(element => element.id === 1)

  function handleReplyClick() {
    setIsReplyingToAmy(true)
  }
  
  function handleReplyAmySave() {
    const newReply = {
      id: nanoid(),
      content: amyReplyText,
      createdAt: new Date().toISOString(),
      score: 0,
      replyingTo: amyObject.user.username,
      user: {
        image: {
          png: '/images/avatars/image-juliusomo.png',
          webp: '/images/avatars/image-juliusomo.webp'
        },
        username: 'juliusomo',
      },
    };
    
    setAmyReplies(prevReplies => [...prevReplies, newReply])
    setIsReplyingToAmy(false)
    setAmyReplyText('')
  }
  
  const textAreaRef = useRef(null)

  useEffect(() => {
    if (isReplyingToAmy && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isReplyingToAmy]);

  return (
    <>
        <div>
          <div className='comments-container'>
            <div className='top-section'>
              <img className='amy-img' src={amyObject?.user.image.png} alt="amy robson" />
              <p><span>{amyObject?.user.username}</span></p>
              <p>{amyObject?.createdAt}</p>
            </div>
            <p className='content'>{amyObject?.content}</p>
            <div className='bottom-section'>

              <div className='vote-action'>

                <img onClick={() => increment(amyObject?.id)} src={plusIcon} alt="plus icon" />

                <span>{voteCounts[amyObject?.id] ? voteCounts[amyObject?.id].count : 0}</span>

                <img onClick={() => decrement(amyObject.id)} src={minusIcon} alt="minus icon" />

              </div>

              <div className='reply-action'>
                <img src={replyIcon} alt="reply icon" />
                <span onClick={handleReplyClick}>Reply</span>
              </div>

            </div>
          </div>
          
          <CurrentUser 
            ref={textAreaRef}
            amyObject={amyObject}
            isReplyingToAmy={isReplyingToAmy}
            setIsReplyingToAmy={setIsReplyingToAmy}
            handleReplyAmySave={handleReplyAmySave}
            amyReplyText={amyReplyText}
            setAmyReplyText={setAmyReplyText}
            />

          
          {amyReplies?.map((reply) => (
            <AmyReplies 
              key={reply.id}
              amyReply={reply}
              amyReplies={amyReplies}
              setAmyReplies={setAmyReplies}
              amyReplyText={amyReplyText}
              setAmyReplyText={setAmyReplyText}
            />
            ))}
        </div>

     
    </>
  )
}
