//CRUD

const Users = [{
    nickname: 'Hamerte',
    bio : 'um hamerte'
}]

const Buttons = document.querySelectorAll('.btn_functions')


function get_User(nickname){
    let content = Users.find(u => u.nickname === nickname)
    let userIndex = Users.findIndex((u => u.nickname === nickname))
    const User  =  {
        User_content: content,
        User_Index: userIndex
    }
    return User
}

function add_User(nickname,bio){
    let User = get_User(nickname)
    if (nickname == '' || bio == ''){
      alert('Os campos não podem estar vazios animal!!')
    } else if (User.User_Index == -1){
      Users.push({nickname,bio})
    } else{
      alert('Usuário já existe.')
    }
    render()
}

function update_User(nickname, changes){
    let User = get_User(nickname)
    Users[User.User_Index] = changes
    console.log(`Usuário ${nickname} atualizado!!!`)
    render()
}

function delete_User(nickname){
    let User = get_User(nickname);
    Users.splice(User.User_Index,1)
    console.log(User)
    render()
}

function showActionMenu(action) {
  const modal = document.getElementById('action_menu');
  const content = document.getElementById('modal_content');
  modal.style.display = 'flex';

  // Fecha modal ao clicar fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Escolhe a ação
  switch (action) {
    // 🟢 Adicionar usuário
    case 'add':
      content.innerHTML = `
        <h2>Adicionar Usuário</h2>
        <input type="text" id="newNick" placeholder="Nickname"><br><br>
        <input type="text" id="newBio" placeholder="Bio"><br><br>
        <button id="confirmAdd">Confirmar</button>
      `;
      document.getElementById('confirmAdd').addEventListener('click', () => {
        const nick = document.getElementById('newNick').value;
        const bio = document.getElementById('newBio').value;
        add_User(nick, bio);
        modal.style.display = 'none';
      });
      break;

    // 🟠 Modificar usuário
    case 'update':
      content.innerHTML = `<h2>Selecione o usuário para modificar</h2>`;
      Users.forEach(u => {
        const btn = document.createElement('div');
        btn.className = 'user_option';
        btn.textContent = u.nickname;
        btn.addEventListener('click', () => {
          // muda o conteúdo do modal para o modo de edição
          content.innerHTML = `
            <h2>Modificar: ${u.nickname}</h2>
            <input type="text" id="newNick" placeholder="Novo nickname" value="${u.nickname}"><br><br>
            <input type="text" id="newBio" placeholder="Nova bio" value="${u.bio}"><br><br>
            <button id="confirmUpdate">Salvar</button>
          `;
          document.getElementById('confirmUpdate').addEventListener('click', () => {
            const newNick = document.getElementById('newNick').value;
            const newBio = document.getElementById('newBio').value;
            update_User(u.nickname, { nickname: newNick, bio: newBio });
            modal.style.display = 'none';
          });
        });
        content.appendChild(btn);
      });
      break;

    // 🔴 Deletar usuário
    case 'delete':
      content.innerHTML = `<h2>Selecione o usuário para deletar</h2>`;
      Users.forEach(u => {
        const btn = document.createElement('div');
        btn.className = 'user_option';
        btn.textContent = u.nickname;
        btn.addEventListener('click', () => {
          if (confirm(`Deseja deletar ${u.nickname}?`)) {
            delete_User(u.nickname);
            modal.style.display = 'none';
          }
        });
        content.appendChild(btn);
      });
      break;

    default:
      content.innerHTML = '<h2>Ação não reconhecida.</h2>';
  }
}

function render(){
    const menu = document.getElementById("users_menu");
    menu.innerHTML = '';

    Users.forEach(user => {
        const UserDiv = document.createElement("div");
        UserDiv.className = 'user_item';

        const Content = document.createElement("div");
        Content.className = 'user_header';
        const ContentHeader = document.createElement('div') 
        ContentHeader.className = 'content_header'
        ContentHeader.innerHTML = `<span>${user.nickname}</span><button class='toggle_btn'>▼</button>`;

        const HiddenContent = document.createElement('div')
        HiddenContent.className = 'user_details'
        HiddenContent.innerHTML = `<p>Name: ${user.nickname}</p><p>Bio: ${user.bio}</p>`
        
        ContentHeader.querySelector('.toggle_btn').addEventListener('click', () => {
            const visible = HiddenContent.style.display
            if (visible != 'block'){
                HiddenContent.style.display = 'block'
            } else{
                HiddenContent.style.display = 'none'
            }
        })
        Content.appendChild(ContentHeader)
        Content.appendChild(HiddenContent)
        UserDiv.appendChild(Content)
        menu.appendChild(UserDiv)
    });
}
Buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        let action = btn.dataset.func;
        showActionMenu(action);
    });
});
console.log(Buttons)
render()