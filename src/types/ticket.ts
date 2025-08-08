export interface Ticket {
  bookingId: number
  eventTitle: string
  eventDate: string
  venueName: string
  thumbnailUrl: string
  totalPrice: number
  status: string
}

export interface TicketDetail {
  bookingId: number
  status: string
  createdAt: string
  user: {
    name: string
  }
  event: {
    title: string
    thumbnailUrl: string
    eventDate: string
    venue: {
      name: string
    }
  }
  seat: {
    className: string
    floor: number
    row: string
    col: string
  }
  payment: {
    method: string
    status: string
    paidAt: string
    amount: number
  }
}
