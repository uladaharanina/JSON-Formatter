import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Activity, AddActivityProps } from "../types";

import './AddActivity.css';
import { IDsGenerator } from "../utils/IDsGenerator";

function AddActivity({ hierarchyItem, addActivityFunc }: AddActivityProps) {

  const [activity, setActivity] = useState<Activity>({ activityId: "", activityName: 'Default Activity Name', activityPath: './path', activityType: 'lecture', isILT: false, isIST: false, isPLT: false });

  useEffect(() => {

  }, [])

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setActivity({
      ...activity,
      [event.target.name]: event.target.value
    })
  }

  const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setActivity({
      ...activity,
      [event.target.name]: event.target.checked
    })
  }

  const onChangeSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setActivity({
      ...activity,
      activityType: event.target.value
    })
  }

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(activity.isILT || activity.isIST || activity.isPLT)) {
      alert('Need to choose at least one training format (ILT, IST, PST)')
      return;
    }

    if (!hierarchyItem.hierarchyType) return;
    activity.activityId = await IDsGenerator(activity.activityName);
    addActivityFunc(activity, hierarchyItem.hierarchyType, hierarchyItem.id);
  }

  return (
    <div>
      <form className="max-w-lg my-7 mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmitHandler(e)}>
        {hierarchyItem.hierarchyType ? <>
          <div className="gap-[50px] text-2xl font-bold text-center">
            <h2 className="text-3xl">Add Activity</h2>
            <h2 className="text-2xl">{hierarchyItem.hierarchyType}</h2>
            <h3>"{hierarchyItem.title}"</h3>
          </div>

          <label htmlFor="activity-name" className="block text-xl mt-2">Activity Name</label>
          <input id="activity-name" type="text" className="block px-4 py-2 mt-2 border
            border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
             focus:ring-blue-500 focus:border-blue-500 transition duration-300 w-1/1" name='activityName' value={activity?.activityName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)} />

          <label htmlFor="activity-name" className="block text-xl mt-2">Activity Path</label>
          <input id="activity-name" type="text" className="block px-4 py-2 mt-2 border
            border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
             focus:ring-blue-500 focus:border-blue-500 transition duration-300 w-1/1" name='activityPath' value={activity?.activityPath} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)} />

          <label htmlFor="activity-name" className="block text-xl mt-2">Activity Type</label>
          <select className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white placeholder-gray-500
" onChange={(e) => onChangeSelectHandler(e)} value={activity.activityType}>
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

          <div className='text-2xl flex justify-around'>
            <div>
              <label htmlFor="ILT">ILT</label>
              <input id="ILT" checked={activity?.isILT} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeCheckboxHandler(e)} type='checkbox' name='isILT' />
            </div>

            <div>
              <label htmlFor="IST">IST</label>
              <input id="IST" checked={activity?.isIST} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeCheckboxHandler(e)} type='checkbox' name='isIST' />
            </div>

            <div>
              <label htmlFor="PLT">PLT</label>
              <input id="PLT" checked={activity?.isPLT} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeCheckboxHandler(e)} type='checkbox' name='isPLT' />
            </div>

          </div>


          <button className="mt-2 m-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 
      text-white font-semibold rounded-lg shadow-lg transform text-center
      transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl mx-auto 
      focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer block" type='submit'>Add Activity</button>
        </> :
          <h2>Select a button on the left to access this form</h2>}
      </form>
    </div>
  )

}

export default AddActivity;