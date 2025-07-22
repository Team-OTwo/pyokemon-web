import React from "react"
import { useSearchParams } from "react-router"

const EventListPage = () => {
  const [searchParams] = useSearchParams()

  const typeMap: Record<string, string> = {
    concert: "콘서트",
    musical: "뮤지컬",
    classic: "클래식",
    exhibition: "행사",
    play: "연극",
    sports: "스포츠",
  }

  const type = searchParams.get("type")
  const typeName = typeMap[type ?? ""] ?? ""

  return (
    <div>
      <h1 className="head1 py-32">{typeName} 둘러보기</h1>
    </div>
  )
}

export default EventListPage
