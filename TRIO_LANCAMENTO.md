# Trio AMEVURI: lista de interesse

## Página e operação

- Página: `/trio-presenteavel`. Cadastro gratuito e independente do Privé.
- Nome e WhatsApp com DDD, dois aceites explícitos, limitação de tentativas e campo antirrobô.
- Dados persistidos no Durable Object `AMEVURI_STORE` já existente. Não precisa criar banco ou informar credenciais novas.
- Registros identificados por hash do telefone; o telefone original fica disponível apenas no painel administrativo. Duplicatas com ou sem +55 não geram outro contato e não sobrescrevem o primeiro cadastro.
- O limite de 20 é do primeiro lote comercial. A lista aceita mais pessoas e não reserva estoque.
- Endpoint público: `POST /api/trio-interest`. Não faz pagamentos, reservas, inscrições no Privé ou disparos de mensagens.
- Painel: `/admin-trio`, protegido pela chave `AMEVURI_SETUP_KEY` já usada na administração. Ela é mantida somente na memória da aba, nunca em armazenamento local.
- Consultar e exportar CSV com origem da campanha e registro do consentimento. Remoção de contatos pelo painel para pedidos de saída. Não publicar a chave nem o CSV.

## Condições comerciais confirmadas

- Caixa cartonada com ímã e trio: R$ 119,99. Primeiro lote: 20 kits.
- Trio: 3 velas de 50 g cada, em copos de 70 ml com tampa de bambu; 150 g de vela no conjunto. Capacidade do recipiente em ml não equivale ao peso de vela em g.
- Vendas em 07/11/2026, sábado. Nenhum horário de abertura foi definido.
- Postagens de segunda a sexta, após pagamento, a partir de 09/11/2026 para os pedidos da abertura.
- A página não ativa vendas automaticamente. Antes da abertura, preparar o produto/estoque e a transição comercial. O trio não foi incluído no checkout nem no Merchant Center enquanto está só em cadastro de interesse.
- O link de compra deve ser comunicado à lista antes da divulgação pública, conforme a promessa da página. O aviso pelo WhatsApp será realizado pela equipe; não há integração de envio automático neste escopo.
- Não prometer ausência de novos lotes. Cada nova disponibilidade deve ter suas próprias condições e prazo.
- Confirmar 20 kits prontos antes de anunciar pronta entrega. O relato anterior era de 10 kits prontos.

## Links de campanha

- Instagram: `https://amevuri.com.br/trio-presenteavel?utm_source=instagram&utm_medium=social&utm_campaign=trio_novembro_2026`
- TikTok: `https://amevuri.com.br/trio-presenteavel?utm_source=tiktok&utm_medium=social&utm_campaign=trio_novembro_2026`
- WhatsApp: `https://amevuri.com.br/trio-presenteavel?utm_source=whatsapp&utm_medium=mensagem&utm_campaign=trio_novembro_2026`
- Use `utm_content` para distinguir peças. Os parâmetros permitidos são limitados a 100 caracteres; não colocar nomes/telefones nas URLs.

## Verificação e publicação

1. Executar `npm run check` e `npm test`. Testes simulam armazenamento/provedores e não enviam mensagens.
2. Revisar `/trio-presenteavel` e o destaque inicial no celular e computador.
3. Integrar a alteração após aprovação da prévia. A publicação continua no GitHub/Cloudflare existente, sem Sites paralelo.
4. Após implantação, confirmar o formulário com um contato autorizado da equipe e conferir o registro em `/admin-trio`. Não usar dados fictícios em produção.
5. Divulgar a lista somente depois dessa confirmação. O teste local não confirma configuração de produção.

## Apresentações distintas, confirmadas em 17/10/2026

- R$ 69,99: vela de 130 g, copo tipo whisky de 265 ml. O preço atual da vitrine corresponde a essa apresentação e foi preservado.
- R$ 39,99: vela de 100 g, copo tipo patê de 156 ml. É uma apresentação de entrada distinta, não uma correção do preço de 130 g.
- R$ 119,99: trio com 3 velas de 50 g, copos de 70 ml com tampa de bambu e caixa premium com ímã.
- Não comparar o trio de 50 g por vela ao preço de três velas de 100 g ou 130 g como se fossem produtos iguais.
