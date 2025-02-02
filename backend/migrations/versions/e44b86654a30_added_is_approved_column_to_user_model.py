"""Added is_approved column to User model

Revision ID: e44b86654a30
Revises: 0c5fb9cea859
Create Date: 2025-01-29 09:34:31.914198

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e44b86654a30'
down_revision = '0c5fb9cea859'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_approved', sa.Boolean(), nullable=True))
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.String(length=120),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.String(length=120),
               type_=sa.VARCHAR(length=50),
               existing_nullable=False)
        batch_op.drop_column('is_approved')

    # ### end Alembic commands ###
