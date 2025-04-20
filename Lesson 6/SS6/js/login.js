const login = (event) =>{
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const  password= document.querySelector('#password').value.trim();

    let users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):{};
    let storedUser = users[username];

    if(storedUser && storedUser.password === password){
        alert('Đăng nhập thành công')
        window.location.href = 'index.html'
    }else{
        alert('Tài khoản hoặc mật khẩu đã tồn tại')
    }

}

document.querySelector('#signin').addEventListener('click',(event)=>{
login(event)
})