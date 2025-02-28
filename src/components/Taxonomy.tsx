import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Module } from "./Module";
import React from "react";
/*Represenation of Navigation.json */


export const Taxonomy = () => {

    const [moduleFormDisplay, setModuleFormDisplay] = useState(false);
    const [currentModulesData, setModulesData] = useState([]);

    const AddModuleToArray = (module:typeof Module) : void=> {
    }

    return(
        <form >
            <div className="flex gap-[50px]">
                <h2>Create a Unit</h2>
                <IoMdCloseCircle></IoMdCloseCircle>
            </div>

            <label htmlFor="unit_title" className="block">Unit Title</label>
            <input type="text" required id="unit_title" className="block"/>

            <label htmlFor="unit_description" className="block">Unit Description </label>
            <input type="text" id="unit_description" className="block"/>
            <button type="button" onClick={() => setModuleFormDisplay(!moduleFormDisplay)}>Add Module</button>
            {
               moduleFormDisplay && <Module closeModule={() => setModuleFormDisplay(false)} AddModuleToArray={} ></Module>
            }
            
            <button type="submit" className="block">Generate</button>

        </form>
    )
}