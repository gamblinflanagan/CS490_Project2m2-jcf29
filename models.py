# models.py
import flask_sqlalchemy
from app import db


class Usps(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(225))
    
    def __init__(self, a):
        self.address = a
        
    def __repr__(self):
        return '<Usps address: %s>' % self.address
        
        
class users(db.Model):
    email = db.Column(db.String(120))
    famname = db.Column(db.String(120))
    givname = db.Column(db.String(120))
    uid = db.Column(db.String(120), primary_key=True)
    imdurl = db.Column(db.String(225))
    fullname = db.Column(db.String(120))
    
    def __init__(self, e, a, g, u, i, f):
        self.email = e
        self.famname = a
        self.givname = g
        self.uid = u
        self.imdurl = i
        self.fullname = f
    
    def __repr__(self):
        return "<users email: {}\nfamname: {}\ngivname: {}\nuid: {}\nimdurl: {}\nfullname: {}".format(self.email, self.famname, self.givname, self.uid, self.imdurl, self.fullname)
   