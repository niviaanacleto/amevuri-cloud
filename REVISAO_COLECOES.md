# Revisão AMEVURI — coleções e produtos

## Resultado
As coleções Cumaru & Sândalo, Árvore de Sakura & Musk e Rosa Búlgara & Açafrão compartilham estrutura, navegação, galeria e seleção de formato. Cada coleção apresenta os cinco produtos; cada página de produto permite escolher e adicionar à sacola o formato correspondente.

## Correções
- Criadas/padronizadas as seis páginas solicitadas: cumaru-sandalo.html, produto-cumaru.html, sakura-musk.html, produto-sakura.html, rosa-acafrao.html e produto-rosa.html.
- Estilos e seleção centralizados em collections.css, collections-data.js e collections.js, preservando cores, nomes e notas de cada aroma.
- Caminhos das imagens correspondem a arquivos incluídos em public/assets. Imagens proporcionais, sem recortes; Home Parfum Cumaru usa a fotografia correta.
- colecao.html apresenta os 15 produtos com compra e link para o formato escolhido.
- Catálogo da sacola e catálogo do servidor sincronizados. Difusores e Rosa incluídos no estoque, cálculo de frete e checkout.
- URLs antigas produto-cumaru-sandalo e produto-sakura-musk encaminham às páginas novas preservando parâmetros. Links internos e sitemap atualizados.
- Identificadores antigos de produtos preservados para compatibilidade com pedidos e sacolas existentes.
- Testes atualizados para três aromas e adicionada verificação dos 15 formatos.

## Dados confirmados
| Formato | Preço | Estoque inicial por aroma | Peso para frete | Altura × largura × comprimento |
|---|---:|---:|---:|---|
| Vela 130 g | R$ 69,99 | 10 | 330 g | 10 × 10 × 10 cm |
| Home Parfum 250 ml | R$ 39,99 | 10 | 300 g | 5 × 8 × 21,5 cm |
| Wax Melts 80 g | R$ 39,99 | 10 | 100 g | 5 × 10 × 10 cm |
| Miniatura 20 g | R$ 8,99 | 10 | 40 g | 2 × 6 × 6 cm |
| Difusor 100 ml | R$ 49,99 | 10 | 300 g | 10 × 6 × 6 cm |

Dados dos formatos Rosa seguem os equivalentes existentes, conforme confirmação. Os dados de envio do difusor foram informados SEM VARETAS; não foi acrescentado peso ou comprimento presumido. O estoque inicial é usado para SKUs novos: a rotina existente preserva saldos já registrados, inclusive produtos esgotados.

## Verificação realizada
- Auditoria automática: 116 arquivos públicos e 740 referências; JavaScript e configuração Cloudflare válidos.
- Suíte existente: 35/35 testes aprovados.
- Verificação adicional: seis páginas, 15 imagens de formatos, preços e compatibilidade de URLs.
- Checkout simulado aprovado para cada um dos 15 formatos, usando os serviços simulados do próprio projeto.
- Navegador local: difusor Sakura por R$ 49,99 adicionado à sacola; Home Parfum Cumaru com imagem correta; seleção do difusor Rosa; coleções e disposição em telas de computador e celular.
- Pagamento real, contratação de frete e publicação não foram executados. A validação local não substitui o funcionamento das credenciais e serviços na hospedagem.

## Como aplicar
O ZIP contém a pasta amevuri-cloud-main com o projeto completo. Copie seu conteúdo para a raiz do repositório, mantendo public, src e scripts nos locais correspondentes. As imagens devem permanecer dentro de public/assets; não mova todas para a raiz de assets. É necessário atualizar também src/lib/catalog.js e public/commerce.js, não apenas os HTMLs. Preserve os segredos e configurações de ambiente já existentes na Cloudflare. Nenhuma publicação foi feita nesta revisão.

## Arquivos diferentes do ZIP recebido
- package.json
- public/404.html
- public/admin-pedidos.html
- public/admin-prive.html
- public/admin-prive.js
- public/assets/aromas/rosa-bulgara-acafrao/DifusorRosa.png
- public/assets/aromas/rosa-bulgara-acafrao/corpo-atmosfera.png
- public/assets/aromas/rosa-bulgara-acafrao/corpo-notas.webp
- public/assets/aromas/rosa-bulgara-acafrao/fundo-atmosfera.png
- public/assets/aromas/rosa-bulgara-acafrao/fundo-notas.webp
- public/assets/aromas/rosa-bulgara-acafrao/homeParfumRosa.png
- public/assets/aromas/rosa-bulgara-acafrao/latinha20g.png
- public/assets/aromas/rosa-bulgara-acafrao/saida-atmosfera.png
- public/assets/aromas/rosa-bulgara-acafrao/saida-notas.webp
- public/assets/aromas/rosa-bulgara-acafrao/velaCxRosa.png
- public/assets/aromas/rosa-bulgara-acafrao/waxMeltsRosa.png
- public/colecao.html
- public/collections-data.js
- public/collections.css
- public/collections.js
- public/commerce.js
- public/cumaru-sandalo.html
- public/diagnostico.html
- public/encontre-seu-aroma.html
- public/index.html
- public/journal.html
- public/melhor-envio-conectar.html
- public/pedido-recebido.html
- public/prive-account.js
- public/prive.html
- public/prive.js
- public/produto-cumaru-sandalo.html
- public/produto-cumaru.html
- public/produto-rosa.html
- public/produto-sakura-musk.html
- public/produto-sakura.html
- public/rosa-acafrao.html
- public/sakura-musk.html
- public/script.js
- public/sitemap.xml
- scripts/test-collections.mjs
- scripts/test.mjs
- src/lib/catalog.js
