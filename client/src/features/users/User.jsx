import React from 'react'
import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const User = ({user}) => {
  const navigate = useNavigate()
  return (
    <div
          key={user.id}
          className="grid grid-cols-4 items-center py-4 border-b text-sm sm:text-base"
        >
          <div>{user.username}</div>
          <div>{user.roles.join(', ')}</div>
          <div className={user.active ? 'text-green-600' : 'text-red-500'}>
            {user.active ? 'Active' : 'Inactive'}
          </div>
          <div>
            <button className="text-indigo-600 hover:text-indigo-800" onClick={()=>navigate(`/dash/users/${user.id}`)}>
              <Pencil size={20} />
            </button>
          </div>
        </div>
  )
}

export default User