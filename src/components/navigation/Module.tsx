import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Topic } from "./Topic";
import { preview } from "vite";

export type ModuleType  = {
    title: string,
    description: string,
    topics: TopicType[]
}

export type TopicType  = {
    title: string,
    description: string
}

type Props  ={
    closeModule: () => void,
    AddModuleToArray: (module: ModuleType) => void      
}
export const Module: React.FC<Props> = ({ closeModule, AddModuleToArray } : Props ) => {

    const [currentModule,  setCurrentModule] = useState<ModuleType> ({
        title: '',
        description: '',
        topics: []
    });
    const [displayTopicModule, setdisplayTopicModule] = useState<boolean> (false);
    const [topicsList, setTopicsList] = useState<TopicType[]> ([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        //event.preventDefault();
        const { name, value } = event.target;

        setCurrentModule(prev => ({
            ...prev,
            [name]: value
        }));
    }
    
    const updateModule = (event) : void => {
        event.preventDefault();
        console.log(name);
        if(currentModule != null){
            AddModuleToArray(currentModule);
        }
    }

    const addTopicToArray = (topic:TopicType) : void => {
    
        setTopicsList([...topicsList, topic]);
        setCurrentModule(prev => ({
            ...prev,
            topics: [...topicsList, topic]
        }));

    }

    return(
        <section className="border-b-black-800 border-4 w-3xl backdrop-blur-lg rounded-2xl m-5 p-3">
            <div className="flex justify-between p-2 pl-6">   
                <h3 className="text-2xl">Create a Module</h3>            
                <IoMdCloseCircle onClick={closeModule} className="text-4xl cursor-pointer"></IoMdCloseCircle>
            </div>
            <label htmlFor="module_title" className="block text-left pl-6 text-lg">Module Title</label>
            <input type="text" value={currentModule?.title || ''} onChange={handleChange}  required name = "title"  id="module_title" 
                className="block ml-5 px-4 py-2 mt-2 border
             border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:border-blue-500 transition duration-300"/>

            <label htmlFor="module_description" className="block text-left pl-6 text-lg">Module Description </label>
            <input type="text" value={currentModule?.description} onChange={handleChange}  name = "description" id="module_description" className="block ml-5 px-4 py-2 mt-2 border
             border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"/>

            <label htmlFor="module_description" className="block text-left pl-6 text-lg ">Topics</label>
            <button type="button" className="px-6 py-3  text-white bg-black  font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none 
            focus:ring-2 focus:ring-blue-500 transition duration-200 text-left block my-3 ml-6" onClick={(prev) => setdisplayTopicModule(true)}>Add Topic</button>
            {/*Display Topic form*/}
            <div>
                {displayTopicModule && <Topic closeTopic={() => setdisplayTopicModule(false)} addTopicToArray={addTopicToArray}></Topic>}
            </div>
             {/*Display Added Topics*/}
             {
                topicsList.map((topic:TopicType, index:number) => (
                    <div key={index} className="border-b-black-800 border-2 pl-6 text-lg">
                        <h4>{topic.title}</h4>
                        <p>{topic.description}</p>
                    </div>
                ))
             }

            <input type="submit" className="px-6 py-3  text-white bg-black  font-semibold 
            rounded-lg shadow-md hover:bg-blue-700 focus:outline-none 
            focus:ring-2 focus:ring-blue-500 transition duration-200 my-3 ml-6 block text-center" onClick = {updateModule}  value="Confirm"/>

        </section>

    )
}