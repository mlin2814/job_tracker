# JobTracker

This project will be a single page app that allows the user specific areas to focus on to keep more accurate records. The pages will be done with a React front end, and use Node.js with Express for the backend. The project database for storing the jobs/internships, skills, and contact information will be using MongoDB.

## Local Backend Deployment Steps

 1. Clone from Github

	`git clone https://github.com/mlin2814/JobTracker.git`

 2. Download dependencies
	
	`npm install`

 3. Create or use existing MongoDB cluster

 4. Create a .env file in root with DATABASE_URL populated with connection info 

	ex. `DATABASE_URL=mongodb+srv://<username>:<password>@jobtracker-cluster`

 5. Start server

	`npm run start` or `npm run dev` 
