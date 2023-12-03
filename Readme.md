# Project: Kekstagram

## Technologies
![HTML5](https://img.shields.io/badge/-HTML5-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-f7df1e?logo=javaScript&logoColor=black)

---
#### **A project completed during the HTML Academy web development course**

Project Preview Link - https://li-mikhail.github.io/953983-kekstagram-30/
Course Link - https://htmlacademy.ru/profession/fullstack

---

##### Functionality description:

##### 1. Uploading a new image to the site and filling in information about it
- Selecting a file with the image for upload;
- Scaling the image;
- Applying one of the pre-prepared effects;
- Selecting the depth of the effect using a slider;
- Adding a text comment and its validation;
- Adding hashtags and their validation.

##### 2. Sending data to the server.
##### 3. Viewing uploaded images
- All uploaded images from the server are displayed on the main page as thumbnails.
- Full-screen view of a post containing the full-screen image with the number of likes and comments. Immediately after opening the image in full-screen mode, no more than 5 comments are displayed. Displaying additional comments occurs upon pressing a button.
- If there is an error in loading data from the server, an error message pops up.
- Exiting full-screen photo viewing mode can be done either by clicking the close icon in the upper right corner of the block or by pressing the Esc key.

##### 4. Filtering images from other users
- 'Default' - photos in their original order from the server;
- 'Random' - 10 random, non-repeating photos;
- 'Discussed' - photos sorted in descending order of the number of comments.
- When switching filters, rendering images that fit the new filter should not occur more frequently than once every 500 ms (debounce)."
