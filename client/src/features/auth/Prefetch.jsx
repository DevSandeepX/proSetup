import React, { useEffect } from 'react'
import { usersApiSlice } from '../users/usersApiSlice'
import { Outlet } from 'react-router-dom'
import { store } from '../../app/store'


const Prefetch = () => {
    useEffect(() => {
        console.log('subsribing');
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing');
            users.unsubscribe()
        }
    }
        , [])
    return <Outlet />
}

export default Prefetch