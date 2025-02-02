"""Updated password column length to 512

Revision ID: f4ef7bf3ea0e
Revises: e9106c4e921a
Create Date: 2025-02-02 23:38:22.784631

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4ef7bf3ea0e'
down_revision = 'e9106c4e921a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('loan', schema=None) as batch_op:
        # Explicitly drop the foreign key constraints by name
        batch_op.drop_constraint("loan_user_id_fkey", type_='foreignkey')
        batch_op.drop_constraint("loan_book_id_fkey", type_='foreignkey')

        # Recreate the foreign key constraints with the correct names
        batch_op.create_foreign_key("loan_book_id_fkey", 'book', ['book_id'], ['book_id'], ondelete='CASCADE')
        batch_op.create_foreign_key("loan_user_id_fkey", 'user', ['user_id'], ['user_id'], ondelete='CASCADE')

    with op.batch_alter_table('user', schema=None) as batch_op:
        # Alter the password column to increase its length to 512
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=200),
               type_=sa.String(length=512),
               existing_nullable=False,
               table_name='user')

    # ### end Alembic commands ###


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=200),
               type_=sa.String(length=512),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=512),
               type_=sa.VARCHAR(length=200),
               existing_nullable=False)

    # ### end Alembic commands ###