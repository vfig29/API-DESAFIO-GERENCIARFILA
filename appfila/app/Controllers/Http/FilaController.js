'use strict'

const CadastroManager = require("../../../Managers/CadastroManager");
const CadastroManagerObj = new CadastroManager();
const FilaManager = require("../../../Managers/FilaManager");
const FilaManagerObj = new FilaManager();
const Pessoa = require("../../../Managers/Pessoa");
const ValidacaoManager = require("../../../Managers/ValidacaoManager");
const ValidacaoManagerObj = new ValidacaoManager();
class FilaController{

    async CadastrarUsuario({request})
    {
        const infoCadastro = request.post();
        if(!ValidacaoManagerObj.VarrerCamposPreenchidos(infoCadastro, 3))
        {
            var mensagem = "Preencha os campos corretamente."
            return {mensagem};
        }
        if(CadastroManagerObj.ChecarCadastroDeEmail(infoCadastro.email))
        {
            var mensagem = "Este email já foi cadastrado por outro usuário. Utilize outro email."
            return {mensagem}
        }
        return CadastroManagerObj.CadastrarUsuario(new Pessoa(infoCadastro.nome, infoCadastro.genero, infoCadastro.email));
    }

    async AdicionarAFila({request})
    {

        const infoIDPessoa = request.post();
        if(!ValidacaoManagerObj.VarrerCamposPreenchidos(infoIDPessoa, 1))
        {
            var mensagem = "Preencha os campos corretamente."
            return {mensagem};
        }
        var cadastroEncontrado = CadastroManagerObj.BuscaCadastro(infoIDPessoa.id);
        if(cadastroEncontrado)
        {
            return FilaManagerObj.AdicionarNaFila(cadastroEncontrado);
        }
        else
        {
            var mensagem = "Cadastro Não Encontrado.";
            return {mensagem};
        }

    }

    async BuscarPorEmail({request})
    {
        const objRequest = request.post();
        if(!ValidacaoManagerObj.VarrerCamposPreenchidos(objRequest, 1))
        {
            var mensagem = "Preencha os campos corretamente."
            return {mensagem};
        }
        var resultadoBusca = await FilaManagerObj.BuscarPorEmail(objRequest.email);
        return resultadoBusca;
    }

    async VerFila()
    {
        if(FilaManagerObj.GetFila().length <= 0)
        {
            var mensagem = "A fila esta vazia."
            return {mensagem};
        }
        return FilaManagerObj.ConverterFilaParaResposta(FilaManagerObj.GetFila()); //falta adaptar para objetos com apenas com nome, email, genero e posicao.
    }

    async FiltrarPorGenero({request})
    {
        const objRequest = request.post();
        if(!ValidacaoManagerObj.VarrerCamposPreenchidos(objRequest, 1))
        {
            var mensagem = "Preencha os campos corretamente."
            return {mensagem};
        }
        var filaFiltrada = FilaManagerObj.FiltrarFilaPorGenero(objRequest.genero, FilaManagerObj.ConverterFilaParaResposta(FilaManagerObj.GetFila()));
        if(filaFiltrada.length <= 0)
        {
            var mensagem = "Não há pessoas desse genero na fila."
            return {mensagem};
        }
        return filaFiltrada;
    }
    async TirarDaFila()
    {
        if(FilaManagerObj.GetFila().length <= 0)
        {
            var mensagem = "A fila esta vazia."
            return {mensagem};
        }
        return FilaManagerObj.RemoverDoInicioDaFila();
    }

}

module.exports = FilaController
