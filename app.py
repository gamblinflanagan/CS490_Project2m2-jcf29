# app.py
from os.path import join, dirname
import dotenv
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
#import models 

MESSAGES_RECEIVED_CHANNEL = 'messages received'
decide = 0

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


usrLst = []
userName = 'default'
@socketio.on('connect')
def on_connect():
    counter = len(usrLst)
    userName = 'user0X' + str(counter)
    usrLst.append(userName)
    print('A new user '+userName+' has connected!')
    socketio.emit('connected', {
        'test': 'Connected'
    })
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)
    
    
@socketio.on('disconnect')
def on_disconnect():
    userName = str(usrLst[-1])
    print ('user '+userName+' has disconnected!')
    usrLst.pop()



@socketio.on('new message input')#listens to client for message can put my if for command from bot in here
def on_new_address(data):
    print("Got an event for new message with data:", data)
    
    db.session.add(models.Usps(data["message"]));
    db.session.commit();
    
    if '!help' in data["message"]:
        data["message"] = "oooff Madone!! enter a message and press send, kepeesh!!"
        db.session.add(models.Usps(data["message"]));
        db.session.commit();
    
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)
    
    
    


import models 

@app.route('/')
def index():
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    return flask.render_template("index.html", the_userName = userName)

if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
    