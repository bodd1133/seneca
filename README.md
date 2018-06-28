# Seneca Web Client API

### Introduction
The Seneca Web Client API provides two endpoints a post route to persist an event and a get route to return summary statistics for a particular user and course.

### Getting Started
- Clone the repo and run ```npm i``` from the project root folder
- This app uses a postgres database. As it is for demonstration purposes this is not currently hosted anywhere (such as Herokou) but can be recreated locally. In order to do so, postgres needs to be downloaded locally either using homebrew or equivalent or by following instructions through the postgresql website(https://www.postgresql.org/download/). Following this, a database called 'postgres' needs to be created locally through entering psql from the command line and entering the command 'CREATE DATABASE postgres'. Running the models/database.js file from the projects root folder will then create the database used to persist events.
- To run the unit tests run 'npm test' from the root folder.
- To run the app locally run 'npm script' from the root folder.

### Routes
Both the post and the get route expect the user id to be sent in the header (i.,e.
userid 123) and the course id to be sent as a path parameter ( i.e. /courses/1).

##post
- Route: '/courses/:courseId'
- Body: {
  total: score (required, number),
  timeStudied: time studied in seconds (required, number)
}
- Success response: 200

##get
- Route: '/courses/:courseId'
- Success response: {
  averageScore: average score for the user in that course,
  totalTimeSTudied: total time spent studying that course
}
