const ValidacaoManager = require("./ValidacaoManager");

let usuariosCadastrados = [];

class CadastroManager{

    CadastrarUsuario(_pessoaCadastrada)
    {
        var objectValues = Object.values(_pessoaCadastrada);
        var validacaoManager = new ValidacaoManager();
        for(var i = 0; i < objectValues.length; i++)
        {
            if(!validacaoManager.ChecarPreenchimento(objectValues[i]))
            {
                var mensagem = "Dados de Cadastro Invalidos.";
                return {mensagem};
            }

        }
        _pessoaCadastrada.GerarID();
        usuariosCadastrados.push(_pessoaCadastrada);
        return _pessoaCadastrada;
    }

    BuscaCadastro(idPessoa)
    {
    for(var i = 0; i < usuariosCadastrados.length; i++)
    {
        if(usuariosCadastrados[i].id == idPessoa)
        {
            return usuariosCadastrados[i];
        }
    }
    return false;
    }

    ChecarCadastroDeEmail(email)
    {
    for(var i = 0; i < usuariosCadastrados.length; i++)
    {
        if(usuariosCadastrados[i].email == email)
        {
            return true;
        }
    }
    return false;
    }
}
module.exports = CadastroManager;