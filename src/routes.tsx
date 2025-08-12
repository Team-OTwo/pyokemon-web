import React from "react"
import { createBrowserRouter } from "react-router"

import AdminProtectedRoute from "./components/admin-protected-route"
import ProtectedRoute from "./components/protected-route"
import BookingPage from "./pages/event-booking/booking-page"
import EventDetailPage from "./pages/event-detail/event-detail-page"
import EventListPage from "./pages/event-list-page"
import EventSearchListPage from "./pages/event-search-list-page"
import HomePage from "./pages/home/home-page"
import LoginPage from "./pages/login-page"
import MainEmptyLayout from "./pages/main-empty-layout"
import MainGrayLayout from "./pages/main-gray-layout"
import MainContainerLayout from "./pages/main-layout"
import SavedEventPage from "./pages/mypage/saved-event-page"
import SettingPage from "./pages/mypage/setting-page"
import TicketDetailPage from "./pages/mypage/ticket-detail-page"
import TicketPage from "./pages/mypage/ticket-page"
import RootLayout from "./pages/root-layout"
import SignUpPage from "./pages/signup-page"
import VerifyPage from "./pages/verify-page"

const router = createBrowserRouter(
  [
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
              path: "event/detail/:eventId",
              Component: EventDetailPage,
            },
            {
              path: "event/booking/:id",
              Component: BookingPage,
            },
            {
              path: "login",
              Component: LoginPage,
            },
            {
              path: "signup",
              Component: SignUpPage,
            },
            {
              path: "verify",
              Component: VerifyPage,
            },
            {
              path: "event/search",
              Component: EventSearchListPage,
            },
            {
              path: "mypage/setting",
              Component: SettingPage,
            },
            {
              path: "mypage/saved",
              Component: SavedEventPage,
            },
            {
              path: "mypage/tickets",
              Component: TicketPage,
            },
            {
              path: "mypage/tickets/:bookingId",
              Component: TicketDetailPage,
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
  ],
  {
    basename: "/user",
  }
)

export default router
