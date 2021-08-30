Guide :

Download the XAMPP Control Panel → 
https://www.apachefriends.org/download.html

Note: if you have mysql community server downloaded in your local machine then it’s ok - you just have to make sure it’s running & you’ll have to deal with MySQL Workbench (instead of phpMyAdmin about which I’m going to talk below)

Then Start the Modules (1. Apache and 2. MySQL) then click on Admin next to MySQL - it’ll take you to the the interface of phpMyAdmin which is the administrative tool for MySQL server in where you’ll see the Database and Tables which will make by all of your CRUD operations throughout process of making the http requests with postman.

Note: if you’ve installed MySQL Community Server then your MySQL-Module will not Start that’s why you have to Stop your MySQL server to run the server with the XAMPP
To do so → go to Services -- and then Stop the MySQL server

Now, Fork the repository to your github and then clone it to your code editor then in your terminal run the command → 
			npm install			(it’ll install the dependencies)
nodemon index.js 	(it’ll run the app’s server)

Note: you can run → 
node index.js 
We’re using nodemon cause it we’ll reconnect our server while making any change to our code so, we don’t need to rerun our server (it’ll save our time while developing)

Now, by running the server with terminal we’ll have our database called restful_api (we can see our created Database in the phpmyadmin)

Note: the students table will create in the time of making the 1st http POST request to the student route and the users table will create in the time of making the 1st http POST request to the user route (we can see our created Tables in the phpmyadmin)

So, we don’t need to worry about the creation of our required Database and Tables to test this API with Postman. We just need to have our MySQL server running throughout the process of testing.


Download the tool (Postman) for testing the API → 
https://www.postman.com/


To insert student data with the api follow these steps:

Open a new request tab by clicking the plus (+) button at the end of the tabs.
Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
In the URL field enter the address to the /student route of your local API - localhost:3000/student
Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
Enter a JSON object containing the required user properties in the "Body" textarea, e.g:

{
    "first_name": "Shahin",
    "last_name": "Zaman",
    "gender": "male",
    "email": "test_1@gmail.com",
    "mobile_no": "01234567891"
}
	
Note: We don’t need to send id with the http requests cause it’ll auto generate and increment for every request.

Click the "Send" button, you should receive a "200 OK" response with a success message (Student data inserted into database) in the response body.

Here's the screenshot of Postman after the request is sent and the new student data has been inserted:
We can insert more student data (in this case we’ll insert two students data)
Screenshot of Postman for student-2 :



To register a new user with the api follow these steps:

Open a new request tab by clicking the plus (+) button at the end of the tabs.
Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
In the URL field enter the address to the /user/signup route of your local API - localhost:3000/user/signup
Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
Enter a JSON object containing the required user properties in the "Body" textarea, e.g:
 
{
    "user_name": "Apon Hasan",
    "password": "123456",
    "user_type": "admin",
    "email": "test_admin@gmail.com", 
    "phone": "01234512345"
}

Click the "Send" button, you should receive a "200 OK" response with a success message (Signup data has been inserted into the database) in the response body.

Here's a screenshot of Postman after the request is sent and the new user has been registered:

We can register with more admin data (in this case we’ll register with one admin data)


To authenticate (login) a user (admin) with the api and get a JWT token follow these steps:

Open a new request tab by clicking the plus (+) button at the end of the tabs.
Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
In the URL field enter the address to the /user/login route of your local API - localhost:3000/user/login
Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
Enter a JSON object containing the username and password in the "Body" textarea:

{
    "user_name": "Apon Hasan",
    "password": "123456"
}

Click the "Send" button, you should receive a "200 OK" response with the user details including a JWT token in the response body, make a copy of the token value because we'll be using it in the next step to make an authenticated request.

Here's a screenshot of Postman after the request is sent and the user (admin) has been authenticated:



To retrieve all students data →  make an authenticated request using the JWT token from the previous step, follow these steps:

Open a new request tab by clicking the plus (+) button at the end of the tabs.
Change the http request method to "GET" with the dropdown selector on the left of the URL input field.
In the URL field enter the address to the /student route of your local API - localhost:3000/student
Select the "Authorization" tab below the URL field, change the type to "Bearer Token" in the type dropdown selector, and paste the JWT token from the previous authenticate step into the "Token" field.
Click the "Send" button, and you should receive a "200 OK" response containing a JSON array with all the students' records in the system.

Here's a screenshot of Postman after making an authenticated request to get all students data:

Note: without the Token or wrong Token we’ll get error response message (Invalid token) in the Postman (you can try it out for all for all http GET, DELETE & PUT requests in Postman -- this is called Authentication)


To retrieve a student data with the id →  make an authenticated request using the JWT token from the previous step, follow these steps:
Open a new request tab by clicking the plus (+) button at the end of the tabs.
Change the http request method to "GET" with the dropdown selector on the left of the URL input field.
In the URL field enter the address to the /student/{id} route with the id of the student you inserted, e.g - localhost:3000/student/2 (we’ll get id: 2)
Select the "Authorization" tab below the URL field, change the type to "Bearer Token" in the type dropdown selector, and paste the JWT token from the previous authenticate step into the "Token" field.
Click the "Send" button, and you should receive a "200 OK" response containing a JSON array with the student record in the system.

Here's a screenshot of Postman after making an authenticated request to get all students data:



To Delete a student data with the api follow these steps:

Open a new request tab by clicking the plus (+) button at the end of the tabs.
Change the http request method to "DELETE" with the dropdown selector on the left of the URL input field.
In the URL field enter the address to the /student/{id} route with the id of the student you inserted, e.g - localhost:3000/student/2 (we’ll delete id: 2)
Select the "Authorization" tab below the URL field, change the type to "Bearer Token" in the type dropdown selector, and paste the JWT token from the previous authenticate step into the "Token" field.
Click the "Send" button, you should receive a "200 OK" response message (Student data has been deleted).

Here's a screenshot of Postman after the request is sent and the student data has been deleted:



To update a student data with the api follow these steps:

Open a new request tab by clicking the plus (+) button at the end of the tabs.
Change the http request method to "PUT" with the dropdown selector on the left of the URL input field.
In the URL field enter the address to the /student/{id} route with the id of the user you registered above, e.g - localhost:3000/student/1 (we’ll update id: 1)
Select the "Authorization" tab below the URL field, change the type to "Bearer Token" in the type dropdown selector, and paste the JWT token from the previous authenticate step into the "Token" field.
Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
Enter a JSON object in the "Body" textarea containing the properties you want to update, for example to update the first and last names:

{
    "first_name": "Tama",
    "last_name": "Rashid",
    "gender": "female",
    "email": "test_2@gmail.com",
    "mobile_no": "01234567892"
}

Click the "Send" button, you should receive a "200 OK" response with a message (Student data has been updated).

Here's a screenshot of Postman after the request is sent and the student data has been updated:





In the end our full Database on phpMyAdmin :

Tables → 


users Table → 


students Table → 

