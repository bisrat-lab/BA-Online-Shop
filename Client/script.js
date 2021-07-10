function basicPopup(url) {
    popupWindow = window.open(url,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
 
}


window.onload = function(){


    //!get all books
    getBooks();

    //! add/update Books
    document.getElementById('submit-btn').onclick = function(event) {
        event.preventDefault();
            if (!document.getElementById('submit-btn').dataset.id) {
                addBook()  
            } else {
                editProduct();
            }  
    }

    
}

async function getBooks(){
    let books = await fetch('http://localhost:3005/books/',{
        method: 'GET'
    }).then(response => response.json());
    books.forEach(book => renderBook(book));
}

function renderBook(book){
    const div = document.createElement('div');
    div.classList = 'col-lg-3';
    div.classList = 'cardbox';
    div.id = book.id;
    div.innerHTML = `
    <svg class="card"  width="160" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
            dy=".3em">140x140</text>
        </svg>`;

    const h3 = document.createElement('h3');
    h3.textContent = book.title;

    const isbn = document.createElement('p');
    isbn.textContent = book.isbn;

    const publishedDate = document.createElement('p');
    publishedDate.publishedDate = book.publishedDate;

    const author = document.createElement('p');
    author.author = book.author;

    div.appendChild(h3);
    div.appendChild(isbn);
    div.appendChild(publishedDate);
    div.appendChild(author); 

    const actions = document.createElement('p');
    const updateBtn = document.createElement('button');
    updateBtn.classList = 'btn btn-primary btn-sm';
    updateBtn.textContent = 'UPDATE';
    updateBtn.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('book-heading').textContent = 'Edit Book';
        document.getElementById('title').value = book.title;
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('publishedDate').value = book.publishedDate;
        document.getElementById('author').value = book.author;
        document.getElementById('submit-btn').dataset.id = book.id;
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.classList = 'btn btn-danger btn-sm ';
    
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', function(event) {
        console.log('clicked')
        event.preventDefault();

        fetch('http://localhost:3005/books/' + book.id, {
            method: 'DELETE'
            // headers: {
            //     'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            // }
        }).then(response => {
            alert('Delete Successfully!');
            div.remove();
        });
    });

    actions.appendChild(updateBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(actions);

    document.getElementById('book-card').appendChild(div);

}
async function addBook(){
    let result = await fetch('http://localhost:3005/books/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            // 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            title: document.getElementById('title').value,
            isbn: document.getElementById('isbn').value,
            publishedDate: document.getElementById('publishedDate').value,
            author: document.getElementById('author').value
        })
    }).then(res => res.json());
    document.getElementById('book-form').reset();
    renderBook(result);
}
function editProduct() {
    const id = document.getElementById('submit-btn').dataset.id;
    const title = document.getElementById('title').value;
    const isbn = document.getElementById('isbn').value;
    const publishedDate = document.getElementById('publishedDate').value;
    const author = document.getElementById('author').value;
    fetch('http://localhost:3005/books/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                title: title,
                isbn: isbn,
                publishedDate: publishedDate,
                author: author
            })
        }).then(response => response.json())
        .then(jsonObj => {
            const booksDiv = document.getElementById(id);
            booksDiv.querySelector('h3').textContent = title;
            const paragraphArr = booksDiv.querySelectorAll('p');
            paragraphArr[0].textContent = isbn;
            // paragraphArr[1].textContent = publishedDate;
            // paragraphArr[2].textContent = author;


            document.getElementById('book-heading').textContent = 'Add a new Book';
            document.getElementById('submit-btn').dataset.id = '';
            document.getElementById('book-form').reset();
        });
}