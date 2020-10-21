# CS490_Project2
## This is the second project the CS 490 of which the purpose is to create a chat webiste with a bot using a database and client and socket architecture



### Languages used:
python

html

css

javascript/react

sql



### APIs used:
dotenv

flask

flask_sqlalchemy

flask_socketio

funtranslations

openweathermap

react-google-login



### INSTALLING PIP
pip or any up to date de facto standard package-managment system will be needed for the next APIs (flask, tweepy)
PIP is recommended

INSTRUCTIONS ON HOW TO DOWNLOAD PIP HERE - https://pip.pypa.io/en/stable/installing/



### INSTALLING FLASK

in your working directory write the following: `sudo pip install flask`


### INSTALLING STUFF FOR REACT
## RUN THE FOLLOWING COMMANDS IN THIS ORDER IN THE SAME WORKING DIRECTORY AS THE PROJECT
* `npm install`
* `pip install flask-socketio`
* `pip install eventlet`
* `npm install -g webpack`
* `npm install --save-dev webpack`
* `npm install socket.io-client --save`
## IGNORE WARNING MESSAGES
## IF ANY ERROR MESSAGS OCCUR USE `sudo pip`, or `sudo npm`



### INSTALLING AND SETTING UP PSQL
## RUN THE FOLLOWING COMMANDS IN THIS ORDER IN THE SAME WORKING DIRECTORY AS THE PROJECT
* `sudo yum update`    
* `sudo /usr/local/bin/pip install --upgrade pip`  
* `sudo /usr/local/bin/pip install psycopg2-binary`    
* `sudo /usr/local/bin/pip install Flask-SQLAlchemy==2.1`
## IGNORE WARNING MESSAGES

* `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs` Enter yes if prompted 

## TO INITIALIZE A NEW DB
* `sudo service postgresql initdb`  
## TO START THE DB
* `sudo service postgresql start` or `restart`   

* `sudo -u postgres createuser --superuser $USER`    
* `sudo -u postgres createdb $USER`    
## ANY ERRORS SAYING 'could not change directory' IGNORE

## CREATE A NEW USER
* `psql` opnes postgresql terminal
* `create user <username> superuser password '<password>';` the quotation marks '' around password are needed
## BE SURE TO SAVE THE USER NAME AND PASSWORD THERE IS NO WAY TO RECOVER THEM IF LOST

## MAKE USER THE OWNER OF DB (IF NOT DONE ALREADY)
* `ALTER DATABASE DBname OWNER TO new_owner`
* `\du`
# YOU SHOULD SEE OUTPUT SIMILAR TO
Role name     |                   Attributes                   | Member of 
------------------+------------------------------------------------+-----------
 postgres         | Superuser, Create role, Create DB              | {}
 'DBusername'     | Superuser, Create role, Create DB              | {}

* `\l`
# YOU SHOULD SEE OUTPUT SIMILAR TO
 List of databases
   Name    |  Owner       | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+--------------+----------+-------------+-------------+-----------------------
 postgres  | 'DBusername' | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0 | postgres     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |              |          |             |             | postgres=CTc/postgres
 

### INSTALING REACT-GOOGLE-LOGIN
* run the command `npm install react-google-login`
## ![more instructions on how to use can be found here](https://www.npmjs.com/package/react-google-login)

## next you will need an account ![create one here](https://console.developers.google.com/)
* click the dropdown in the top left hand corner ![image]()
* name the project LEAVE THE LOCATION AS "No organization" and click create
* click on 'Credentials' in the left pane then the '+Credentials' dropdown then 'OAuth client ID' ![image]()
* under Application type chose Web application then choose a name for the application
* # IMPORTANT you must add the uri to your app in the 'Authorized JavaScript origins' box ![image]()
* click create and copy and paste your client ID with the ![google login button code](https://www.npmjs.com/package/react-google-login) (to get to this code go to the link and scroll down to How to use) ![image]()
* click on 'OAuth consent screen' in the left pane then select 'External' and click 'create' ![image]()


### ENV FILES
* create new files cale `sql.env`, `weather_api.env`, `translate_api.env` #only if you have an api key for funtranslations
* in sql.env write `DATABASE_URL='postgresql://`DBusername`:`DBpassword`@localhost/postgres'` and save the file
* in weather_ api.env  write `export WEATHER_KEY=`'api_key' and save the file
* in translate_ api.env write `export FUN_TRANSLATE_KEY=`'api_key' and save the file #only if you have an api key for funtranslations
* you may need to run the command source for the env files, EXAMPLE for sql.env write `source sql.env` in the terminal



### TO RUN
* in a new terminal run `npm run watch` type `yes` if asked to install webpack-cli
* in the original terminal run python app.py
