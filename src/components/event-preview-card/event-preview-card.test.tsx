import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"

import { MemoryRouter } from "react-router"
import { describe, expect, it, test } from "vitest"

import EventPreviewCard from "@/components/event-preview-card"

const mockEvent = {
  id: 1,
  title: "뮤지컬 엘리자벳",
  age_limit: 9,
  venue_name: "블루스퀘어",
  start_date: "2025-08-22",
  end_date: "2025-08-23",
  ticket_open_at: "2025-07-22 10:00",
  genre: "뮤지컬",
  thumbnail_url: "https://ticketimage.interpark.com/Play/image/large/25/25008903_p.gif",
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
