from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, CampaignUser

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/campaigns/<int:user_id>')
@login_required
def get_campaigns_by_user(user_id):
    campaigns = CampaignUser.query.filter(CampaignUser.user_id == user_id).all()
    return {"all_campaigns": [campaign.campaign.to_dict() for campaign in campaigns]}