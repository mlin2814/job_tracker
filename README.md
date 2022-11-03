#  JobTracker

This project will be a single page app that allows the user specific areas to focus on to keep more accurate records. The pages will be done with a React front end, and use Node.js with Express for the backend. The project database for storing the jobs/internships, skills, and contact information will be using MongoDB.

##  Local Backend Deployment Steps

1. Clone from Github

`git clone https://github.com/mlin2814/job_tracker.git`

2. Download dependencies

`npm install`

3. Create or use existing MongoDB cluster

4. Create a .env file in root with DATABASE_URL populated with connection info

ex. `DATABASE_URL=mongodb+srv://<username>:<password>@jobtracker-cluster`

5. Start server

`npm run start` or `npm run dev`

##  Fullstack Deployment Steps
All frontend development logic can be found in `./frontend`. Frontend changes can be independently tested using npm commands within that directory. 

To deploy the fullstack app, first perform the backend deployment steps then do the following:

 1. Change directory to `./frontend`

 2. Run a vite build within this directory using `npm run build`

	This performs a vite build as defined in `./frontend/vite.config.js` which builds a main.js, main.css and manifest.json file into the `./public` directory. The node server is set to use the correct references defined by manifest.json in the index.ejs template.
	
 3. Return to the root directory and run `npm run start` 