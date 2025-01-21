var Membro = /** @class */ (function () {
    function Membro(nome, cargo) {
        this.nome = nome;
        this.cargo = cargo;
    }
    return Membro;
}());
var Equipe = /** @class */ (function () {
    function Equipe(nome) {
        this.nome = nome;
        this.membros = [];
    }
    Equipe.prototype.adicionarMembro = function (membro) {
        this.membros.push(membro);
    };
    return Equipe;
}());
var Projeto = /** @class */ (function () {
    function Projeto(nome, descricao, dataInicial, dataFinal, equipe) {
        this.nome = nome;
        this.descricao = descricao;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.equipe = equipe;
        this.tarefas = [];
    }
    Projeto.prototype.adicionarTarefa = function (tarefa) {
        this.tarefas.push(tarefa);
    };
    return Projeto;
}());
var Tarefa = /** @class */ (function () {
    function Tarefa(descricao, prazo, prioridade) {
        this.descricao = descricao;
        this.prazo = prazo;
        this.prioridade = prioridade;
        this.status = "não iniciada";
        this.membro = null;
    }
    Tarefa.prototype.atribuirMembro = function (membro) {
        this.membro = membro;
    };
    Tarefa.prototype.concluir = function () {
        this.status = "concluida";
    };
    return Tarefa;
}());
// Arrays para armazenar equipes, projetos, e tarefas
var equipes = [];
var projetos = [];
var tarefas = [];
var formEquipe = document.getElementById('form-criar-equipe');
var listaEquipes = document.querySelector('#lista-equipes ul');
var equipeProjetoSelect = document.getElementById('equipe-projeto');
var projetoTarefaSelect = document.getElementById('projeto-tarefa');
var membroTarefaSelect = document.getElementById('membro-tarefa');
var equipeMembroSelect = document.getElementById('equipe-membro');
var formAdicionarMembro = document.getElementById('form-adicionar-membro');
formEquipe.addEventListener('submit', function (event) {
    event.preventDefault();
    var nomeEquipe = document.getElementById('nome-equipe').value;
    var equipe = new Equipe(nomeEquipe);
    equipes.push(equipe);
    var option = document.createElement('option');
    option.value = (equipes.length - 1).toString();
    option.textContent = nomeEquipe;
    equipeProjetoSelect.appendChild(option);
    equipeMembroSelect.appendChild(option.cloneNode(true)); // Adiciona na lista de membros também
    var li = document.createElement('li');
    li.textContent = nomeEquipe;
    listaEquipes.appendChild(li);
    formEquipe.reset();
});
formAdicionarMembro.addEventListener('submit', function (event) {
    event.preventDefault();
    var nomeMembro = document.getElementById('nome-membro').value;
    var cargoMembro = document.getElementById('cargo-membro').value;
    var equipeSelecionada = equipes[Number(equipeMembroSelect.value)];
    var membro = new Membro(nomeMembro, cargoMembro);
    equipeSelecionada.adicionarMembro(membro);
    var option = document.createElement('option');
    option.value = (equipeSelecionada.membros.length - 1).toString();
    option.textContent = nomeMembro;
    membroTarefaSelect.appendChild(option);
    var li = document.createElement('li');
    li.textContent = "".concat(nomeMembro, " - ").concat(cargoMembro);
    listaEquipes.appendChild(li);
    formAdicionarMembro.reset();
});
// Adicionar o evento para criar projetos
var formProjeto = document.getElementById('form-criar-projeto');
formProjeto.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var nomeProjeto = document.getElementById('nome-projeto').value;
    var descricaoProjeto = document.getElementById('descricao-projeto').value;
    var equipeSelecionada = equipes[Number(equipeProjetoSelect.value)];
    var dataInicial = new Date(document.getElementById('data-inicial').value);
    var dataFinal = new Date(document.getElementById('data-final').value);
    var projeto = new Projeto(nomeProjeto, descricaoProjeto, dataInicial, dataFinal, equipeSelecionada);
    projetos.push(projeto);
    var option = document.createElement('option');
    option.value = (projetos.length - 1).toString();
    option.textContent = nomeProjeto;
    projetoTarefaSelect.appendChild(option);
    var li = document.createElement('li');
    li.textContent = nomeProjeto;
    (_a = document.querySelector('#lista-projetos ul')) === null || _a === void 0 ? void 0 : _a.appendChild(li);
    formProjeto.reset();
});
// Adicionar o evento para criar tarefas
var formTarefa = document.getElementById('form-criar-tarefa');
formTarefa.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var descricaoTarefa = document.getElementById('descricao-tarefa').value;
    var prazoTarefa = new Date(document.getElementById('prazo-tarefa').value);
    var prioridadeTarefa = document.getElementById('prioridade-tarefa').value;
    var projetoSelecionado = projetos[Number(projetoTarefaSelect.value)];
    var membroSelecionado = projetoSelecionado.equipe.membros[Number(membroTarefaSelect.value)];
    var tarefa = new Tarefa(descricaoTarefa, prazoTarefa, prioridadeTarefa);
    tarefa.atribuirMembro(membroSelecionado);
    projetoSelecionado.adicionarTarefa(tarefa);
    tarefas.push(tarefa);
    var li = document.createElement('li');
    li.textContent = descricaoTarefa;
    (_a = document.querySelector('#lista-tarefas ul')) === null || _a === void 0 ? void 0 : _a.appendChild(li);
    formTarefa.reset();
});
