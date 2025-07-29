import { createBrowserRouter } from "react-router"

import AdminProtectedRoute from "./components/admin-protected-route"
import ProtectedRoute from "./components/protected-route"
import EventDetailPage from "./pages/event-detail/event-detail-page"
import EventListPage from "./pages/event-list-page"
import HomePage from "./pages/home/home-page"
import MainEmptyLayout from "./pages/main-empty-layout"
import MainGrayLayout from "./pages/main-gray-layout"
import MainContainerLayout from "./pages/main-layout"
import RootLayout from "./pages/root-layout"

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        Component: MainEmptyLayout,
        children: [
          {
            Component: ProtectedRoute,
            children: [
              {
                index: true,
                Component: HomePage,
              },
            ],
          },
          {
            path: "event",
            Component: EventListPage,
          },
          {
            path: "event/detail/:eventId", // ✅ 상세 경로 추가
            Component: EventDetailPage,
          },
        ],
      },
      {
        Component: MainGrayLayout,
        children: [
          {
            Component: ProtectedRoute,
            children: [],
          },
        ],
      },
      {
        Component: MainContainerLayout,
        children: [
          {
            Component: ProtectedRoute,
            children: [
              {
                path: "admin",
                Component: AdminProtectedRoute,
                children: [
                  {
                    index: true,
                    element: <div>어드민 페이지</div>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>Catch All Route</div>,
  },
])

export default router
