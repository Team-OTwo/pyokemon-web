export const tickets = [
  {
    bookingId: 1001,
    eventTitle: "TOMORROW X TOGETHER WORLD TOUR",
    eventDate: "2025-08-22T16:00:00",
    venueName: "잠실 종합 운동장",
    thumbnailUrl:
      "http://ticketimage.interpark.com/TCMS3.0//MProd/ProdBridge/2506/c9f64fa0-a6f2-428c-9f69-8fa8dd7acc02.png",
    totalPrice: 198000,
    status: "예매 완료",
  },
  {
    bookingId: 1002,
    eventTitle: "TOMORROW X TOGETHER WORLD TOUR",
    eventDate: "2025-08-22T18:00:00",
    venueName: "잠실 종합 운동장",
    thumbnailUrl:
      "http://ticketimage.interpark.com/TCMS3.0//MProd/ProdBridge/2506/c9f64fa0-a6f2-428c-9f69-8fa8dd7acc02.png",
    totalPrice: 198000,
    status: "예매 완료",
  },
]

export const ticket = {
  bookingId: 12345,
  status: "CONFIRMED",
  createdAt: "2025-08-06T14:00:00",
  user: {
    name: "홍길동",
  },
  event: {
    title: "레미제라블",
    thumbnailUrl:
      "http://ticketimage.interpark.com/TCMS3.0//MProd/ProdBridge/2506/c9f64fa0-a6f2-428c-9f69-8fa8dd7acc02.png",
    eventDate: "2025-08-20",
    venue: {
      name: "예술의전당",
    },
  },
  seat: {
    className: "VIP",
    floor: 1,
    row: "9",
    col: "D",
  },
  payment: {
    method: "신용카드",
    status: "PAID",
    paidAt: "2025-08-01T10:30:00Z",
    amount: 120000,
  },
}
