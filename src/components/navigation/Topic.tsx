import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TopicType } from "./Module";
import { IDsGenerator } from "../../utils/IDsGenerator";

type TopicProps = {
    closeTopic: () => void,
    addTopicToArray: (topic: TopicType) => void
}
export const Topic:React.FC<TopicProps> = ({closeTopic, addTopicToArray} : TopicProps) => {

    const [currentTopic, setCurreentTopic] = useState<TopicType>({
        id:"",
        title: "",
        description: "",
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        event.preventDefault();
        const { name, value } = event.target;
        setCurreentTopic( prev => (
            {...prev, 
            [name]: value
            }));

    }

    const handleSubmit = async (event) : Promise<void> => {
        event.preventDefault();

        if(currentTopic.title !== undefined || currentTopic.title !== ""){
            const generatedId = await IDsGenerator(currentTopic.title);
            const updatedTopic = {...currentTopic, id:generatedId};
            addTopicToArray(updatedTopic);
        }
        closeTopic();
    }

    return(
        <section className="border-b-black-800 border-4 w-1xl backdrop-blur-lg rounded-2xl m-5 p-3">
            <div className="flex justify-between p-2 pl-6">   
                <h3 className="text-2xl">Add Topic</h3>
                <IoMdCloseCircle onClick={closeTopic} className="text-4xl cursor-pointer"></IoMdCloseCircle>
            </div>

            <label htmlFor="title" className="block text-left pl-6 text-lg">Topic Title</label>
            <input type="text" name="title"
                className="block ml-5 px-4 py-2 mt-2 border 
                border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
                focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            value = {currentTopic?.title} onChange={handleInputChange}/>

             <label htmlFor="description" className="block text-left pl-6 text-lg">Topic Description</label>
             <input type="text" name="description"
                className="block ml-5 px-4 py-2 mt-2 border
                border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
                focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            value = {currentTopic?.description} onChange={handleInputChange}/>

            <input type="submit" onClick={handleSubmit}  className="px-6 py-3  text-white bg-black  font-semibold 
            rounded-lg shadow-md hover:bg-blue-700 focus:outline-none 
            focus:ring-2 focus:ring-blue-500 transition duration-200 my-3 ml-6 block text-center"  value="Confirm"/>
        </section>
    )
    
        
}