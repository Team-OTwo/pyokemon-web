export interface Ticket {
  bookingId: number
  userName: string
  eventTitle: string
  eventDate: string
  venueName: string
  seat: {
    class: string
    floor: number
    row: string
    col: string
  }
  thumbnailUrl: string
  totalPrice: number
  status: string
}
