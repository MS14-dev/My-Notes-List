# My-Notes-List

Token base simple web application for handle your notes\
Admin previlages also included\
Simple and easy to use\
Email progress also included for verification the users

## Features:

Add new notes\
Update notes\
Delete Notes

## How to install

Pre-request : install NodeJs, MongoDB 

### clone the repository: https://github.com/MS14-dev/My-Notes-List.git
Create MongoDB database called "my_notes_list"\
Open frontend file and backend file in two seperate command promts\
run:- npm install commond in both CMDs for install dependencies\
create .env file and .gitignore file parallel to package.json file in backend file

## inside .gitignore file in backend folder add:
/node_modules\
.env

## inside .env file in the backend folder:
TOKEN_KEY = add your key for encode token data\
SITE_EMAIL = add the email for send tempory passwords to users\
SITE_EMAIL_PASSWORD = password of the email use in above process\
ADMIN_EMAIL = admins email for login to the system\
ADMIN_PASSWORD = admins password for login to the system\

### Open CMD in the backend folder
run:- npm run admin_config to add admin to the database directly

### Start the backend and frontend
Open frontend file and backend file in two seperate command promts\
run:- npm start in bothe CMDs

## For admin login:
Use : http://localhost:3000/admin/login