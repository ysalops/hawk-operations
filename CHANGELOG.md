# Changelog

## 1.0.0 — 2026-08-23

Primeira versão fechada do Ylume Ops.

### Identidade e interface
- Identidade visual Ylume Ops.
- Layout claro com linguagem visual consistente e responsiva.
- Mensagens, confirmações e estados visuais próprios da aplicação.
- Remoção de automações e integrações legadas que não fazem parte do produto.

### Cadastros
- Veículos com tipo livre.
- Motoristas com CPF, CNH, categoria e validade.
- Ajudantes com cadastro próprio e vínculo opcional à operação.
- Exclusão definitiva apenas quando não existe histórico; caso contrário, arquivamento.

### Operação e panorama
- Operação diária com veículo, motorista, ajudante, rota, turno e status.
- Panorama editável com legenda operacional e atalhos de símbolos.
- Indicadores de frota, manutenção e ociosidade.

### Importação inteligente
- Texto, CSV e Excel com leitura local.
- Imagem/print com IA opcional.
- Pré-visualização editável antes de qualquer gravação.
- Consolidação de duplicidades, conflitos e níveis de confiança.
- Filtro de itens que exigem revisão.
- Motivo obrigatório para status Impedido.
- Proteção de registros manuais.

### Infraestrutura
- Docker e PostgreSQL.
- Compose local e produção.
- Configuração por variáveis de ambiente.
- Scripts de backup.
