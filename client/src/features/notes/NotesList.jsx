import React from 'react'
import { useSelector } from 'react-redux'
import { useGetNotesQuery, selectAllNotes } from './notesApiSlice'
import Note from './Note'

const NotesList = () => {
  const { isLoading,
    isError,
    error,
    isSuccess
  } = useGetNotesQuery()


  const notes = useSelector(selectAllNotes)


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>


  return (
     <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Users</h2>
      <div className="grid grid-cols-4 font-semibold border-b pb-2 text-sm sm:text-base">
        <div>Username</div>
        <div>Title</div>
        <div>Text</div>
        <div>Status</div>
        <div>Edit</div>
      </div>

      {users.map(note => (
        <Note note={note}/>
      ))}


    </div>
  )
}

export default NotesList