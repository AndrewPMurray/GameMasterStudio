"""empty message

Revision ID: 8987231a03f2
Revises: 
Create Date: 2022-03-16 21:47:37.087967

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '8987231a03f2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_pic_url', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('campaigns',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('game_master_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['game_master_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('campaign_users',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('campaign_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'campaign_id')
    )
    op.create_table('characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('class_name', sa.String(length=50), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('background', sa.String(length=50), nullable=False),
    sa.Column('race', sa.String(length=50), nullable=False),
    sa.Column('alignment', sa.String(length=50), nullable=False),
    sa.Column('experience', sa.Integer(), nullable=False),
    sa.Column('strength', sa.Integer(), nullable=False),
    sa.Column('dexterity', sa.Integer(), nullable=False),
    sa.Column('constitution', sa.Integer(), nullable=False),
    sa.Column('intelligence', sa.Integer(), nullable=False),
    sa.Column('wisdom', sa.Integer(), nullable=False),
    sa.Column('charisma', sa.Integer(), nullable=False),
    sa.Column('armor_class', sa.Integer(), nullable=False),
    sa.Column('speed', sa.Integer(), nullable=False),
    sa.Column('max_hp', sa.Integer(), nullable=False),
    sa.Column('current_hp', sa.Integer(), nullable=False),
    sa.Column('temporary_hp', sa.Integer(), nullable=False),
    sa.Column('hit_dice_total', sa.Integer(), nullable=False),
    sa.Column('hit_dice', sa.Integer(), nullable=False),
    sa.Column('weapons', sa.Text(), nullable=True),
    sa.Column('equipment', sa.Text(), nullable=True),
    sa.Column('gold_pieces', sa.Integer(), nullable=False),
    sa.Column('silver_pieces', sa.Integer(), nullable=False),
    sa.Column('copper_pieces', sa.Integer(), nullable=False),
    sa.Column('features', sa.Text(), nullable=True),
    sa.Column('biography', sa.Text(), nullable=True),
    sa.Column('campaign_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sections',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('campaign_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('articles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('content', sa.Text(), nullable=True),
    sa.Column('photo_url', sa.String(length=500), nullable=True),
    sa.Column('section_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['section_id'], ['sections.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE campaign_users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE campaigns SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE characters SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE sections SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE articles SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('articles')
    op.drop_table('sections')
    op.drop_table('characters')
    op.drop_table('campaign_users')
    op.drop_table('campaigns')
    op.drop_table('users')
    # ### end Alembic commands ###
