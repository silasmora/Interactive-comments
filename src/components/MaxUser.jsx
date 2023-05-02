import React, { useContext, useEffect, useState } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import replyIcon from '/images/icon-reply.svg'
import RamsesUser from './RamsesUser'
import JuliusUser from './JuliusUser'
import { Context } from '../Context'
import './comments.css'
import CurrentUser from './CurrentUser'

export default function MaxUser() {

  const {maxData, voteCounts, increment, decrement} = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)
  const [replies, setReplies] = useState([])
  const [isReplying, setIsReplying] = useState(false)

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

                <img onClick={() => increment(maxObject.user.username)} src={plusIcon} alt="plus icon" />

                <span>{voteCounts[maxObject.user.username]}</span>

                <img onClick={() => decrement(maxObject.user.username)} src={minusIcon} alt="minus icon" />

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
            </div>
          </div>

          
          <CurrentUser 
            replies={replies} 
            setReplies={setReplies}
            maxObject={maxObject}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
            />
          
      </div>}
      
    </>
  )
}
