import axios, { AxiosResponseTransformer } from "axios"

const instance = axios.create({
    baseURL: '/api/',
    transformResponse: [
        ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
        (data) => {
            if (data.status === 'error') {
                throw new Error(data.payload)
            }
            return data.payload
        }
    ]
})

const getAuthOptions = () => {
    return {
        headers: {
            'Access-Token': localStorage.getItem('at')
        }
    }
}

type RegData = {
    name: string
    surname: string
    patronymic: string
    bdate: string
    city: string
    university: string
    login: string
    password: string
}
type NewPost = {
    text: string,
    photo: string | null
}
export const api = {
    reg: async (payload: RegData) => {
        return (await instance.post('reg', payload)).data
    },
    login: async (payload: { login: string, password: string }) => {
        return (await instance.post('login', payload)).data
    },
    getSelfInfo: async () => {
        return (await instance.get('self-info', getAuthOptions())).data
    },
    getOwnPosts: async () => {
        return (await instance.get('own-posts', getAuthOptions())).data
    },
    getSubsPosts: async (idFrom: number) => {
        return (await instance.get('subs-posts?idFrom=' + idFrom, getAuthOptions())).data
    },
    createNewPost: async (newPost: NewPost) => {
        return (await instance.post('create-post', newPost, getAuthOptions())).data
    },
    searchPeople: async (query: string) => {
        return (await instance.get('/search-people?query=' + encodeURIComponent(query), getAuthOptions())).data
    },
    getUserInfo: async (id: number) => {
        return (await instance.get('/user-info?id=' + id, getAuthOptions())).data
    },
    getUserPosts: async (id: number) => {
        return (await instance.get('/user-posts?id=' + id, getAuthOptions())).data
    },
    subscribe: async (id: number) => {
        return (await instance.post('/subscribe', { id }, getAuthOptions())).data
    },
    unsubscribe: async (id: number) => {
        return (await instance.post('/unsubscribe', { id }, getAuthOptions())).data
    },
    getOwnSubscriptions: async () => {
        return (await instance.get('/own-subscriptions', getAuthOptions())).data
    },
    getAllChats: async () => {
        return (await instance.get('/all-chats', getAuthOptions())).data
    },
    getMessages: async (idPartner: number) => {
        return (await instance.get('/messages?user=' + idPartner, getAuthOptions())).data
    },
    getUsersInfo: async (ids: number[]) => {
        return (await instance.get('/users-info?ids=' + ids.join(','), getAuthOptions())).data
    },
    sendNewMessage: async (payload: { text: string, idUserTo: number }) => {
        return (await instance.post('/messages', payload, getAuthOptions())).data
    },
    getFeed: async () => {
        return (await instance.get('/feed', getAuthOptions())).data
    },
    addLikeToPost: async (idPost: number) => {
        return (await instance.post('/likes', {
            idPost,
            action: 'add'
        }, getAuthOptions())).data
    },
    removeLikeFromPost: async (idPost: number) => {
        return (await instance.post('/likes', {
            idPost,
            action: 'remove'
        }, getAuthOptions())).data
    },
    uploadFile: async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        return (await instance.post('/upload-file', formData, getAuthOptions())).data
    },
    changeAvatar: async (url: string | null) => {
        return (await instance.post('/change-avatar', { url }, getAuthOptions())).data
    },
    deletePost: async (idPost: number) => {
        return (await instance.delete('/delete-post?id=' + idPost, getAuthOptions())).data
    }
}
