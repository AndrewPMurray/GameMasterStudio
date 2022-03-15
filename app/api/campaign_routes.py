from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Campaign, CampaignUser, db
from app.forms import CampaignForm

campaign_routes = Blueprint('campaigns', __name__)

@campaign_routes.route('/', methods=['POST'])
@login_required
def create_campaign():
    form = CampaignForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    if form.validate_on_submit():
        new_campaign = Campaign(
            title=data['title'],
            description=data['description'],
            owner_id=data['owner_id'],
        )
        db.session.add(new_campaign)
        db.session.commit()
        
        new_campaign_user = CampaignUser(
            user_id=data['owner_id'],
            campaign_id=new_campaign.id
        )
        db.session.add(new_campaign_user)
        db.session.commit()
        
        return new_campaign.to_dict()