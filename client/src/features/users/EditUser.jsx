import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useParams, useNavigate } from 'react-router-dom'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm';



const EditUser = () => {
  const { id } = useParams()
  const user = useSelector(state => selectUserById(state, id))
  const navigate = useNavigate()


  const content = (
    <>
      {!user ? <p>Loading</p> : <EditUserForm user={user} />}
    </>
  )



  return content
}

export default EditUser