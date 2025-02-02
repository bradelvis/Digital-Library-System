"""Added username back to user model

Revision ID: 0c5fb9cea859
Revises: e2907a101e88
Create Date: 2025-01-28 23:05:53.982698

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c5fb9cea859'
down_revision = 'e2907a101e88'
branch_labels = None
depends_on = None


def upgrade():
    # Add the 'username' column if not already there
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=50), nullable=False))
        batch_op.create_unique_constraint('uq_user_username', ['username'])  # Providing a constraint name

def downgrade():
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint('uq_user_username', type_='unique')  # Drop constraint by name
        batch_op.drop_column('username')