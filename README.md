# README

# Trybe Futebol Clube

Trybe Futebol Clube is a Full Stack application, focused on Object Oriented Programming (OOP), SOLID and TypeScript, which allows the user to access information about football matches and rankings. When logging in to the application, the user, in addition to viewing the information, will also be able to change the results of matches and insert matches that are in progress.
I've managed to build several routes to retrieve data such as user, macthes and leaderboard info. It was a challenge to use classes and OOP, but im confident this project told me a lot of fundamental aspects of
SOLID and TS.

## Installation

If you wish to see how this project was made and run it yourself, you can follow this steps:

- Clone the repo to your machine
- Access the folder and open terminal

To install dependencies:
```bash
npm install
```

## Usage
This project is using docker.
To run the project in your machine:

```bash
npm run compose:up:dev
```
The command above will put up 3 containers, app_backend, app_frontend and db.

You can also check the log of the backend container by using:
```bash
docker-compose logs backend -f
```

## Tests

Tests are still a work in progress, but if you wish to run the avaiable tests you can run:
```bash
npm test
```

## Routes

Most of the routes have validation middlewares. Unless you're trying to get and error message, you should respect the correct body format.
These are the available routes:

## GET /teams
Get all teams.

Responds with status 200 and:
```bash
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
```

## GET /teams/:id
Get a team based on its id.

Responds with status 200 and:
```bash
{
  "id": 5,
  "teamName": "Cruzeiro"
}
```

## POST /login
Tries to make login.
Correct body format:
```bash
{
  "email": admin@admin.com,
  "password": "secret_admin"
}
```

Responds with status 200 and:
```bash
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
}
```

## POST /login/role
Gets the role of the user from a token sent via headers.
You cannot do this without a token.

Responds with status 200 and:
```bash
{ "role": "admin" }
```

## GET /matches
Get all matches.

You can also filter by finished or in progress matches by sending a query.
ex: `matches?inProgress=true`

Responds with status 200 and:
```bash
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]
```

## PATCH /matches/:id/finish
Finish a match.
You cannot do this without a token.

Responds with status 200 and:
```bash
{ "message": "Finished" }
```

## PATCH /matches/:id
Update a match.
You cannot do this without a token.
Correct body format:
```bash
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

Responds with status 200 and:
```bash
{ "message": "Match updated" }
```

## POST /matches
Create a match.
You cannot do this without a token.
Correct body format:
```bash
{
  "homeTeamId": 16, // value must be team id
  "awayTeamId": 8, // value must be team id
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
```

Responds with status 201 and:
```bash
{
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}
```

## GET /leaderboard/home
Get home leaderboards.

Responds with status 200 and:
```bash
[
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 6,
    "goalsOwn": 1,
  },
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
  },
  ...
]
```

## GET /leaderboard/away
Get away leaderboards.

Responds with status 200 and:
```bash
[
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
  },
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
  },
  {
    "name": "Internacional",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 0,
  },
  ...
]
```

## GET /leaderboard
Get overall leaderboards.

## Roadmap

I still plan in making some changes / improvements to this project. Such as:

- Improve test coverage
- Minimize the number of database accesses
- Decrease API response time


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
