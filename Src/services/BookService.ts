import { IEBook } from '../store/models/IEBook';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBook } from '../store/models/IBook';
import { API } from './EBookService';

export const bookAPI = API.injectEndpoints({
    endpoints: (build) => ({
        fetchAllBooks: build.query<IBook[], [number, number]>({
            query: ([limit = 5, offset = 0]) => ({
                url: `/api/BookAPI/book`,
                params: {
                    _limit: limit,
                    _offset: offset
                },
                credentials:"include",
                crossDomain: true,
                xhrFields: {withCredentials: true}

            }),
            providesTags: (result) => ['Book']
        }),
        fetchBookById: build.query<IBook, number>({
            query: (id: number) => ({
                url: `/api/BookAPI/${id}`
            }),
            providesTags: (result) => ['Book']
        }),
        createBook: build.mutation<IBook, IBook>({
            query: (book: IBook) => ({
                url: `/api/BookAPI/book`,
                method: 'POST',
                body: book,
            }),
            invalidatesTags: ['Book']
        }),
        updateBook: build.mutation<IBook, IBook>({
            query: (book: IBook) => ({
                url: `/api/BookAPI/book`,
                method: 'PUT',
                body: book
            }),
            invalidatesTags: ['Book']
        }),
        deleteBook: build.mutation<IBook, IBook>({
            query: (book: IBook) => ({
                url: `/api/BookAPI/book/${book.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Book']
        })
    }),
    overrideExisting: false,
})