export interface Flight {
    airline: string;
    price: string;
    departure_time: string;
    arrival_time: string;
    remaining_seats_percentage: number;
  }
  
  export interface TotalPriceResponse {
    airline: string;
    price: string;
    adults: number;
    children: number;
    infants: number;
    luggage: number;
  }
  