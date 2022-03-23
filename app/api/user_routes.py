from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User
from app.aws import (
    delete_image_from_s3, upload_file_to_s3, allowed_file, get_unique_filename
)

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


@user_routes.route('/<int:user_id>', methods=['PUT'])
@login_required
def change_profile_pic(user_id):
    if "image" not in request.files:
        return {"errors": "image required"}, 400
    
    image = request.files["image"]
    user = User.query.get(user_id)
    
    image.filename = get_unique_filename(image.filename)
    
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    
    upload = upload_file_to_s3(image)
    
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    
    if user.profile_pic_url != None:
        old_pic_filename = user.profile_pic_url.split('/')[-1]
        delete_image_from_s3(old_pic_filename)
    
    url = upload["url"]
    user.profile_pic_url = url
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<int:user_id>/campaigns/')
@login_required
def get_campaigns_by_user(user_id):
    if user_id == int(current_user.get_id()):
        campaigns = User.query.get(user_id).campaigns
        return {"all_campaigns": [campaign.to_dict() for campaign in campaigns]}
    return {"error": "Unauthorized"}, 401


@user_routes.route('/<int:user_id>/characters/')
@login_required
def get_characters_by_user(user_id):
    if user_id == int(current_user.get_id()):
        characters = User.query.get(user_id).characters
        return {"all_characters": [character.to_dict() for character in characters]}
    return {"error": "Unauthorized"}, 401