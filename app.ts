class Membro {
    nome: string;
    cargo: string;

    constructor(nome: string, cargo: string) {
        this.nome = nome;
        this.cargo = cargo;
    }
}

class Equipe {
    nome: string;
    membros: Membro[];

    constructor(nome: string) {
        this.nome = nome;
        this.membros = [];
    }

    adicionarMembro(membro: Membro) {
        this.membros.push(membro);
    }
}

class Projeto {
    nome: string;
    descricao: string;
    dataInicial: Date;
    dataFinal: Date;
    equipe: Equipe;
    tarefas: Tarefa[];

    constructor(nome: string, descricao: string, dataInicial: Date, dataFinal: Date, equipe: Equipe) {
        this.nome = nome;
        this.descricao = descricao;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.equipe = equipe;
        this.tarefas = [];
    }

    adicionarTarefa(tarefa: Tarefa) {
        this.tarefas.push(tarefa);
    }
}

class Tarefa {
    descricao: string;
    prazo: Date;
    prioridade: string;
    status: string;
    membro: Membro | null;

    constructor(descricao: string, prazo: Date, prioridade: string) {
        this.descricao = descricao;
        this.prazo = prazo;
        this.prioridade = prioridade;
        this.status = "não iniciada";
        this.membro = null;
    }

    atribuirMembro(membro: Membro) {
        this.membro = membro;
    }

    concluir() {
        this.status = "concluida";
    }
}

// Arrays para armazenar equipes, projetos, e tarefas
const equipes: Equipe[] = [];
const projetos: Projeto[] = [];
const tarefas: Tarefa[] = [];

const formEquipe = document.getElementById('form-criar-equipe') as HTMLFormElement;
const listaEquipes = document.querySelector('#lista-equipes ul') as HTMLUListElement;
const equipeProjetoSelect = document.getElementById('equipe-projeto') as HTMLSelectElement;
const projetoTarefaSelect = document.getElementById('projeto-tarefa') as HTMLSelectElement;
const membroTarefaSelect = document.getElementById('membro-tarefa') as HTMLSelectElement;
const equipeMembroSelect = document.getElementById('equipe-membro') as HTMLSelectElement;
const formAdicionarMembro = document.getElementById('form-adicionar-membro') as HTMLFormElement;

formEquipe.addEventListener('submit', (event) => {
    event.preventDefault();
    const nomeEquipe = (document.getElementById('nome-equipe') as HTMLInputElement).value;
    const equipe = new Equipe(nomeEquipe);
    equipes.push(equipe);

    const option = document.createElement('option');
    option.value = (equipes.length - 1).toString();
    option.textContent = nomeEquipe;
    equipeProjetoSelect.appendChild(option);
    equipeMembroSelect.appendChild(option.cloneNode(true)); // Adiciona na lista de membros também

    const li = document.createElement('li');
    li.textContent = nomeEquipe;
    listaEquipes.appendChild(li);

    formEquipe.reset();
});

formAdicionarMembro.addEventListener('submit', (event) => {
    event.preventDefault();
    const nomeMembro = (document.getElementById('nome-membro') as HTMLInputElement).value;
    const cargoMembro = (document.getElementById('cargo-membro') as HTMLInputElement).value;
    const equipeSelecionada = equipes[Number(equipeMembroSelect.value)];

    const membro = new Membro(nomeMembro, cargoMembro);
    equipeSelecionada.adicionarMembro(membro);

    const option = document.createElement('option');
    option.value = (equipeSelecionada.membros.length - 1).toString();
    option.textContent = nomeMembro;
    membroTarefaSelect.appendChild(option);

    const li = document.createElement('li');
    li.textContent = `${nomeMembro} - ${cargoMembro}`;
    listaEquipes.appendChild(li);

    formAdicionarMembro.reset();
});

// Adicionar o evento para criar projetos
const formProjeto = document.getElementById('form-criar-projeto') as HTMLFormElement;
formProjeto.addEventListener('submit', (event) => {
    event.preventDefault();

    const nomeProjeto = (document.getElementById('nome-projeto') as HTMLInputElement).value;
    const descricaoProjeto = (document.getElementById('descricao-projeto') as HTMLInputElement).value;
    const equipeSelecionada = equipes[Number(equipeProjetoSelect.value)];
    const dataInicial = new Date((document.getElementById('data-inicial') as HTMLInputElement).value);
    const dataFinal = new Date((document.getElementById('data-final') as HTMLInputElement).value);

    const projeto = new Projeto(nomeProjeto, descricaoProjeto, dataInicial, dataFinal, equipeSelecionada);
    projetos.push(projeto);

    const option = document.createElement('option');
    option.value = (projetos.length - 1).toString();
    option.textContent = nomeProjeto;
    projetoTarefaSelect.appendChild(option);

    const li = document.createElement('li');
    li.textContent = nomeProjeto;
    document.querySelector('#lista-projetos ul')?.appendChild(li);

    formProjeto.reset();
});

// Adicionar o evento para criar tarefas
const formTarefa = document.getElementById('form-criar-tarefa') as HTMLFormElement;
formTarefa.addEventListener('submit', (event) => {
    event.preventDefault();

    const descricaoTarefa = (document.getElementById('descricao-tarefa') as HTMLInputElement).value;
    const prazoTarefa = new Date((document.getElementById('prazo-tarefa') as HTMLInputElement).value);
    const prioridadeTarefa = (document.getElementById('prioridade-tarefa') as HTMLSelectElement).value;
    const projetoSelecionado = projetos[Number(projetoTarefaSelect.value)];
    const membroSelecionado = projetoSelecionado.equipe.membros[Number(membroTarefaSelect.value)];

    const tarefa = new Tarefa(descricaoTarefa, prazoTarefa, prioridadeTarefa);
    tarefa.atribuirMembro(membroSelecionado);
    projetoSelecionado.adicionarTarefa(tarefa);
    tarefas.push(tarefa);

    const li = document.createElement('li');
    li.textContent = descricaoTarefa;
    document.querySelector('#lista-tarefas ul')?.appendChild(li);

    formTarefa.reset();
});