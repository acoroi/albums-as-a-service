# AaaS - Albums as a Service
A simple node app that does something cool - in this case, it's a web service that tells me about my music!

## Overview
This application is a web service that provides details about albums, allows a caller to add a new album entry, and allows callers to filter by certain parameters when searching for albums.

## Code Style

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
 
## Installation
This guide assumes your local environment is configured to communicate with a local ```MongoDB``` instance. If your local environment is not yet configured to use ```MongoDB```, please refer to [this installation guide provided by Prisma](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database#setting-up-mongodb-on-macos).

---

Once you are set up to use ```MongoDB``` locally, ensure you have a ```Node``` installation on your machine:
```
☁  simple-node-app [feature] ⚡  node -v
v16.15.0
```
Clone the repo and enter it. After ensuring you have pulled the latest version of the project, execute ```npm install``` in order to install the requisite dependencies.

You will also need to create a ```.env``` file at the root of the folder in order to leverage the environment variable level configuration. At a minimum, the file requires the following values:
```sh
# Base app config
PORT="8080"
HOST="localhost"
# Mongo config
MONGO_URL="mongodb://localhost:27017"
MONGO_DB_NAME="Music"
```
Please refer to the ```config.js``` file for additional configuration options.

Once the ```.env``` file is created and your dependencies are installed, you can start up the application by executing ```node app.js```. Logs will indicate a successful startup in the following manner:
```
☁  simple-node-app [feature] ⚡  node app.js
{"configuration":{"host":"localhost","port":"8080"},"level":"info","message":"Web Server started"}
{"level":"info","message":"Successfully established the web service routes"}
{"configuration":{"dbName":"Music","dbNumRetries":5,"dbRetryMs":1000,"dbUrl":"mongodb://localhost:27017"},"level":"info","message":"Successfully connected to local MongoDB instance"}
{"level":"info","message":"Successfully started the web server"}
```

## API
The application supports creation of new albums, retrieval of album details by unique indentifier, and retrieval of album details by query string parameter for optional filtering.

#### URL

- localhost:8080 (when running locally)

#### Supported methods

- `GET` | `POST`

#### Supported querystring parameters

- `genre` | `artist` | `releaseYear`

### Sample Calls

#### ```GET``` Album details by Id
This request allows the caller to retrieve details about a particular record given its unique ID.
##### Request
```js
GET {baseURL}/albums/209949
```
##### Response (200)
```json
  {
      "title": "Hidden Terraces",
      "artist": "Sofie Birch",
      "genre": "Ambient",
      "releaseYear": "2020"
  }
```

#### ```GET``` Album details by querystring parameter
This request allows the caller to pass in optional querystring parameters to filter the result set of a broad GET call for albums. If no querystring parameter is provided, the call will return all albums available.
##### Request
```js
GET {baseURL}/albums?genre=Ambient
```
##### Response (200)
```json
[
    {
        "title": "Dust of Stars",
        "artist": "Roger Eno",
        "genre": "Ambient",
        "releaseYear": "2018"
    },
    {
        "title": "Tracing Back the Radiance",
        "artist": "Jefre Cantu-Ledesma",
        "genre": "Ambient",
        "releaseYear": "2019"
    },
    {
        "title": "Hidden Terraces",
        "artist": "Sofie Birch",
        "genre": "Ambient",
        "releaseYear": "2020"
    }
]
```

#### ```POST``` Album
This request allows the caller to ADD a new album.
##### Request
```json
{
  "title": "Hidden Terraces",
  "artist": "Sofie Birch",
  "genre": "Ambient",
  "releaseYear": "2020",
  "features": null,
  "tracklist": [
    {
      "song": "Morgenånder",
      "length": "18:07"
    },
    {
      "song": "Vidsyn",
      "length": "18:22"
    }
  ]
}
```
##### Response (200)
```json
{
    "message": "Successfully created new Album entry"
}
```

