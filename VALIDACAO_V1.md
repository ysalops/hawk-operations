# Validação técnica — Ylume Ops 1.0.0

Validações executadas antes do empacotamento:

- `python -m py_compile` em todos os módulos Python.
- `node --check` no JavaScript principal.
- Smoke test da API com SQLite temporário:
  - `/health` = 200;
  - redirecionamento de usuário não autenticado;
  - login = 200;
  - carregamento da aplicação autenticada = 200;
  - status da importação inteligente = 200;
  - análise local de texto = 200.
- CRUD básico validado para:
  - veículo com tipo manual;
  - motorista com CPF/CNH;
  - ajudante;
  - exclusão de cadastros sem histórico.
- Busca por referências legadas no pacote final: nenhuma ocorrência.
- Nenhum `.env`, banco, dump, perfil de navegador, log ou credencial incluído no ZIP.

A leitura de imagens via API externa não é executada no smoke test porque depende de uma chave privada do ambiente onde o sistema será instalado.
