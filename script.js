const myLibrary = [];
const addBookButtons = document.querySelectorAll(".add-book");
const closeDialogButton = document.querySelector("dialog > button");
const dialog = document.querySelector("dialog");
const textDiv = document.querySelector(".text");
const bookContainer = document.querySelector(".book-container");
const form = document.querySelector("form");

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function(){
            if(this.read){
                return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
            }
            return `${this.title} by ${this.author}, ${this.pages} pages, read`;
        };
    }
}

class Library{
    myLibrary = [];

    addBookToLibrary(title, author, pages, read) {
        this.myLibrary.push(new Book(title, author, pages, read));
    }

    toggleRead(index){
        this.myLibrary[index].read = !this.myLibrary[index].read
    }

    removeBookFromLibrary(index){
        this.myLibrary.splice(index, 1);
    }
}

let library = new Library();

function updateBooks(title, author, pages, read){
    library.addBookToLibrary(title, author, pages, read);
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    if(library.myLibrary.length === 1){
        toggleText();
    }
    for(let i = 0; i < library.myLibrary.length; i++){
        bookDiv.innerHTML = `<p class="book-index">Book ${i+1}</p>
                            <p><em>${library.myLibrary[i].title}</em></p>
                            <p>By ${library.myLibrary[i].author}</p>
                            <p>Pages: ${library.myLibrary[i].pages}</p>
                            <div class="buttons">
                                <button class="read-button ${library.myLibrary[i].read ? "checked" : "unchecked"}">${library.myLibrary[i].read ? "Read" : "Not Read"}</button>
                                <button class="remove-button">Remove</button>
                            </div>`
        bookContainer.insertBefore(bookDiv, document.querySelector(".book-container .add-book"));
        addButtonEvents()
    }
}

function toggleText(){
    if(textDiv.style.display === "none"){
        textDiv.style.display = "block";
        bookContainer.style.display = "none";
    }
    else{
        textDiv.style.display = "none";
        bookContainer.style.display = "grid";
    }
}

function toggleReadDisplay(target){
    let index = parseInt(target.parentNode.parentNode.firstChild.textContent.split(" ")[1]);
    library.toggleRead(index-1)
    if(library.myLibrary[index-1].read){
        target.classList.add("checked");
        target.classList.remove("unchecked");
    }else{
        target.classList.add("unchecked");
        target.classList.remove("checked");
    }
}

function removeBook(target){
    let books = document.querySelectorAll(".book");
    for(let i = 0; i < books.length; i++){
        if(books[i] == target.parentNode.parentNode){
            library.removeBookFromLibrary(i)
        }
    }
    target.parentNode.parentNode.remove();
    if(library.myLibrary.length == 0){
        toggleText();
    }else{
        books = document.querySelectorAll(".book");
        for(let i = 0; i < books.length; i++){
            books[i].firstChild.textContent = "Book " + (i+1);
        }
    }
}

function addButtonEvents(){
    let readButtons = document.querySelectorAll(".read-button");
    let removeButtons = document.querySelectorAll(".remove-button");
    readButtons[readButtons.length - 1].addEventListener("click", (event) => toggleReadDisplay(event.target));
    removeButtons[removeButtons.length - 1].addEventListener("click", (event) => removeBook(event.target));
}

addBookButtons.forEach((button) => button.addEventListener("click", () => dialog.showModal()))
closeDialogButton.addEventListener("click", () => dialog.close())

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let read = document.querySelector("#read").checked;
        updateBooks(title, author, pages, read);
        form.reset();
        dialog.close();
    } else {
        form.reportValidity();
    }
})