import os
from pathlib import Path

from sqlalchemy import URL, create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE_PATH = BASE_DIR / "database" / "ylume_ops.db"
DEFAULT_DATABASE_URL = f"sqlite:///{DATABASE_PATH.as_posix()}"


def resolver_database_url():
    """Resolve a conexão preservando compatibilidade com DATABASE_URL.

    Quando POSTGRES_* está disponível, URL.create evita problemas com senhas
    que contenham caracteres especiais como @, :, / ou #.
    """

    database_url = os.getenv("DATABASE_URL", "").strip()
    if database_url:
        return database_url

    postgres_host = os.getenv("POSTGRES_HOST", "").strip()
    postgres_db = os.getenv("POSTGRES_DB", "").strip()
    postgres_user = os.getenv("POSTGRES_USER", "").strip()
    postgres_password = os.getenv("POSTGRES_PASSWORD", "")
    postgres_port = os.getenv("POSTGRES_PORT", "5432").strip() or "5432"

    if postgres_host and postgres_db and postgres_user:
        return URL.create(
            drivername="postgresql+psycopg",
            username=postgres_user,
            password=postgres_password,
            host=postgres_host,
            port=int(postgres_port),
            database=postgres_db,
        )

    return DEFAULT_DATABASE_URL


DATABASE_URL = resolver_database_url()

engine_options = {
    "pool_pre_ping": True,
}

if isinstance(DATABASE_URL, str) and DATABASE_URL.startswith("sqlite"):
    engine_options["connect_args"] = {
        "check_same_thread": False,
    }

engine = create_engine(
    DATABASE_URL,
    **engine_options,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
