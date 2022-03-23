from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Campaign, Section
from app.forms import SectionForm
from app.api.auth_routes import validation_errors_to_error_messages

section_routes = Blueprint('sections', __name__)

@section_routes.route('/', methods=['POST'])
@login_required
def create_section():
    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    if form.validate_on_submit():
        new_section = Section(
            title=data['title'],
            campaign_id=data['campaign_id']
        )
        db.session.add(new_section)
        db.session.commit()
        return new_section.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@section_routes.route('/<int:section_id>', methods=['PUT'])
@login_required
def edit_section(section_id):
    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    if form.validate_on_submit():
        edited_section = Section.query.get(section_id)
        edited_section.title = data['title']
        db.session.commit()
        return edited_section.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@section_routes.route('/<int:section_id>', methods=['DELETE'])
@login_required
def delete_section(section_id):
    owner_id = request.json['owner_id']
    if owner_id == int(current_user.get_id()):
        deleted_section = Section.query.get(section_id)
        db.session.delete(deleted_section)
        db.session.commit()
        return {'message':'success!'}
    return {'error': 'unauthorized'}, 401



@section_routes.route('/<int:section_id>/articles')
@login_required
def get_articles_by_section(section_id):
    section = Section.query.get(section_id)
    campaign = Campaign.query.get(section.campaign_id)
    current_user_id = int(current_user.get_id())
    for user in campaign.users:
        if user.id == current_user_id:
            return {'all_articles': [article.to_dict() for article in section.articles]}
    return {'error':'unauthorized'}, 401