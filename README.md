# Luminart



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
 
* home page gif * 

### Accounts

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

![gif of Search and Sort features](/readMeImages/search-sort.gif "Search And Sort")

#### "Surprise Me" Button in Museum Gallery

- Users can specify search query and then press “surprise me” for a randomly chosen artwork

![gif of "Surprise Me" Button](/readMeImages/surprise-me.gif "Surprise Me")

### Close-Up View

- Use the artwork information from either the Art Institute of Chicago’s API or our backend user uploaded artworks endpoints with the Cloud Text-to-Speech API to create an audio tour
- These synthesized audio files are uploaded to Google Cloud Storage and served from a backend endpoint using the BlobstoreService
- User artwork information and favorites data that is fetched in this view is stored in Datastore


### Favorites Page

- This is a feature available for users with accounts
- Users can view a gallery of all their favorites and can quickly navigate to the detailed view of the artwork
- Favorites can always be added or removed


### Upload Artwork

### My Art Gallery
