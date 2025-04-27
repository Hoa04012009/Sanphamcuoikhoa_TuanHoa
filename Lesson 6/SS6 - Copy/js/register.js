const register = (event) =>{

  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirm = document.querySelector('#confirm-password').value.trim();

 //regular expresstion
 lowerCase= /[a-z]/g;
 upperCase= /[A-Z]/g;
 number=/[0-9]/g;

  if(!username || !email || !password || !confirm-password){
    alert('Bạn vui lòng nhập đầy đủ dữ liệu!!');
    return;
  }

  if(password !== confirm-password){
    alert('Mật khẩu chưa chính xác');
    return;
  }

  if(password.length <8){
    alert('Mật khẩu phải có ít nhất 8 ký tự');
    return;
  }

  if(!lowerCase.test(password)){
    alert('Mật khẩu phải có ít nhất một ký tự thường!');
    return;
  }

  if(!upperCase.test(password)){
    alert('Mật khẩu phải có ít nhất một ký tự thường!');
    return;
  }

  if(!number.test(password)){
    alert('Mật khẩu phải có ít nhất một chữ sô!');
    return;
  }

  let user = {
    username: username,
    email: email,
    password:password,
  }

  //Toán tử ba ngôi
  let users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):{};
  if(users[username]){
    alert('Tài khoản đã tồn tại');
    return;
  }else{
    user[username] = user
    localStorage.setItem('users',JSON.stringify(users));
    alert('Đã đăng ký thành công')
  }


}

document.querySelector('#signup').addEventListener('click', (event) =>{
  register(event);
})