from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, NumberRange, ValidationError, Length


class CharacterForm(FlaskForm):
    def check_character_name(form, field):
        name = field.data
        if name == 'game_master':
            raise ValidationError('Name not allowed')
    
    def check_character_hp(form, field):
        current_hp = form.data['current_hp']
        max_hp = form.data['max_hp']
        if (current_hp > max_hp):
            raise ValidationError('Current HP cannot be higher than Maximum HP')
        
    def check_hit_dice(form,field):
        hit_dice_total = form.data['hit_dice_total']
        hit_dice = form.data['hit_dice']
        if (hit_dice > hit_dice_total):
            raise ValidationError('Hit Dice cannot be higher than total hit dice')
            
    type = StringField('title', validators=[DataRequired(), Length(max=50)])
    name = StringField('name', validators=[DataRequired(), check_character_name, Length(max=100)])
    class_name = StringField('class name', validators=[DataRequired(), Length(max=50)])
    level = IntegerField('level', validators=[DataRequired(), NumberRange(min=1, max=20)])
    background = StringField('background', validators=[DataRequired(), Length(max=50)])
    race = StringField('race', validators=[DataRequired(), Length(max=50)])
    alignment = StringField('alignment', validators=[DataRequired(), Length(max=50)])
    experience = IntegerField('experience', validators=[NumberRange(min=0, max=355000)])
    strength = IntegerField('strength', validators=[NumberRange(min=0, max=30)])
    dexterity = IntegerField('dexterity', validators=[NumberRange(min=0, max=30)])
    constitution = IntegerField('constitution', validators=[NumberRange(min=0, max=30)])
    intelligence = IntegerField('intelligence', validators=[NumberRange(min=0, max=30)])
    wisdom = IntegerField('wisdom', validators=[NumberRange(min=0, max=30)])
    charisma = IntegerField('charisma', validators=[NumberRange(min=0, max=30)])
    armor_class = IntegerField('armor class', validators=[NumberRange(min=0, max=100)])
    speed = IntegerField('speed', validators=[NumberRange(min=0, max=250)])
    max_hp = IntegerField('max hp', validators=[NumberRange(min=0, max=2000), check_character_hp])
    current_hp = IntegerField('current hp', validators=[NumberRange(min=0, max=2000), check_character_hp])
    temporary_hp = IntegerField('temporary hp', validators=[NumberRange(min=0, max=2000)])
    hit_dice_total = IntegerField('hit dice total', validators=[NumberRange(min=0, max=20), check_hit_dice])
    hit_dice = IntegerField('hit dice', validators=[NumberRange(min=0, max=20), check_hit_dice])
    weapons = TextAreaField('weapons')
    equipment = TextAreaField('equipment')
    gold_pieces = IntegerField('gold pieces', validators=[NumberRange(min=0, max=100000)])
    silver_pieces = IntegerField('silver pieces', validators=[NumberRange(min=0, max=100000)])
    copper_pieces = IntegerField('copper pieces', validators=[NumberRange(min=0, max=100000)])
    features = TextAreaField('features')
    biography = TextAreaField('biography')
    user_id = IntegerField('user id', validators=[NumberRange(min=0)])