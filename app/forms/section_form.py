from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class SectionForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Please input a title for this section.')])
    campaign_id = IntegerField('owner_id', validators=[DataRequired()])