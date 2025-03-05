import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Unit, Activity, AddActivityProps } from "../types";

import './AddActivity.css';

function AddActivity({ hierarchyItem, addActivityFunc }: AddActivityProps) {

  const [activity, setActivity] = useState<Activity>({ activityName: 'Default Activity Name', activityPath: './path', activityType: 'lecture' });

  useEffect(() => {

  }, [])

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setActivity({
      ...activity,
      [event.target.name]: event.target.value
    })
  }

  const onChangeSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setActivity({
      ...activity,
      activityType: event.target.value
    })

  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    if (!hierarchyItem.hierarchyType) return;
    event.preventDefault();

    addActivityFunc(activity, hierarchyItem.hierarchyType, hierarchyItem.id);
  }

  return (
    <div>

      <div className='preview'>
        <h1>Preview (DEBUG ONLY)</h1>
        <h2>{activity?.activityName}</h2>
        <h2>{activity?.activityPath}</h2>
        <h2>{activity?.activityType}</h2>
      </div>

      <form className='form' onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmitHandler(e)}>
        {hierarchyItem.hierarchyType ? <>
          <h2>Add Activity for </h2>
          <h2>{hierarchyItem.hierarchyType}</h2>
          <h3>"{hierarchyItem.title}"</h3>
          <br />
          <br />
          <p>Activity Name</p>
          <input className='input' name='activityName' value={activity?.activityName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)} />
          <p>Activity Path</p>
          <input className='input' name='activityPath' value={activity?.activityPath} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)} />
          <p>Activity Type</p>
          <select className='select' onChange={(e) => onChangeSelectHandler(e)} value={activity.activityType}>
            <option value='AdminTask'>Admin Task</option>
            <option value='Assessment -> Project Evaluation'>Project Evaluation</option>
            <option value='Assessment -> Exam'>Exam</option>
            <option value='Assessment -> Audit -> Live'>Audit - Live</option>
            <option value='Assessment -> Audit -> Recorded'>Audit - Recorded</option>
            <option value='Assessment -> Practical Challenges'>Practical Challenges</option>
            <option value='Lesson Video'>Lesson Video</option>
            <option value='Lesson Written (Manual/Azure Topic)'>Lesson Written (Manual/Azure Topic)</option>
            <option value='Lesson Lecture'>Lesson Lecture</option>
            <option value='Reference'>Reference</option>
            <option value='Lab -> Coding Lab'>Coding Lab</option>
            <option value='Lab -> Coding Challenge'>Coding Challenge</option>
            <option value='Lab -> Mini Project'>Mini Project</option>
            <option value='Assignment'>Assignment</option>
            <option value='Project -> Kick Off'>Kick Off</option>
            <option value='Project -> Touchpoint'>Touchpoint</option>
            <option value='Project -> Work Time'>Work Time</option>
            <option value='Mock Interview'>Mock Interview</option>
            <option value='Self study'>Self Study</option>
            <option value='Office Hours'>Office Hours</option>
          </select>


          <button type='submit'>Add Activity</button>
        </> :
          <h2>Select a button on the left to access this form</h2>}
      </form>
    </div>
  )

}

export default AddActivity;