from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Character
from app.forms import CharacterForm

character_routes = Blueprint('characters', __name__)

@character_routes.route('/', methods=['POST'])
@login_required
def create_character():
    form = CharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    print('THIS FORM IS VALID', form.validate_on_submit())
    
    if form.validate_on_submit():
        new_character = Character(
            type=data['type'],
            name=data['name'],
            class_name=data['class_name'],
            level=data['level'],
            background=data['background'],
            race=data['race'],
            alignment=data['alignment'],
            experience=data['experience'],
            strength=data['strength'],
            dexterity=data['dexterity'],
            constitution=data['constitution'],
            intelligence=data['intelligence'],
            wisdom=data['wisdom'],
            charisma=data['charisma'],
            armor_class=data['armor_class'],
            speed=data['speed'],
            max_hp=data['max_hp'],
            current_hp=data['current_hp'],
            temporary_hp=data['temporary_hp'],
            hit_dice_total=data['hit_dice_total'],
            hit_dice=data['hit_dice'],
            weapons=data['weapons'],
            equipment=data['equipment'],
            gold_pieces=data['gold_pieces'],
            silver_pieces=data['silver_pieces'],
            copper_pieces=data['copper_pieces'],
            features=data['features'],
            biography=data['biography'],
            user_id=data['user_id'],
        )
        db.session.add(new_character)
        db.session.commit()
    
        return new_character.to_dict()
    return {'errors':'omg error!'}