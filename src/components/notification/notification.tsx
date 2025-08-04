import React from "react"

import NotificationItem from "./notification-item"

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: "[HIHI Concert 2025]",
      message: "입장 시간이 1시간 남았어요!",
      isRead: false,
      createdAt: "2025-07-22T18:00",
    },
    {
      id: 2,
      title: "[HIHI Concert 2025]",
      message: "입장 시간이 1시간 남았어요!",
      isRead: false,
      createdAt: "2025-07-22T18:00",
    },
    {
      id: 3,
      title: "[HIHI Concert 2025]",
      message: "입장 시간이 1시간 남았어요!",
      isRead: false,
      createdAt: "2025-07-22T18:00",
    },
    {
      id: 4,
      title: "[HIHI Concert 2025]",
      message: "입장 시간이 1시간 남았어요!",
      isRead: true,
      createdAt: "2025-07-22T18:00",
    },
  ]

  return (
    <div className="absolute z-10 right-0 top-48 w-320 shadow-container rounded-xl">
      <h1 className="title-18-bold border-b-1 border-gray-100 py-16 px-24">알림</h1>

      <div className="h-360 overflow-y-scroll">
        <ul>
          {notifications.map((item) => {
            return (
              <li key={item.id}>
                <NotificationItem
                  title={item.title}
                  message={item.message}
                  isRead={item.isRead}
                  createdAt={item.createdAt}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Notification
