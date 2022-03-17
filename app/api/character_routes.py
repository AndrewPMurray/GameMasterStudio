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


@character_routes.route('/<int:character_id>', methods=['PUT'])
@login_required
def update_character(character_id):
    form = CharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    print('valid?', form.validate_on_submit())
    
    if form.validate_on_submit():
        updated_character = Character.query.get(character_id)
        updated_character.type = data['type']
        updated_character.name = data['name']
        updated_character.class_name = data['class_name']
        updated_character.level = data['level']
        updated_character.background = data['background']
        updated_character.race = data['race']
        updated_character.alignment = data['alignment']
        updated_character.experience = data['experience']
        updated_character.strength = data['strength']
        updated_character.dexterity = data['dexterity']
        updated_character.constitution = data['constitution']
        updated_character.intelligence = data['intelligence']
        updated_character.wisdom = data['wisdom']
        updated_character.charisma = data['charisma']
        updated_character.armor_class = data['armor_class']
        updated_character.speed = data['speed']
        updated_character.max_hp = data['max_hp']
        updated_character.current_hp = data['current_hp']
        updated_character.temporary_hp = data['temporary_hp']
        updated_character.hit_dice_total = data['hit_dice_total']
        updated_character.hit_dice = data['hit_dice']
        updated_character.weapons = data['weapons']
        updated_character.equipment = data['equipment']
        updated_character.gold_pieces = data['gold_pieces']
        updated_character.silver_pieces = data['silver_pieces']
        updated_character.copper_pieces = data['copper_pieces']
        updated_character.features = data['features']
        updated_character.biography = data['biography']
        
        db.session.commit()
    
        return updated_character.to_dict()
    return {'errors':'omg error!'}

@character_routes.route('/<int:character_id>', methods=['DELETE'])
@login_required
def delete_character(character_id):
    deleted_character = Character.query.get(character_id)
    db.session.delete(deleted_character)
    db.session.commit()
    return {'message':'success!'}