# ASC Media Search Project 

A database search engine for movies & TV shows to watch trailers, query ratings, and media details.

## Final Product

Browsing Media in the Homepage:

![Homepage](https://github.com/chriskang24/public-gif-repo/blob/ed57dedb97a64cbc0d9937e1537b9ef267d3b716/asc-home-page.gif)

## Getting Started

1. Git Clone this repository to a local folder.
2. Install dependencies using the `npm install` command, once in the client folder, and once in the server folder.
3. Setup your local PostgreSQL database information by following the `Get Started` section of the README.md file in the server folder. 
4. Setup the .env files for both the client and server folders using the .env.example file as a template. `API Keys` for the `client side` can be generated for free from `https://developers.themoviedb.org/3/getting-started/introduction` & `http://www.omdbapi.com/`.
5. Start the web server using the `npm start` command on two seperate terminals, once in the client folder, and once in the server folder. The app will be served at `<http://localhost:3001/>`.
6. Go to `<http://localhost:3001/>` in your browser to search for movies and tv shows. 

## Dependencies

Client Side:
- react: ^17.0.1
- react-bootstrap: ^1.5.2
- react-dom: ^17.0.1
- react-multi-carousel: ^2.6.2
- react-player: ^2.9.0
- react-rating-stars-component: ^2.2.0
- react-router-dom: ^5.2.0
- axios: ^0.21.1  
- bootstrap: ^4.6.0 
- dotenv: ^8.2.0  

Server Side: 
- bcrypt: ^5.0.1
- body-parser: ^1.19.0
- chalk: ^2.4.2
- dotenv: ^2.0.0
- ejs: ^2.6.2
- jsonwebtoken: ^8.5.1
- jwt-decode: ^3.1.2
- morgan: ^1.9.1
- node-sass-middleware: ^0.11.0
- pg: ^8.5.1
- pg-native: ^3.0.0