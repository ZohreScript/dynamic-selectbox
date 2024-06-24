import React, { useState } from 'react';
import SelectBox from './components/SelectBox';

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log('Selected value:', value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Dynamic Select Box</h1>
      <SelectBox apiEndpoint="http://localhost:5000/options" onChange={handleSelectChange} />
      {selectedValue && (
        <div className="mt-4 text-center">
          <p className="text-lg text-gray-700">Selected Value: <span className="font-semibold text-blue-600">{selectedValue}</span></p>
        </div>
      )}
    </div>
  </div>
  );
};

export default App;
