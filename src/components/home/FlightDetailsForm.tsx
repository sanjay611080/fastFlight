import React from 'react';
interface FlightDetailsFormProps {
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  onSubmit: () => void;
}

const FlightDetailsForm: React.FC<FlightDetailsFormProps> = ({ source, setSource, destination, setDestination, date, setDate, loading, onSubmit }) => {
  return (
    <div className="flex flex-col w-full lg:w-2/5 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Flight Details</h3>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="source" className="block text-lg font-medium text-gray-700">Source</label>
          <input
            id="source"
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="mt-2 p-3 w-full border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="destination" className="block text-lg font-medium text-gray-700">Destination</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-2 p-3 w-full border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-lg font-medium text-gray-700">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 p-3 w-full border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={loading}
         className="bg-[#FB8C00] text-white p-3 w-full rounded-lg hover:bg-[#E67A00] disabled:bg-blue-300 transition cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Check Flight Availability'}
      </button>
    </div>
  );
};

export default FlightDetailsForm;
