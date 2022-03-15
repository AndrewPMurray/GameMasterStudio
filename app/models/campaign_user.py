from .db import db

campaign_users = db.Table('campaign_users',
                          db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
                          db.Column('campaign_id', db.Integer, db.ForeignKey('campaigns.id'))
                          )