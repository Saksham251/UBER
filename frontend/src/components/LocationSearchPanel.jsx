import React from 'react'

const LocationSearchPanel = (props) => {

  // sample array for location
  const location = [
    'Near KL Saini Stadium, 10/487 Kaveri Path, Mansarovar, Jaipur',
    'Near AL Saini Stadium, 10/482 Kaveri Path, Mansarovar, Jaipur',
    'Near BL Saini Stadium, 10/481 Kaveri Path, Mansarovar, Jaipur',
    'Near CL Saini Stadium, 10/485 Kaveri Path, Mansarovar, Jaipur',
  ];

  return (
    <div>
      {/* This is the sample data */}
      {
        location.map(function (elem,idx) {
          return <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex gap-4 border-2 rounded-xl border-gray-100 active:border-black items-center justify-start my-2'>
            <h2 className='bg-[#eee] p-2 rounded-full w-12 h-8 flex items-center justify-center'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        })
      }

    </div>
  )
}

export default LocationSearchPanel
