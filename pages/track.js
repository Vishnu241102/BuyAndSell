import Image from 'next/image';
import axios from 'axios';
import Navbar from "@/components/Navbar"
import {useSession,signIn,signOut,getSession} from 'next-auth/react'
import Recat,{ useEffect, useState } from "react";
import CartAlt from '../public/assets/cart.png'
import NotFound from '../public/assets/not-found.png'
import ContentLoader from 'react-content-loader';
export default function Track() {

    const {data:session}=useSession();
    const [isLoading, setLoading] = useState(false);
    const [email,setEmail]=useState("sample@gamil.com")
    const [data, setData] = useState(null)
    const [wishIds, setwishIds] = useState([]);
    const [successToast,setSuccessToast]=useState(false);
    const [warnToast,setWarnToast]=useState(false);
    const [successToastMsg,setSuccessToastMsg]=useState("");
    const [warnToastMsg,setWarnToastMsg]=useState("");
    const [x1, setX1] = useState(0);

  useEffect(()=>{
    setLoading(true);  
    if(session)
    {
        setEmail(session.user.email);
    } 
    async function fetchData() {
        try
        {
            const postData = {
                email: email,
            };
            const res = await axios.get('http://localhost:4000/getWishList');
            const data = await res.data;
            if(data.length) setData(data);
            else setData(null)
            setLoading(false);
        }
        catch(error)
        {
            setWarnToast(true);
            setWarnToastMsg("Server Issue! Please try after some time.")
            handleX1();
            setTimeout(() => {
                setWarnToastMsg("")
                setWarnToast(false);
            }, 4000);
            setLoading(false);
        }
    }

    fetchData();  
  },[session])

  const handleX1=()=>
  {
      const animationDuration = 4000; // Animation duration in milliseconds
      const animationSteps = 500; // Number of animation steps
      const stepDuration = animationDuration / animationSteps;   //4

      let currentStep = 0;

      const timer = setInterval(() => 
      {
          currentStep++;

          if (currentStep >= animationSteps) {
              setX1(0);
              clearInterval(timer);
          } else {
              const nextX2 = 200-((currentStep / animationSteps) * 200);
              setX1(nextX2);
      }
      }, stepDuration);
  }
  
  return (
    <div>
        <Navbar/>
        {
          session?(
            <div>
                {isLoading?
                (
                    <div className="grid lg:grid-cols-4 lg:gap-16 grid-cols-2 mt-4 gap-5 lg:px-6 lg:w-full w-48">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index}>
                        <ContentLoader
                          speed={0.8}
                          width={200}
                          height={200}
                          viewBox="0 0 300 400"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        
                        >
                          <rect x="0" y="0" rx="5" ry="5" width="300" height="200" />
                          <rect x="0" y="220" rx="3" ry="3" width="200" height="20" />
                          <rect x="0" y="260" rx="3" ry="3" width="200" height="20" />
                          <rect x="220" y="220" rx="3" ry="3" width="140" height="60" />
                        </ContentLoader>
                      </div>
                    ))}
                    </div>
                ):
                (
                    data?(
                        <div>
                        </div>
                    ):
                    (
                        <div className='w-full h-full mx-auto my-auto'>
                            <Image
                               className='w-auto h-auto m-auto'
                               src={NotFound}
                               width={400}
                               height={400}
                            />
                        </div>
                    )
                )
                }
            </div>
          ):
          (
            <div className="text-lg mt-24 text-center font-bold bg-slate-50 rounded-lg shadow-xl  px-6 py-2 mx-auto w-80">
              PLease Login First to upload a new item
            </div>
          )
        }

        {/* Toast message for success */}
        <div id="toast-success" className={successToast?"flex flex-col overflow-hidden justify-between items-center w-full max-w-xs text-gray-500 bg-green-200 rounded-lg shadow dark:text-gray-400 z-[120] dark:bg-gray-800 fixed bottom-1 left-1":"hidden"} role="alert">
            <svg className='absolute top-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 6">
                <line x1={x1} y1="0" x2="0" y2="0" stroke="green" strokeWidth="6" />
            </svg>
            <div className='flex flex-row p-4'>
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-bold ">{successToastMsg}</div>
                <button onClick={()=>handleCancelToastMsg("success")} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
        
        {/* Toast Message for warning */}
        <div id="toast-warning" className={warnToast?"flex flex-col overflow-hidden justify-between items-center w-full max-w-xs text-gray-500 bg-red-200 rounded-lg shadow z-[120] dark:text-gray-400 dark:bg-gray-800 fixed bottom-1 left-1":"hidden"} role="alert">
            <svg className='absolute top-0 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 6">
                <line x1={x1} y1="0" x2="200" y2="0" stroke="red" strokeWidth="6" />
            </svg>
            <div className='flex flex-row p-4'>
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Warning icon</span>
                </div>
                <div className="ml-3 text-sm font-bold ">{warnToastMsg}</div>
                <button onClick={()=>handleCancelToastMsg("warn")} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
        

    </div>
  );
}
