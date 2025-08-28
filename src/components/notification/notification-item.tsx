import React, { useState } from "react"
import { putReadNotification } from "@/api/notification/fetchers/put-read-notification"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"

import { Notification } from "@/types/notification"

interface NotificationItemProps {
  notification: Notification
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const bgColor = notification.isChecked ? "bg-white" : "bg-primary/10"

  const handleClickNotification = () => {
    setOpen(!open)

    // 읽음 처리
    if (!notification.isChecked) {
      putReadNotification(notification.notificationId)

      queryClient.setQueryData(["notifications"], (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            notifications: page.notifications.map((n: Notification) =>
              n.notificationId === notification.notificationId ? { ...n, isChecked: true } : n
            ),
          })),
        }
      })
    }
  }

  return (
    <div
      className={`p-16 border-b-1 border-gray-100 flex justify-between items-center cursor-pointer ${bgColor}`}
      onClick={handleClickNotification}
    >
      <div className="w-full">
        <div className="w-full flex items-center justify-between mb-4">
          <div>
            <p className="text-16-bold">{notification.title}</p>
            <p className="text-14-normal text-gray-500">
              {format(notification.createdAt, "yyyy.MM.dd HH:mm", { locale: ko })}
            </p>
          </div>
          <div className="text-gray-700 p-4">{open ? <IoChevronUp /> : <IoChevronDown />}</div>
        </div>
        {open && (
          <p className="text-14-medium text-gray-700 whitespace-pre-line">{notification.message}</p>
        )}
      </div>
    </div>
  )
}

export default NotificationItem
