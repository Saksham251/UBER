import "remixicon/fonts/remixicon.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
    const navigate = useNavigate();
    async function endRide(){
        console.log("CompleteRide Button working");
       const response =  await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
        rideId:props.rideData._id
       },{
        headers: { "Authorization": `Bearer ${localStorage.getItem('captainToken')}` }
       });
       if(response.status===200){
        props.setFinishRidePanel(false);
        navigate("/captain-home");
       }
    }
    return (
        <div>
            <h5 className='absolute w-[93%] text-center p-1 top-0' onClick={() => {
                props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i></h5>
            <h3 className='text-2xl mb-3 font-semibold'>Finish this ride</h3>

            <div className='flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 justify-center'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2V9i8xsBdYJRpANAiQw3cmO1EL8OF_Edyg&s" alt="" />
                    <h2 className='text-lg font-medium'>{props.rideData?.user?.fullname?.firstName+ " "+ props.rideData?.user?.fullname?.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.rideData?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.rideData?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 mb-5'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.rideData?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-10 w-full'>
                    <button 
                        onClick={()=>{
                            endRide()
                        }}
                        className='bg-green-600 flex justify-center w-full text-white font-semibold p-3 rounded-lg mt-5 text-lg'
                    >
                        Complete Ride
                    </button>
                    <p className='mt-10 text-xs w-full ml-7'>Click on finish ride button if you have completed the ride.</p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide
