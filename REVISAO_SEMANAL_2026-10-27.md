# Revisão semanal AMEVURI — 27/10/2026

Base examinada: main, commit 507c149. Fonte editorial: anexo Texto colado(6).txt, revisão de 19–26/10/2026.

## Correções propostas

- Notas de Cumaru & Sândalo corrigidas na coleção, página de seleção de formatos, seis páginas individuais (incluindo 100 g) e collections-data.js: saída Cumaru, Musk, Madeira de Cashmere; coração Sândalo, Baunilha; fundo Madeira Seca, Cedro.
- Removidas da exibição da pirâmide as três imagens associadas à composição anterior. A imagem de saída inspecionada representa bergamota, pimenta rosa e cardamomo. Arquivos originais preservados; sem inventar imagens substitutas.
- Coleções Cumaru e Sakura recebem card de 100 g com foto existente, pote patê, tampa de madeira, caixa premium, R$ 29,99 e link para a página individual. As páginas de seleção de formatos também recebem acesso direto à oferta. O seletor dos cinco formatos regulares permanece dedicado a esses produtos.
- Teste de 100 g existente incorporado ao npm test; nova regressão verifica notas aprovadas, links das coleções, SKU, sitemap e correspondência de preço JSON-LD/catálogo.

## Verificações e limites

- npm run check: passou, 191 arquivos públicos e 1.614 referências.
- npm test: passou com Node 24.22.1 (requisito do projeto >=22) e shell cmd.exe para suportar && no Windows. 40 testes principais; 15 formatos regulares; 256 combinações do quiz; testes de 100 g, revisão semanal, Merchant feed, frete regional e Trio aprovados.
- Checkout simulado: duas unidades custam R$ 59,98; quatro R$ 119,96; cinco são recusadas pela alocação inicial simulada. Nenhuma compra real executada.
- Catálogo, comércio e JSON-LD mantêm R$ 29,99 nas duas velas de 100 g. Vela regular 130 g permanece a R$ 69,99. Identificadores legados 120/60 são preservados por compatibilidade; tamanhos comerciais são 130/80 g.
- URLs individuais, canônicas, metadados sociais, imagens, SKUs e sitemap existem; validação estrutural passou. Feed usa preço do catálogo e disponibilidade do estoque recebido; não presume aprovação no Merchant Center.
- initialStock: 4 nas duas velas de 100 g foi preservado. src/store.js combina valores iniciais com estoque persistido, que prevalece. Este valor não comprova saldo atual, estoque físico ou alocação por canal.
- R$ 49,99 como preço anterior foi preservado, mas sua prática histórica ainda precisa ser confirmada pela responsável. Caso não seja comprovado, retirar preço riscado e originalPrice em alteração posterior aprovada.
- Busca no código público e servidor não identificou tags diretas de Meta Pixel/GA4. Trio já captura utm_source, utm_medium, utm_campaign e utm_content. Isso não comprova mensuração de produto, sacola, checkout, compra paga ou WhatsApp. Não foram inventados IDs nem ativados serviços.
- Acesso às quatro páginas públicas falhou no leitor web e na conexão HTTPS local. Versão implantada, navegação/renderização no site público e eventual injeção externa de tags continuam sem verificação.
- Nenhum deploy, merge, alteração de estoque em produção, criação de pedido real, envio de email ou publicação de campanha.

## Pendências antes de ampliar tráfego

1. Confirmar alocação das quatro unidades e reconciliar estoque físico, persistido e outros canais sem substituir saldos automaticamente.
2. Comprovar preço anterior R$ 49,99 ou autorizar sua retirada.
3. Após revisão e autorização de publicação, conferir visualmente coleções e páginas no celular, navegação à sacola, preço, disponibilidade e cotação real.
4. Compra controlada, confirmação do pedido, pagamento, recebimento de email e saldo pós-compra somente com autorização específica.
5. Confirmar contas/IDs e configuração de mensuração, consentimento aplicável e eventos de compra baseados em pagamento confirmado; verificar Merchant Center e indexação nas respectivas contas.
