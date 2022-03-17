from tokenize import String
from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, NumberRange, ValidationError


class CharacterForm(FlaskForm):
    type = StringField('title', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    class_name = StringField('class name', validators=[DataRequired()])
    level = IntegerField('level', validators=[DataRequired()])
    background = StringField('background', validators=[DataRequired()])
    race = StringField('race', validators=[DataRequired()])
    alignment = StringField('alignment', validators=[DataRequired()])
    experience = IntegerField('experience', validators=[NumberRange(min=0)])
    strength = IntegerField('strength', validators=[NumberRange(min=0)])
    dexterity = IntegerField('dexterity', validators=[NumberRange(min=0)])
    constitution = IntegerField('constitution', validators=[NumberRange(min=0)])
    intelligence = IntegerField('intelligence', validators=[NumberRange(min=0)])
    wisdom = IntegerField('wisdom', validators=[NumberRange(min=0)])
    charisma = IntegerField('charisma', validators=[NumberRange(min=0)])
    armor_class = IntegerField('armor class', validators=[NumberRange(min=0)])
    speed = IntegerField('speed', validators=[NumberRange(min=0)])
    max_hp = IntegerField('max hp', validators=[NumberRange(min=0)])
    current_hp = IntegerField('current hp', validators=[NumberRange(min=0)])
    temporary_hp = IntegerField('temporary hp', validators=[NumberRange(min=0)])
    hit_dice_total = IntegerField('hit dice total', validators=[NumberRange(min=0)])
    hit_dice = IntegerField('hit dice', validators=[NumberRange(min=0)])
    weapons = TextAreaField('weapons')
    equipment = TextAreaField('equipment')
    gold_pieces = IntegerField('gold pieces', validators=[NumberRange(min=0)])
    silver_pieces = IntegerField('silver pieces', validators=[NumberRange(min=0)])
    copper_pieces = IntegerField('copper pieces', validators=[NumberRange(min=0)])
    features = TextAreaField('features')
    biography = TextAreaField('biography')
    user_id = IntegerField('user id', validators=[NumberRange(min=0)])