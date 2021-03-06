from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Campaign, User, Character, Section
from app.forms import CampaignForm, SectionForm
from app.api.auth_routes import validation_errors_to_error_messages

campaign_routes = Blueprint('campaigns', __name__)

@campaign_routes.route('/<int:campaign_id>/sections')
@login_required
def get_sections_by_campaign(campaign_id):
    campaign = Campaign.query.get(campaign_id)
    current_user_id = int(current_user.get_id())
    for user in campaign.users:
        if user.id == current_user_id:
            return {'all_sections': [section.to_dict() for section in campaign.sections]}
    return {'error':'unauthorized'}, 401

@campaign_routes.route('/', methods=['POST'])
@login_required
def create_campaign():
    form = CampaignForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    user = User.query.get(data['owner_id'])
    
    if user.id == int(current_user.get_id()):
        if form.validate_on_submit():
            new_campaign = Campaign(
                title=data['title'],
                description=data['description'],
                owner_id=data['owner_id']
            )
            
            user.campaigns.append(new_campaign)
            db.session.add(new_campaign)
            db.session.commit()
            
            return new_campaign.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {'error':'unauthorized'}, 401


@campaign_routes.route('/<int:campaign_id>/game_master', methods=['PUT'])
@login_required
def add_game_master_to_campaign(campaign_id):
    edited_campaign = Campaign.query.get(campaign_id)
    user_id = request.json['user_id']
    edited_campaign.game_master_id = user_id
    db.session.commit()
    return edited_campaign.to_dict()
    

@campaign_routes.route('/<int:campaign_id>', methods=['PUT'])
@login_required
def edit_campaign(campaign_id):
    form = CampaignForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    edited_campaign = Campaign.query.get(campaign_id)
    
    if form.validate_on_submit():
        edited_campaign.title = data['title']
        edited_campaign.description = data['description'],
        
        db.session.commit()
        
        return edited_campaign.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@campaign_routes.route('/characters/<int:character_id>', methods=['PUT'])
@login_required
def add_character_to_campaign(character_id):
    added_character = Character.query.get(character_id)
    campaign_id = request.json['campaign_id']
    added_character.campaign_id = campaign_id
    db.session.commit()
    return added_character.to_dict()


@campaign_routes.route('/<int:campaign_id>/users', methods=['POST'])
@login_required
def add_users_to_campaign(campaign_id):
    users_to_add = request.json
    campaign = Campaign.query.get(campaign_id)
    
    for data in users_to_add:
        user = User.query.get(data['id'])
        user.campaigns.append(campaign)
    
    db.session.commit()
    return campaign.to_dict()


@campaign_routes.route('/<int:campaign_id>/users', methods=['DELETE'])
@login_required
def remove_users_from_campaign(campaign_id):
    users_to_remove = request.json
    campaign = Campaign.query.get(campaign_id)
    
    for data in users_to_remove:
        user = User.query.get(data['id'])
        character = Character.query.filter(Character.campaign_id == campaign_id, Character.user_id == user.id).first()
        if campaign.game_master_id == user.id:
            campaign.game_master_id = None
        if character != None:
            character.campaign_id = None
        user.campaigns.remove(campaign)
    
    db.session.commit()
    return campaign.to_dict()


@campaign_routes.route('/<int:campaign_id>', methods=['DELETE'])
@login_required
def delete_campaign(campaign_id):
    deleted_campaign = Campaign.query.get(campaign_id)
    if deleted_campaign.owner_id == int(current_user.get_id()):
        db.session.delete(deleted_campaign)
        db.session.commit()
        return {'message':'success!'}
    return {'error':'unauthorized'}, 400


@campaign_routes.route('/characters/<int:character_id>', methods=['DELETE'])
@login_required
def delete_character_from_campaign(character_id):
    removed_character = Character.query.get(character_id)
    removed_character.campaign_id = None
    db.session.commit()
    return removed_character.to_dict()

@campaign_routes.route('/<int:campaign_id>/game_master', methods=['DELETE'])
@login_required
def remove_game_master_from_campaign(campaign_id):
    edited_campaign = Campaign.query.get(campaign_id)
    edited_campaign.game_master_id = None
    db.session.commit()
    return edited_campaign.to_dict()