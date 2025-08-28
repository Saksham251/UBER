const VehiclePanel = ({ fare, setConfirmRidePanel, setVehiclePanel, setVehicleType }) => {
    return (
        <div>
            <h5 className='absolute w-[93%] text-center p-1 top-0'
                onClick={() => setVehiclePanel(false)}>
                <i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i>
            </h5>
            <h3 className='text-2xl mb-3 font-semibold'>Choose a vehicle</h3>

            <div
                onClick=
                {
                    () => {
                        setConfirmRidePanel(true)
                        setVehicleType('car')
                    }
                }
                className='flex rounded-2xl border-2 mb-2 active:border-black border-gray-300 items-center justify-between w-full p-3'>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i></span> 4</h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl font-semibold w-1/4'>{fare ? fare.car : "--"}</h2>
            </div>

            <div 
                onClick=
                {
                    () => {
                        setConfirmRidePanel(true)
                        setVehicleType('moto')
                    }
                }
                className='flex rounded-2xl border-2 mb-2 active:border-black border-gray-300 items-center justify-between w-full p-3'>
                <img className='h-12 w-1/4' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" alt="" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-fill"></i></span> 1</h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='text-xs text-gray-600'>Affordable, fast motorcycle rides</p>
                </div>
                <h2 className='text-xl font-semibold w-1/4'>{fare ? fare.moto : "--"}</h2>
            </div>

            <div 
                onClick=
                {
                    () => {
                        setConfirmRidePanel(true)
                        setVehicleType('auto')
                    }
                }
                className='flex rounded-2xl border-2 mb-2 active:border-black border-gray-300 items-center justify-between w-full p-3'>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>Auto <span><i className="ri-user-fill"></i></span> 3</h4>
                    <h5 className='font-medium text-sm'>5 mins away</h5>
                    <p className='text-xs text-gray-600'>Affordable, auto rides</p>
                </div>
                <h2 className='text-xl font-semibold w-1/4'>{fare ? fare.auto : "--"}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel;