# Site para Massagista Profissional

Site institucional de página única (one-page), responsivo, feito em **HTML5, CSS3 e
JavaScript puro** (sem frameworks e sem dependências pagas), pronto para ser editado no
Visual Studio Code.

---

## 🌳 Árvore de pastas

```
/projeto-massagista
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── /img
│   ├── logo.png
│   ├── foto-profissional.jpg
│   ├── massagem-relaxante.jpg
│   ├── massagem-terapeutica.jpg
│   ├── massagem-modeladora.jpg
│   ├── massagem-pedras-quentes.jpg
│   └── galeria-01.jpg
│
└── /pages
    ├── politica-de-privacidade.html
    └── termos-de-uso.html
```

> **Sobre as imagens:** como não é possível gerar fotos reais automaticamente, o
> `index.html` já vem com imagens demonstrativas do **Unsplash** (carregadas por link,
> sem necessidade de download) em todos os lugares onde uma foto é exibida. Cada uma
> delas está comentada no código com a instrução `<!-- Substitua por... -->` indicando
> exatamente onde trocar pela imagem real. A pasta `/img` já está criada para receber os
> arquivos finais quando você tiver as fotos reais.

---

## 📁 Os 6 arquivos do projeto

1. `index.html` — estrutura e conteúdo da página única.
2. `style.css` — todo o visual do site (cores, tipografia, layout responsivo).
3. `script.js` — menu mobile, FAQ, galeria, formulário, WhatsApp, animações etc.
4. `pages/politica-de-privacidade.html` — página exigida pela LGPD.
5. `pages/termos-de-uso.html` — termos de uso dos serviços.
6. `README.md` — este guia.

Todos os arquivos já foram gerados na estrutura de pastas acima.

---

## 🧰 Passo a passo completo

### 1. Como instalar o Visual Studio Code

1. Acesse **https://code.visualstudio.com**.
2. Baixe a versão para o seu sistema operacional (Windows, macOS ou Linux).
3. Execute o instalador e siga as instruções na tela, mantendo as opções padrão.
4. Abra o Visual Studio Code após a instalação para confirmar que funcionou.

### 2. Como criar a pasta do projeto

1. Crie, em qualquer lugar do computador, uma pasta chamada `projeto-massagista`.
2. Dentro dela, crie as subpastas `img` e `pages`.
3. No Visual Studio Code, vá em **Arquivo → Abrir Pasta...** e selecione a pasta
   `projeto-massagista`.

### 3. Como criar cada arquivo

Dentro do Visual Studio Code, no painel lateral (Explorer):

1. Clique com o botão direito na pasta `projeto-massagista` e escolha **Novo Arquivo**
   para criar `index.html`, `style.css`, `script.js` e `README.md`.
2. Clique com o botão direito na subpasta `pages` e crie `politica-de-privacidade.html`
   e `termos-de-uso.html`.
3. Copie e cole o conteúdo de cada arquivo entregue neste guia no arquivo correspondente,
   salvando com **Ctrl+S** (Windows/Linux) ou **Cmd+S** (macOS).

### 4. Onde inserir as imagens

1. Coloque os arquivos de imagem reais dentro da pasta `img`, usando os nomes já
   previstos na estrutura (`logo.png`, `foto-profissional.jpg` etc.) ou nomes de sua
   preferência.
2. No `index.html`, localize cada tag `<img>` que contém um comentário
   `<!-- Substitua por... -->` logo acima dela.
3. Troque o valor do atributo `src` do link do Unsplash pelo caminho local da imagem,
   por exemplo:
   ```html
   <!-- Antes -->
   <img src="https://images.unsplash.com/..." alt="...">

   <!-- Depois -->
   <img src="img/foto-profissional.jpg" alt="...">
   ```
4. Mantenha sempre o atributo `alt` preenchido com uma descrição da imagem — isso é
   importante para acessibilidade e SEO.

### 5. Onde alterar nome, telefone, endereço e redes sociais

