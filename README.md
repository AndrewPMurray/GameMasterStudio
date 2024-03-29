# GameMasterStudio

## A website to create Dungeons & Dragons characters and campaigns

![gamemasterstudio_home page](https://user-images.githubusercontent.com/92741849/159765489-b1d8cac2-d29f-469b-8ffc-f0a791cf182d.png)

[GameMasterStudio](https://gamemasterstudio.onrender.com/), a fullstack website inspired partially by Roll20.net and DnD Beyond, is an online Dungeons & Dragons character & campaign creator. Users who have created campaigns can invite other users to those campaigns, who can add the characters they've created.

## Technologies Used

-   **Backend:** Python, Flask, WTForms, boto3/botocore (for uploading to AWS/S3)
-   **Frontend:** JavaScript, React/Redux, AJAX, React-Drag-And-Drop(for image upload functionality), react-quilljs (for creating and editing articles)
-   **Database:** PostgresSQL
-   **Image hosting:** AWS/S3

## Features

-   User login
    ![login_window](https://user-images.githubusercontent.com/92741849/159521299-68dd8609-d687-4ded-8540-b4535a6d2262.png)

---

-   User Home
    ![user_home](https://user-images.githubusercontent.com/92741849/159521570-1015980f-edda-41fd-96a5-eb7fe62b7880.png)

---

-   Character Sheet
    ![character_sheet](https://user-images.githubusercontent.com/92741849/159521980-05178918-c7ba-4113-992e-c2e5de771725.png)

---

-   Campaign Page
    ![campaign_page](https://user-images.githubusercontent.com/92741849/159986244-efa2f67d-7c36-4e0d-9eca-00b23a5c8673.png)

---

-   Article Page
    ![article_page](https://user-images.githubusercontent.com/92741849/159986403-103bafe7-fcd3-488d-aa9d-f146f2cd52c3.png)

---

## Install Instructions

1.  Clone this repo
    -   `git clone git@github.com:AndrewPMurray/GameMasterStudio.git`
2.  Install dependencies for backend
    -   `pipenv install`
3.  Install dependencies for frontend
    -   `cd react-app`
    -   `npm install`
4.  Create PostgreSQL user
    -   `CREATE USER gms_user WITH CREATEDB PASSWORD '<password>'`
5.  Create PostgreSQL database
    -   `CREATE DATABASE gms_db WITH OWNER gms_user
6.  Create a `.env` file in the root directory based on the `.env.example` file
7.  In `.env` file:
    -   Replace 'password' in DATABASE_URL with your chosen password
    -   Enter a secure combination of characters for your SECRET_KEY
    -   This website uses Minio for image hosting. Instructions for setting up a Minio host can be found here: https://www.digitalocean.com/community/tutorials/how-to-set-up-minio-object-storage-server-in-standalone-mode-on-ubuntu-20-04
    -   Set env variables for MINIO_BUCKET, MINIO_KEY, MINIO_SECRET, and MINIO_API_HOST
8.  Flask Migrate and Seed your database in root directory
    -   `pipenv shell`
    -   `flask db upgrade`
    -   `flask seed all`
9.  Start backend server in root directory
    -   `flask run`
10. Start frontend server in `react-app` directory
    -   `npm start`
11. In your browser go to `localhost:3000`
12. You may use the Demo user by clicking on the `Login` button or create a new user by clicking on the `Sign Up` button. Then you can create a new character or campaign or invite other users to a campaign.

## Additional Features:

-   [x] Ability to add sections/articles to campaigns, for users in a campaign to keep track of their sessions
-   [x] Search campaigns for articles within that campaign

---
