from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Article
from app.forms import ArticleForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3 import (
    delete_image_from_s3, upload_file_to_s3, allowed_file, get_unique_filename)

article_routes = Blueprint('articles', __name__)

@article_routes.route('/images', methods=['POST'])
@login_required
def upload_article_image():
    if "image" not in request.files:
        return {'errors': {'image':'image required'}}, 400
    
    image = request.files['image']
    
    if not allowed_file(image.filename):
        return {'errors': {'image': 'file type is not permitted'}}, 400
    
    image.filename = get_unique_filename(image.filename)
    
    upload = upload_file_to_s3(image)
    
    if "url" not in upload:
        return upload, 400
    
    url = upload['url']
    return {"url": url}

@article_routes.route('/images', methods=['DELETE'])
@login_required
def delete_article_image():
    filename = request.json['url'].split('/')[-1]
    delete_image_from_s3(filename)
    return {"message":"success"}


@article_routes.route('/', methods=['POST'])
@login_required
def create_article():
    form = ArticleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    if form.validate_on_submit():
        new_article = Article(
            title=data['title'],
            content=data['content'],
            photo_url=data['photo_url'],
            section_id=data['section_id'],
        )
        db.session.add(new_article)
        db.session.commit()
        return new_article.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@article_routes.route('/<int:article_id>', methods=['PUT'])
@login_required
def edit_article(article_id):
    form = ArticleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    if form.validate_on_submit():
        edited_article = Article.query.get(article_id)
        if edited_article.photo_url != None and data['photo_url'] != edited_article.photo_url:
            filename = edited_article.photo_url.split('/')[-1]
            delete_image_from_s3(filename)
            
        edited_article.title = data['title']
        edited_article.content = data['content']
        edited_article.photo_url = data['photo_url']
        db.session.commit()
        return edited_article.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@article_routes.route('/<int:article_id>', methods=['DELETE'])
@login_required
def delete_article(article_id):
    owner_id = request.json['owner_id']
    if owner_id == int(current_user.get_id()):
        deleted_article = Article.query.get(article_id)
        if deleted_article.photo_url != None:
            filename = deleted_article.photo_url.split('/')[-1]
            delete_image_from_s3(filename)
            
        db.session.delete(deleted_article)
        db.session.commit()
        return {'message':'success!'}
    return {'error': 'unauthorized'}, 401