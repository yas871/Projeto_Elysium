// Função para realizar login
function loginUser(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    })

    .then((response) => {
        if (!response.ok) throw new Error("Login falhou");
        return response.json();
    })
    .then((data) => {
        alert(data.message); // Exibe mensagem de sucesso
        window.location.href = "dashboard.html"; // Redireciona para a dashboard
    })
    .catch((error) => {
        console.error(error);
        alert("Usuário ou senha inválidos. Tente novamente.");
    });
}

// Função para registrar usuário
function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
    .then((response) => {
        if (!response.ok) throw new Error("Erro ao cadastrar usuário");
        return response.json();
    })
    .then((data) => {
        alert(data.message);
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error(error);
        alert("Erro ao cadastrar o usuário. Tente novamente.");
    });
}

// Função para buscar e exibir os usuários na dashboard
function loadUsers() {
    fetch("http://localhost:3000/users")
    .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        return response.json();
    })
.then((data) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Limpa a lista antes de adicionar
    data.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
        <span>${user.username}</span>
        <span class="badge bg-primary rounded-pill">ID: ${user.id}</span>
        `;
        userList.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error(error);
        alert("Erro ao carregar usuários.");
    });
}

// AGENDAR VISITAS
// script.js - Adicione estas funções

// Função para enviar agendamento
function submitAgendamento(event) {
    event.preventDefault();
    
    const agendamento = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value
    };

    fetch("http://localhost:3000/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agendamento)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao agendar');
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = "hotel_nacional_rj.html";
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao agendar visita. Tente novamente.");
    });
}

// Função para carregar agendamentos na dashboard
function loadAgendamentos() {
    fetch("http://localhost:3000/agendamentos")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar agendamentos");
        return response.json();
    })
    .then(data => {
        const agendamentosList = document.createElement('ul');
        agendamentosList.className = 'list-group mt-4';
        
        data.forEach(agendamento => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <h5>${agendamento.nome}</h5>
                <p>Email: ${agendamento.email}<br>
                Data: ${new Date(agendamento.data).toLocaleDateString()} ${agendamento.horario}<br>
                Agendado em: ${new Date(agendamento.created_at).toLocaleString()}</p>
            `;
            agendamentosList.appendChild(listItem);
        });
        
        const container = document.querySelector('.container');
        container.appendChild(agendamentosList);
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao carregar agendamentos.");
    });
}

// Adiciona os eventos aos formulários, dependendo da página
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("index.html")) {
        document.getElementById("loginForm").addEventListener("submit", loginUser);
    }
    if (window.location.pathname.includes("register.html")) {
        document.getElementById("registerForm").addEventListener("submit", registerUser);
    }
    if (window.location.pathname.includes("dashboard.html")) {
        loadUsers();
        loadAgendamentos(); // Adicione esta linha
    }
    if (window.location.pathname.includes("agendar_visita.html")) {
        document.getElementById("agendarForm").addEventListener("submit", submitAgendamento);
    }
});
