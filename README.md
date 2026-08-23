# Ylume Ops V5 — Panorama operacional + Ajudantes

## Alterações
- Cadastro completo de ajudantes: nome, CPF, telefone, observação e status.
- Ajudante opcional vinculado à operação.
- Exclusão de ajudante sem histórico; com histórico, o cadastro deve ser arquivado.
- Mantidas as melhorias V4: CPF/CNH de motoristas, tipo de veículo livre, exclusão/arquivamento.
- Panorama no formato do exemplo operacional enviado.
- Cabeçalho do panorama configurável (Unidade/Base e Operador/MLP).
- Panorama gerado agora é editável antes de copiar.
- Barra de emojis para inserir rapidamente ✅ 🚗 ⏸️ ⚠️ 🛠️ 🚫 📦 🔄.
- Novo indicador de veículos ociosos no panorama.
- Script destrutivo opcional `backend/reset_base_20260718.py` para substituir a base pelos dados recebidos.

## Importante sobre os dados recebidos
O resumo textual informa 58 veículos, mas as linhas fornecidas contêm 49 placas únicas (40 linhas na seção Frota Fixa + 11 linhas de manutenção, com 2 placas repetidas entre as duas seções). Por isso o reset cadastra 49 veículos; nenhum veículo fictício foi inventado.

O resumo informa 6 veículos ociosos, mas as linhas não identificam seis casos de forma inequívoca. O sistema calcula ociosidade a partir dos registros; o texto final pode ser ajustado manualmente no editor do Panorama.

Nenhum ajudante foi nomeado no exemplo fornecido, então a tabela de ajudantes inicia vazia.

## Aplicação local
Substitua os arquivos do pacote no projeto e rode:

```powershell
docker compose down
docker compose up -d --build
```

## Reset da base local
Este comando APAGA os dados operacionais atuais. Faça backup antes.

```powershell
docker compose exec ylume-ops python -m backend.reset_base_20260718 --confirmar
```

Depois recarregue o navegador com `Ctrl + F5`.

Para ver o panorama do exemplo, selecione `18/07/2026` e `Todos os turnos`.
