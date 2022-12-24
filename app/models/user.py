from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic_url = db.Column(db.String(500))
    
    campaigns = db.relationship("Campaign", secondary=add_prefix_for_prod("campaign_users"), back_populates="users")
    characters = db.relationship("Character", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic_url': self.profile_pic_url,
            'campaigns': [campaign.to_dict() for campaign in self.campaigns],
            'characters': [character.to_dict() for character in self.characters]
        }
    
    def user_info_to_dict(self):
        return {
            'username': self.username,
            'id': self.id,
            'profile_pic_url': self.profile_pic_url,
        }
