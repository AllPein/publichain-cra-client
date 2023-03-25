import React from 'react';

export const Checkbox = ({ data }) => {
  return (
    <div className="mt-6">
      {data.items.map((item) => (
        <div key={item.text + item.checked} className="flex items-start mb-4">
          <input
            checked={item.checked}
            readOnly
            type="checkbox"
            className="mt-2 text-blue-600 bg-gray-100 rounded"
          />

          <label className="ml-4 text-lg font-light text-gray-900">
            {item.text}
          </label>
        </div>
      ))}
    </div>
  );
};
