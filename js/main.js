const campoCep = document.querySelector('#cep')
const campoErroCep = document.querySelector('#cepError')
const campoRua = document.querySelector('#street')
const campoNumero = document.querySelector('#number')
const campoBairro = document.querySelector('#neighborhood')
const campoCidade = document.querySelector('#city')
const campoEstado = document.querySelector('#state')
const campoFormulario = document.querySelector('form')
const campoCarregamento = document.querySelector('img#loading')

campoCep.addEventListener('focus', () => {
  limparErroCep()
})

campoCep.addEventListener('blur', () => {
  let cep = campoCep.value

  if (/\d{5}-?\d{3}/.test(cep)) {
    carregarInfoCep(cep)
  } else {
    mostrarErroCep()
  }
})

function carregarInfoCep(cep) {
  campoCarregamento.classList.toggle('hidden')
  campoFormulario.classList.toggle('loading')
  let url = `https://viacep.com.br/ws/${cep}/json/`
  fetch(url)
    .then(res => res.json())
    .then(infoCep => {
      if(infoCep.erro) {
        limparCamposEndereco()
      } else {
        campoFormulario.classList.toggle('loading')
        campoCarregamento.classList.toggle('hidden')
        campoRua.value = infoCep.logradouro
        campoBairro.value = infoCep.bairro
        campoCidade.value = infoCep.localidade
        campoEstado.value = infoCep.uf
  
        campoNumero.focus()
        limparErroCep()
      }
    })
    .catch(erro => {
      mostrarErroCep()
    })
}

function limparErroCep() {
  campoCep.classList.remove('input-cep-error')
  campoErroCep.classList.add('hidden')
}

function mostrarErroCep() {
  campoCep.classList.add('input-cep-error')
  campoErroCep.classList.remove('hidden')
  limparCamposEndereco()
}

function limparCamposEndereco() {
  campoRua.value = ''
  campoNumero.value = ''
  campoBairro.value = ''
  campoCidade.value = ''
  campoEstado.value = ''
}
