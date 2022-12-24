from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import MetaData

if environment == 'production':
    schema = SCHEMA
else: 
    schema = None

campaign_users = db.Table(
    "campaign_users", MetaData(schema=schema),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("campaign_id", db.Integer, db.ForeignKey(add_prefix_for_prod("campaigns.id")), primary_key=True)
)

# class CampaignUser(db.Model):
#     __tablename__ = 'campaign_users'
    
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)
    
#     user = db.relationship("User", backref=db.backref("campaign_users", cascade="all, delete-orphan"))
#     campaign = db.relationship("Campaign", backref=db.backref("campaign_users", cascade="all, delete-orphan"))
    
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'campaign_id': self.campaign_id,
#             'campaign': self.campaign.to_dict(),
#         }