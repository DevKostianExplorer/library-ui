import { IUser } from '../store/models/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITopEBook } from '../store/models/ITopEBook'
import { API } from './EBookService'

export const userAPI = API.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<IUser[], void >({
            query: () => ({
                url: `/api/UserAPI/allusers`,
                credentials:"include",
                crossDomain: true,
                xhrFields: {withCredentials: true}

            })
        }),
        deleteUser: build.mutation<IUser[], number >({
            query: (id) => ({
                url: `/api/UserAPI/user/${id}`,
                method: "DELETE",
                credentials:"include",
                crossDomain: true,
                xhrFields: {withCredentials: true},
                

            })
        }),
        
})
})