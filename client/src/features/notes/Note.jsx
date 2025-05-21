import React from 'react'

const Note = ({note}) => {
  return (
     <div
          key={note.id}
          className="grid grid-cols-4 items-center py-4 border-b text-sm sm:text-base"
        >
          <div>{note.user}</div>
          <div>{note.title}</div>
          <div>{note.text}</div>
          <div className={note.complated ? 'text-green-600' : 'text-red-500'}>
            {note.complated ? 'Complated' : 'Open'}
          </div>
          <div>
            <button className="text-indigo-600 hover:text-indigo-800">
              <Pencil size={20} />
            </button>
          </div>
        </div>
  )
}

export default Note