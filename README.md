# Mansões Lunares (site instalável)

Pasta pronta para colocar no ar. Quando estiver em um endereço https, o Chrome do celular
deixa instalar como app e pedir permissão para a notificação fixa da mansão atual.

## 1. Colocar no ar (grátis)

Netlify: crie uma conta em netlify.com, abra "Add new site" > "Deploy manually" e arraste esta pasta.
GitHub Pages: crie um repositório, envie estes arquivos, vá em Settings > Pages e publique a branch principal.
Os dois dão um endereço https. Os menus desses sites podem mudar de nome com o tempo.

## 2. Instalar no celular

Abra o endereço no Chrome do Android, toque nos três pontos e escolha "Instalar app" (ou "Adicionar à tela inicial").

## 3. Ligar a notificação

Abra o app instalado, toque em "Ativar notificação fixa" e permita as notificações.
A notificação mostra a mansão atual e o horário de entrada e saída, e é trocada quando a Lua muda de mansão.

## Limites

- Os avisos chegam no horário certo com o app aberto ou em segundo plano. Com o app totalmente
  fechado, o Chrome só acorda o app de tempos em tempos, sem horário exato.
- Para aviso pontual com o app fechado seria preciso um servidor de push, que não está incluído.
- Os arquivos precisam ficar na mesma pasta: index.html, mansoes.js, sw.js, manifest.webmanifest e os ícones.
