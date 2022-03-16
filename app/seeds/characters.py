from app.models import db, Character


# Adds a demo user, you can add other users here if you want
def seed_characters():
    grog = Character(
        type='5e', 
        name='Grog', 
        class_name='Warrior', 
        level=4, 
        background='Gladiator', 
        race='Human', 
        alignment='Chaotic Neutral',
        experience=25,
        strength=18,
        dexterity=14,
        constitution=16,
        intelligence=8,
        wisdom=8,
        charisma=9,
        armor_class=25,
        speed=30,
        max_hp=55,
        current_hp=55,
        temporary_hp=0,
        hit_dice_total=6,
        hit_dice=6,
        weapons='[{"name":"Greataxe","attack":"+8","damage":"1d12"}]',
        equipment='[{"name":"Mead Barrel","quantity":2,"weight":64,"description":"Grog likes to stay hydrated."},{"name":"Bag of Holding","quantity":1,"weight":30,"description":"Holds all kinds of things!"}]',
        gold_pieces=1,
        silver_pieces=12,
        copper_pieces=13,
        features='[{"name":"Really Big","description":"He can smash big things and do lots of damage. Weighs over 700 lbs, all muscle"},{"name":"Mountain Born","description":"Goliath ability"}]',
        biography=
"""
Grog Strongjaw is a goliath barbarian/fighter and a member of Vox Machina. He is played by Travis Willingham.

When he was young, Grog was exiled from the Herd of Storms by it's leader, Grog's uncle Kevdak, for taking pity on a helpless old gnome that the tribe was attacking. He was then taken in by that same gnome, Wilhand Trickfoot, and raised alongside his great-great-granddaughter Pike.

During his adventures with Vox Machina, he became the wielder of the legendary Titanstone Knuckles, acquired by taking down his uncle, to fight against the Chroma Conclave. He forged the Prime Trammels and was the wielder of the Sword of Kas in the fight against Vecna.
""",
        campaign_id=1,
        user_id=1
        )

    db.session.add(grog)

    db.session.commit()

def undo_characters():
    db.session.execute('TRUNCATE characters RESTART IDENTITY CASCADE;')
    db.session.commit()
