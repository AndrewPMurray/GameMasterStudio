from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Campaign, User
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


@campaign_routes.route('/<int:campaign_id>', methods=['DELETE'])
@login_required
def delete_campaign(campaign_id):
    deleted_campaign = Campaign.query.get(campaign_id)
    db.session.delete(deleted_campaign)
    db.session.commit()
    return {'message':'success!'}