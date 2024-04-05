let participantes = [
  {
    nome: "Daniel Ramos",
    email: "danielramososielrodrigues@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 20, 30),
    dataCheckIn: new Date(2024, 2, 31, 15, 00)
  },
  {
    nome: "Guilherme Gonçalves",
    email: "guigonça@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 15, 45),
    dataCheckIn: new Date(2024, 2, 24, 16, 00)
  },
  {
    nome: "Ana Silva",
    email: "anasilva@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 10, 15),
    dataCheckIn: new Date(2024, 2, 20, 10, 30)
  },
  {
    nome: "João Oliveira",
    email: "joaooliveira@hotmail.com",
    dataInscricao: new Date(2024, 2, 15, 14, 20),
    dataCheckIn: new Date(2024, 2, 15, 15, 00)
  },
  {
    nome: "Maria Santos",
    email: "mariasantos@yahoo.com",
    dataInscricao: new Date(2024, 2, 10, 18, 45),
    dataCheckIn: new Date(2024, 2, 11, 9, 30)
  },
  {
    nome: "Pedro Almeida",
    email: "pedroalmeida@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 12, 30),
    dataCheckIn: new Date(2024, 2, 5, 14, 00)
  },
  {
    nome: "Laura Ferreira",
    email: "lauraferreira@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 9, 15),
    dataCheckIn: new Date(2024, 2, 1, 10, 00)
  },
  {
    nome: "Rafaela Costa",
    email: "rafaelacosta@gmail.com",
    dataInscricao: new Date(2024, 1, 25, 17, 30),
    dataCheckIn: new Date(2024, 1, 26, 10, 45)
  },
  {
    nome: "Fernando Nunes",
    email: "fernandonunes@yahoo.com",
    dataInscricao: new Date(2024, 1, 20, 13, 45),
    dataCheckIn: new Date(2024, 1, 21, 8, 30)
  },
  {
    nome: "Carla Mendes",
    email: "carlamendes@hotmail.com",
    dataInscricao: new Date(2024, 1, 15, 10, 00),
    dataCheckIn: new Date(2024, 1, 16, 9, 15)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button 
      data-email="${participante.email}" 
      onclick="fazerCheckIn(event)">
      Confirmar CheckIn
    </button>
    `
  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosFormulario = new FormData(event.target)
  
  const participante = {
    nome: dadosFormulario.get('nome'),
    email: dadosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email //normalmente, iria acrescentar o return com a função entre chaves {}, mas não há a necessidade
  )

  if(participanteExiste) {
    alert("Email já cadastrado")
    return //retorna a mensagem e continua o código
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
} 

const fazerCheckIn = event => {

  const confirmacao = confirm("Tem certeza que deseja fazer o check-in?")

  if(confirm(confirmacao) == false) {
    return
  }


  const participante = participantes.find((p)=>{
    return p.email == event.target.dataset.email
  })
  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}