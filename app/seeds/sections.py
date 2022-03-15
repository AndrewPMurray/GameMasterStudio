from app.models import db, Section


# Adds a demo user, you can add other users here if you want
def seed_sections():
    characters = Section(
        title='Characters', campaign_id=1)

    db.session.add(characters)

    db.session.commit()


def undo_sections():
    db.session.execute('TRUNCATE sections RESTART IDENTITY CASCADE;')
    db.session.commit()
