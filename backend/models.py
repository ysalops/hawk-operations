from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Numeric,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.database import Base


class Veiculo(Base):
    __tablename__ = "veiculos"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    placa: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False,
        index=True,
    )

    tipo: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    categoria: Mapped[str] = mapped_column(
        String(50),
        default="Frota fixa",
        nullable=False,
    )

    observacao: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    ativo: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    criado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        nullable=False,
    )

    atualizado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        onupdate=datetime.now,
        nullable=False,
    )

    # HISTÓRICO DE MANUTENÇÕES
    manutencoes: Mapped[list["Manutencao"]] = relationship(
        back_populates="veiculo",
    )

    # HISTÓRICO DE OPERAÇÕES
    operacoes: Mapped[list["Operacao"]] = relationship(
        back_populates="veiculo",
    )


class Motorista(Base):
    __tablename__ = "motoristas"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    nome: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True,
    )

    telefone: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    observacao: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    ativo: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    criado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        nullable=False,
    )

    atualizado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        onupdate=datetime.now,
        nullable=False,
    )

    # HISTÓRICO DE OPERAÇÕES
    operacoes: Mapped[list["Operacao"]] = relationship(
        back_populates="motorista",
    )


class Manutencao(Base):
    __tablename__ = "manutencoes"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    veiculo_id: Mapped[int] = mapped_column(
        ForeignKey("veiculos.id"),
        nullable=False,
        index=True,
    )

    motivo: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    data_entrada: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    previsao_retorno: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    data_retorno: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="EM_MANUTENCAO",
        nullable=False,
        index=True,
    )

    # PREENCHIDOS AO FINALIZAR A MANUTENÇÃO

    servico_realizado: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    condicao_retorno: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    observacao_retorno: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    oficina: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    custo: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True,
    )

    criado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        nullable=False,
    )

    atualizado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        onupdate=datetime.now,
        nullable=False,
    )

    veiculo: Mapped["Veiculo"] = relationship(
        back_populates="manutencoes",
    )


class Operacao(Base):
    __tablename__ = "operacoes"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    data: Mapped[date] = mapped_column(
        Date,
        nullable=False,
        index=True,
    )

    turno: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        index=True,
    )

    veiculo_id: Mapped[int | None] = mapped_column(
        ForeignKey("veiculos.id"),
        nullable=True,
        index=True,
    )

    motorista_id: Mapped[int | None] = mapped_column(
        ForeignKey("motoristas.id"),
        nullable=True,
        index=True,
    )

    rota_id: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    observacao: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    origem: Mapped[str] = mapped_column(
        String(30),
        default="MANUAL",
        nullable=False,
    )

    criado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        nullable=False,
    )

    atualizado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        onupdate=datetime.now,
        nullable=False,
    )

    veiculo: Mapped["Veiculo | None"] = relationship(
        back_populates="operacoes",
    )

    motorista: Mapped["Motorista | None"] = relationship(
        back_populates="operacoes",
    )