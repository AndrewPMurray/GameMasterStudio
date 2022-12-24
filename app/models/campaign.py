from .db import db, environment, SCHEMA, add_prefix_for_prod
import campaign_user
# from .campaign_user import CampaignUser

class Campaign(db.Model):
    __tablename__ = 'campaigns'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    game_master_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    
    users = db.relationship("User", secondary=campaign_user, back_populates='campaigns')
    characters = db.relationship("Character", back_populates="campaign")
    sections = db.relationship("Section", back_populates="campaign", cascade="all, delete")
    game_master = db.relationship("User", foreign_keys=[game_master_id])

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'owner_id': self.owner_id,
            'game_master': self.game_master.user_info_to_dict() if self.game_master_id else None,
            'characters': [character.to_dict() for character in self.characters],
            'sections': [section.to_dict() for section in self.sections],
            'users': [user.user_info_to_dict() for user in self.users],
        }
