import { useState } from 'react';
import FlightDetailsForm from './FlightDetailsForm';
import FlightCard from './FlightCard';
import ErrorMessage from './ErrorMessage';
import { Flight, TotalPriceResponse } from '../../types/types';
import TotalPriceForm from './TotalPriceForm ';

const Home = () => {
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [luggage, setLuggage] = useState<number>(0);

  const [flightData, setFlightData] = useState<Flight[] | null>(null);
  const [totalPriceData, setTotalPriceData] = useState<TotalPriceResponse | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const checkAvailability = async () => {
    if (!source || !destination || !date) {
      setError('Please provide source, destination, and date.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://flight-api-two.vercel.app/api/routes?source=${source}&destination=${destination}&date=${date}`);
      const data = await response.json();

      if (response.ok) {
        setFlightData(data); 
      } else {
        setError(data.error); 
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error fetching flight data: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = async () => {
    if (!source || !destination || !date) {
      setError('Please provide source, destination, and date.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://flight-api-two.vercel.app/api/passengers?source=${source}&destination=${destination}&date=${date}&adults=${adults || 0}&children=${children || 0}&infants=${infants || 0}&luggage=${luggage || 0}`);
      const data = await response.json();

      if (response.ok) {
        setTotalPriceData(data[0]); 
      } else {
        setError(data.error); 
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error calculating total price: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pb-16 px-4 sm:px-0">
      <div className="relative w-full h-[530px]">
        <img
          src="/back.jpg"  
          alt="Flight Banner"
          className="w-full h-full object-cover "  
        />
        
      </div>

      {/* Description Section */}
      <div className="text-center mt-8 px-6">
        <hr className="my-6 border-gray-300" />
      </div>

      <h1 className="text-4xl font-semibold text-center text-white mb-8">Check Your Flight Details</h1>

      {/* Form Container */}
      <div className="flex flex-col lg:flex-row gap-12 justify-center items-center">
        <FlightDetailsForm
          source={source}
          setSource={setSource}
          destination={destination}
          setDestination={setDestination}
          date={date}
          setDate={setDate}
          loading={loading}
          onSubmit={checkAvailability}
        />

        {/* Total Price Form */}
        {flightData && (
          <TotalPriceForm
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            infants={infants}
            setInfants={setInfants}
            luggage={luggage}
            setLuggage={setLuggage}
            loading={loading}
            onSubmit={calculateTotalPrice}
          />
        )}
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* Display Flight Availability with Total Price */}
      {flightData && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-white text-center mb-4">Available Flights</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {flightData.map((flight, index) => (
              <FlightCard key={index} flight={flight} totalPriceData={totalPriceData} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
