export const GENRE_LIST = [
  { title: "전체", type: "" },
  { title: "콘서트", type: "concert" },
  { title: "뮤지컬", type: "musical" },
  { title: "연극", type: "play" },
  { title: "클래식", type: "classic" },
  { title: "스포츠", type: "sports" },
  { title: "행사", type: "exhibition" },
]

export const GENRE_MAP: Record<string, string> = {
  //   event: "",
  concert: "콘서트",
  musical: "뮤지컬",
  classic: "클래식",
  exhibition: "행사",
  play: "연극",
  sports: "스포츠",
}
