from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
import email_validator
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email.ilike(email)).first()
    if user:
        raise ValidationError('Email address is already in use.')
    

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username.ilike(username)).first()
    if user:
        raise ValidationError('Username is already in use.')
    
def password_check(form, field):
    # Checking length and strength of password
    password = field.data
    if len(password) < 8:
        raise ValidationError('Password must be 8 or more characters')
    if re.search(r"[A-Z]", password) is None or re.search(r"[a-z]", password) is None or re.search(r"[0-9]", password)is None:
        raise ValidationError('Password must contain at least 1 uppercase and 1 lowercase character, and 1 number')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired('Please input a username'), Length(max=40), username_exists])
    email = StringField('email', validators=[DataRequired('Please input a valid email address'), Length(max=255), Email(), user_exists])
    password = StringField('password', validators=[DataRequired('Please provide a secure password'), password_check])
