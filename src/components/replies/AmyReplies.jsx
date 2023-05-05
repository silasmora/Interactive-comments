import React, { useState, useContext, useEffect } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import editIcon from '/images/icon-edit.svg'
import deleteIcon from '/images/icon-delete.svg'
import { Context } from '../../Context'
import { getTimeAgo } from '../../getTimeAgo'

export default function AmyReplies({ amyReply, amyReplies, setAmyReplies,  setAmyReplyText }) {

  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(amyReply.content)
  const [showModal, setShowModal] = useState(false)
  const {voteCounts, increment, decrement} = useContext(Context)

  useEffect(() => {
    const savedUpdatedContent = JSON.parse(localStorage.getItem(`updatedContent-${amyReply.id}`));
    if (savedUpdatedContent) {
      setEditedContent(savedUpdatedContent);
    }
  }, [amyReply.id]);
  
  useEffect(() => {
    localStorage.setItem(`updatedContent-${amyReply.id}`, JSON.stringify(editedContent));
  }, [amyReply.id, editedContent]);
  

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleCancelClick() {
    setIsEditing(false)
    setEditedContent(amyReply.content)
  }

  function handleContentChange(event) {
    const newValue = event.target.value;
    if (newValue.startsWith(`@${amyReply.replyingTo} `)) {
      setEditedContent(newValue.slice(`@${amyReply.replyingTo} `.length));
    } else {
      setEditedContent(newValue);
    }
  }

  function handleSaveClick() {
    setIsEditing(false);
    const updatedReply = {
      ...amyReply,
      content: editedContent,
    };
    const updatedReplies = amyReplies.map((reply) =>
      reply.id === amyReply.id ? updatedReply : reply
    );
    setAmyReplies(updatedReplies);
  }
  
  
  function handleDeleteClick(id) {
    const updatedReplies = amyReplies.filter(reply => reply.id !== id)
    setAmyReplies(updatedReplies)
    localStorage.removeItem('amy replies');
    setAmyReplyText('')
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
      {amyReply? (
        <div className='comments-container-max'>
          <div className='top-section'>
            <img className='amy-img' src={amyReply.user.image.png} alt="amy robson" />
            <p><span>{amyReply.user.username}</span></p>
            <span className='you'>you</span>
            <p>{getTimeAgo(new Date(amyReply.createdAt))}</p>
          </div>
          {isEditing ? (
            <div className='edit-container'>
              <textarea 
                value={`@${amyReply.replyingTo} ${editedContent}`}
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
              <p className='content'><span className='replying-to'>{`@${amyReply.replyingTo}`}</span>{editedContent}</p>
              <div className='bottom-section'>

                <div className='vote-action'>

                  <img onClick={() => increment(amyReply.id)} src={plusIcon} alt="plus icon" />

                  <span>{voteCounts[amyReply.id] ? voteCounts[amyReply.id].count : 0}</span>

                  <img onClick={() => decrement(amyReply.id)} src={minusIcon} alt="minus icon" />

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
                <button className='modal-delete-button' onClick={() => handleDeleteClick(amyReply.id)}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
