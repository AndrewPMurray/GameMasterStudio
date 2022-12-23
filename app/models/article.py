from .db import db, environment, SCHEMA, add_prefix_for_prod

class Article(db.Model):
    __tablename__ = 'articles'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text)
    photo_url = db.Column(db.String(500))
    section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('sections.id')), nullable=False)
    
    section = db.relationship("Section", back_populates="articles")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'photo_url': self.photo_url,
            'section_id': self.section_id,
        }
