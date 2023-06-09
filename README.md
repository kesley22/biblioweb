# 🔥 CRUD com autenticação integrado ao Firebase (v.9 SDK) utilizando apenas HTML, CSS e Javascript puro

Projeto em HTML, CSS e Vanilla Javascript que implementa um pequeno CRUD. (São utilizados o Realtime Database, Authentication com email/senha e conta Google do Firebase)

> ⚠️ **Projeto utilizado nas aulas da disciplina de Programação para a Internet da [Fatec Itu](fatecitu.edu.br)**


  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=Apache&color=FB724C&labelColor=FFFFFF">
<a href="https://fatecitu.edu.br" target="_blank">
  <img alt="License" src="https://img.shields.io/static/v1?label=Powered+by&message=Fatec+Itu&color=FB724C&labelColor=FFFFFF">
  </a>
</p>
<p align="center">
  <img alt="HTML 5" src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">

  <img alt="CSS 3" src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white&color=0000FF"> 

  <img alt="JS" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-F29D0C?style=for-the-badge&logo=firebase&logoColor=white"> 


</p>

# 🧠 Contexto

Uma das dificuldades dos desenvolvedores de é implementar um pequeno CRUD que possua autenticação, sem antes se envolver em um framework web, como o Vue, Angular ou React.
O propósito desse pequeno sistema é mostrar que é possível desenvolvermos uma aplicação 100% na nuvem, utilizando apenas HTML, CSS e Javascript.
## 📋 Instruções

- [ ] Inicialmente clone o projeto; 
- [ ] Acesse https://firebase.google.com e crie um novo projeto Web.
- [ ] Edite o arquivo firebase.js e cole nele as informações de conexão apresentadas pelo Firebase.
- [ ] Acesse Realtime Database e em regras, informe que apenas usuários autenticados terão direito de acesso (escrita e leitura) aos dados:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

- [ ] Abra o arquivo index.html no seu navegador, crie um novo usuário e navegue pelo seu CRUD! (ou se preferir, instale o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code, clique com o botão direito dentro do arquivo index.html e selecione Open with Live Server)

- [ ] Não esqueça de adicionar também o endereço 127.0.0.1 em Authentication/Settings no Firebase para poder rodar localmente


## 🌐 Veja uma demonstração online do projeto. 

Utilize a sua conta Google para efetuar o Login, ou cadastre um novo usuário.

https://fatecitu.github.io/crud-gti/



## 📚 Inspirações
- https://github.com/GCMoura/first-crud-firebase
- https://github.com/ArefinAnwar/todo-crud_firebaseSDK9

## 📷 Imagens do Projeto

![Login](images/TelaBloqueioNew.png "Login com Usuário e Senha ou Login via Google")
![Tela de Menu](images/TelaPrincipalNew.png "UI do Menu Inicial")
![Novo Cliente](images/TelaClientes.png "UI do Cadastro de um novo Cliente")
![Clientes](images/Relatorio.png "UI do Cliente Cadastrado")
![Cadastro de Livro](images/TelaCadLivros.png "UI do Cadastro de um novo livro")
![Livro Cadastrado](images/TelaLivrosCad.png "UI do Livro Cadastrado")


## 💬 Contato do Orientador do Projeto

Prof. Ms. Ricardo Leme <br>
<a href="https://www.linkedin.com/in/ricardo-leme/" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
</a>
<a href="mailto:ricardo.leme@fatec.sp.gov.br" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white">
</a>

## 📝 Licença

Esse projeto está sob a licença Apache. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
---
Made with 💜, HTML, CSS and only Vanilla JS. 