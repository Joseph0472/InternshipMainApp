# Internship Information Management and Forecasting App


## Background & Aim
In ICT graduate school and business school, there would be a batch of graduates proceeding their internship each semester/academic period. Employer liaison managers usually face a circumstance full of change and uncertainty. To help them understand the situation and plan the work well, this application is built to provide information management and forecasting functions. 

By importing data of companies and students, managers can easily know the total number of companies which should contact to and match students' interests with companies' interests well. Managers also can monitor the current situation by checking auto-generated summarized data. 

## User Manual
* Log in by Google account to start.
* Upload Checklist:
    1. Use the templete to edit information.
    2. Ensure all cells are in the form "TEXT".
    3. Double check if the file is correctly matches the destination (for example, company info excel should uploaded to company section).
* Student name and company name should be unique, data with duplicated name would not allowed be created/updated. If you upload information with duplicated name, the new raw of data will replace the old one.
* Due to the limit of Trello, only 1000 rows of actions would be saved in a board. That's also the upper limit we can handle.
* When archive historical student-company number data, the name should be in this format: "year+semester".
* The application provides auto-save function once you may need to remove all data. Please save the backup.

## Download Link
*Companies information upload template* 

*Students information upload template* 

## Guide to Download Trello Board .json File
1. Find and click the "Menu" button in a trello board
2. Click "More"
3. Click "Print and export"
4. Click "Export as JSON"
5. In the new tab, right click and choose "save as ..."
6. Click save, now you can upload it in Company section and extract card name, list name, conversation info into Excel file

## Developer Manual

The application adopted MERN stack.

Run:

### `npm install`

in root directory and ./client to install dependencies in the server and client. Then, run:

### `npm start`

in both directory to boot the services.

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="src/assets/github/chrome.png" width="64" height="64"/> <img src="src/assets/github/firefox.png" width="64" height="64"/> <img src="src/assets/github/edge.png" width="64" height="64"/> <img src="src/assets/github/safari.png" width="64" height="64"/> <img src="src/assets/github/opera.png" width="64" height="64"/>


## Licensing

- Copyright 2020 Creative Tim (https://www.creative-tim.com)
- Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)
  