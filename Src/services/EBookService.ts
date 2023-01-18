import { IEBook } from './../store/models/IEBook';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:7109'}),
    tagTypes: ['EBook'],
    endpoints: (build) => ({
        fetchAllEBooks: build.query<IEBook[], [number, number]>({
            query: ([limit = 5, offset = 0]) => ({
                url: `/api/EBookAPI/e_book`,
                params: {
                    _limit: limit,
                    _offset: offset
                }
            }),
            providesTags: (result) => ['EBook']
        }),
        fetchEBookById: build.query<IEBook, number>({
            query: (id: number) => ({
                url: `/api/EBookAPI/${id}`
            }),
            providesTags: (result) => ['EBook']
        }),
        createEBook: build.mutation<IEBook, IEBook>({
            query: (eBook: IEBook) => ({
                url: `/api/EBookAPI/e_book`,
                method: 'POST',
                body: eBook,
            }),
            invalidatesTags: ['EBook']
        }),
        updateEBook: build.mutation<IEBook, IEBook>({
            query: (eBook: IEBook) => ({
                url: `/api/EBookAPI/e_book`,
                method: 'PUT',
                body: eBook
            }),
            invalidatesTags: ['EBook']
        }),
        deleteEBook: build.mutation<IEBook, IEBook>({
            query: (eBook: IEBook) => ({
                url: `/api/EBookAPI/e_book/${eBook.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['EBook']
        }),
        incrementViews: build.mutation<IEBook, IEBook>({
            query: (eBook: IEBook) => ({
                url: `/api/EBookAPI/e_book/views/${eBook.id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['EBook']
        }),
        incrementDownloads: build.mutation<IEBook, IEBook>({
            query: (eBook: IEBook) => ({
                url: `/api/EBookAPI/e_book/downloads/${eBook.id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['EBook']
        })
    }),
})