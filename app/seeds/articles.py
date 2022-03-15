from app.models import db, Article


def seed_articles():
    grog = Article(
        title='Grog',
        content=
"""
He's big. He's strong. He's Grog.
""",
        section_id=1)

    db.session.add(grog)

    db.session.commit()


def undo_articles():
    db.session.execute('TRUNCATE articles RESTART IDENTITY CASCADE;')
    db.session.commit()
