import { ILanguage } from './../store/models/ILanguage';
import { IPublisher } from './../store/models/IPublisher';
import { IAuthor } from './../store/models/IAuthor';
import { IGenre } from './../store/models/IGenre';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITopEBook } from '../store/models/ITopEBook'
import { API } from './EBookService'

export const attributesAPI = API.injectEndpoints({
    endpoints: (build) => ({
        fetchGenres: build.query<IGenre[], void>({
            query: () => ({
                url: `/api/EBookAPI/genre`
            })
        }),
        fetchAuthors: build.query<IAuthor[], void>({
            query: () => ({
                url: `/api/EBookAPI/author`,

            })
        }),
        fetchPublishers: build.query<IPublisher[], void>({
            query: () => ({
                url: `/api/EBookAPI/publisher`,

            })
        }),
        fetchLanguage: build.query<ILanguage[], void>({
            query: () => ({
                url: `/api/EBookAPI/language`
            })
        })
})
})