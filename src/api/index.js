

import { GET, POST } from '../utils/index'

export const getBlogList = (params) => GET('/api/blog/getBlogList', params)
export const getBlogDetail = (params) => GET('/api/blog/getBlogDetail', params)
export const addBlog = (params) => POST('/api/blog/addBlog', params)
export const deleteBlog = (params) => POST('/api/blog/deleteBlog', params)
export const saveBlogDetail = (params) => POST('/api/blog/saveBlogDetail', params)


export const getBookList = (params) => GET('/api/book/getBookList', params)
export const addBook = (params) => POST('/api/book/addBook', params)
export const deleteBook = (params) => POST('/api/book/deleteBook', params)