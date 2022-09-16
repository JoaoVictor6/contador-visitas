# Desafio - contador de visitas
### Francisco Zanfranceschi
![Imagem da tela do projeto](/.github/assets/projeto_screenshot.png "Print da tela")
### Tecnologias
 - [NodeJS](https://nodejs.org/en/)
 - [Node cache](https://www.npmjs.com/package/node-cache)
 - [PostCSS](https://postcss.org/)

### Escolhas
No inicio do desafio achei que seria interessante fazer com [nextJS]() e usar
middlewares pra poder computar as visitas, porém com o tempo mudei de opinião. Ter 
que usar um framework dessa potência pra entregar uma pádina estática com um 
contador me parece desperdicio. Keep it simple, isso seria apenas uma pagina 
com um contador de visitas, qual a necessidade de um framework tão complexo? 
Optei por criar uma API que server uma pagina estática.

Sobre a contador, a primeiro momento pensei em ter um middleware para englobar toda a api
e mandar o endereço do client pra algum lugar. Assim s'precisaria de uma rota para 
disponibilizar os dados. Não achei essa idéia muito boa, vale a pena deixar essa 
responssabilidade toda no client somente pra gerar um contador? Procurei por resposatas mais 
interessantes e cheguei no incrivel [ImageMagick](https://imagemagick.org/index.php). Serio, essa prte foi muito legal!

Com o ImageMagick a estratégia era ter uma imagem de base e uma função para 
executar um processo onde a CLI do ImageMagick geraria a imagem, 
com isso, bastaria adicionar um middleware no endpoint da imagem do contador e disparar 
algum evento para criar uma nova imagem. Essa parte foi bem tranquila, o node-cache 
tem support para event emitters. :)

### Pontos a melhorar
- [x] No momento o node-cache é disparado indiscriminadamente, isso **desperdiça** 
processamento de uma forma bem tosca. Acredito que uma mecanismo para armazenar o 
antigo tamanho da "lista", comparar com o atual e caso houver diferenças executar 
a função para gerar uma nova imagem seria uma otima abordagem. __Resolvido no pr [#1](https://github.com/JoaoVictor6/contador-visitas/pull/1)__

### Pontos interessantes
Eu não soube qual seria a melhor forma de otimizar o html e css pra poder rodar em 
outros dispositivos, optei por criar um pequeno script JS pra criar uma pasta build, 
rodar o postCSS e fazer a mágica. Não mexi em nada do código JS kkkkkk, tinha até 
tentando utilizar um babel porém não via muita necessidade.

## Bora conversar!!
Caso queira fazer alguma sugestão, mostrar alguma alternativa ou tecer criticas 
a esse código só abrir uma [issue](https://docs.github.com/pt/issues/tracking-your-work-with-issues/creating-an-issue). :)