Todos os campos editáveis aparecem entre colchetes, como `[NOME DA MASSAGISTA]`. Use o
**Localizar e Substituir** do VS Code (`Ctrl+H` ou `Cmd+H`) para trocar cada campo em
todos os arquivos de uma vez. Os principais campos são:

| Campo | Onde aparece |
|---|---|
| `[NOME DA MASSAGISTA]` | `index.html`, páginas legais |
| `[NOME DO ESPAÇO]` | `index.html`, páginas legais |
| `[CIDADE E BAIRRO]` | `index.html` |
| `[NÚMERO DO WHATSAPP]` | `index.html` (texto visível) |
| `[LINK DO INSTAGRAM]` | `index.html` |
| `[E-MAIL]` | `index.html`, páginas legais |
| `[E-MAIL DE PRIVACIDADE]` | `pages/politica-de-privacidade.html` |
| `[DIAS E HORÁRIOS]` | `index.html` |
| `[ENDEREÇO OU REGIÃO DE ATENDIMENTO]` | `index.html` |
| `[QUANTIDADE DE ANOS]` | `index.html` |

**Importante — número do WhatsApp real:** além do texto visível, é necessário configurar
o número que o site realmente usa para abrir o WhatsApp. Abra o arquivo `script.js` e
edite a constante no topo do arquivo:

```js
const CONFIGURACAO = {
  numeroWhatsApp: "5500000000000", // troque pelo número real, só números, com DDI e DDD
  mensagemPadraoWhatsApp: "Olá! Gostaria de saber mais sobre os atendimentos de massagem.",
};
```

Use o formato: código do país (Brasil = `55`) + DDD + número, sem espaços, traços ou
parênteses. Exemplo: `5511999998888`.

Para trocar o mapa da seção de contato, abra `index.html`, localize o `<iframe>` da
seção "Localização e contato" e substitua a URL por uma gerada em
**maps.google.com → Compartilhar → Incorporar um mapa**, usando o endereço real.

### 6. Onde alterar os preços

Os preços e durações estão nos cards da seção "Massagens", no `index.html`. Procure por
trechos como:

```html
<li><i class="fa-regular fa-clock"></i> Duração: [50 minutos]</li>
<li><i class="fa-solid fa-tag"></i> Valor: consultar valores</li>
```

Edite o texto entre colchetes ou substitua "consultar valores" por um preço fixo, se a
profissional preferir divulgar valores no site.

### 7. Como abrir o projeto no navegador

A forma mais simples: clique duas vezes no arquivo `index.html` — ele abrirá diretamente
no navegador padrão do computador. Para uma experiência mais próxima da de um site
publicado (com recarregamento automático), use o Live Server, explicado a seguir.

### 8. Como instalar e usar a extensão Live Server

1. No Visual Studio Code, clique no ícone de **Extensões** na barra lateral (ícone de
   quadrados).
2. Pesquise por **"Live Server"** (autor: Ritwick Dey) e clique em **Instalar**.
3. Depois de instalada, clique com o botão direito no arquivo `index.html` e escolha
   **"Open with Live Server"**.
4. O site abrirá automaticamente no navegador, em um endereço como
   `http://127.0.0.1:5500`, e será atualizado sozinho a cada alteração salva.

### 9. Como testar o formulário

1. Com o site aberto (preferencialmente via Live Server), role até a seção
   "Agendamento".
2. Tente enviar o formulário vazio: mensagens de erro devem aparecer em cada campo
   obrigatório.
3. Preencha todos os campos corretamente, marque a caixa de consentimento e envie.
4. Uma nova aba do WhatsApp Web (ou o aplicativo, no celular) deve abrir com a mensagem
   já preenchida automaticamente, pronta para ser enviada ao número configurado.
5. Repita o teste em um celular real para confirmar que o WhatsApp abre corretamente.

### 10. Como publicar o site gratuitamente ou em uma hospedagem

**Opção gratuita — GitHub Pages:**
1. Crie uma conta em **https://github.com**, caso ainda não tenha.
2. Crie um novo repositório e envie todos os arquivos do projeto para ele.
3. Vá em **Settings → Pages**, selecione a branch principal e salve.
4. O GitHub fornecerá um endereço público no formato
   `https://seu-usuario.github.io/nome-do-repositorio`.

