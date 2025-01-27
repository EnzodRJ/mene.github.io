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

class Tarefa {
    descricao: string;
    prazo: Date;
    prioridade: string;
    projeto: Projeto;
    membro: Membro | null;
    status: string;

    constructor(descricao: string, prazo: Date, prioridade: string, projeto: Projeto, membro: Membro | null) {
        this.descricao = descricao;
        this.prazo = prazo;
        this.prioridade = prioridade;
        this.projeto = projeto;
        this.membro = membro;
        this.status = "Pendente"; // Status inicial
    }

    concluir() {
        this.status = "Concluída";
    }

    // Atribui um membro à tarefa
    atribuirMembro(membro: Membro) {
        this.membro = membro;
    }
}

class Projeto {
    nome: string;
    descricao: string;
    equipe: Equipe;
    dataInicial: Date;
    dataFinal: Date;
    tarefas: Tarefa[];

    constructor(nome: string, descricao: string, equipe: Equipe, dataInicial: Date, dataFinal: Date) {
        this.nome = nome;
        this.descricao = descricao;
        this.equipe = equipe;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.tarefas = [];
    }

    adicionarTarefa(tarefa: Tarefa) {
        this.tarefas.push(tarefa);
    }
}

// Arrays para armazenar dados
const equipes: Equipe[] = [];
const projetos: Projeto[] = [];
const tarefas: Tarefa[] = [];

// Seletores do HTML
const formEquipe = document.getElementById('form-criar-equipe') as HTMLFormElement;
const listaEquipes = document.querySelector('#lista-equipes ul')!;
const equipeProjetoSelect = document.getElementById('equipe-projeto') as HTMLSelectElement;
const projetoTarefaSelect = document.getElementById('projeto-tarefa') as HTMLSelectElement;
const membroTarefaSelect = document.getElementById('membro-tarefa') as HTMLSelectElement;
const formProjeto = document.getElementById('form-criar-projeto') as HTMLFormElement;
const formTarefa = document.getElementById('form-criar-tarefa') as HTMLFormElement;
const formMembro = document.getElementById('form-adicionar-membro') as HTMLFormElement;
const listaProjetos = document.querySelector('#lista-projetos ul')!;
const listaTarefas = document.querySelector('#lista-tarefas ul')!;
const equipeMembroSelect = document.getElementById('equipe-membro') as HTMLSelectElement;
const nomeMembroInput = document.getElementById('nome-membro') as HTMLInputElement;
const cargoMembroInput = document.getElementById('cargo-membro') as HTMLInputElement;

// Função para criar equipes
formEquipe.addEventListener('submit', (event) => {
    event.preventDefault();
    const nomeEquipe = (document.getElementById('nome-equipe') as HTMLInputElement).value;
    const equipe = new Equipe(nomeEquipe);
    equipes.push(equipe);

    const option = document.createElement('option');
    option.value = (equipes.length - 1).toString();
    option.textContent = nomeEquipe;
    equipeProjetoSelect.appendChild(option);

    const equipeOption = document.createElement('option');
    equipeOption.value = (equipes.length - 1).toString();
    equipeOption.textContent = nomeEquipe;
    equipeMembroSelect.appendChild(equipeOption);

    const li = document.createElement('li');
    li.textContent = nomeEquipe;
    listaEquipes.appendChild(li);

    formEquipe.reset();
});

// Função para adicionar membros às equipes
formMembro.addEventListener('submit', (event) => {
    event.preventDefault();
    const nomeMembro = nomeMembroInput.value;
    const cargoMembro = cargoMembroInput.value;
    const equipeSelecionada = equipes[parseInt(equipeMembroSelect.value)];

    const membro = new Membro(nomeMembro, cargoMembro);
    equipeSelecionada.adicionarMembro(membro);

    const option = document.createElement('option');
    option.value = (equipeSelecionada.membros.length - 1).toString();
    option.textContent = nomeMembro;
    membroTarefaSelect.appendChild(option);

    const li = document.createElement('li');
    li.textContent = `${nomeMembro} - Cargo: ${cargoMembro}`;
    listaEquipes.appendChild(li);

    formMembro.reset();
});

// Função para criar projetos
formProjeto.addEventListener('submit', (event) => {
    event.preventDefault();
    const nomeProjeto = (document.getElementById('nome-projeto') as HTMLInputElement).value;
    const descricaoProjeto = (document.getElementById('descricao-projeto') as HTMLInputElement).value;
    const equipeSelecionada = equipes[parseInt(equipeProjetoSelect.value)];
    const dataInicial = new Date((document.getElementById('data-inicial') as HTMLInputElement).value);
    const dataFinal = new Date((document.getElementById('data-final') as HTMLInputElement).value);

    const projeto = new Projeto(nomeProjeto, descricaoProjeto, equipeSelecionada, dataInicial, dataFinal);
    projetos.push(projeto);

    const option = document.createElement('option');
    option.value = (projetos.length - 1).toString();
    option.textContent = nomeProjeto;
    projetoTarefaSelect.appendChild(option);

    const li = document.createElement('li');
    li.textContent = nomeProjeto;
    listaProjetos.appendChild(li);

    formProjeto.reset();
});

// Função para criar tarefas
formTarefa.addEventListener('submit', (event) => {
    event.preventDefault();
    const descricaoTarefa = (document.getElementById('descricao-tarefa') as HTMLInputElement).value;
    const prazoTarefa = (document.getElementById('prazo-tarefa') as HTMLInputElement).value;
    const prioridadeTarefa = (document.getElementById('prioridade-tarefa') as HTMLSelectElement).value;
    const projetoSelecionado = projetos[parseInt(projetoTarefaSelect.value)];
    const membroSelecionado = projetoSelecionado.equipe.membros[parseInt(membroTarefaSelect.value)] || null;

    const tarefa = new Tarefa(descricaoTarefa, new Date(prazoTarefa), prioridadeTarefa, projetoSelecionado, membroSelecionado);
    tarefas.push(tarefa);

    const prazoFormatado = tarefa.prazo.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const li = document.createElement('li');
    li.textContent = `${descricaoTarefa} - Prazo: ${prazoFormatado} - Prioridade: ${prioridadeTarefa} - Status: ${tarefa.status}`;
    listaTarefas.appendChild(li);

    formTarefa.reset();
});

// Função para concluir tarefas
function concluirTarefa(tarefa: Tarefa) {
    tarefa.concluir();
    const listaItems = listaTarefas.getElementsByTagName('li');
    for (let i = 0; i < listaItems.length; i++) {
        const item = listaItems[i];
        if (item.textContent?.includes(tarefa.descricao)) {
            item.textContent = `${tarefa.descricao} - Prazo: ${tarefa.prazo.toLocaleDateString()} - Prioridade: ${tarefa.prioridade} - Status: ${tarefa.status}`;
        }
    }
}

// Adiciona um botão para concluir a tarefa, caso deseje
const concluirBotao = document.createElement('button');
concluirBotao.textContent = 'Concluir Tarefa';
document.body.appendChild(concluirBotao);

concluirBotao.addEventListener('click', () => {
    const tarefa = tarefas[0]; // Exemplo de tarefa para ser concluída
    concluirTarefa(tarefa);
});
