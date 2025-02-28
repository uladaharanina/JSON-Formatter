import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

export const Topic = () => {
    return(
        <form>
            <div>   
                <h3>Add Topic</h3>
                <IoMdCloseCircle></IoMdCloseCircle>
            </div>
            <label htmlFor="module_description">Topic Title</label>
            <input type="text" placeholder="Enter Topic Name"/>
            <button type="submit">Confirm</button>
        </form>
    )
    
        
}