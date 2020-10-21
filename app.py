# app.py
from os.path import join, dirname
import dotenv
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
import random
#import models 
import requests, json 

MESSAGES_RECEIVED_CHANNEL = 'messages received'
decide = 0
weather_key = os.environ['WEATHER_KEY']
translate_key = os.environ['FUN_TRANSLATE_KEY']

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'sql.env')
dotenv.load_dotenv(dotenv_path)

#sql_user = os.environ['SQL_USER']
#sql_pwd = os.environ['SQL_PASSWORD']
#dbuser = os.environ['USER']


database_uri = os.environ['DATABASE_URL']
#database_uri = 'postgresql://{}:{}@localhost/postgres'.format(sql_user, sql_pwd)


def weather(the_city):  
  
    URL = "http://api.openweathermap.org/data/2.5/weather?appid=" + weather_key + "&q=" + str(the_city)
    response = requests.get(URL) 
    json_response = response.json() 
    if json_response["cod"] != "404": 
        final = json_response["weather"] 
        descript = final[0]["description"] 
        rt = "The weather in "+the_city+" is "+str(descript)
    else: 
        rt = " City Not Found "
        
    return rt

def translate(text):
        URL = 'https://api.funtranslations.com/translate/sith?api_key='+translate_key+'.json?text='+str(text)
        response = requests.get(URL) 
        json_response = response.json()
        counter = 0
        for key, value in json_response.items():
            print(key, value)
            if counter == 2:
                trans = str(value)
        return trans


app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app


db.create_all()
db.session.commit()

def emit_all_messages(channel):
    all_messages = [\
        db_message.address for db_message in \
        db.session.query(models.Usps).all()]
    
    socketio.emit(channel, {
        'allMessages': all_messages
    })



@socketio.on('connect')
def on_connect():
    print('')
    '''
    socketio.emit('connected', {
        'test': 'Connected'
    })
    #emit_all_messages(MESSAGES_RECEIVED_CHANNEL)
    '''

@socketio.on('google user')
def on_new_google_user(data):
    print("a new user has connected ben authenticated with data:", data)
    socketio.emit('connected', {
        'test': 'Connected'
    })
    db.session.add(models.users(data["login"][0], data["login"][1], data["login"][2], data["login"][3], data["login"][4], data["login"][5]));
    db.session.commit();
    
    #emit_all_oauth_users(USERS_UPDATED_CHANNEL)
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)
    
    
@socketio.on('disconnect')
def on_disconnect():
    print("a new user has disconnected")
    #db.session.delete(models.users).all()
    #db.session.commit();



@socketio.on('new message input')#listens to client for message can put my if for command from bot in here
def on_new_address(data):
    print("Got an event for new message with data:", data)
    
    db.session.add(models.Usps(data["message"]));
    db.session.commit();
    
    x = data["message"]
    if x[0] == x[1] == "!":
        if '!! help' == x[:7]:
            lst = ["BENDER: !! help is a list of commands i know", "!! about is a little about me", "enter !! funtranslate followed by your message and ill translate your message", "!! cash is the amount of money i won cheating at poker with x-ray specs", "!! weather followed by your city for the weather"]
            #data["message"] = "enter !!help for this, to about me enter !!about Ill translate somethin for ya with !!funtranslate, Ill make art with !!art, Ill find a tweet with !!tweet"
            for i in range(0, len(lst)):
                data["message"] = lst[i]
                db.session.add(models.Usps(data["message"]));
                db.session.commit();
        
        elif '!! about' == x[:8]:
            data["message"] = "BENDER: I'm Bender baby Please Insert Liquor"
            db.session.add(models.Usps(data["message"]));
            db.session.commit();
        
        elif '!! funtranslate' == x[:15]:
            msg = x[15:]
            data["message"] = "BENDER: "+(str(translate(msg)))
            db.session.add(models.Usps(data["message"]));
            db.session.commit();
        
        elif '!! cash' == x[:7]:
            rand = random.randint(1, 100)
            data["message"] = "BENDER: $"+str(rand)
            db.session.add(models.Usps(data["message"]));
            db.session.commit();
        
        
        elif '!! weather' == x[:10]:
            city = x[10:]
            data["message"] = "BENDER: "+(str(weather(city)))
            db.session.add(models.Usps(data["message"]));
            db.session.commit();
        
        else:
            data["message"] = "BENDER: I donno know that command"
            db.session.add(models.Usps(data["message"]));
            db.session.commit();
    
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)
    
    
    


import models 

@app.route('/')
def index():
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    return flask.render_template("index.html")

if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
