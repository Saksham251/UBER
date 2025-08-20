import React from 'react'

const LocationSearchPanel = ({ suggestions, onSelect }) => {
  return (
    <div className="max-h-64 overflow-y-auto px-2">
      {suggestions.length === 0 ? (
        <p className="text-gray-400 text-center mt-2">
          Start typing to see suggestions...
        </p>
      ) : (
        suggestions.map((place, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(place)}
            className="flex items-start gap-3 p-3 my-2 bg-white rounded-xl shadow-sm hover:bg-gray-100 transition cursor-pointer border border-gray-200"
          >
            <div className="flex items-center justify-center w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-gray-200">
              <i className="ri-map-pin-fill text-gray-600 text-lg"></i>
            </div>

            <h4 className="font-medium text-gray-800 text-sm leading-snug flex-1">
              {place.description}
            </h4>
          </div>
        ))
      )}
    </div>
  )
}

export default LocationSearchPanel