**Outras opções gratuitas:** Netlify e Vercel também permitem publicar sites estáticos
como este arrastando a pasta do projeto diretamente no painel do serviço.

**Hospedagem paga tradicional:** qualquer hospedagem que ofereça hospedagem de arquivos
estáticos (HTML/CSS/JS) funciona — basta enviar os arquivos via FTP ou pelo painel de
controle (cPanel, por exemplo).

### 11. Como conectar um domínio próprio

1. Registre um domínio em um serviço de sua preferência (Registro.br, para domínios
   `.com.br`, ou outros registradores internacionais).
2. No painel do serviço de hospedagem escolhido (GitHub Pages, Netlify, Vercel ou
   hospedagem tradicional), procure a opção **"Domínio personalizado" / "Custom Domain"**.
3. Siga as instruções do serviço para apontar os registros DNS (geralmente do tipo `A`
   ou `CNAME`) para o endereço fornecido por ele.
4. Aguarde a propagação do DNS, que pode levar de alguns minutos a até 48 horas.

### 12. Como melhorar o site futuramente

- Substituir todas as imagens de demonstração por fotos reais e autorizadas.
- Substituir os depoimentos de exemplo por avaliações reais das clientes, com
  autorização explícita para publicação.
- Adicionar um sistema de agendamento com backend (ex.: formulário conectado a um banco
  de dados ou a uma ferramenta como Google Agenda) caso o volume de agendamentos cresça.
- Criar uma versão em outro idioma, se houver atendimento a turistas ou clientes
  estrangeiros.
- Acompanhar métricas de acesso com uma ferramenta de analytics respeitando a LGPD
  (com aviso de cookies, se aplicável).
- Revisar periodicamente a Política de Privacidade e os Termos de Uso com apoio jurídico.

---

## 🔒 Segurança e informações técnicas importantes

- **Verificação de links quebrados:** depois de trocar as imagens e os links (Instagram,
  mapa etc.), clique em cada botão e link do site para confirmar que todos abrem
  corretamente. Ferramentas gratuitas como o "W3C Link Checker" também podem ajudar em
  sites já publicados.
- **HTTPS:** ao publicar o site (GitHub Pages, Netlify e Vercel já entregam HTTPS
  automaticamente), confirme que o endereço final começa com `https://` e não apenas
  `http://`. Em hospedagens tradicionais, ative o certificado SSL gratuito (Let's
  Encrypt) pelo painel de controle.
- **Sobre o formulário:** o formulário de agendamento é feito apenas com HTML, CSS e
  JavaScript, **sem backend e sem banco de dados**. Ele não armazena nem envia dados a
  nenhum servidor — apenas monta uma mensagem e abre o WhatsApp. Se, no futuro, for
  necessário registrar os agendamentos automaticamente (em uma planilha, banco de dados
  ou sistema de agenda), será preciso desenvolver um backend ou contratar um serviço
  externo seguro e compatível com a LGPD.
- **Teste em celular:** use o Live Server e acesse o endereço exibido (algo como
  `http://192.168.0.X:5500`) a partir do navegador do celular, estando ambos conectados
  à mesma rede Wi-Fi, para testar a versão mobile antes da publicação.

---

## ⚠️ Avisos importantes sobre o conteúdo

- Este site **não faz promessas médicas**. Nenhuma massagem é apresentada como cura ou
  tratamento garantido.
- Os depoimentos incluídos são **exemplos editáveis** e devem ser substituídos por
  avaliações reais e autorizadas antes da publicação.
- Nenhuma certificação, registro, preço ou resultado foi inventado: onde a informação
  não foi fornecida, o código contém o texto "preencher esta informação" ou um campo
  entre colchetes.
- As páginas de Política de Privacidade e Termos de Uso são **modelos educativos** e
  devem passar por revisão de um(a) profissional jurídico(a) antes da publicação
  definitiva do site.