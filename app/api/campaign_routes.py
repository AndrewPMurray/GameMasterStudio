from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Campaign, User
from app.forms import CampaignForm

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
            owner_id=data['owner_id'],
        )
        
        user.campaigns.append(new_campaign)
        db.session.add(new_campaign)
        db.session.commit()
        
        return new_campaign.to_dict()


@campaign_routes.route('/<int:campaign_id>', methods=['DELETE'])
@login_required
def delete_campaign(campaign_id):
    deleted_campaign = Campaign.query.get(campaign_id)
    db.session.delete(deleted_campaign)
    db.session.commit()
    return {'message':'success!'}