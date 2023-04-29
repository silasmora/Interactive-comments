import React, { useContext, useState, useEffect } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import editIcon from '/images/icon-edit.svg'
import deleteIcon from '/images/icon-delete.svg'
import { Context } from '../Context'

export default function JuliusUser({ reply }) {

  const {voteCounts, increment, decrement} = useContext(Context)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(reply.content)

  useEffect(() => {
    const savedEditedContent = JSON.parse(localStorage.getItem('edited content'))
    if (savedEditedContent) {
      setEditedContent(savedEditedContent)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('edited content', JSON.stringify(editedContent))
  }, [editedContent])

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleCancelClick() {
    setIsEditing(false)
    setEditedContent(reply.content)
  }

  function handleSaveClick() {
    setIsEditing(false)
  }

  function handleContentChange(event) {
    const newValue = event.target.value;
    if (newValue.startsWith(`@${reply.replyingTo} `)) {
      setEditedContent(newValue.slice(`@${reply.replyingTo} `.length));
    } else {
      setEditedContent(newValue);
    }
  }

  return (
    <div className='comments-container-max'>
        <div className='top-section'>
          <img className='amy-img' src={reply.user.image.png} alt="amy robson" />
          <p><span>{reply.user.username}</span></p>
          <span className='you'>you</span>
          <p>{reply.createdAt}</p>
        </div>
        {isEditing ? (
          <div className='edit-container'>
            <textarea 
              value={`@${reply.replyingTo} ${editedContent}`}
              onChange={handleContentChange}
              cols="30" 
              rows="5"></textarea>
            <div className='edit-buttons'>
              <button onClick={handleCancelClick}>Cancel</button>
              <button onClick={handleSaveClick}>Update</button>
            </div>
          </div>
        ) : (
          <div>
            <p className='content'><span className='replying-to'>{`@${reply.replyingTo}`}</span>{editedContent}</p>
            <div className='bottom-section'>

              <div className='vote-action'>

                <img onClick={() => increment(reply.user.username)} src={plusIcon} alt="plus icon" />

                <span>{voteCounts[reply.user.username]}</span>

                <img onClick={() => decrement(reply.user.username)} src={minusIcon} alt="minus icon" />

              </div>

              <div className='reply-action'>
                <img src={deleteIcon} alt="delete icon" />
                <span className='delete'>Delete</span>
                <img src={editIcon} alt="reply icon" />
                <span onClick={handleEditClick}>Edit</span>
              </div>

            </div>

          </div>
        )}
    </div>
    
  )
}
