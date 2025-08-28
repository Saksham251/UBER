import React from 'react'

const LookingForDriver = (props) => {
    const getVehicleImage = () => {
        if (props.vehicleType === "car") {
            return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png";
        } else if (props.vehicleType === "moto") {
            return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png";
        } else {
            return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png";
        }
    };

    return (
        <div>
            <h5 className='absolute w-[93%] text-center p-1 top-0' onClick={() => {
                props.setVehicleFound(false)
            }}>
                <i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i>
            </h5>
            <h3 className='text-2xl mb-3 font-semibold'>Looking for a driver</h3>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <img className='h-30' src={getVehicleImage()} alt={props.vehicleType} />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 mb-5'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>
                                ₹ {props.fare && props.vehicleType ? props.fare[props.vehicleType] : "--"}
                            </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver
