# Ylume Ops 1.0.0

Sistema web de gestão operacional e de frota com cadastro de veículos, motoristas e ajudantes, manutenção, operação diária, panorama operacional e importação inteligente de dados.

## Recursos da V1

- Dashboard operacional com indicadores e gráficos.
- Frota: cadastro, edição, tipo de veículo livre, ativação, arquivamento e exclusão segura.
- Motoristas: CPF, telefone, CNH, categoria, validade, observações, histórico e arquivamento/exclusão segura.
- Ajudantes: cadastro, CPF, telefone, observações, histórico e arquivamento/exclusão segura.
- Manutenções: abertura, acompanhamento, previsão e conclusão.
- Operação diária: veículo, motorista, ajudante, rota, turno, status e observações.
- Panorama operacional editável, com legenda e atalhos de símbolos.
- Importação inteligente com pré-visualização e revisão antes de gravar.
- Texto operacional: parser local, sem necessidade de IA externa.
- CSV e Excel: leitura estruturada local.
- Imagem/print: análise opcional por IA quando `OPENAI_API_KEY` estiver configurada.
- Consolidação de placas repetidas e sinalização de conflitos/baixa confiança.
- Motivo obrigatório para registros com status `Impedido`.
- Proteção contra sobrescrita acidental de registros manuais.
- PostgreSQL no Docker e SQLite como fallback fora do Docker.
- Login por senha com sessão protegida por HMAC.

## Requisitos

- Docker Desktop + Docker Compose, ou Python 3.14+ para execução sem Docker.
- Para leitura de prints por IA: chave de API configurada no servidor.

## Primeira configuração

Copie o exemplo de ambiente:

### PowerShell

```powershell
Copy-Item .env.example .env
notepad .env
```

Preencha pelo menos:

```env
POSTGRES_PASSWORD=...
YLUME_OPS_ACCESS_PASSWORD=...
YLUME_OPS_SESSION_SECRET=...
```

Para gerar um segredo de sessão no PowerShell:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Nunca publique o `.env` no GitHub.

## Executar localmente

```powershell
docker compose up -d --build
docker compose ps
Start-Process "http://127.0.0.1:8000"
```

Para encerrar:

```powershell
docker compose down
```

O volume do PostgreSQL não é removido pelo `docker compose down` normal.

## IA para imagem/print

A importação de texto, CSV e Excel funciona sem chave de IA. Para ativar a leitura de imagens, configure no `.env`:

```env
OPENAI_API_KEY=...
YLUME_OPS_AI_MODEL=gpt-5.6-luna
```

Depois reconstrua:

```powershell
docker compose up -d --build
```

O sistema nunca grava a análise de IA diretamente: os registros aparecem em uma pré-visualização editável e exigem confirmação humana.

## Produção

Use `docker-compose.prod.yml`. Ele mantém a aplicação exposta apenas em `127.0.0.1:8000` para ser publicada por um proxy HTTPS, como Caddy.

```bash
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml ps
```

A configuração de produção força cookie `Secure=true`, portanto deve ser acessada por HTTPS.

## Backup

PowerShell:

```powershell
.\scripts\backup-postgres.ps1
```

Linux/servidor:

```bash
bash scripts/backup-postgres.sh
```

Os backups são criados na pasta `backups/`, que é ignorada pelo Git.

## Segurança da V1

- Não armazene chaves, senhas ou dumps no repositório.
- Faça backup antes de mudanças de banco ou deploys relevantes.
- A V1 utiliza uma senha de acesso compartilhada. Contas individuais, perfis e trilha de auditoria são evolução recomendada para uma V2, principalmente em ambientes com múltiplos usuários.
- CPF e CNH são dados pessoais; restrinja o acesso e mantenha apenas o necessário para a finalidade operacional.

## Versão

`1.0.0`
