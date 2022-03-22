from operator import length_hint
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class SectionForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Please input a title for this section.'), Length(max=50)])
    campaign_id = IntegerField('owner_id', validators=[DataRequired()])