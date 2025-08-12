import { Ticket, TicketDetail } from "@/types/ticket"

export const mapTicketDetailToTicket = (detail: TicketDetail): Ticket => ({
  bookingId: detail.bookingId,
  eventTitle: detail.event.title,
  eventDate: detail.event.eventDate,
  venueName: detail.event.venue.name,
  thumbnailUrl: detail.event.thumbnailUrl,
  totalPrice: detail.payment.amount,
  status: detail.status,
})
