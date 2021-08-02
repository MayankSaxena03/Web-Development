showBooks();

//Retrieve and show books
function showBooks(){
    myBooks = localStorage.getItem("myBooks");
    if (myBooks == null) {
        myBookList = [];
    } else {
        myBookList = JSON.parse(myBooks);
    }
    tableBody = document.getElementById("tableBody");
    let html = '';
    myBookList.forEach(function(element, index) {
        html += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" class="btn btn-primary" onClick="deleteBook(this.id)">Delete</button>
                </tr>`;
    });
    tableBody.innerHTML = html;
}

//Delete Books
function deleteBook(index) {
    myBooks = localStorage.getItem("myBooks");
    if (myBooks == null) {
        myBookList = [];
    } else {
        myBookList = JSON.parse(myBooks);
    }
    myBookList.splice(index,1);
    localStorage.setItem('myBooks', JSON.stringify(myBookList));
    showBooks();
}
// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() { }

//Methods To Display Prototype
Display.prototype.validate = function (book) {
    if (book.name.length == 0 || book.author.length == 0) {
        return false;
    } else {
        return true;
    }
};
Display.prototype.showAlert = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type}" role="alert">
                            ${displayMessage}
                         </div>`;
    //Timeout function below will remove bootstrap alert after 2000 ms or 2 sec.
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);
};
/* Display.prototype.add = function (book) {
    // console.log('Adding to List');
    tableBody = document.getElementById("tableBody");
    let bookDetails = `<tr>
                           <td>${book.name}</td>
                           <td>${book.author}</td>
                           <td>${book.type}</td>
                       </tr>`;
    tableBody.innerHTML += bookDetails;
}; */
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset() //This will reset the form
};


// Submit Event Listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log('You have submitted the form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let type;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    // console.log(book);

    //Getting local Storage
    let myBooks = localStorage.getItem("myBooks");
    if (myBooks == null) {
        myBookList = [];
    } else {
        myBookList = JSON.parse(myBooks);
    }
    



    let display = new Display();
    if (display.validate(book)) {
        // display.add(book);

        //Storing books in local Storage
        myBookList.push(book);
        localStorage.setItem('myBooks', JSON.stringify(myBookList));

        display.clear();
        display.showAlert('success', 'Your Book has been added to the list');
        showBooks(); //Refreshing book window
    } else {
        // Show error to user
        display.showAlert('danger', 'Please fill all the details');
    }

    e.preventDefault();

}