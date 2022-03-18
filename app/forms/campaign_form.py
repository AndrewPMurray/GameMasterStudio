from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


class CampaignForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Please input a title for your campaign.')])
    description = TextAreaField('description')
    owner_id = IntegerField('owner_id', validators=[DataRequired()])