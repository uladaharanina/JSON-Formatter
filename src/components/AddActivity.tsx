import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Unit, Activity, AddActivityProps } from "../types";

import './AddActivity.css';

function AddActivity({hierarchyItem, addActivityFunc }: AddActivityProps ) {

  const [activity, setActivity] = useState<Activity>({activityName: 'Default Activity Name', activityPath: './path', activityType: 'lecture'});

  useEffect(() => {

  }, [])

  const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setActivity({
      ...activity,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = (event:FormEvent<HTMLFormElement>) => {
    if(!hierarchyItem.hierarchyType) return;
    event.preventDefault();
    console.log('Submit happened! Here is the activity to be added:')
    console.log(activity);
    addActivityFunc(activity, hierarchyItem.hierarchyType, hierarchyItem.id);
  }

  return (
    <div>

    <div className = 'preview'>
      <h1>Preview (DEBUG ONLY)</h1>
      <h2>{activity?.activityName}</h2>
      <h2>{activity?.activityPath}</h2>
      <h2>{activity?.activityType}</h2>
    </div>

    <form className = 'form' onSubmit={(e:FormEvent<HTMLFormElement>) => onSubmitHandler(e)}>
      {hierarchyItem.hierarchyType ? <>
        <h2>Add Activity for </h2>
        <h2>{hierarchyItem.hierarchyType}</h2>
        <h3>"{hierarchyItem.title}"</h3>
        <input className = 'input' name = 'activityName' value = {activity?.activityName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}/>
        <input className = 'input' name = 'activityPath' value = {activity?.activityPath} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}/>
        <input className = 'input' name = 'activityType' value = {activity?.activityType} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}/>
        <button type = 'submit'>Add Activity</button>
      </> :
      <h2>Select a button on the left to access this form</h2>}
      
      
    </form>

     

    </div>
  )

}

export default AddActivity;