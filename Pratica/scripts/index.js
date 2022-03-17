const CNPJ_INVALIDO = "Formato ou digitos inválidos do CNPJ"

$(document).ready(function() {
  
  $(cod_cnpj).keyup(validarCNPJ)
  $(cod_cnpj).focus(validarCNPJ)

})

function validarCNPJ(event) {
  
  const cnpjErro = $(cnpj_erro)
  const cnpjValor = $(cod_cnpj)
  if(!formatarCNPJ(cnpjValor[0].value) || !validarCNPJDigitos(cnpjValor[0].value)) {
    cnpjErro.removeClass('hidden')
    cnpjErro.text(CNPJ_INVALIDO)
    turnInvalid(cnpjValor)
  } else {
    cnpjErro.addClass('hidden')
    turnValid(cnpjValor)
  }

}

function removeCaracteres(value) {
  return value.replaceAll(/[^\d+]/ig, '')
}

function validarCNPJDigitos(value) {
  
  const numerosPara1oDigitoVerificador = [5,4,3,2,9,8,7,6,5,4,3,2]
  const numerosPara2oDigitoVerificador = [6,5,4,3,2,9,8,7,6,5,4,3,2]
  
  const cnpjSemPontuacaoOriginal = removeCaracteres(value).split('').map( str => parseInt(str) )
  const cnpjSemPontuacao = cnpjSemPontuacaoOriginal.slice(0, 12)

  const digito1 = calculaDigitoValidador(numerosPara1oDigitoVerificador, cnpjSemPontuacao)
  cnpjSemPontuacao.push(digito1) // a validação do segundo digito precisa do primeiro
  const digito2 = calculaDigitoValidador(numerosPara2oDigitoVerificador, cnpjSemPontuacao)

  return digito1 == cnpjSemPontuacaoOriginal[12] && digito2 == cnpjSemPontuacaoOriginal[13]

}

function calculaDigitoValidador(numeros, cnpj) {
  var somatoriaDigito = 0
  for(var i=0; i < numeros.length; i++ ) {  
    somatoriaDigito += numeros[i] * cnpj[i]
  }
  const restoDivisao = somatoriaDigito % 11
  return 11 - ( restoDivisao < 2 ? 11 : restoDivisao)
}

function formatarCNPJ(value) {
  
  const cnpjRegex =/\w{2}\.\w{3}\.\w{3}\/\w{4}\-\w{2}/
  return cnpjRegex.test(value)
}

function turnValid(value) {
  value.addClass("valid")
  value.removeClass("invalid")
}

function turnInvalid(value) {
  value.addClass("invalid")
  value.removeClass("valid")
}