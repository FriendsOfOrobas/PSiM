# Users
## GET
- `/users/{id}` returns data of user with specified id  
    #### Response:
    ```JSON
        {
          "id": "int",
          "username": "string"
        }
    ```
  

- `/users/me`returns data of current user  
    #### Response:
    ```JSON
        {
          "id": "int",
          "username": "string"
        }
    ```
  
## POST
- `/users/register`
    User registration
    #### Request:
    ```JSON
    {
      "username": "string",
      "password": "string",
      "salt": "string"
    }
    ```
    
    #### Response:
    Succes - 201  
    Fail - 400


- `/users/login`
    Login endpoint. Returns JWT token for later authentication and authorization\
    #### Request:
    **header:** 'Content-Type: application/x-www-form-urlencoded'

    **data:** 'grant_type=&username=USERNAME&password=PASSWORD&scope=&client_id=&client_secret='\
    #### Response:
    ```JSON
    {
      "access_token": "token",
      "token_type": "bearer"
    }
    ```
## DELETE
- `/users/{id}` deletes user with specified id  
  #### Response:
    Success - 200  
    Fail - 400  
    User not found - 404 

# GAMES
## GET
- `/games/{id}`

#### Response
```JSON
{
"game": {
          "id": "int",
          "name": "string",
          "desciption": "string",
          "game_admin_id": "int",
          "max_team_size": "int"
       }, 
"checkpoints": [{
         "id": "int",
         "name": "string",
         "desciption": "string",
         "previous": "int"     
       },],
"achievements": [{
         "id": "int",
         "name": "string",
         "desciption": "string",
         "bonus": "int", 
         "treshold": "int", 
         "checkpoint_id": "int", 
      },]}
```
- `/games/users/{user_id}/admin`
#### Response
```JSON
[
      {
          "id": "int",
          "name": "string",
          "desciption": "string",
          "max_team_size": "int"
       },
]
```

- `/games/users/{user_id}/player`
#### Response
```JSON
[
      {
          "id": "int",
          "name": "string",
          "desciption": "string",
          "max_team_size": "int"
       },
]
```
- `/games/{game_id}/team/{team_id}`

```JSON
{
  "game": {
          "id": "int",
          "name": "string",
          "desciption": "string",
          "game_admin_id": "int",
          "max_team_size": "int"
       }, 
  "checkpoints_unlocked": [{
         "id": "int",
         "name": "string",
         "desciption": "string",
         "previous": "int"     
       },], 
  "checkpoints_locked": [{
         "id": "int",
         "name": "string",
         "desciption": "string",
         "previous": "int"     
       },],
  "achievements": [{
         "id": "int",
         "name": "string",
         "desciption": "string",
         "bonus": "int", 
         "treshold": "int", 
         "checkpoint_id": "int", 
      },]}
```
## POST
- `/games/` creates new games with specified parameters

  #### Request
  ```JSON
  {
      "game": {
          "name": "string",
          "desciption": "string",
          "game_admin_id": "int",
          "max_team_size": "int"
       },
      "checkpoints": [{
         "name": "string",
         "desciption": "string",
         "previous": "int"     
       },],
      "achievements": [{
         "name": "string",
         "desciption": "string",
         "bonus": "int", 
         "treshold": "int", 
         "checkpoint_id": "int", 
      },]
  }
  ```
  #### Response
```JSON
  {"game_id": "int"}
```

## UPDATE
- `/games/` updates game with specified parameters

  #### Request
  ```JSON
  {
      "game": {
          "name": "string",
          "desciption": "string",
          "game_admin_id": "int",
          "max_team_size": "int"
       },
      "checkpoints": [{
         "name": "string",
         "desciption": "string",
         "previous": "int"     
       },],
      "achievements": [{
         "name": "string",
         "desciption": "string",
         "bonus": "int", 
         "treshold": "int", 
         "checkpoint_id": "int", 
      },]
  }
  ```
  #### Response
```JSON
  {"game_id": "int"}
```

# COMMENTS
## GET
- `/checkpoint/{checkpoint_id}/comments`

```json
[
  {
    "comment": "str",
    "time": "timestamp",
    "author": "str"
  }
]
```

## POST
- `/checkpoint/{checkpoint_id}/comments`
```json
[
  {
    "comment": "str",
    "author_id": "int"
  }
]
```

# CHECKPOINTS
## GET
-`/checkpoints/{checkpoint_id}/player`
#### Response
```json
{
         "name": "string",
         "desciption": "string",
         "previous": "int"     
       }
```
-`/checkpoints/{checkpoint_id}/admin`
#### Response
```json
{
         "name": "string",
         "desciption": "string",
         "previous": "int",
          "qr_path": "str"
       }
```
## UPDATE
-`/checkpoints/{checkpoint_id}/team/{team_id}/unlock`

# TEAM
## GET
-`/teams/{game_id}`
#### Response
```json
[{
  "name": "str",
  "points": "int",
  "game_times": ["timestamp",]
}]
```
-`/teams/team/{team_id}`
#### Response
```json
{
  "name": "str",
  "points": "int",
  "game_times": ["timestamp",],
  "members": [
    {
      "username": "str"
    }
  ]
}
```

## POST
-`/teams/{game_id}`
#### Request
```json
[{
  "name": "str",
  "members": [
    {
      "username": "str"
    }
  ]
},]
```