import axios from 'axios';
import React, { useState, useEffect, FunctionComponent } from 'react';

interface SelectBoxProps {
  apiEndpoint: string;
  onChange: (value: string) => void;
}

interface Option {
  value: string;
  label: string;
}

interface ApiResponseItem {
  id: string;
  name: string;
}

const SelectBox: FunctionComponent<SelectBoxProps> = ({ apiEndpoint, onChange }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponseItem[]>(apiEndpoint);
        const data = response.data;
        setOptions(data.map((item) => ({ value: item.id, label: item.name })));
        setError(null); // Reset error if the request is successful
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Failed to load options');
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 h-36">
      <div className="relative">
  <div className="block appearance-none w-full p-4 bg-white border border-purple-400 hover:border-purple-300 px-4 py-2 pr-8 rounded-lg shadow-lg leading-tight focus:outline-none focus:border-gray-200 focus:shadow-outline cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
    {selectedValue ? options.find(option => option.value === selectedValue)?.label : 'Select an option'}
  </div>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  </div>
</div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full top-9 bg-white border border-purple-400 rounded-lg">
          {options.map(option => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer rounded-lg ${selectedValue === option.value ? 'bg-purple-200' : 'hover:bg-purple-100'}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default SelectBox;
