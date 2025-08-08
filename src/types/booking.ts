export interface Booking_sidebar {
  eventScheduleId: number
  remainingSeatsByGrade: {
    seatGrade: string
    remainingSeats: number
    price: number
  }[]
}

export interface Seat_class {
  seatId: number
  row: string
  col: string
  seatGrade: string
  booked: boolean
}

export interface PostEventBookingRequest {
  eventScheduleId: number
  seatId: number
}

export interface PostEventBookingResponse {
  eventScheduleId: number
  bookingId: number
}
