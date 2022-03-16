from .db import db

campaign_users = db.Table(
    "campaign_users",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("campaign_id", db.Integer, db.ForeignKey("campaigns.id"), primary_key=True)
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