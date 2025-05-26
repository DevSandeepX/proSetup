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

        }),

        addNewUser: builder.mutation({
            query: userIntialData => ({
                url: '/users',
                method: 'POST',
                body: { ...userIntialData}
            }),

            invalidatesTags: [
                { type: "User", id: 'LIST' }
            ]

        }),

        updateUser: builder.mutation({
            query: userIntialData => ({
                url: '/users',
                method: 'PATCH',
                body: { ...userIntialData }
            }),

            invalidatesTags: (result, err, arg) => [{ type: 'User', id: arg.id },{ type: 'User', id: 'LIST' }]

        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }

            }),

            invalidatesTags: (result, err, arg) => [{ type: 'User', id: arg.id }]

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



export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice