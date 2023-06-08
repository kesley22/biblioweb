/**
 * Copyright 2023 Prof. Ms. Ricardo Leme All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict' //modo estrito


var isAlteracao
var idModificacao

/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} collection - Nome da collection no Firebase
 * @return {object} - Uma tabela com os dados obtidos
 */
async function obtemDados(collection) {
  let spinner = document.getElementById('carregandoDados')
  let tabela = document.getElementById('tabelaDados')
  await firebase.database().ref(collection).orderByChild('nome').on('value', (snapshot) => {
    tabela.innerHTML = ''
    let cabecalho = tabela.insertRow()
    cabecalho.className = 'fundo-td-azul-escuro'
    cabecalho.id='cabecalho'
    cabecalho.insertCell().textContent = 'Nome'
    cabecalho.insertCell().textContent = 'Gênero'
    cabecalho.insertCell().textContent = 'Autor'
    cabecalho.insertCell().textContent = 'Editora'
    cabecalho.insertCell().textContent = 'Numero de paginas'
    cabecalho.insertCell().textContent = 'Data de Inclusão'
    cabecalho.insertCell().innerHTML = 'Opções'

    snapshot.forEach(item => {
      // Dados do Firebase
      let db = item.ref._delegate._path.pieces_[0] //collection
      let id = item.ref._delegate._path.pieces_[1] //id do registro    
      //Criando as novas linhas na tabela
      let novaLinha = tabela.insertRow()
      novaLinha.insertCell().innerHTML = '<small>' + item.val().nome + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().genero + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().autor + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().editora + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().numPaginas + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().dataInclusao + '</small>'
      novaLinha.insertCell().innerHTML = `<button class='btn btn-sm btn-danger' onclick=remover('${db}','${id}')><i class="bi bi-trash"></i></i></button>
      <button class='btn btn-sm btn-warning' onclick=carregaDadosAlteracaoLivro('${id}')><i class="bi bi-pencil-square"></i></button>`

    })
    let rodape = tabela.insertRow()
    rodape.insertCell().colSpan = "6"
    rodape.insertCell().innerHTML = totalRegistros(collection)

  })
  spinner.classList.add('d-none') //oculta o carregando...
}

async function obtemDadosClientes(collection) {
  let spinner = document.getElementById('carregandoDados')
  let tabela = document.getElementById('tabelaDados')
  await firebase.database().ref(collection).orderByChild('nome').on('value', (snapshot) => {
    tabela.innerHTML = ''
    let cabecalho = tabela.insertRow()
    cabecalho.className = 'fundo-td-azul-escuro'
    cabecalho.id='cabecalho'
    cabecalho.insertCell().textContent = 'Nome'
    cabecalho.insertCell().textContent = 'E-mail'
    cabecalho.insertCell().textContent = 'Sexo'
    cabecalho.insertCell().textContent = 'CPF'
    cabecalho.insertCell().textContent = 'Data de Inclusão'
    cabecalho.insertCell().innerHTML = 'Opções'

    snapshot.forEach(item => {
      // Dados do Firebase
      let db = item.ref._delegate._path.pieces_[0] //collection
      let id = item.ref._delegate._path.pieces_[1] //id do registro    
      //Criando as novas linhas na tabela
      let novaLinha = tabela.insertRow()
      novaLinha.insertCell().innerHTML = '<small>' + item.val().nome + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().email + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().sexo + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().cpf + '</small>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().dataInclusao + '</small>'
      novaLinha.insertCell().innerHTML = `<button class='btn btn-sm btn-danger' onclick=remover('${db}','${id}')><i class="bi bi-trash"></i></i></button>
      <button class='btn btn-sm btn-warning' href='clientes.html' onclick=carregaDadosAlteracao('${id}')><i class="bi bi-pencil-square"></i></button>`

    })
    let rodape = tabela.insertRow()
    rodape.insertCell().colSpan = "6"
    rodape.insertCell().innerHTML = totalRegistros(collection)

  })
  spinner.classList.add('d-none') //oculta o carregando...
}

/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {object} - Os dados do registro serão vinculados aos inputs do formulário.
 */

async function carregaDadosAlteracao(id) {
  sessionStorage.setItem('isEdit', 'true')
  sessionStorage.setItem('id', id)

  location.href = 'clientes.html'
}

async function carregaDadosAlteracaoCliente() {
 
  if(sessionStorage.getItem('isEdit') === 'true') {

    console.log('entrou no metodo')
    console.log(sessionStorage.getItem('id'))
    console.log(sessionStorage.getItem('isEdit'))

    await firebase.database().ref('clientes' + '/' + sessionStorage.getItem('id')).on('value', (snapshot) => {
      document.getElementById('id').value = sessionStorage.getItem('id')
      document.getElementById('nome').value = snapshot.val().nome
      document.getElementById('cpf').value = snapshot.val().cpf
      document.getElementById('email').value = snapshot.val().email
      if (snapshot.val().sexo === 'Masculino') {
        document.getElementById('sexoM').checked = true
      } else {
        document.getElementById('sexoF').checked = true
      }
    })
    document.getElementById('nome').focus() //Definimos o foco no campo nome
  } else {
    console.log('Deu errado')
  }
}

async function carregaDadosAlteracaoLivro(id) {
  sessionStorage.setItem('isEdit', 'true')
  sessionStorage.setItem('id', id)

  location.href = 'livros-cadastro.html'
}

async function carregaDadosAlteracaoLivroCadastro() {
 
  if(sessionStorage.getItem('isEdit') === 'true') {

    await firebase.database().ref('livros' + '/' + sessionStorage.getItem('id')).on('value', (snapshot) => {
      document.getElementById('id').value = sessionStorage.getItem('id')
      document.getElementById('nome').value = snapshot.val().nome
      document.getElementById('genero').value = snapshot.val().genero
      document.getElementById('autor').value = snapshot.val().autor
      document.getElementById('editora').value = snapshot.val().editora
      document.getElementById('numPaginas').value = snapshot.val().numPaginas      
    })
    document.getElementById('nome').focus() //Definimos o foco no campo nome
  } else {
    console.log('Deu errado')
  }
}


