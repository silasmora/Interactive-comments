import React, { useEffect, useState, useContext } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import editIcon from '/images/icon-edit.svg'
import deleteIcon from '/images/icon-delete.svg'
import { Context } from '../../Context'

export default function RamsesReplies({replies, setReplies, setReplyText}) {

  const [addedReply, setAddedReply] = useState(null);
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const {voteCounts, increment, decrement} = useContext(Context)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const savedAddedReply = JSON.parse(localStorage.getItem('addedReply'));
    if (savedAddedReply) {
      setAddedReply(savedAddedReply);
      setEditedContent(savedAddedReply.content)
    }
  }, []);

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleCancelClick() {
    setIsEditing(false)
    setEditedContent(addedReply.content)
  }

  function handleSaveClick() {
    setIsEditing(false)
    const updatedReply = {...addedReply, content: editedContent}
    setAddedReply(updatedReply)
    localStorage.setItem('addedReply', JSON.stringify(updatedReply))
  }

  function handleContentChange(event) {
    const newValue = event.target.value;
    if (newValue.startsWith(`@${addedReply.replyingTo} `)) {
      setEditedContent(newValue.slice(`@${addedReply.replyingTo} `.length));
    } else {
      setEditedContent(newValue);
    }
  }

  function handleDeleteClick(id) {
    const updatedReplies = replies.filter(reply => reply.id !== id)
    setReplies(updatedReplies)
    localStorage.removeItem('addedReply');
    setReplyText('')
  }
  
  function openModal() {
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
  }

  if (showModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {addedReply? (
        <div className='comments-container-max'>
          <div className='top-section'>
            <img className='amy-img' src={addedReply.user.image.png} alt="amy robson" />
            <p><span>{addedReply.user.username}</span></p>
            <span className='you'>you</span>
            <p>{addedReply.createdAt}</p>
          </div>
          {isEditing ? (
            <div className='edit-container'>
              <textarea 
                value={`@${addedReply.replyingTo} ${editedContent}`}
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
              <p className='content'><span className='replying-to'>{`@${addedReply.replyingTo}`}</span>{editedContent}</p>
              <div className='bottom-section'>

                <div className='vote-action'>

                  <img onClick={() => increment(addedReply.user.username)} src={plusIcon} alt="plus icon" />

                  <span>{voteCounts[addedReply.user.username]}</span>

                  <img onClick={() => decrement(addedReply.user.username)} src={minusIcon} alt="minus icon" />

                </div>

                <div className='reply-action'>
                  <img src={deleteIcon} alt="delete icon" />
                  <span className='delete' onClick={openModal}>Delete</span>
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
                <button className='modal-cancel-button' onClick={closeModal}>No, Cancel</button>
                <button className='modal-delete-button' onClick={() => handleDeleteClick(addedReply.id)}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


