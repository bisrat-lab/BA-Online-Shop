window.onload = function () {
    const displaySignup = document.getElementById("signup-form");
    displaySignup.style.display = "none";
  
    const displayLogin = document.getElementById("login-div");
    displayLogin.style.display = "block";
    
    document.getElementById("sign-btn").onclick = function (event) {
      event.preventDefault();
  
      // displaySignup.style.display = "none";
      displayLogin.style.display = "none";
      displaySignup.style = "block";
    };
  
  
    document.getElementById("login-btn").onclick = async (event) =>{
      event.preventDefault();
      const usernameinput = document.getElementById('username');
      const passwordinput = document.getElementById('password');
      const warrningdisplay = document.getElementById('error-msg');

      const result = await fetch("http://localhost:3006/login",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              username:usernameinput.value,
              password:passwordinput.value,
          })
      }).then((data) =>data.json())
    
    console.log(result)
    if(result.jwtToken){
        sessionStorage.setItem("accesstoken",result.jwtToken);
        console.log("Home page")
    }else{
        console.log('try again')
        usernameinput.value = "";
        passwordinput.value = "";
        warrningdisplay.innerText = "Wrong password and username"
        setTimeout(()=>{
            warrningdisplay.style.display = "none"
        },3000)
        
    }
      displayLogin.style.display = "none";
  
  
    //   const username = document.getElementById("signup-username").value;
    //   const firstname = document.getElementById("signup-firstname").value;
    //   const lastname = document.getElementById("signup-lastname").value;
    //   const password = document.getElementById("signup-password").value;
  
    //   fetch("http://localhost:3007/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: username,
    //       firstname: firstname,
    //       lastname: lastname,
    //       password: password,
    //     }),
    //   }).then((data) =>data.json());
  
      displayLogin.style.display = "block";
      displaySignup.style.display = "none";
    };
  };