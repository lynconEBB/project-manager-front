# Gerenciador de projetos

Front-end do primeiro projeto de Engenharia de Software 2 do curso de Ciência da Computação da UNIOESTE.

## Tecnologias
- Vite
- React
- React router DOM
- Material UI
- Axios

## Implementação

Este projeto se trata de uma SPA (Single Page Application), desta forma, todas as requisições são direcionadas para o arquivo ```main.js``` responsável por renderiar o component ```<App/>``` descrito no arquivo ```App.jsx```.

Ao executar este arquivo, uma página diferente é renderizada dependendo da URL recebida na requisição este trabalho é realizado pela biblioteca react-router-dom, utilizando a função ```createBrowserRouter()```.

O projeto conta com 3 páginas, em que cada uma se propõe a lidar com as operações de criação, listagem, atualização e remoção de Profissionais, Times e Projetos. 

Cada página foi componentizada em seus respectivos arquivos se aproveitando das vantagens obtidas ao utilizar o framework React. Dentro destas paginas são realizadas requisições REST para a API back-end por meio da biblioteca Axios.

## Instalação e Execução

Para executar o projeto é necessário ter os seguintes programas instalados:

- nodejs v20.11.1 
- npm v10.2.4

Inicialmente adquira as dependencias utilizando o seguinte comando:

Para executar o projeto em ambiente utilize o comando:

```bash
npm run dev
```

Por fim para realizar o build do projeto utilize o seguinte comando, os arquivos a serem utilizados para hospedagem ficarão disponiveis na pasta ```dist```.

```bash
npm run build
```

Também é possivel gerar a imagem docker do projeto utilizando o seguinte comando:

```bash
docker build . -t proj/front
```

### Autores
- Lyncon Baez
- Felipe Asano
- Lucas Tomio