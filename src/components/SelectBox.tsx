import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface SelectBoxProps {
    apiEndpoint: string;
    onChange: (value: string) => void;
}

interface Option {
    value: string;
    label: string;
}
const SelectBox: React.FC<SelectBoxProps> = ({ apiEndpoint, onChange }) => {  
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>('');
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(apiEndpoint);
            const data = response.data;
            setOptions(data.map((item: any) => ({ value: item.id, label: item.name })));
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
    
        fetchData();
      }, [apiEndpoint]);
      const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value);
      };
    return (
        <div className="relative inline-block w-full">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="" disabled>Select an option</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z" /></svg>
        </div>
      </div>
      );
}
 
export default SelectBox;