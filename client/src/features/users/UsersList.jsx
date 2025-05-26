import React from 'react'
import { useSelector } from 'react-redux'
import {
  useGetUsersQuery,
  selectAllUsers
} from './usersApiSlice'
import User from './User'

const UsersList = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  // Use selector to get user list from normalized state
  const users = useSelector(selectAllUsers)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Users</h2>
      <div className="grid grid-cols-4 font-semibold border-b pb-2 text-sm sm:text-base">
        <div>Username</div>
        <div>Roles</div>
        <div>Status</div>
        <div>Edit</div>
      </div>

      {users.map(user => (
        <User user={user} key={user.id}/>
      ))}
    </div>
  )
}

export default UsersList
