import React from 'react'
import { data, useParams } from 'react-router-dom'
import moment from 'moment'
import {AnimatePresence, motion} from 'framer-motion'

import { LuCircleAlert , LuListCollapse } from 'react-icons/lu'
import SpinnerLoader from '../../components/Loader/SpinnerLoader'
import {toast} from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'
import DeshboradLayout from '../../components/layouts/DeshboradLayout'
import RoleInfoHeader from './components/RoleInfoHeader'
import axiosIntance from '../../utils/axiosIntance'
import { API_PATHS } from '../../utils/apiPaths'
import QuestionCard from '../../components/Cards/QuestionCard'
import AIResponsePreview from './components/AIResponsePreview'
import Darwer from '../../components/Darwer'
import SkeletonLoader from '../../components/Loader/SkeletonLoader'






 const InterviewPrep = () => {
  const {sessionId}=useParams()
  const [sessionData,setSessionData]=useState(null)
  const [errorMessage,setErrorMessage]=useState("")
  const [openLeanMoreDrawer,setOpenLeanMoreDrawer]=useState(false)
  const [explanation ,setExplanation]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [isUpdateLoader,setIsUpdateLoader]=useState(false)

  //fetch session data by session id

  const fetchSessionDetailsById=async()=>{
    try{
      const response=await axiosIntance.get(API_PATHS.SESSION.GET_ONE(sessionId))

      if(response.data && response.data.session){
        setSessionData(response.data.session)


      }

    }catch(error){
      console.error("error",error);


    }
  }

  //generate concepte explaination
  const generateConceptExplanation=async(question)=>{
    try{
    setErrorMessage("")
    setExplanation(null)
    setIsLoading(true)
    setOpenLeanMoreDrawer(true)

    const response=await axiosIntance.post(API_PATHS.AI.GENERATE_EXPLANATION,
      {
        question,
      }
    );
    if(response.data){
      setExplanation(response.data)
    }
  }
    catch(error){
      setExplanation(null)
     setErrorMessage("feiled to generate explaination , ")
      console.error("error:",error)

    }finally{
      setIsLoading(false)
    }
  }
   

  // pin questions
  const toggleQusetionsPinStatus=async(questionId)=>{
    try{
      const response= await axiosIntance.post(API_PATHS.QUESTION.PIN(questionId),{});
       console.log(response)
       if(response.data && response.data.question){
        fetchSessionDetailsById();
       }
    }catch(error){
      console.error('error',error);
    }

  }

  //add more questions
  const uploadMoreQuestions=async()=>{
    try{
        setIsUpdateLoader(true)
        //call api for generate questions
        const airesponse=await axiosIntance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
          role:sessionData?.role,
          experience:sessionData?.experience,
          topicToFocus:sessionData?.topicToFocus,
          numberOfQuestions:10,
        });

        //should be like array [{que,ans}]
        const generatedQuestion=airesponse.data;
        const response=await axiosIntance.post(API_PATHS.QUESTION.ADD_ID_SESSION,{
          sessionId,
         
          questions:generatedQuestion,

        });
        if(response.data){
          toast.success("added more question")
          fetchSessionDetailsById();
        }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("something went wrong")
      }

    }
    finally{
      setIsUpdateLoader(false)
    }
  }
  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById();
    }

    return ()=>{};
  },[]);
  return (
    <DeshboradLayout>
      <RoleInfoHeader   
         role={sessionData?.role || ""}
         topicToFocus={sessionData?.topicToFocus ||" "}
         experience={sessionData?.experience ||0}

          questions={sessionData?.questions?.length || 0}
          description={sessionData?.description || ""}
          lastUpdated={sessionData?.updatedAt ? moment(sessionData.updatedAt).format("DD MMM YYYY"):" "}
       />

       <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
          <h2 className='text-lg font-semibold color-black'>Interview Q&A </h2>
          <div className='grid grid-cols-12 gap-4  mt-5 mb-10 '>
            <div className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}>

              <AnimatePresence>
                {sessionData?.questions?.map((data,index)=>{
                  return (
                    <motion.div
                    key={data._id || index}
                    initial={{opacity:0 ,y:-20}}
                    animate={{opacity:1 ,y:0}}
                    exit={{opacity:0,scale:0.95}}
                    transition={{
                      duration:0.4,
                      type:"spring",
                      stiffness:100,
                      delay:index *0.1,
                      damping:15,

                    }}
                    layout
                    layoutId={`question-${data._id ||index}`}
                    >
                      <>

                       <QuestionCard
                       question={data?.question}
                       answer={data?.answer}
                       onLearnMore={()=>
                        generateConceptExplanation(data.question)
                       }
                       isPinned={data?.isPinned}
                       onTogglePin={()=>toggleQusetionsPinStatus(data._id)}
                       
                       />
                      
                      
                      {
                        !isLoading && sessionData?.questions?.length ==index +1 &&(
                          <div className='flex items-center justify-center mt-5'>
                            <button className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer ' disabled={isLoading  || isUpdateLoader}  onClick={uploadMoreQuestions}>
                              {isUpdateLoader ? (<SpinnerLoader/>) :
                              (<LuListCollapse className='text-lg'/>)}{" "}
                              Load More

                            </button>
                          </div>
                        )
                         
                      }
                      </>
                      </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          <div className=''>
            <Darwer  
            isOpen={openLeanMoreDrawer}
            onClose={()=> setOpenLeanMoreDrawer(false)}
            title={!isLoading && explanation?.title}>
              {errorMessage && (
                <p className='flex gap-2 text-sm text-amber-500 font-medium'>
                  <LuCircleAlert className='mt-1'/> {errorMessage}
                </p>
              )}
              {isLoading && <SkeletonLoader/>}
              {!isLoading && explanation && (
                <AIResponsePreview content={explanation?.explanation}/>
              )}
            </Darwer>

          </div>
       </div>

     


    </DeshboradLayout>
  )
}

export default InterviewPrep
