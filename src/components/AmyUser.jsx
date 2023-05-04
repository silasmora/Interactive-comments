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
  const [isLoading, setIsLoading] = useState(true)

  const [amyReplies, setAmyReplies] = useState([])
  const [isReplyingToAmy, setIsReplyingToAmy] = useState(false)
  const [amyReplyText, setAmyReplyText] = useState('')
  const [addedReplyAmyId, setAddedReplyAmyId] = useState(null)

   // // Retrieve amy replies from local storage when component mounts
  // useEffect(() => {
  //   const savedAmyReplies = JSON.parse(localStorage.getItem('amy array'));
  //   if (savedAmyReplies) {
  //     setAmyReplies(savedAmyReplies);
  //   }
  // }, []);
  
  // // Save amy replies to local storage whenever the amyReplies state changes
  // useEffect(() => {
  //   localStorage.setItem('amy array', JSON.stringify(amyReplies));
  // }, [amyReplies]);

  console.log(amyReplies)


  useEffect(() => {
    if (amyObject) {
      setAmyReplies(amyObject.replies)
      setIsLoading(false)
    }
  }, [amyData])
  
  const amyObject = amyData.find(element => element.id === 1)

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
          png: './images/avatars/image-juliusomo.png',
          webp: './images/avatars/image-juliusomo.webp'
        },
        username: 'juliusomo',
      },
    };
    setAmyReplies(prevReplies => [...prevReplies, newReply])
    setIsReplyingToAmy(false)
    setAmyReplyText('')
    setAddedReplyAmyId(newReply.id)

    // const existingReplies = JSON.parse(localStorage.getItem('amy replies')) || [];
    // const updatedReplies = [...existingReplies, newReply];
    // localStorage.setItem('amy replies', JSON.stringify(updatedReplies))
    localStorage.setItem('amy replies', JSON.stringify(newReply))
    
  }
  
  const amyReply = addedReplyAmyId && amyReplies.find(reply => reply.id === addedReplyAmyId);

  const textAreaRef = useRef(null)

  useEffect(() => {
    if (isReplyingToAmy && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isReplyingToAmy]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className='comments-container'>
            <div className='top-section'>
              <img className='amy-img' src={amyObject.user.image.png} alt="amy robson" />
              <p><span>{amyObject.user.username}</span></p>
              <p>{amyObject.createdAt}</p>
            </div>
            <p className='content'>{amyObject.content}</p>
            <div className='bottom-section'>

              <div className='vote-action'>

                <img onClick={() => increment(amyObject.id)} src={plusIcon} alt="plus icon" />

                <span>{voteCounts[amyObject.id] ? voteCounts[amyObject.id].count : 0}</span>

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

          {/* {amyReplies.map((reply) => (
            <AmyReplies
              key={`${addedReplyAmyId?.id}${reply.id}`}
              amyReply={amyReply}
              amyReplies={amyReplies}
              setAmyReplies={setAmyReplies}
              amyReplyText={amyReplyText}
              setAmyReplyText={setAmyReplyText}
            />
          ))} */}

            <AmyReplies
              key={`${addedReplyAmyId?.id}`}
              amyReply={amyReply}
              amyReplies={amyReplies}
              setAmyReplies={setAmyReplies}
              amyReplyText={amyReplyText}
              setAmyReplyText={setAmyReplyText}
            />
        </div>

     )} 
    </>
  )
}
