from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Campaign, User, Character
from app.forms import CampaignForm
from app.api.auth_routes import validation_errors_to_error_messages

campaign_routes = Blueprint('campaigns', __name__)

@campaign_routes.route('/', methods=['POST'])
@login_required
def create_campaign():
    form = CampaignForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    user = User.query.get(data['owner_id'])
    
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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@campaign_routes.route('/characters/<int:character_id>', methods=['PUT'])
@login_required
def add_character_to_campaign(character_id):
    added_character = Character.query.get(character_id)
    campaign_id = request.json['campaign_id']
    added_character.campaign_id = campaign_id
    db.session.commit()
    return added_character.to_dict()


@campaign_routes.route('/<int:campaign_id>', methods=['DELETE'])
@login_required
def delete_campaign(campaign_id):
    deleted_campaign = Campaign.query.get(campaign_id)
    db.session.delete(deleted_campaign)
    db.session.commit()
    return {'message':'success!'}


@campaign_routes.route('/characters/<int:character_id>', methods=['DELETE'])
@login_required
def delete_character_from_campaign(character_id):
    removed_character = Character.query.get(character_id)
    removed_character.campaign_id = None
    db.session.commit()
    return removed_character.to_dict()