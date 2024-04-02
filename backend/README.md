# Garden Companion - Backend

## Installation

### Requirements

- Python 3.9
- mongodb database

### Environnement variables

Make sur to fill the environnement variable in .env file. Alternatively, you can set them in your system, if you are using MacOS with zsh, edit the .zshrc file. Make sure to keep those variables secret and not push it on github or other plateform.

```
export OPENAI_API_KEY=""
export JWT_SECRET_KEY=""
export JWT_REFRESH_SECRET_KEY=""
export MONGO_CONNECTION_STRING="mongodb://127.0.0.1:27017"
export MAIL_USERNAME=""
export MAIL_PASSWORD=""
export MAIL_FROM=""
export MAIL_SERVER=""
export FRONT_END_URL="http://127.0.0.1:5501"
export BACK_END_URL="http://127.0.0.1:8000"
```

### Virtual environnement

go to ./backend/

#### Create

```
python3 -m venv .venv 
```

#### Activate

```
source .venv/bin/activate
```

### Install python packages

```
pip install -r requirements.txt
```

#### Run the server

In a terminal launch the uvicorn server:

```
uvicorn app.app:app
```

To try that the server is running, open a new terminal:

```
http://
```

you should get the response 

```
{message : "server is running"}
```

## Testing

To run tests launch the command:

```
python -m pytest
```
