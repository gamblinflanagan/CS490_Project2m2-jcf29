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


'''      
class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(120))
    message = db.Column(db.String(120))
    
    def __init__(self, u, m):
        self.user = u
        self.message = m
        
    def __repr1__(self):
        return '<Messages user: %s>' % self.user 
    
    def __repr__(self):
        return '<Messages message: %s>' % self.message 
 
 
 
        
class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(120))
    
    def __init__(self, m):
        self.message = m
    
    def __repr__(self):
        return '<Test message: %s>' % self.message 
'''
