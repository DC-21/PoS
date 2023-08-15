Author: chola kuboko conrad
Email:  cholahkuboko@gmail.com
Number: +260979054417


This project involves the use of Javascript libraries and dependencies to achieve the needed functionality.

Make sure you have Nodejs installed  before installing any dependency.

It uses ReactJs on frontend, ExpressJs on Backend and Mysql database.

This project is designed to make transactions, update details, generate receipts, export transactions history and create new user.

To run this project, open three terminal with one for client which is the front end, Another for the
Authserver which is for authentication and the other for Server which is the transactions server.

Run the command "npm install --legacy-peer-deps" in the client's terminal and when its done, run "npm run dev"
to start the project.

Run "npm install" in both server terminal and when dependency installation completes, run "npm start"
to start the servers. Make sure you have connected and configured the database details in the folder:
Utils/db.js in both server files.

Navigate to the browser and open a tab where the client should run: http://localhost:{port number, mostly 5173}.

Make sure you create a super user account in either Postman or Thunderclient by making a post request to the Users table using the endpoint "http://localhost:3006/signUp"
Put the following in the request body and match with appropriate details:

{full_name, email, phone_number, password, role}

After a successful post request, navigate to the client side on browser and log in with  your details.

Note: Only super users have the ability to create new users and the roles can only be either: admin or user.

When you login, the routes are determined based on your role and the screens are configured with regards to that.

The rest is making transactions, exporting them into excel documents and generating pdf receipts.
