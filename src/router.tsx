import { createBrowserRouter } from "react-router-dom"
import DynamicLayout from "./components/layouts/DynamicLayout"
import ChatView from "./views/ChatView"
import FeedView from "./views/FeedView"
import FriendsView from "./views/FriendsView"
import HomeView from "./views/HomeView"
import MessagesView from "./views/MessagesView"
import ProfileView from "./views/ProfileView"
import RegView from "./views/RegView"
import SearchView from "./views/SearchView"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DynamicLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/reg",
        element: <RegView />,
      },
      {
        path: "/search",
        element: <SearchView />,
      },
      {
        path: "/profile/:id",
        element: <ProfileView />,
      },
      {
        path: "/friends",
        element: <FriendsView />,
      },
      {
        path: "/messages",
        element: <MessagesView />,
      },
      {
        path: "/chat/:id",
        element: <ChatView />,
      },
      {
        path: "/feed",
        element: <FeedView />,
      },
    ],
  },
])

export default router
