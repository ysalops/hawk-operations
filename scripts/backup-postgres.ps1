$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$backupDir = Join-Path $root "backups"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$arquivo = Join-Path $backupDir "ylume-ops-$stamp.sql"

Write-Host "Criando backup em $arquivo..."
docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | Out-File -FilePath $arquivo -Encoding utf8

if (-not (Test-Path $arquivo) -or (Get-Item $arquivo).Length -eq 0) {
    throw "O backup não foi criado corretamente."
}

Write-Host "Backup concluído: $arquivo"
