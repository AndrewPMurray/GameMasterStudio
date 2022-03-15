from app.models import db, Campaign


def seed_campaigns():
    vox_machina = Campaign(
        title='Vox Machina', 
        description=
"""
The team, originally comprised of Grog Strongjaw, Tiberius Stormwind, Scanlan Shorthalt, Keyleth, Vax'ildan and Vex'ahlia, met in the swamp town of Stilben as a ragtag group of mercenaries in search of work. They found a job board posting from Fendril Vas, the elven head of a small merchant empire, who hired the group to investigate a new competition in town known as the Myriad. Their mission lead them to a chamber containing a planar rift that pulled the group into the plane of the undead fetal-formed deity Crysa-Thul, who revealed that their contract with the elven merchant was merely a ruse to lure here so the god could feed on them. The party fought back, destroying the creature, and returned to Stilben and to kill Vas in revenge.
""", 
        owner_id=1)

    db.session.add(vox_machina)

    db.session.commit()


def undo_campaigns():
    db.session.execute('TRUNCATE campaigns RESTART IDENTITY CASCADE;')
    db.session.commit()
