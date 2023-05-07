import React, { useContext } from 'react'

import { Context } from '../Context'

function CurrentUser({  
  isReplying, 
  setIsReplying,
  handleReplySave,
  replyText, 
  setReplyText,
  /*amy props*/
  amyObject,
  isReplyingToAmy,
  setIsReplyingToAmy,
  handleReplyAmySave,
  amyReplyText,
  setAmyReplyText
  }, ref) {
    
  const {currentUserData} = useContext(Context)

  function handleReplyMaxChange(e) {
    const newValue = e.target.value
    setReplyText(newValue)
  }

  function handleReplyAmyChange(e) {
    const newValue = e.target.value
    setAmyReplyText(newValue)
  }

  function handleCancelMaxClick() {
    setIsReplying(false)
    setReplyText('')
  }

  function handleCancelAmyClick() {
    setIsReplyingToAmy(false)
    setAmyReplyText('')
  }
  
  return (
    <>
      {isReplying && (
        <div className='current-user-container'>
          <textarea
            ref={ref}
            value={replyText}
            onChange={handleReplyMaxChange} 
            placeholder='Add a comment...' 
            cols="30" 
            rows="5"
          ></textarea>
          <div className='current-bottom-section'>
            <img src={currentUserData.image.png} alt="juliusomo" />
            <div className='current-user-buttons'>
              <button onClick={handleCancelMaxClick}>Cancel</button>
              <button onClick={handleReplySave}>Send</button>
            </div>
          </div>
        </div>
      )}

      {isReplyingToAmy && (
        <div className='current-user-container'>
        <textarea
          ref={ref}
          value={amyReplyText}
          onChange={handleReplyAmyChange} 
          placeholder={`Replying to ${amyObject.user.username}`}
          cols="30" 
          rows="5"
        ></textarea>
        <div className='current-bottom-section'>
          <img src={currentUserData.image.png} alt="juliusomo" />
          <div className='current-user-buttons'>
            <button onClick={handleCancelAmyClick}>Cancel</button>
            <button onClick={handleReplyAmySave}>Reply</button>
          </div>
        </div>
      </div>
      )}

    </>
  )
}

export default React.forwardRef(CurrentUser)
