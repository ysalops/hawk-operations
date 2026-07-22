from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


# Caminho da raiz do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# Banco ficará dentro da pasta /database
DATABASE_PATH = BASE_DIR / "database" / "hawk_operations.db"

DATABASE_URL = f"sqlite:///{DATABASE_PATH.as_posix()}"


# Conexão com SQLite
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)


# Sessões utilizadas para consultar e alterar o banco
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


# Classe base dos nossos modelos
class Base(DeclarativeBase):
    pass


# Dependência para abrir e fechar a conexão automaticamente
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()