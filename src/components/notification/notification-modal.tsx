import React, { useEffect, useMemo, useRef } from "react"
import { useGetNotificationsQuery } from "@/api/notification/queries/use-get-notifications-query"
import ErrorPage from "@/pages/error-page"
import LoadingPage from "@/pages/loading-page"

import { Notification } from "@/types/notification"

import NotificationItem from "./notification-item"

interface NotificationProps {
  setShowNotification: (value: boolean) => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

const NotificationModal: React.FC<NotificationProps> = ({ setShowNotification, triggerRef }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        triggerRef?.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setShowNotification(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setShowNotification])

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetNotificationsQuery()

  const notifications: Notification[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.events) ?? []
  }, [data])

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <div className="absolute z-20 right-0 top-48 w-320 shadow-container rounded-xl" ref={modalRef}>
      <h1 className="title-18-bold border-b-1 border-gray-100 py-16 px-24">알림</h1>

      <div className="h-360 overflow-y-scroll">
        <ul>
          {notifications?.map((item) => {
            return (
              <li key={item.notificationId}>
                <NotificationItem
                  title={item.title}
                  message={item.message}
                  isRead={item.isChecked}
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

export default NotificationModal
