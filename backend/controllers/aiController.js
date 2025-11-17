const {GoogleGenAI, createPartFromCodeExecutionResult}=require('@google/genai')
const {conceptExplainPrompt, questionAnswerPrompt} = require('../utils/prompts');
const { raw, json } = require('express');
const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

// desc genreate interview question and anwer
// route post/api/ai/genrate-questions
// access private 

const generateInterviewQuestions=async (req,res)=>{
    try{
        const {role,experience,topicToFocus,numberOfQuestions}=req.body;
        if(!role || !experience || !topicToFocus || !numberOfQuestions){
            return res.status(400).json({message:"missing requrie filed"});
        }
        const prompt= questionAnswerPrompt(role,experience,topicToFocus,numberOfQuestions);;
        const response=await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt,
        });

        let rawText=response.text;
        const cleanedText=rawText
        .replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim()


        const data=JSON.parse(cleanedText);

        res.status(200).json(data);


    }catch(error){
        return res.status(500).json({
            message:"field to genrate questions",
            error:error.message
        });
    }

};

const GenerateConceptExplanation=async(req,res)=>{
       try{
        const {question}=req.body;

        if(!question){
            return res.status(400).json({message:"required missing filed"})
        }

        const prompt=conceptExplainPrompt(question);

        const response=await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt
        });
        let rawText=response.text;
         const cleanedText=rawText
        .replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim()

        const data=JSON.parse(cleanedText);
        res.status(200).json(data);



    }catch(error){
        return res.status(500).json({
            message:"field to genrate questions",
            error:error.message
        });
    }

}


module.exports={generateInterviewQuestions,GenerateConceptExplanation};
