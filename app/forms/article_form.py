from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class ArticleForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Please input a title for this section.'), Length(max=50)])
    content = TextAreaField('content')
    photo_url = StringField('photo_url')
    section_id = IntegerField('owner_id', validators=[DataRequired()])