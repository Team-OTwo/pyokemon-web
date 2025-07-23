import { describe, expect, test } from "vitest"

import { formatDate } from "./date-utils"

describe("date-utils", () => {
  test("날짜 포맷팅 테스트", () => {
    const date = new Date("2024-03-20")

    expect(formatDate(date, "YYYY-MM-DD")).toBe("2024-03-20")
    expect(formatDate(date, "YYYY년 MM월 DD일")).toBe("2024년 03월 20일")
    expect(formatDate(date, "MM/DD/YYYY")).toBe("03/20/2024")
  })
})
