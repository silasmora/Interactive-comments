import React, { useContext } from 'react'
import { Context } from '../Context'

export default function CurrentUser() {

  const {juliusImg} = useContext(Context)
  
  return (
    <div className='current-user-container'>
      <textarea 
        placeholder='Add a comment...' 
        cols="30" 
        rows="5"
      ></textarea>
      <div className='current-bottom-section'>
        <img src={juliusImg.png} alt="juliusomo" />
        <button>Send</button>
      </div>
      
    </div>
  )
}
