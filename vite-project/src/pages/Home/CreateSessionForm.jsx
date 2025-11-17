import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import SpinnerLoader from '../../components/Loader/SpinnerLoader'
import axiosIntance from '../../utils/axiosIntance'

import { API_PATHS } from '../../utils/apiPaths'


const CreateSessionForm = () => {

    const [formData,setFormData]=useState({
        role:"",
        experience:"",
        topicToFocus:"",
        description:""
    })

    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)
    const navigate=useNavigate()

    const handleChange=(key,value)=>{
        setFormData((prevData)=>({
            ...prevData,
            [key]:value,

        }))

    }

    const handleCreateSession=async (e)=>{
        e.preventDefault();
        const {role,experience,topicToFocus}=formData;
        if(!role || !experience||!topicToFocus){

            setError("please fill  all reqired feild")
               return;
        }
        setError("")
        setIsLoading(true)
        try{
          // call ai api to genreate questions
          const aiResponse=await axiosIntance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
            role,
            experience,
            topicToFocus,
            numberOfQuestions:10,

          });
          // array lik [questions ,answer]
           const genreatedQuestions=aiResponse.data;
           const response=await axiosIntance.post(API_PATHS.SESSION.CREATE,{
            ...formData,
            questions:genreatedQuestions,

           });

           if(response.data?.session?._id){
            navigate(`/interview-prep/${response.data?.session?._id}`)
           }
        }catch(error){

          if(error.response &&  error.response.data.message){
            setError(error.response.data.message)
          }else{
            setError("something went wrong . Please tru again")
            
          }
        } finally {
          setIsLoading(false)
        }

    };

  return <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black'>Start new Intervew Journey</h3>
    <p className='text-xs text-slate-400 mt-[5px] mb-3'>Fill out of quick details and unloack your personlized set of interview questions:</p>

    <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>
      <Input
         value={formData.role}
         onChange={({target})=>handleChange("role",target.value)}
         label="Target role"
         placeholder="(e.g.,Frontend developer,Backend Developer,Database"
         type="text"
        />
         <Input
         value={formData.experience}
         onChange={({target})=>handleChange("experience",target.value)}
         label="Target experience"
         placeholder="(e.g.,1 yesr ,2 yesr..."
         type="number"
        />

         <Input
         value={formData.topicToFocus}
         onChange={({target})=>handleChange("topicToFocus",target.value)}
         label="Target topicToFocus"
         placeholder="(e.g.,React,node,express,Database"
         type="text"
        />
         <Input
         value={formData.description}
         onChange={({target})=>handleChange("description",target.value)}
         label="Target description"
         placeholder="Any specific goals or notes for this sessions"
         type="text"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button
          type='submit'
          className='btn-primary w-full mt-2 cursor-pointer h-12px'
          disabled={isLoading}

        >{isLoading ?<SpinnerLoader/>:'Create Session'}</button>
         

       
    </form>
  </div>
}

export default CreateSessionForm
