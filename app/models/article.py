from .db import db

class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text)
    photo_url = db.Column(db.String(500))
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'), nullable=False)
    
    section = db.relationship("Section", back_populates="articles")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'photo_url': self.photo_url,
            'section_id': self.section_id,
        }
