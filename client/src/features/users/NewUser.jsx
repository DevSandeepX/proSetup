import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAddNewUserMutation } from './usersApiSlice';
const USER_REGEX = /^[A-Z][a-zA-Z0-9]{2,11}$/;
const PASS_REGEX = /^[a-z0-9]{3,12}$/;


const NewUser = () => {
  const navigate = useNavigate()
  const [username, setUserName] = useState('')
  const [validUsername, setValidUserName] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Employee"])
  const [addNewUser, {
    isError,
    isSuccess,
    error,
    isLoading
  }] = useAddNewUserMutation()
  

  const onUsernameChange = e=> setUserName(e.target.value)
  const onPasswordChange = e=> setPassword(e.target.value)


  useEffect(()=>{
    setValidUserName(USER_REGEX.test(username))
  },
  [username])

   useEffect(()=>{
    setValidPassword(PASS_REGEX.test(password))
  },
  [password])


  useEffect(()=>{
    if(isSuccess){
      setUserName('')
      setPassword('')
      setRoles(["Employee"])
      navigate('/dash/users')
    }
  }
  ,[isSuccess])
  const canSave = [validUsername, validPassword, roles.length].every(Boolean) && !isError
  const errClass = isError?"text-red-400 text-xs":""

  const onClickSave =async (e)=>{
    e.preventDefault()
    if(canSave){
      await addNewUser({username, password, roles})
    }
  }


 const content = (
  <>
  <form onSubmit={onClickSave} className="space-y-4 p-4 max-w-sm mx-auto border rounded">
      <div>
        <label htmlFor="username" className="block font-medium">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onUsernameChange}
          className="w-full p-2 border rounded"
        />
        {!validUsername && username && <p className="text-red-500">Invalid username</p>}
      </div>

      <div>
        <label htmlFor="password" className="block font-medium">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          className="w-full p-2 border rounded"
        />
        {!validPassword && password && <p className="text-red-500">Invalid password</p>}
      </div>

      <div>
        <label className="block font-medium">Roles</label>
        <select
          multiple={true}
          value={roles}
          size={3}
          onChange={(e) => setRoles(Array.from(e.target.selectedOptions, option => option.value))}
          className="w-full p-2 border rounded"
        >
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!canSave}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Create User
      </button>
    </form>
  </>
 )
















  return content
}

export default NewUser