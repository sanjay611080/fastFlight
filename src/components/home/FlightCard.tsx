import React from 'react';
import { Flight, TotalPriceResponse } from '../../types/types';
interface FlightCardProps {
  flight: Flight;
  totalPriceData: TotalPriceResponse | null; 
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, totalPriceData }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition transform hover:scale-105 w-full sm:w-80 p-6 space-y-4">
      <div className="flex justify-center mb-4">
        <img src="/plane.png" alt="Airplane Icon" className="h-16 w-38 object-contain" />
      </div>
      {/* Flight Details */}
      <div className="space-y-2">
        <p className="text-lg font-semibold text-gray-800">
          <strong>Airline:</strong> {flight.airline}
        </p>
        <p className="text-base text-gray-600">
          <strong>Price:</strong> {flight.price}
        </p>
        <p className="text-base text-gray-600">
          <strong>Departure:</strong> {flight.departure_time}
        </p>
        <p className="text-base text-gray-600">
          <strong>Arrival:</strong> {flight.arrival_time}
        </p>
        {/* <p className="text-base text-gray-600">
          <strong>Remaining Seats:</strong> {flight.remaining_seats_percentage}%
        </p> */}
      </div>

      {/* totalPriceData */}
      {totalPriceData && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">Total Price</h4>
          <p className="text-base text-gray-600">
            <strong>Total Price:</strong> {totalPriceData.price}
          </p>
          <p className="text-base text-gray-600">
            <strong>Adults:</strong> {totalPriceData.adults}
          </p>
          <p className="text-base text-gray-600">
            <strong>Children:</strong> {totalPriceData.children}
          </p>
          <p className="text-base text-gray-600">
            <strong>Infants:</strong> {totalPriceData.infants}
          </p>
          <p className="text-base text-gray-600">
            <strong>Luggage:</strong> {totalPriceData.luggage}
          </p>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
