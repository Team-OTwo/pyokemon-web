export interface Booking_sidebar {
  eventScheduleId: number
  remainingSeatsByGrade: {
    seatGrade: string
    remainingSeats: number
    price: number
  }[]
}
