import React, { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"

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
  const bgColor = isRead ? "bg-white" : "bg-primary/10"

  const [open, setOpen] = useState(false)

  return (
    <div
      className={`p-16 border-b-1 border-gray-100 flex justify-between items-center cursor-pointer ${bgColor}`}
      onClick={() => setOpen(!open)}
    >
      <div className="w-full">
        <div className="w-full flex items-center justify-between mb-4">
          <div>
            <p className="text-16-bold">{title}</p>
            <p className="text-14-normal text-gray-500">
              {format(createdAt, "yyyy.MM.dd hh:mm", { locale: ko })}
            </p>
          </div>
          <div className="text-gray-700 p-4">{open ? <IoChevronUp /> : <IoChevronDown />}</div>
        </div>
        {open && <p className="text-14-medium text-gray-700">{message}</p>}
      </div>
    </div>
  )
}

export default NotificationItem
