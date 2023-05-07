import React, { useState, useEffect, useContext } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import editIcon from '/images/icon-edit.svg'
import deleteIcon from '/images/icon-delete.svg'
import { getTimeAgo } from '../../getTimeAgo'
import { Context } from '../../Context'

export default function MaxReplies({ maxReply, replies, setReplies, setReplyText}) {

  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(maxReply.content)
  const [showModal, setShowModal] = useState(false)
  const {voteCounts, increment, decrement} = useContext(Context)

  useEffect(() => {
    const savedUpdatedContent = JSON.parse(localStorage.getItem(`updatedContent-${maxReply.id}`));
    if (savedUpdatedContent) {
      setEditedContent(savedUpdatedContent);
    }
  }, [maxReply.id]);
  
  useEffect(() => {
    localStorage.setItem(`updatedContent-${maxReply.id}`, JSON.stringify(editedContent));
  }, [maxReply.id, editedContent]);

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleCancelClick() {
    setIsEditing(false)
    setEditedContent(maxReply.content)
  }

  function handleContentChange(event) {
    const newValue = event.target.value;
    if (newValue.startsWith(`@${maxReply.replyingTo} `)) {
      setEditedContent(newValue.slice(`@${maxReply.replyingTo} `.length));
    } else {
      setEditedContent(newValue);
    }
  }

  function handleSaveClick() {
    setIsEditing(false)
    const updatedReply = {...maxReply, content: editedContent}
    const updatedReplies = replies.map((reply) =>
      reply.id === maxReply.id ? updatedReply : reply
    );
    setReplies(updatedReplies);
  }

  function handleDeleteClick(id) {
    const updatedReplies = replies.filter(reply => reply.id !== id)
    setReplies(updatedReplies)
    localStorage.removeItem('max replies');
    setReplyText('')
    toggleModal()
  }

  function toggleModal() {
    setShowModal(prevModal => !prevModal)
  }

  if (showModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {maxReply? (
        <div className='replies-container'>
          <div className='top-section'>
            <img className='user-img' src={maxReply.user.image.png} />
            <p><span>{maxReply.user.username}</span></p>
            <span className='you'>you</span>
            <p>{getTimeAgo(new Date(maxReply.createdAt))}</p>
          </div>
          {isEditing ? (
            <div className='edit-container'>
              <textarea 
                value={`@${maxReply.replyingTo} ${editedContent}`}
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
              <p className='content'><span className='replying-to'>{`@${maxReply.replyingTo}`}</span>{editedContent}</p>
              <div className='bottom-section'>

                <div className='vote-action'>

                  <img onClick={() => increment(maxReply.id)} src={plusIcon} alt="plus icon" />

                  <span>{voteCounts[maxReply.id] ? voteCounts[maxReply.id].count : 0}</span>

                  <img onClick={() => decrement(maxReply.id)} src={minusIcon} alt="minus icon" />

                </div>

                <div className='reply-action'>
                  <img src={deleteIcon} alt="delete icon" />
                  <span className='delete' onClick={toggleModal}>Delete</span>
                  <img src={editIcon} alt="reply icon" />
                  <span onClick={handleEditClick}>Edit</span>
                </div>

              </div>

            </div>
        )}
        </div>
      ) : null}
      {showModal && (
        <div className='modal'>
          <div className='overlay'>
            <div className='modal-content'>
              <h3>Delete Comment</h3>
              <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
              <div className='modal-buttons'>
                <button className='modal-cancel-button' onClick={toggleModal}>No, Cancel</button>
                <button className='modal-delete-button' onClick={() => handleDeleteClick(maxReply.id)}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
