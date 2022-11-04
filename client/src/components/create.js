import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   title: "",
   company: "",
   description: "",
   location: "",
   date: "",
   skills: ""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newJob = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newJob),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ title: "", company: "", description: "", location: "", date: "", skills: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="title">Title</label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="company">Company</label>
         <input
           type="text"
           className="form-control"
           id="company"
           value={form.company}
           onChange={(e) => updateForm({ company: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Description</label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="location">Location</label>
         <input
           type="text"
           className="form-control"
           id="location"
           value={form.location}
           onChange={(e) => updateForm({ location: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="date">Date</label>
         <input
           type="text"
           className="form-control"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>
       {/* <div className="form-group">
         <div className="form-check form-check-inline">
            <select onChange={(e) => updateForm({ skills: e.target.value })}>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="sql">SQL</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
            </select>
        </div>
       </div> */}
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="jobOptions"
             id="jobPython"
             value="Python"
             checked={form.level === "Python"}
             onChange={(e) => updateForm({ skills: e.target.value })}
           />
           <label htmlFor="jobPython" className="form-check-label">Python</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="jobOptions"
             id="jobJavascript"
             value="Javascript"
             checked={form.level === "Javascript"}
             onChange={(e) => updateForm({ skills: e.target.value })}
           />
           <label htmlFor="jobJavascript" className="form-check-label">Javascript</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="jobOptions"
             id="jobSQL"
             value="SQL"
             checked={form.level === "SQL"}
             onChange={(e) => updateForm({ skills: e.target.value })}
           />
           <label htmlFor="jobSQL" className="form-check-label">SQL</label>
         </div>
         
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create job"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}