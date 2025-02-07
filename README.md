# <p align="center">Fest Noz</p>
  
This is the final project for my Master 2. It is a reservation platform and an interactive map that allows users to retrieve and add events. The project has been in development for approximately 1.5 years. It includes features such as OAuth2 authentication, an integrated payment system, e-commerce functionality, and microservices architecture. The project also incorporates MapBox for event visualization, multiple user roles, Swagger API documentation, and unit testing with Jest. Despite time constraints, it was deployed on Heroku while being developed in parallel with coursework.
 
Note: The site is primarily in French but english is better of course ! 

## ⚠️ Code Optimization & Factorization

Due to time constraints and parallel coursework, the code has not been fully optimized, and factorization was not implemented.
  
## 🧐 Features    
- OAuth2 Personalized Authentication.
- Microservices Architecture.
- Haversine Formula for Location-Based Event Retrieval.
- Swagger API Documentation: Provides detailed API documentation.
- Multiple User Roles: Different levels of access and permissions within the site.
- E-commerce Functionality: Enables users to purchase event-related items.
- Unit Testing with Jest: Ensures application reliability.
- French Government API Integration: Retrieves postal codes, longitude, latitude, and coordinates for accurate location mapping.

## 🛠️ Tech Stack
- [VueJs](https://vuejs.org/)
- [Vite](https://vite.dev/guide/)
- [MapBox](https://www.mapbox.com/)
- [Swagger](https://editor.swagger.io/)
- [Faker](https://fakerjs.dev/guide/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/docs/intro)
- [NodeJs](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/docs/getting-started)
- [Docker](https://www.docker.com/)
    
## 🛠️ Install Dependencies

1. If not already done, install Docker Compose (v2.10+)
2. Create two environment files:
    - ```.env``` at the root of the backend.
    - ```.env``` inside the ```oauthServer``` directory.
- Use the provided examples:
    - ``` .env.exampleBACK ``` for the backend.
    - ```.env.exampleOAUTHSERVER``` for the OAuth server.
3. Run the following command to start both the backend and frontend: 
```bash
bash script.sh 
```
4. Open https://localhost:5173 in your favorite web browser
5. Access the API documentation and lock all routes via Swagger: https://localhost:3000/docs

    
## ❤️ Support  
A simple star to this project repo is enough to keep me motivated on this project for days. If you find your self very much excited with this project let me know with a tweet.

        
## 🙇 Author
#### Haroun Azoulay
- Github: [@Haroun-Azoulay](https://github.com/Haroun-Azoulay)
        