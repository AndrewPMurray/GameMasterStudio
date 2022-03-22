from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length


class CampaignForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Please input a title for your campaign.'), Length(max=50)])
    description = TextAreaField('description')
    owner_id = IntegerField('owner_id', validators=[DataRequired()])