import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'


const userAdapter = createEntityAdapter()
const initialState = userAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                console.log(responseData)
                const loadedUsers = responseData.users.map((user) => {
                    user.id = user._id       
                    return user
                })

                return userAdapter.setAll(initialState, loadedUsers)
            }
            ,

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]


            }

        })
    })
})

const selectUsersResult = usersApiSlice.endpoints.getUsers.select()


const selectUserData = createSelector(
    selectUsersResult,
    userResult => userResult.data
)


export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = userAdapter.getSelectors(state => selectUserData(state) ?? initialState);



export const { useGetUsersQuery } = usersApiSlice