import {apiSlice} from "../../app/api/apiSlice"

import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

const notesAddapter = createEntityAdapter()

const initialState = notesAddapter.getInitialState()


export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getNotes:builder.query({
            query:query=>'/notes',
            validateStatus:(result, response)=>{
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor:5,
            trnsformResponse:responseData=>{
                console.log(responseData)
               const loadedNotes =  responseData.notes.map(note=>{
                note.id = note._id;
                return note
               })
               return notesAddapter.setAll(initialState, loadedNotes)
            },

            providesTags:(result,error, arg)=>{
                if(result?.ids){
                    return[{type:'Note', id:'LIST'},...result?.ids?.map(id=>({type:'Note', id}))]
                }else return [
                    {type:'Note',id:'LIST'}
                ]
            }


        })
    })
})


const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

export const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data
)


export const {
    selectAll: selectAllNotes,
    selectById:selectNoteById,
    selectIds:selectNotesIds
} = notesAddapter.getSelectors(state=> selectNotesData(state) ?? initialState)


export const {useGetNotesQuery} = notesApiSlice