# Luminart

https://igunda-isangimino-nstroupe.uc.r.appspot.com/

### Mission

- Create an art experience for everyone
- Build with accessibility as the primary focus
- Showcase the artwork of our users 

### Languages/APIs/Tools:
- Javascript with React and Redux
- Material UI Component Library 
- Java servlets
- HTML + CSS
- Firebase Authentication
- Datastore
- Google Cloud Storage
- App Engine
- Art Institute of Chicago Public API
- Cloud Text-to-Speech API
- Blobstore API

### Accessibility 

- We put our passion for art and our desire to have an impact to create an idea focus on making an accessible art experience for all
- Our website is completely accessible through tabbing and using a screen reader
- Special focus on form accessibility, tab indexing, and including useful aria labels

## Features

### Home Page
 
![gif of homepage](/readMeImages/home-page.gif "Home") 

### Accounts

![gif of accounts sign in](/readMeImages/signIn.gif "Sign In")

- This feature was created using FirebaseUI and the react-redux-firebase package
- Users can sign in with Google, Facebook or email
- Account specific features include Favorites, Uploading Artwork, and My Art Gallery

### Museum Gallery

- Fetching from Art Institute of Chicago API
- All images are under the Creative Commons Zero license

![gif of Museum Gallery](/readMeImages/museum-gallery.gif "Museum Gallery")

#### Search + Sort in Museum Gallery

- User can choose which search field they would like to search by  
- Users can also choose to sort the artworks by relevance, chronologically, or alphabetically by artist or title 
- Features made possible by Elasticsearch Query DSL 

![gif of Search feature](/readMeImages/search.gif "Search")
![gif of Sort feature](/readMeImages/sort.gif "Sort")

#### "Surprise Me" Button in Museum Gallery

- Users can specify search query and then press “surprise me” for a randomly chosen artwork

![gif of "Surprise Me" Button](/readMeImages/surprise-me.gif "Surprise Me")

### Detailed Artwork Card

![gif of Detailed Artwork Card](/readMeImages/artwork-card.png "Detailed Artwork Card")

- Use the artwork information from either the Art Institute of Chicago’s API or our backend user uploaded artworks endpoints with the Cloud Text-to-Speech API to create an audio tour
- These synthesized audio files are uploaded to Google Cloud Storage and served from a backend endpoint using the BlobstoreService
- User artwork information and favorites data that is fetched in this view is stored in Datastore


### Favorites Page

- This is a feature available for users with accounts
- Users can view a gallery of all their favorites and can quickly navigate to the detailed view of the artwork
- Favorites can always be added or removed


### Upload Artwork

![gif of Uploading Artworl](/readMeImages/UploadImages.gif "Uploading Images")

#### General Information

- With a user account, anyone can upload their own artwork!
- The upload form allows the user to insert their name, title of the art piece, alt text for the image and the detailed image description.
- On submit, the image is uploaded and the user is redirected to see their newly uploaded piece in the users gallery
- Helper links to resources on writing alt text and descriptions are provided

#### Technical Information

- Image information stored in Datastore
- Images are stored in Google Cloud Storage using Blobstore API
- Images are served from a backend endpoint using the BlobstoreService

### My Art Gallery

![gif of modifying an image upload's title](/readMeImages/ModifyArt.gif "Modifying an image title")

- See artwork you’ve uploaded
- New button on Media Card allows you to modify or delete image
