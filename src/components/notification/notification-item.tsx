import React from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface NotificationItemProps {
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  isRead,
  createdAt,
}) => {
  return (
    <div className="p-16 border-b-1 border-gray-100 flex justify-between items-center">
      <div>
        <p className="text-16-bold">{title}</p>
        <p className="text-16-medium mb-8">{message}</p>
        <p className="text-14-medium text-gray-700">
          {format(createdAt, "yyyy.MM.dd hh:mm", { locale: ko })}
        </p>
      </div>
      {!isRead && <div className="rounded-full w-10 h-10 bg-primary"></div>}
    </div>
  )
}

export default NotificationItem
