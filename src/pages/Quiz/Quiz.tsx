// import React, { useState, useEffect, useRef } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize the Gemini API client
// const genAI = new GoogleGenerativeAI(
//   import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
// );

// interface Question {
//   question: string;
//   options: string[];
//   error?: string; // Changed to optional
//   correctAnswer: string;
//   userAnswer: string | null;
//   isCorrect: boolean | null;
// }

// const DocumentQuizComponent: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [documentContent, setDocumentContent] = useState<string>("");
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [animatedText, setAnimatedText] = useState("");
//   const [isAnimating, setIsAnimating] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const extractDocumentContent = async (file: File): Promise<string> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (e: ProgressEvent<FileReader>) => {
//         const text = e.target?.result;
//         resolve(text as string);
//       };
//       reader.readAsText(file);
//     });
//   };

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const uploadedFile = event.target.files?.[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       setIsLoading(true);
//       try {
//         const content = await extractDocumentContent(uploadedFile);
//         setDocumentContent(content);
//         await generateQuestions(content);
//       } catch (error) {
//         console.error("Error processing document:", error);
//         alert("Error processing document. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Helper function to handle exponential backoff retries
//   const retryWithBackoff = async (
//     fn: () => Promise<object>,
//     retries: number = 3,
//     delay: number = 1000
//   ): Promise<object> => {
//     try {
//       return await fn();
//     } catch (error) {
//       if (retries === 0) throw error;
//       console.warn(`Retrying after ${delay}ms due to rate limiting...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return retryWithBackoff(fn, retries - 1, delay * 2);
//     }
//   };

//   const generateQuestions = async (content: string) => {
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//       const generate = async () => {
//         const result = await model.generateContent(`
//           Based on the following document content, generate 10 multiple-choice questions with 4 options each.
//           Format the output as a JSON array of objects, where each object has the properties:
//           "question", "options" (an array of 4 strings), and "correctAnswer" (the correct option).

//           Document content:
//           ${content.substring(0, 5000)}
//         `);
//         console.log(result);
//         return result;
//       };

//       const result = await retryWithBackoff(generate);

//       const response = result.response.text();
//       const jsonStart = response.indexOf("[");
//       const jsonEnd = response.lastIndexOf("]") + 1;
//       const jsonResponse = response.substring(jsonStart, jsonEnd);

//       const parsedQuestions: Question[] = JSON.parse(jsonResponse).map(
//         (q: Omit<Question, "userAnswer" | "isCorrect">) => ({
//           ...q,
//           userAnswer: null,
//           isCorrect: null,
//         })
//       );
//       setQuestions(parsedQuestions);
//       setCurrentQuestionIndex(0);
//     } catch (error) {
//       console.error("Error generating questions:", error);
//       alert("Error generating questions. Please try again.");
//     }
//   };

//   const handleAnswerSelection = (answer: string) => {
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((q, index) =>
//         index === currentQuestionIndex
//           ? {
//               ...q,
//               userAnswer: answer,
//               isCorrect: answer === q.correctAnswer,
//             }
//           : q
//       )
//     );
//   };

//   const animateText = async (text: string) => {
//     setIsAnimating(true);
//     setAnimatedText("");
//     for (let i = 0; i < text.length; i++) {
//       await new Promise((resolve) => setTimeout(resolve, 20));
//       setAnimatedText((prev) => prev + text[i]);
//     }
//     setIsAnimating(false);
//   };

//   useEffect(() => {
//     if (questions[currentQuestionIndex]) {
//       animateText(questions[currentQuestionIndex].question);
//     }
//   }, [currentQuestionIndex, questions]);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Document Quiz Generator</h2>
//       <input
//         type="file"
//         accept=".txt,.pdf,.doc,.docx"
//         onChange={handleFileUpload}
//         ref={fileInputRef}
//         className="hidden"
//       />
//       <button
//         onClick={() => fileInputRef.current?.click()}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         disabled={isLoading}
//       >
//         Upload Document
//       </button>
//       {file && <p className="mb-4">File uploaded: {file.name}</p>}
//       {isLoading && <p>Generating questions...</p>}
//       {questions.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-xl font-semibold mb-2">
//             Question {currentQuestionIndex + 1} of {questions.length}
//           </h3>
//           <p className="mb-4">{animatedText}</p>
//           {!isAnimating && (
//             <div className="space-y-2">
//               {questions[currentQuestionIndex].options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswerSelection(option)}
//                   className={`block w-full text-left p-2 rounded ${
//                     questions[currentQuestionIndex].userAnswer === option
//                       ? "bg-blue-200"
//                       : "bg-gray-100 hover:bg-gray-200"
//                   }`}
//                 >
//                   {option}
//                 </button>
//               ))}
//             </div>
//           )}
//           <div className="mt-4 flex justify-between">
//             <button
//               onClick={() =>
//                 setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
//               }
//               disabled={currentQuestionIndex === 0}
//               className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentQuestionIndex((prev) =>
//                   Math.min(questions.length - 1, prev + 1)
//                 )
//               }
//               disabled={currentQuestionIndex === questions.length - 1}
//               className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//           {questions[currentQuestionIndex].userAnswer && (
//             <div className="mt-4">
//               <p
//                 className={`font-bold ${
//                   questions[currentQuestionIndex].isCorrect
//                     ? "text-green-500"
//                     : "text-red-500"
//                 }`}
//               >
//                 {questions[currentQuestionIndex].isCorrect
//                   ? "Correct!"
//                   : `Incorrect. The correct answer is: ${questions[currentQuestionIndex].correctAnswer}`}
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentQuizComponent;

// import React from "react";

const DocumentQuizComponent = () => {
  return <div>DocumentQuizComponent</div>;
};

export default DocumentQuizComponent;
