# My-Notes-List

# Token base simple web application for handle your notes
# Admin previlages also included
# Email progress also included for verification the users

# Feature:

# Add new notes
# Update notes
# Delete Notes

# How to install

# Pre-request : install NodeJs, MongoDB 

# clone the repository: https://github.com/MS14-dev/My-Notes-List.git
# Create MongoDB database called "my_notes_list"
# Open frontend file and backend file in two seperate command promts
# create .env file and .gitignore file parallel to package.json file in backend file

# inside .gitignore file add:
# /node_modules
# .env

# inside .env file:
# TOKEN_KEY = add your key for encode token data
# SITE_EMAIL = add the email for send tempory passwords to users
# SITE_EMAIL_PASSWORD = password of the email use in above process
# ADMIN_EMAIL = admins email for login to the system
# ADMIN_PASSWORD = admins password for login to the system

# For admin login:
# Use : http://localhost:3000/admin/login
