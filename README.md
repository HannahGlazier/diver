# Diver
Diver is a social activity tracker for SCUBA diving. Pen and paper dive logs are unreliable and inconvinient, often falling victim to wet hands or lost luggage, Diver offers a solution. Store all of your dive logs in one place, all while seeing what your fellow divers are getting up to, maybe even getting some inspiration for your next trip! Please find the deployed Heroku version [Here](https://diverr.herokuapp.com/).

## User Stories
Users are able to create an account and add both dive logs and dive sites to the application. Dive logs include all of the necessary information such as: dive site, depth, suit thickness, bottom temperature, weight belt weight, time in, time out, bottom time, date, water type (salt/fresh), dive type (boat/shore), dive master name, dive buddy name, an option to add dive master or dive buddy signature, and of course a section for your dive notes! Users are able to add their own dive sites with name, location, latitude, and longitude. Dive sites will be rendered on a map with the appropriate latitude and longitude. Users are able to view and explore page where all dive logs are listed or they can follow friends and scroll through their following's logs. 

## Walkthrough Snapshots

## Signin:
![screenshot of signin page](./public/images/signin.png)

## Signup:
![screenshot of signup page](./public/images/singup.png)

## Home:
![screenshot of homepage](./public/images/home.png)

## Add Dive Log:
![screenshot of my add dive log page](./public/images/addLog.png)

## Add Dive Site:
![screenshot of add dive site page](./public/images/addSite.png)

## Profile:
![screenshot of profile page](./public/images/profile.png)


## Backend
This application's backend was built with Ruby on Rails. After cloning, the backend can be launched by runing `rails db:migrate` to set up the database, `rails db:seed` to seed some initial seed data, and `bundle install` to install the necessary dependencies. Finally, you can run `rails s` to launch the server.

## Frontend
This application's frontend was created with HTML, JavaScript, React, CSS, and Material UI. After cloning, the frontend can be launched by running `npm install --prefix client` to install the necessary dependencies and `npm start --prefix client` to launch the frontend server. 

## Created By:

### Hannah Glazier:

Github: https://github.com/HannahGlazier

LinkedIn: https://www.linkedin.com/in/hannah-glazier-3a214a231/