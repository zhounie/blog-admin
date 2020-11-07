

import { GET, POST } from '../utils/index'

export const getBlogList = (params) => GET('/api/blog/getBlogList', params)
export const addBlog = (params) => POST('/api/blog/addBlog', params)
export const deleteBlog = (params) => POST('/api/blog/deleteBlog', params)