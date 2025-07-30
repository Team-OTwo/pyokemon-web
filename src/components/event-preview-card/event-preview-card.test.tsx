import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"

import { MemoryRouter } from "react-router"
import { describe, expect, it, test } from "vitest"

import EventPreviewCard from "@/components/event-preview-card"

const mockEvent = {
  eventId: 1,
  title: "뮤지컬 엘리자벳",
  ageLimit: 9,
  venueName: "블루스퀘어",
  startDate: "2025-08-22",
  endDate: "2025-08-23",
  ticketOpenAt: "2025-07-22 10:00",
  genre: "뮤지컬",
  thumbnailUrl: "https://ticketimage.interpark.com/Play/image/large/25/25008903_p.gif",
  eventDate: "2025-08-22",
  eventScheduleId: 1,
}

describe("공연 카드에 제목, 날짜, 오픈일이 렌더링된다", () => {
  test("공연 카드에 제목, 날짜, 오픈일이 렌더링된다", () => {
    render(
      <MemoryRouter>
        <EventPreviewCard event={mockEvent} openAt />
      </MemoryRouter>
    )
    expect(screen.getByText("뮤지컬 엘리자벳")).toBeInTheDocument()
    expect(screen.getByText("뮤지컬")).toBeInTheDocument()
    expect(screen.getByText("2025-07-22 10:00")).toBeInTheDocument()
  })
})
