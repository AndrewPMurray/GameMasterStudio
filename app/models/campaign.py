from .db import db
from .campaign_user import campaign_users

class Campaign(db.Model):
    __tablename__ = 'campaigns'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    dungeon_master_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    characters = db.relationship("Character", back_populates="campaign")
    sections = db.relationship("Section", back_populates="campaign")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'owner_id': self.owner_id,
            'dungeon_master_id': self.dungeon_master_id,
            'characters': [character.to_dict() for character in self.characters],
            'sections': [section.to_dict() for section in self.sections]
        }
