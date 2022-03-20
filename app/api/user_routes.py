from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.user_info_to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:user_id>/campaigns/')
@login_required
def get_campaigns_by_user(user_id):
    campaigns = User.query.get(user_id).campaigns
    return {"all_campaigns": [campaign.to_dict() for campaign in campaigns]}

@user_routes.route('/<int:user_id>/characters/')
@login_required
def get_characters_by_user(user_id):
    characters = User.query.get(user_id).characters
    return {"all_characters": [character.to_dict() for character in characters]}