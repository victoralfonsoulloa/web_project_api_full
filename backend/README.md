# Web Project Around Express

This is a simple REST API built with Node.js and Express. It serves user and card data from local JSON files, similar to the API used in the "Around the U.S." project.

## Project Structure

```
web_project_around_express/
├── app.js
├── models/
│   ├── user.js
│   └── card.js
├── controllers/
│   ├── user.js
│   └── cards.js
├── routes/
│   ├── users.js
│   └── cards.js
├── package.json
└── ...
```

## Installation

1. Clone the repository.
2. Install dependencies:

   ```sh
   npm install
   ```

3. (Optional) Install [Postman](https://www.postman.com/) or a similar API client for testing.

## Running the Server

- To start the server:

  ```sh
  npm run start
  ```

- For development with auto-reload:

  ```sh
  npm run dev
  ```

## API Endpoints

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | `/users`                | Returns all users                  |
| GET    | `/users/:id`            | Returns a user by ID               |
| POST   | `/users`                | Creates a new user                 |
| PATCH  | `/users/me`             | Updates current user's profile     |
| PATCH  | `/users/me/avatar`      | Updates current user's avatar      |
| GET    | `/cards`                | Returns all cards                  |
| POST   | `/cards`                | Creates a new card                 |
| DELETE | `/cards/:cardId`        | Deletes a card by ID               |
| PUT    | `/cards/:cardId/likes`  | Likes a card                       |
| DELETE | `/cards/:cardId/likes`  | Removes like from a card           |


### Error Handling

- Any non-existent route returns:
  ```json
  { "message": "Requested resource not found" }
  ```
- Invalid data (400):
  ```json
  { "message": "Invalid data" }
  ```
- Invalid ID format (400):
  ```json
  { "message": "Invalid ID format" }
  ```
- Resource not found (404):
  ```json
  { "message": "Resource not found" }
  ```
- Server error (500):
  ```json
  { "message": "An error has occurred on the server" }
  ```

## Linting

To check code style with ESLint:

```sh
npm run lint
```

## Notes

- Data is stored in MongoDB using Mongoose models.
- Feel free to extend the API or refactor the code for practice!
