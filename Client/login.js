let loginUser;
function displayAdminPage() {
  document.getElementById("logoutBtn").style.display = "block";
  document.getElementById("book-form-container").style.display = "block";
  document.getElementById("login-div").style.display = "none";
  document.getElementById('cartDiv').style.display ="none";
  document.getElementById('client_card_div').style.display ="none";
  getBooks();
}

function displayClientPage() {
  document.getElementById("logoutBtn").style.display = "block";
  document.getElementById("login-div").style.display = "none";
  document.getElementById('cartDiv').style.display ="block";
  getClientBook();
}

window.onload = function () {
  
   
  // addcart();

  if (sessionStorage.getItem("accessToken")) {
    displayAdminPage();
    displayClientPage();
  } else {
    document.getElementById("book-form-container").style.display = "none";
    document.getElementById("login-div").style.display = "block";
    document.getElementById('cartDiv').style.display ="none";
    document.getElementById("logoutBtn").style.display = "none";
  }

  const displaySignup = document.getElementById("signup-form");
  displaySignup.style.display = "none";

  document.getElementById("sign-btn").onclick = function (event) {
    event.preventDefault();
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-div").style.display = "none";

    //!displaySignup.style.display = "none";
  };

  //! add/update Books
  document.getElementById("submit-btn").onclick = function (event) {
    event.preventDefault();
    if (!document.getElementById("submit-btn").dataset.id) {
      addBook();
    } else {
      editProduct();
    }
  };

  document.getElementById("login-btn").onclick = async (event) => {
    event.preventDefault();
    const usernameinput = document.getElementById("username");
    const passwordinput = document.getElementById("password");
    const warrningdisplay = document.getElementById("error-msg");
    
    loginUser = document.getElementById('username').value;
    document.getElementById('userID').innerHTML = loginUser;
    const result = await fetch("http://localhost:3006/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameinput.value,
        password: passwordinput.value,
      }),
    }).then((data) => data.json());

    if (result.jwtToken) {
      sessionStorage.setItem("accessToken", result.jwtToken);
      let tokens = result.jwtToken;
      let payload = tokens.split(".")[1];
      console.log(JSON.parse(atob(payload)));
      member = JSON.parse(atob(payload)).role;
      if (JSON.parse(atob(payload)).role === "admin") {
        displayAdminPage();
      } else {
        //!dissplay client page
        displayClientPage();
        console.log("final try");
      }
    } else {
      console.log("try again");
      usernameinput.value = "";
      passwordinput.value = "";
      warrningdisplay.innerText = "Wrong password and username";
      setTimeout(() => {
        warrningdisplay.style.display = "none";
      }, 3000);
    }
  };

  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("accessToken");
    location.reload();
  });

  document
    .getElementById("reg-btn")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      let result = await fetch("http://localhost:3006/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: document.getElementById("signup-username").value,
          firstname: document.getElementById("signup-firstname").value,
          lastname: document.getElementById("signup-lastname").value,
          password: document.getElementById("signup-password").value,
        }),
      }).then((res) => res.json());
      console.log(result);
      document.getElementById("login-div").style.display = "block";
      document.getElementById("signup-form").style.display = "none";
     
    });

    document.getElementById("viewCart").addEventListener('click',()=>{
      console.log('viewCart')
      event.preventDefault();
      viewCartList()
    })

    
};

//!end of window load
async function viewCartList() {
  const tbodyCart = document.getElementById("cart-list-body");
  tbodyCart.innerText = "";
  const books = await (await fetch("http://localhost:3006/carts/" +  loginUser, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),   // 
      }
  })).json();

  // tablediv(books);
  books.forEach(element => {
    
      attachItemOnCartList(tbodyCart, element);
  });

}



async function getBooks() {
  let books = await fetch("http://localhost:3006/books", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
  }).then((response) => response.json());
  books.forEach((book) => renderBook(book));
}

function renderBook(book) {
  const div = document.createElement("div");
  div.classList = "col-lg-3";
  div.classList = "cardbox";
  div.id = book.id;
  div.innerHTML = `
    <svg class="card"  width="160" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
            dy=".3em">140x140</text>
        </svg>`;

  const h3 = document.createElement("h3");
  h3.textContent = book.title;

  const isbn = document.createElement("p");
  isbn.textContent = book.isbn;

  const publishedDate = document.createElement("p");
  publishedDate.publishedDate = book.publishedDate;

  const author = document.createElement("p");
  author.author = book.author;

  div.appendChild(h3);
  div.appendChild(isbn);
  div.appendChild(publishedDate);
  div.appendChild(author);

  const actions = document.createElement("p");
  const addtoCartBtn = document.createElement("button");
  addtoCartBtn.classList = "btn btn-primary btn-sm";
  addtoCartBtn.textContent = "UPDATE";
  addtoCartBtn.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("book-heading").textContent = "Edit Book";
    document.getElementById("title").value = book.title;
    document.getElementById("isbn").value = book.isbn;
    document.getElementById("publishedDate").value = book.publishedDate;
    document.getElementById("author").value = book.author;
    document.getElementById("price").value = book.price;
    document.getElementById("submit-btn").dataset.id = book.id;
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.style.marginLeft = "5px";
  deleteBtn.classList = "btn btn-danger btn-sm ";

  deleteBtn.textContent = "DELETE";
  deleteBtn.addEventListener("click", function (event) {
    console.log("clicked");
    event.preventDefault();

    fetch("http://localhost:3006/books/" + book.id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    }).then((response) => {
      alert("Delete Successfully!");
      div.remove();
    });
  });



  actions.appendChild(addtoCartBtn);
  actions.appendChild(deleteBtn);
  // actions.appendChild(addtoShopcart);

  div.appendChild(actions);

  document.getElementById("book-card").appendChild(div);
}

