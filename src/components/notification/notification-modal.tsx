import React, { useEffect, useMemo, useRef } from "react"
import { putReadAllNotifications } from "@/api/notification/fetchers/put-read-all-notifications"
import { useGetNotificationsQuery } from "@/api/notification/queries/use-get-notifications-query"
import ErrorPage from "@/pages/error-page"
import LoadingPage from "@/pages/loading-page"
import { InfiniteData, useQueryClient } from "@tanstack/react-query"
import { IoCheckmarkDone } from "react-icons/io5"

import { Notification } from "@/types/notification"
import { useInfiniteScrollQuery } from "@/hooks/useInfiniteScrollQuery"

import NotificationItem from "./notification-item"

interface NotificationProps {
  setShowNotification: (value: boolean) => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

const NotificationModal: React.FC<NotificationProps> = ({ setShowNotification, triggerRef }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

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
  }, [setShowNotification, triggerRef])

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetNotificationsQuery()

  const sentinelRef = useInfiniteScrollQuery({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

  const notifications: Notification[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.notifications) ?? []
  }, [data])

  const handleReadAll = () => {
    putReadAllNotifications()

    // 캐시 직접 수정
    queryClient.setQueryData<InfiniteData<{ notifications: Notification[] }>>(
      ["notifications"],
      (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            notifications: page.notifications.map((n) => ({
              ...n,
              isChecked: true, // 모두 읽음으로 변경
            })),
          })),
        }
      }
    )
  }

  return (
    <div className="absolute z-20 right-0 top-48 w-320 shadow-container rounded-xl" ref={modalRef}>
      <h1 className="title-18-bold border-b-1 border-gray-100 py-16 px-24 flex justify-between items-center">
        알림
        <span
          className="text-14-normal text-gray-500 cursor-pointer underline hover:text-gray-700 flex items-center gap-6"
          onClick={() => handleReadAll()}
        >
          모두 읽음
          <IoCheckmarkDone size={18} />
        </span>
      </h1>

      <div className="h-360 overflow-y-scroll overscroll-contain">
        {isLoading ? (
          <LoadingPage full />
        ) : error ? (
          <ErrorPage />
        ) : (
          <ul>
            {notifications.map((item) => {
              return (
                <li key={item.notificationId}>
                  <NotificationItem notification={item} />
                </li>
              )
            })}
          </ul>
        )}

        <div ref={sentinelRef}></div>
      </div>
    </div>
  )
}

export default NotificationModal