/**
 * incluir.
 * Inclui os dados do formulário na collection do Firebase.
 * @param {object} event - Evento do objeto clicado
 * @param {string} collection - Nome da collection no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

function salvar(event, collection) {
  event.preventDefault() // evita que o formulário seja recarregado
  //Verifica os campos obrigatórios
  if (document.getElementById('nome').value === '') {
    alerta('⚠️ É obrigatório informar o nome!', 'warning')
  }
  else if (document.getElementById('genero').value === '') {
    alerta('⚠️ É obrigatório informar o genero!', 'warning')
  }
  else if (document.getElementById('autor').value === '') {
    alerta('⚠️ É obrigatório informar o autor(a)!', 'warning')
  }
  else if (document.getElementById('editora').value === '') {
    alerta('⚠️ É obrigatório informar a editora!', 'warning')
  }
  else if (document.getElementById('numPaginas').value === '' && document.getElementById('numPaginas').value > 0) {
    alerta('⚠️ É obrigatório informar o numero de paginas do livro!', 'warning')
  }
  else if (sessionStorage.getItem('id') && sessionStorage.getItem('id') !== '0') {
    console.log('Entrou no if alterar')
    alterar(event, collection)
  }
  else {
    incluir(event, collection)
  }
}


async function incluir(event, collection) {
  let usuarioAtual = firebase.auth().currentUser
  let botaoSalvar = document.getElementById('btnSalvar')
  const select = document.getElementById('genero')
  botaoSalvar.innerText = 'Aguarde...'
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref(collection).push({
    nome: values.nome,
    genero: select.options[select.selectedIndex].value,
    autor: values.autor,
    editora: values.editora,
    numPaginas: values.numPaginas,
    dataInclusao: new Date().toLocaleDateString()   
  })
    .then(() => {
      alerta(`✅ Registro incluído com sucesso!`, 'success')
      document.getElementById('formCadastro').reset() //limpa o form
      //Voltamos o botão Salvar para o estado original      
      botaoSalvar.innerHTML = '<i class="bi bi-save-fill"></i> Salvar'
    })
    .catch(error => {
      alerta('❌ Falha ao incluir: ' + error.message, 'danger')
    })

}

async function alterarCliente(event, collection) {
  let usuarioAtual = firebase.auth().currentUser
  let botaoSalvar = document.getElementById('btnSalvar')
  botaoSalvar.innerText = 'Aguarde...'
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref().child(collection + '/' + values.id).update({
    nome: values.nome.toUpperCase(),
    email: values.email.toLowerCase(),
    sexo: values.sexo,
    cpf: values.cpf
  })
    .then(() => {
      sessionStorage.setItem('id', '0')
      sessionStorage.setItem('isEdit', 'false')
      alerta('✅ Registro alterado com sucesso!', 'success')
      document.getElementById('formCadastro').reset()
      document.getElementById('id').value = ''
      botaoSalvar.innerHTML = '<i class="bi bi-save-fill"></i> Salvar'
    })
    .catch(error => {
      console.error(error.code)
      console.error(error.message)
      alerta('❌ Falha ao alterar: ' + error.message, 'danger')
    })
}

async function alterar(event, collection) {
  let usuarioAtual = firebase.auth().currentUser
  let botaoSalvar = document.getElementById('btnSalvar')
  const select = document.getElementById('genero')
  botaoSalvar.innerText = 'Aguarde...'
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref().child(collection + '/' + values.id).update({
    nome: values.nome,
    genero: select.options[select.selectedIndex].value,
    autor: values.autor,
    editora: values.editora,
    numPaginas: values.numPaginas,
  })
    .then(() => {
      sessionStorage.setItem('id', '0')
      sessionStorage.setItem('isEdit', 'false')
      alerta('✅ Registro alterado com sucesso!', 'success')
      document.getElementById('formCadastro').reset()
      document.getElementById('id').value = ''
      botaoSalvar.innerHTML = '<i class="bi bi-save-fill"></i> Salvar'
    })
    .catch(error => {
      console.error(error.code)
      console.error(error.message)
      alerta('❌ Falha ao alterar: ' + error.message, 'danger')
    })
}

/**
 * incluir.
 * Inclui os dados do formulário na collection do Firebase.
 * @param {object} event - Evento do objeto clicado
 * @param {string} collection - Nome da collection no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

function salvarCliente(event, collection) {
  event.preventDefault() // evita que o formulário seja recarregado
  //Verifica os campos obrigatórios

  console.log('entra em salvar cliente')

  if (document.getElementById('nome').value == '') {
    alerta('⚠️ É obrigatório informar o nome!', 'warning')
  }
  else if (!checkValidity(document.getElementById('email').value)) {
    alerta('⚠️ É obrigatório informar um email válido!', 'warning')
  }
  else if (!/^([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})$/.test(document.getElementById('cpf').value)) {
    alerta('⚠️ O CPF informado é inválido!', 'warning')
  }
  else if (sessionStorage.getItem('id') && sessionStorage.getItem('id') !== '0') {
    console.log('Entrou no if de alteração')
    alterarCliente(event, collection)
  }
  else {
    incluirCliente(event, collection)
  }
}


async function incluirCliente(event, collection) {
  let usuarioAtual = firebase.auth().currentUser
  let botaoSalvar = document.getElementById('btnSalvar')
  botaoSalvar.innerText = 'Aguarde...'
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref(collection).push({
    nome: values.nome.toUpperCase(),
    email: values.email.toLowerCase(),
    sexo: values.sexo,
    cpf: values.cpf,
    dataInclusao: new Date().toLocaleDateString()
  })
    .then(() => {
      alerta(`✅ Registro incluído com sucesso!`, 'success')
      document.getElementById('formCadastro').reset() //limpa o form
      //Voltamos o botão Salvar para o estado original      
      botaoSalvar.innerHTML = '<i class="bi bi-save-fill"></i> Salvar'
    })
    .catch(error => {
      alerta('❌ Falha ao incluir: ' + error.message, 'danger')
    })

}

/**
 * remover.
 * Remove os dados da collection a partir do id passado.
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */
async function remover(db, id) {
  if (window.confirm("⚠️Confirma a exclusão do registro?")) {
    let dadoExclusao = await firebase.database().ref().child(db + '/' + id)
    dadoExclusao.remove()
      .then(() => {
        alerta('✅ Registro removido com sucesso!', 'success')
      })
      .catch(error => {
        console.error(error.code)
        console.error(error.message)
        alerta('❌ Falha ao excluir: ' + error.message, 'danger')
      })
  }
}


/**
 * totalRegistros
 * Retornar a contagem do total de registros da collection informada
 * @param {string} collection - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

function totalRegistros(collection) {
  var retorno = '...'
  firebase.database().ref(collection).on('value', (snap) => {
    if (snap.numChildren() === 0) {
      retorno = '⚠️ Ainda não há nenhum registro cadastrado!'
    } else {
      retorno = `Total: <span class="badge fundo-laranja-escuro"> ${snap.numChildren()} </span>`
    }
  })
  return retorno
}

/**
 * Formata o valor do campo de CPF com pontos e traço enquanto o usuário digita os dados.
 *
 * @param {object} campo - O campo de entrada do CPF.
 */
function formatarCPF(campo) {
  // Remove caracteres não numéricos
  var cpf = campo.value.replace(/\D/g, '');

  // Adiciona pontos e traço conforme o usuário digita
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  // Atualiza o valor do campo
  campo.value = cpf;
}

function checkValidity(email) {
  return email.includes('@')
}