async function addBook() {
  let result = await fetch("http://localhost:3006/books/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      title: document.getElementById("title").value,
      isbn: document.getElementById("isbn").value,
      publishedDate: document.getElementById("publishedDate").value,
      author: document.getElementById("author").value,
      price: document.getElementById("price").value
    }),
  }).then((res) => res.json());
  document.getElementById("book-form").reset();
  renderBook(result);
}

function editProduct() {
  const id = document.getElementById("submit-btn").dataset.id;
  const title = document.getElementById("title").value;
  const isbn = document.getElementById("isbn").value;
  const publishedDate = document.getElementById("publishedDate").value;
  const author = document.getElementById("author").value;
  const price = document.getElementById("price").value
  fetch("http://localhost:3006/books/" + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      title: title,
      isbn: isbn,
      publishedDate: publishedDate,
      author: author,
      price: price
    }),
  })
    .then((response) => response.json())
    .then((jsonObj) => {
      const booksDiv = document.getElementById(id);
      booksDiv.querySelector("h3").textContent = title;
      const paragraphArr = booksDiv.querySelectorAll("p");
      paragraphArr[0].textContent = isbn;
      // paragraphArr[1].textContent = publishedDate;
      // paragraphArr[2].textContent = author;

      document.getElementById("book-heading").textContent = "Add a new Book";
      document.getElementById("submit-btn").dataset.id = "";
      document.getElementById("book-form").reset();
    });
}

async function getClientBook() {
  let books = await fetch("http://localhost:3006/books", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
  }).then((res) => res.json());
  books.forEach((book) => renderClientBook(book));
}



function renderClientBook(book) {
    let bookArray =[];
    let cart ={};
  const div = document.createElement("div");
  div.classList = "col-lg-3";
  div.classList = "cardbox";
  div.id = book.id;
  div.innerHTML = `
    <svg class="card"  width="160" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
            dy=".3em">140x140</text>
        </svg>`;

  const h3 = document.createElement("h3");
  h3.textContent = book.title;

  const price = document.createElement("p");
  price.textContent = '$'+book.price;

  const publishedDate = document.createElement("p");
  publishedDate.publishedDate = book.publishedDate;

  const author = document.createElement("p");
  author.author = book.author;

  div.appendChild(h3);
  div.appendChild(price);
  div.appendChild(publishedDate);
  div.appendChild(author);

  const actions = document.createElement("p");
  const addtoCartBtn = document.createElement("button");
  addtoCartBtn.classList = "btn btn-warning btn-sm";
  addtoCartBtn.textContent = "ADD TO CART";

   
  
  addtoCartBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(member);
   
   cart.id = document.getElementById("submit-btn").dataset.id = book.id;
   cart.title = document.getElementById("title").value=book.title;
   cart.isbn =  document.getElementById("isbn").value= book.isbn;
   cart.publishedDate =document.getElementById("publishedDate").value=book.publishedDate;
  cart.author =document.getElementById("author").value=book.author;
  cart.price = document.getElementById("price").value=book.price;
  bookArray.push(cart);
 
//   console.log(bookArray);
  

  fetch("http://localhost:3006/carts/" +  loginUser,{
    method: "POST",
    headers: {
      "Content-type": "application/json",
      'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
    },
    body: JSON.stringify(cart),
  })
    .then((res) => res.json())
    .then((data) => {console.log(data) 
      alert("One Item added to Cart");
    });  
        
});


actions.appendChild(addtoCartBtn);

div.appendChild(actions);

document.getElementById("client-book-card").appendChild(div);



}




// function tablediv(arr){
//     let tableBody = document.getElementById('cart-list-body')
//      let data ='';
  
//     for (let i = 0; i < arr.length; i++) {
// console.log(arr[i].title);
//          data += `<tr>`;
         
//          data += '<td>'+ arr[i]. productName+ '</td>';
//          data += `<td>` + arr[i].isbn + '</td>';
//          data += `<td>` + arr[i].qty + '</td>';
//          data += `</tr>`;
        
//     }
//     tableBody.innerHTML = data;
//     console.log(data)
// }








function attachItemOnCartList(tbody, element) {

  const tr = document.createElement("tr"); //<tr>

  // const pidTd = document.createElement("td"); //<td> Name </td>
  // pidTd.textContent = element.pid;
  // tr.appendChild(pidTd)


  const titleTd = document.createElement("td"); //<td> Name </td>
  titleTd.textContent = element.productName;
  tr.appendChild(titleTd)

  // const isbnTd = document.createElement("td");
  // isbnTd.textContent = element.isbn;
  // tr.appendChild(isbnTd)
  const qtyTd = document.createElement("td"); //<td> Name </td>
  qtyTd.textContent = element.qty;
  tr.appendChild(qtyTd)

  const priceTd = document.createElement("td"); //<td> Name </td>
  priceTd.textContent = element.price;
  tr.appendChild(priceTd)


  // const actionId = document.createElement("td");
  tbody.appendChild(tr)
}