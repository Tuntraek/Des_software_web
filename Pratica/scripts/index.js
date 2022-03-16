const INVALID_FORMAT = "Formato inválido"

$(document).ready(function() {
  
  $(cod_cnpj).keyup(validateCNPJFormat)
  $(cod_cnpj).focus(validateCNPJFormat)
})

function validateCNPJFormat(event) {
  const cnpjErro = $(cnpj_erro)
  const cnpjValor = $(cod_cnpj)
  if(!formatarCNPJ(cnpjValor[0])) {
    cnpjErro.removeClass('hidden')
    cnpjErro.text(INVALID_FORMAT)
    turnInvalid(cnpjValor)
  } else {
    cnpjErro.addClass('hidden')
    turnValid(cnpjValor)
  }

}

function formatarCNPJ(value) {
  
  const cnpjRegex =/\w{2}\.\w{3}\.\w{3}\/\w{4}\-\w{2}/
  return cnpjRegex.test(value.value)
}

function turnValid(value) {
  value.addClass("valid")
  value.removeClass("invalid")
}

function turnInvalid(value) {
  value.addClass("invalid")
  value.removeClass("valid")
}