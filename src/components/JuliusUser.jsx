import React, { useContext, useState, useEffect, useRef } from 'react'
import plusIcon from '/images/icon-plus.svg'
import minusIcon from '/images/icon-minus.svg'
import editIcon from '/images/icon-edit.svg'
import deleteIcon from '/images/icon-delete.svg'
import { Context } from '../Context'

export default function JuliusUser({ reply, replies, setReplies }) {

  const {voteCounts, increment, decrement} = useContext(Context)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const savedUpdatedContent = JSON.parse(localStorage.getItem(`updatedContent-${reply?.id}`));
    if (savedUpdatedContent) {
      setEditedContent(savedUpdatedContent);
    } else if (reply) {
      setEditedContent(reply?.content);
    }
  }, [reply?.id])

  useEffect(() => {
    localStorage.setItem(`updatedContent-${reply?.id}`, JSON.stringify(editedContent));
  }, [editedContent, reply?.id]);

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleCancelClick() {
    setIsEditing(false)
    setEditedContent(reply.content)
  }

  function handleSaveClick() {
    setIsEditing(false)
    const updatedReply = {...reply, content: editedContent}
    const updatedReplies = replies.map((reply) =>
      reply.id === reply.id ? updatedReply : reply
    );
    setReplies(updatedReplies);
  }

  function handleContentChange(event) {
    const newValue = event.target.value;
    if (newValue.startsWith(`@${reply.replyingTo} `)) {
      setEditedContent(newValue.slice(`@${reply.replyingTo} `.length));
    } else {
      setEditedContent(newValue);
    }
  }

  function handleDeleteClick(id) {
    const updatedReplies = replies.filter(reply => reply.id !== id)
    setReplies(updatedReplies)
    localStorage.removeItem('edited content');
    toggleModal()
  }

  function toggleModal() {
    setShowModal(prevModal => !prevModal)
  }

  const juliusTextAreaRef = useRef(null)

  useEffect(() => {
    if (isEditing && juliusTextAreaRef.current) {
      juliusTextAreaRef.current.focus()
    }
  }, [isEditing])

  return (
    <div className='comments-container-max'>
        <div className='top-section'>
          <img className='amy-img' src={reply?.user.image.png} alt="amy robson" />
          <p><span>{reply?.user.username}</span></p>
          <span className='you'>you</span>
          <p>{reply?.createdAt}</p>
        </div>
        {isEditing ? (
          <div className='edit-container'>
            <textarea
              ref={juliusTextAreaRef} 
              value={`@${reply?.replyingTo} ${editedContent}`}
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
            <p className='content'><span className='replying-to'>{`@${reply?.replyingTo}`}</span>{editedContent}</p>
            <div className='bottom-section'>

              <div className='vote-action'>

                <img onClick={() => increment(reply?.id)} src={plusIcon} alt="plus icon" />

                <span>{voteCounts[reply?.id] ? voteCounts[reply?.id].count : 0}</span>

                <img onClick={() => decrement(reply?.id)} src={minusIcon} alt="minus icon" />

              </div>

              <div className='reply-action'>
                <img src={deleteIcon} alt="delete icon" />
                <span onClick={toggleModal} className='delete'>Delete</span>
                <img src={editIcon} alt="reply icon" />
                <span onClick={handleEditClick}>Edit</span>
              </div>

            </div>

          </div>
        )}
        {showModal && (
        <div className='modal'>
          <div className='overlay'>
            <div className='modal-content'>
              <h3>Delete Comment</h3>
              <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
              <div className='modal-buttons'>
                <button className='modal-cancel-button' onClick={toggleModal}>No, Cancel</button>
                <button className='modal-delete-button' onClick={() => handleDeleteClick(reply.id)}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  )
}
