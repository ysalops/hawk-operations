# Ylume Ops — V6.1

Ajuste de segurança e revisão da Importação Inteligente.

## O que mudou

- Placas repetidas no mesmo lote são consolidadas antes da confirmação.
- Se uma placa aparecer na frota e também em manutenção, a manutenção é priorizada e a linha fica destacada como conflito para revisão.
- O exemplo de 18/07/2026 passa de 51 linhas brutas para 49 veículos únicos, mantendo 11 manutenções.
- TBF2D48 e TBF2C96 ficam destacadas porque aparecem como carregando e também em manutenção no texto-fonte.
- O campo Turno ganhou `Geral / não informado`.
- Quando o texto contém uma data, a data lida da fonte é priorizada; a data do formulário é usada como fallback.
- Linhas com baixa confiança ou conflito recebem destaque visual e aviso `Revisar`/`Conferir`.
- `Permitir substituir registros criados manualmente` é sempre desmarcado ao abrir/reiniciar a importação.
- O backend também consolida duplicatas novamente no momento da confirmação, como proteção adicional.

## Arquivos alterados

- `backend/main.py`
- `backend/schemas.py`
- `frontend/index.html`
- `frontend/js/app.js`
- `frontend/css/style.css`

Não há novas dependências nesta versão.

## Como aplicar localmente

Substitua os arquivos correspondentes e execute:

```powershell
cd "C:\Users\Ysa Martinho\Documents\hawk-operations"
docker compose down
docker compose up -d --build
Start-Process "http://127.0.0.1:8000"
```

No navegador, use `Ctrl + F5`.

## Teste recomendado

1. Operação → Importar operação → Colar texto.
2. Cole o panorama de 18/07/2026.
3. Use `Geral / não informado`.
4. Clique em `Analisar dados`.
5. O esperado é `49 veículos identificados`, `11 manutenção(ões)` e 2 conflitos destacados (TBF2D48 e TBF2C96).
6. Revise as linhas de baixa confiança antes de confirmar.
7. Mantenha desmarcada a opção de sobrescrever registros manuais, salvo quando houver intenção explícita de substituir esses dados.
