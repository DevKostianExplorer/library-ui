import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITopEBook } from '../store/models/ITopEBook'
import { API } from './EBookService'

export const topEBookAPI = API.injectEndpoints({
    endpoints: (build) => ({
        fetchRatingTopEBooks: build.query<ITopEBook[], number>({
            query: (limit = 5) => ({
                url: `/api/EBookAPI/top/rating`,
                params: {
                    limit: limit
                }
            })
        }),
        fetchViewsTopEBooks: build.query<ITopEBook[], number>({
            query: (limit = 5) => ({
                url: `/api/EBookAPI/top/views`,
                params: {
                    limit: limit
                }
            })
        }),
        fetchDownloadsTopEBooks: build.query<ITopEBook[], number>({
            query: (limit = 5) => ({
                url: `/api/EBookAPI/top/downloads`,
                params: {
                    limit: limit
                }
            })
        })
})
})