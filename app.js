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
var Tarefa = /** @class */ (function () {
    function Tarefa(descricao, prazo, prioridade, projeto, membro) {
        this.descricao = descricao;
        this.prazo = prazo;
        this.prioridade = prioridade;
        this.projeto = projeto;
        this.membro = membro;
        this.status = "Pendente"; // Status inicial
    }
    Tarefa.prototype.concluir = function () {
        this.status = "Concluída";
    };
    // Atribui um membro à tarefa
    Tarefa.prototype.atribuirMembro = function (membro) {
        this.membro = membro;
    };
    return Tarefa;
}());
var Projeto = /** @class */ (function () {
    function Projeto(nome, descricao, equipe, dataInicial, dataFinal) {
        this.nome = nome;
        this.descricao = descricao;
        this.equipe = equipe;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.tarefas = [];
    }
    Projeto.prototype.adicionarTarefa = function (tarefa) {
        this.tarefas.push(tarefa);
    };
    return Projeto;
}());
// Arrays para armazenar dados
var equipes = [];
var projetos = [];
var tarefas = [];
// Seletores do HTML
var formEquipe = document.getElementById('form-criar-equipe');
var listaEquipes = document.querySelector('#lista-equipes ul');
var equipeProjetoSelect = document.getElementById('equipe-projeto');
var projetoTarefaSelect = document.getElementById('projeto-tarefa');
var membroTarefaSelect = document.getElementById('membro-tarefa');
var formProjeto = document.getElementById('form-criar-projeto');
var formTarefa = document.getElementById('form-criar-tarefa');
var formMembro = document.getElementById('form-adicionar-membro');
var listaProjetos = document.querySelector('#lista-projetos ul');
var listaTarefas = document.querySelector('#lista-tarefas ul');
var equipeMembroSelect = document.getElementById('equipe-membro');
var nomeMembroInput = document.getElementById('nome-membro');
var cargoMembroInput = document.getElementById('cargo-membro');
// Função para criar equipes
formEquipe.addEventListener('submit', function (event) {
    event.preventDefault();
    var nomeEquipe = document.getElementById('nome-equipe').value;
    var equipe = new Equipe(nomeEquipe);
    equipes.push(equipe);
    var option = document.createElement('option');
    option.value = (equipes.length - 1).toString();
    option.textContent = nomeEquipe;
    equipeProjetoSelect.appendChild(option);
    var equipeOption = document.createElement('option');
    equipeOption.value = (equipes.length - 1).toString();
    equipeOption.textContent = nomeEquipe;
    equipeMembroSelect.appendChild(equipeOption);
    var li = document.createElement('li');
    li.textContent = nomeEquipe;
    listaEquipes.appendChild(li);
    formEquipe.reset();
});
// Função para adicionar membros às equipes
formMembro.addEventListener('submit', function (event) {
    event.preventDefault();
    var nomeMembro = nomeMembroInput.value;
    var cargoMembro = cargoMembroInput.value;
    var equipeSelecionada = equipes[parseInt(equipeMembroSelect.value)];
    var membro = new Membro(nomeMembro, cargoMembro);
    equipeSelecionada.adicionarMembro(membro);
    var option = document.createElement('option');
    option.value = (equipeSelecionada.membros.length - 1).toString();
    option.textContent = nomeMembro;
    membroTarefaSelect.appendChild(option);
    var li = document.createElement('li');
    li.textContent = "".concat(nomeMembro, " - Cargo: ").concat(cargoMembro);
    listaEquipes.appendChild(li);
    formMembro.reset();
});
// Função para criar projetos
formProjeto.addEventListener('submit', function (event) {
    event.preventDefault();
    var nomeProjeto = document.getElementById('nome-projeto').value;
    var descricaoProjeto = document.getElementById('descricao-projeto').value;
    var equipeSelecionada = equipes[parseInt(equipeProjetoSelect.value)];
    var dataInicial = new Date(document.getElementById('data-inicial').value);
    var dataFinal = new Date(document.getElementById('data-final').value);
    var projeto = new Projeto(nomeProjeto, descricaoProjeto, equipeSelecionada, dataInicial, dataFinal);
    projetos.push(projeto);
    var option = document.createElement('option');
    option.value = (projetos.length - 1).toString();
    option.textContent = nomeProjeto;
    projetoTarefaSelect.appendChild(option);
    var li = document.createElement('li');
    li.textContent = nomeProjeto;
    listaProjetos.appendChild(li);
    formProjeto.reset();
});
// Função para criar tarefas
formTarefa.addEventListener('submit', function (event) {
    event.preventDefault();
    var descricaoTarefa = document.getElementById('descricao-tarefa').value;
    var prazoTarefa = document.getElementById('prazo-tarefa').value;
    var prioridadeTarefa = document.getElementById('prioridade-tarefa').value;
    var projetoSelecionado = projetos[parseInt(projetoTarefaSelect.value)];
    var membroSelecionado = projetoSelecionado.equipe.membros[parseInt(membroTarefaSelect.value)] || null;
    var tarefa = new Tarefa(descricaoTarefa, new Date(prazoTarefa), prioridadeTarefa, projetoSelecionado, membroSelecionado);
    tarefas.push(tarefa);
    var prazoFormatado = tarefa.prazo.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    var li = document.createElement('li');
    li.textContent = "".concat(descricaoTarefa, " - Prazo: ").concat(prazoFormatado, " - Prioridade: ").concat(prioridadeTarefa, " - Status: ").concat(tarefa.status);
    listaTarefas.appendChild(li);
    formTarefa.reset();
});
