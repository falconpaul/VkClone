import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { api } from "../../api/api";
import { UserInfo } from "../user/user";

export type OwnPost = {
  id: number
  text: string
  photo: string | null
  created: string
  updated: string
  likes: number
  hasLike: 0 | 1
};

export type SubPost = OwnPost & {
  user: UserInfo
}

export type NewPost = {
  text: string,
  photo: string | null
}

export interface PostsState {
  newPost: {
    text: string
    photo: string | null
  }
  ownPosts: OwnPost[] | null
  subsPosts: SubPost[] | null
  nextPostsPartIsLoading: boolean
  lastPostIdLoaded: boolean
}

const initialState: PostsState = {
  newPost: {
    text: '',
    photo: null
  },
  ownPosts: null,
  subsPosts: null,
  nextPostsPartIsLoading: false,
  lastPostIdLoaded: false
}

export const getOwnPosts = createAsyncThunk("posts/getOwnPosts", async () => {
  return await api.getOwnPosts()
})

export const getSubsPostsFirst = createAsyncThunk(
  "posts/getSubsPostsFirst",
  async () => {
    return await api.getSubsPosts(0)
  }
)
export const getSubsPostsNext = createAsyncThunk(
  "posts/getSubsPostsNext",
  async (idFrom: number) => {
    return await api.getSubsPosts(idFrom)
  }
)

export const addLike = createAsyncThunk(
  "posts/addLike",
  async (idPost: number) => {
    await api.addLikeToPost(idPost)
    return idPost
  }
)

export const removeLike = createAsyncThunk(
  "posts/removeLike",
  async (idPost: number) => {
    await api.removeLikeFromPost(idPost)
    return idPost
  }
)

export const changeNewPostPhoto = createAsyncThunk(
  "posts/changeNewPostPhoto",
  async (file: File) => {
    return await api.uploadFile(file)
  }
)

export const sendNewPost = createAsyncThunk(
  "posts/sendNewPost",
  async (payload, { getState }) => {
    const newPost = (getState() as RootState).posts.newPost
    if (newPost.text.length === 0) {
      throw new Error('Пустое сообщение')
    }
    return await api.createNewPost(newPost)
  }
)

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (idPost: number) => {
    await api.deletePost(idPost)
    return idPost
  }
)

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changeNewPostText: (state, action: PayloadAction<string>) => {
      state.newPost.text = action.payload
    },
    deleteNewPostPhoto: (state) => {
      state.newPost.photo = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOwnPosts.fulfilled, (state, action) => {
        state.ownPosts = action.payload;
      })
      .addCase(getSubsPostsFirst.fulfilled, (state, action) => {
        state.subsPosts = action.payload;
      })
      .addCase(getSubsPostsNext.pending, (state) => {
        state.nextPostsPartIsLoading = true
      })
      .addCase(getSubsPostsNext.fulfilled, (state, action) => {
        if (!state.subsPosts) return
        if (action.payload.length === 0) {
          state.lastPostIdLoaded = true
        } else {
          state.subsPosts.push(...action.payload)
        }
        state.nextPostsPartIsLoading = false
      })
      .addCase(sendNewPost.fulfilled, (state, action) => {
        if (!state.ownPosts) return
        state.ownPosts.unshift(action.payload)
        state.newPost = {
          text: '',
          photo: null
        }
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const idPost = action.payload
        const posts = []
        state.subsPosts && posts.push(...state.subsPosts)
        state.ownPosts && posts.push(...state.ownPosts)
        posts.forEach(p => {
          if (p.id === idPost && !p.hasLike) {
            p.hasLike = 1
            p.likes++
          }
        })
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        const idPost = action.payload
        const posts = []
        state.subsPosts && posts.push(...state.subsPosts)
        state.ownPosts && posts.push(...state.ownPosts)
        posts.forEach(p => {
          if (p.id === idPost && p.hasLike) {
            p.hasLike = 0
            p.likes--
          }
        })
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const idPost = action.payload
        if (!state.ownPosts) return
        const idx = state.ownPosts.findIndex(p => p.id === idPost)
        if (idx !== -1) {
          state.ownPosts.splice(idx, 1)
        }
      })
      .addCase(changeNewPostPhoto.fulfilled, (state, action) => {
        state.newPost.photo = action.payload
      })
  },
})

export const selectNewPost = (state: RootState) => state.posts.newPost;
export const selectOwnPosts = (state: RootState) => state.posts.ownPosts;
export const selectSubsPosts = (state: RootState) => state.posts.subsPosts;
export const selectLastPostIsLoaded = (state: RootState) => state.posts.lastPostIdLoaded;
export const selectNextPostsPartIsLoading = (state: RootState) => state.posts.nextPostsPartIsLoading;

export const { changeNewPostText, deleteNewPostPhoto } = postsSlice.actions

export default postsSlice.reducer;
