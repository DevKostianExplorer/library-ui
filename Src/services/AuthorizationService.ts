import { IUser } from './../store/models/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITopEBook } from '../store/models/ITopEBook'
import { API } from './EBookService'

export const authorizationAPI = API.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<IUser, {password: string, user: IUser} >({
            query: ({password, user}) => ({
                url: `/api/UserAPI/user`,
                params: {
                    password: password
                },
                method: 'POST',
                body: user
            })
        }),
        getAccessToken: build.query<IUser, {login: string, password: string} >({
            query: ({login, password}) => ({
                url: `/api/UserAPI/user`,
                params: {
                    password: password,
                    login: login
                }
            })
        }),
        
})
})