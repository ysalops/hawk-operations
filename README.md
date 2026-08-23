# Ylume Ops — V6.2

Versão de acabamento da Importação Inteligente.

## Novidades

- Filtro **Somente itens para revisar** na pré-visualização.
- Contadores de registros prontos e registros que merecem revisão.
- Registros com status **Impedido** agora exigem motivo antes da confirmação.
- Validação do motivo ocorre tanto no navegador quanto no backend.
- A primeira pendência obrigatória é destacada e recebe foco automaticamente.
- A proteção de registros manuais continua desmarcada por padrão.
- Mantidas as consolidações de placas duplicadas e conflitos de manutenção da V6.1.

## Instalação local

Substitua `backend` e `frontend` pelos arquivos desta versão e rode:

```powershell
cd "C:\Users\Ysa Martinho\Documents\hawk-operations"
docker compose down
docker compose up -d --build
Start-Process "http://127.0.0.1:8000"
```

Faça `Ctrl + F5` no navegador.

## Teste recomendado

Abra Operação > Importar operação, analise o mesmo panorama e teste o botão **Somente itens para revisar**. Para uma linha com status `Impedido`, deixe o campo motivo vazio e tente confirmar: o sistema deve impedir a gravação e destacar a pendência.
