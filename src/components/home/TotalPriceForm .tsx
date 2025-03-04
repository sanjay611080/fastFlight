import React from 'react';
interface TotalPriceFormProps {
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  children: number;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  infants: number;
  setInfants: React.Dispatch<React.SetStateAction<number>>;
  luggage: number;
  setLuggage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  onSubmit: () => void;
}

const TotalPriceForm: React.FC<TotalPriceFormProps> = ({ adults, setAdults, children, setChildren, infants, setInfants, luggage, setLuggage, loading, onSubmit }) => {
  return (
    <div className="flex flex-col w-full lg:w-2/5 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Passenger Count</h3>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="adults" className="block text-lg font-medium text-gray-700">Adults</label>
          <input
            id="adults"
            type="number"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
            className="mt-2 p-3 w-full border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="children" className="block text-lg font-medium text-gray-700">Children</label>
          <input
            id="children"
            type="number"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
            className="mt-2 p-3 w-full border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="infants" className="block text-lg font-medium text-gray-700">Infants</label>
          <input
            id="infants"
            type="number"
            value={infants}
            onChange={(e) => setInfants(parseInt(e.target.value))}
            className="mt-2 p-3 w-full border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="luggage" className="block text-lg font-medium text-gray-700">Luggage</label>
          <input
            id="luggage"
            type="number"
            value={luggage}
            onChange={(e) => setLuggage(parseInt(e.target.value))}
            className="mt-2 p-3 w-full border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-[#FB8C00] text-white p-3 w-full rounded-lg hover:bg-[#E67A00] disabled:bg-blue-300 transition cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Calculate Total Price'}
      </button>
    </div>
  );
};

export default TotalPriceForm;
