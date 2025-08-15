export interface EventBookingResponse {
  seatClassId: number
  seatGrade: string
  price: number
  seatCount: number
}

export interface SelectedSeat {
  seatId: number
  row: string
  col: string
  seatGrade: string
  booked: boolean
}

export interface PostEventBookingRequest {
  eventScheduleId: number
  seatId: number
  tenantId: number
}

export interface PostEventBookingResponse {
  eventScheduleId: number
  bookingId: number
}
