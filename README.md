# BioProject - UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Requirements to run
1. Install [Nodejs](https://nodejs.org/en/)
2. Run `npm install` in the root project directory
3. Run `npm start` in the root project directory
4. Open `localhost:4200`

## Table of content

- Navigation Bar with a hamburger menu and profile picture icon
- Biography (main) page
    - User information - name, age, email and avatar image
    - Biography of the current user
    - Comment section with creation, sort comments by date, listing, custom date time format and validations
- Gallery page
    - User information
    - Add photo button - taking you to a modal to choose a photo from the file system
    - Profile edit button - taking you to the profile edit page
    - Images with preview and download
- Profile Edit page
    - Form inputs - name, username, email, biography and avatar image **updates**
    - Action buttons - save and cancel
    - Validations for the inputs
- Add/Update Image modal
    - Used in profile avatar image update and adding an image to the gallery
    - Having a cropping functionality of the selected item with preview image of the cropped item
    - Validations for file size and types
    - Action buttons - Save and Cancel
