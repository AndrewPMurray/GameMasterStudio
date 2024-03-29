from .db import db, environment, SCHEMA, add_prefix_for_prod
import json


class Character(db.Model):
    __tablename__ = 'characters'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    class_name = db.Column(db.String(50), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    background = db.Column(db.String(50), nullable=False)
    race = db.Column(db.String(50), nullable=False)
    alignment = db.Column(db.String(50), nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    strength = db.Column(db.Integer, nullable=False)
    dexterity = db.Column(db.Integer, nullable=False)
    constitution = db.Column(db.Integer, nullable=False)
    intelligence = db.Column(db.Integer, nullable=False)
    wisdom = db.Column(db.Integer, nullable=False)
    charisma = db.Column(db.Integer, nullable=False)
    armor_class = db.Column(db.Integer, nullable=False)
    speed = db.Column(db.Integer, nullable=False)
    max_hp = db.Column(db.Integer, nullable=False)
    current_hp = db.Column(db.Integer, nullable=False)
    temporary_hp = db.Column(db.Integer, nullable=False)
    hit_dice_total = db.Column(db.Integer, nullable=False)
    hit_dice = db.Column(db.Integer, nullable=False)
    weapons = db.Column(db.Text)
    equipment = db.Column(db.Text)
    gold_pieces = db.Column(db.Integer, nullable=False)
    silver_pieces = db.Column(db.Integer, nullable=False)
    copper_pieces = db.Column(db.Integer, nullable=False)
    features = db.Column(db.Text)
    biography = db.Column(db.Text)
    campaign_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('campaigns.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    campaign = db.relationship("Campaign", back_populates="characters")
    user = db.relationship("User", back_populates="characters")

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'name': self.name,
            'class_name': self.class_name,
            'level': self.level,
            'background': self.background,
            'race': self.race,
            'alignment': self.alignment,
            'experience': self.experience,
            'strength': self.strength,
            'dexterity': self.dexterity,
            'constitution': self.constitution,
            'intelligence': self.intelligence,
            'wisdom': self.wisdom,
            'charisma': self.charisma,
            'armor_class': self.armor_class,
            'speed': self.speed,
            'max_hp': self.max_hp,
            'current_hp': self.current_hp,
            'temporary_hp': self.temporary_hp,
            'hit_dice_total': self.hit_dice_total,
            'hit_dice': self.hit_dice,
            'weapons': json.loads(self.weapons),
            'equipment': json.loads(self.equipment),
            'gold_pieces': self.gold_pieces,
            'silver_pieces': self.silver_pieces,
            'copper_pieces': self.copper_pieces,
            'features': json.loads(self.features),
            'biography': self.biography,
            'campaign_id': self.campaign_id,
            'user': self.user.user_info_to_dict(),
        }
