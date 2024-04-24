# Contact Manager (Backend)

This is a contact manager application built with Node.js, Express.js, and MongoDB. It provides a RESTful API for managing contacts.

## Project Structure

The project structure is organized as follows:

- **`controllers/`**: Contains route handlers for different endpoints.
- **`models/`**: Defines MongoDB schemas and models for contacts.
- **`routes/`**: Defines API routes and connects them to respective controllers.
- **`middleware/`**: Contains custom middleware functions.
- **`db/`**: Includes database configuration and setup scripts.

## Installation

Before running the application, make sure you have Node.js and MongoDB installed on your system.

1. Clone the repository:
   ```bash
   git clone https://github.com/Akbarhusain12/Contact-Backend.git
   cd Contact Backend
   ```
2. Install dependencies:
   ```bash
   npm i bcrypt mongoose express dotenv jsonwebtoken express-async-handler
   ```
3. Set up environment variables: Create a .env file in the root directory and define the following variables:
    ```bash
    PORT=5001
    MONGODB_URL= <MongoDb url>
    ACCESS_TOKEN_SECRET = <access token>
    ```
4. Start the application:
    ```bash
    npm run dev
    ```

## Usage
Interacting with the API using Postman. You can use Postman to interact with the API endpoints :

Document :-[https://documenter.getpostman.com/view/31958501/2sA3BrXpxb]

## API Endpoints
**`GET`** `/api/contacts`: Get all contacts.

**`GET`** ` /api/contacts/:id`: Get a specific contact by ID.

**`POST`** `/api/contacts`: Create a new contact.

**`PUT`** `/api/contacts/:id`: Update an existing contact.

**`DELETE`** `/api/contacts/:id`: Delete a contact.

Make sure to replace localhost with the appropriate host if MongoDB is running on a different server.


## Contributing
Contributions are welcome! If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/my-feature).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to the branch (git push origin feature/my-feature).
6. Create a new Pull Request.




## In the updated README:

- I've added a section specifically for using Postman with the API.
- There's guidance on importing a Postman collection and setting environment variables.
- Examples of API requests using Postman are included.

`**Feel free to further customize this README based on your preferences and the specific details of your contact manager app.**`

