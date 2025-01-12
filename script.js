const myLibrary = [];
const addBookButtons = document.querySelectorAll(".add-book");
const closeDialogButton = document.querySelector("dialog > button");
const dialog = document.querySelector("dialog");
const textDiv = document.querySelector(".text");
const bookContainer = document.querySelector(".book-container");
const form = document.querySelector("form");

function Book(title, author, pages, read){
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

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    if(myLibrary.length === 1){
        toggleText();
    }
    for(let i = 0; i < myLibrary.length; i++){
        bookDiv.innerHTML = `<p class="book-index">Book ${i+1}</p>
                            <p><em>${myLibrary[i].title}</em></p>
                            <p>By ${myLibrary[i].author}</p>
                            <p>Pages: ${myLibrary[i].pages}</p>
                            <div class="buttons">
                                <button class="read-button ${myLibrary[i].read ? "checked" : "unchecked"}">${myLibrary[i].read ? "Read" : "Not Read"}</button>
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

function toggleRead(target){
    let index = parseInt(target.parentNode.parentNode.firstChild.textContent.split(" ")[1]);
    myLibrary[index-1].read = !myLibrary[index-1].read;
    if(myLibrary[index-1].read){
        target.classList.add("checked");
        target.classList.remove("unchecked");
    }else{
        target.classList.add("unchecked");
        target.classList.remove("checked");
    }
}

function removeBookFromLibrary(target){
    let books = document.querySelectorAll(".book");
    for(let i = 0; i < books.length; i++){
        if(books[i] == target.parentNode.parentNode){
            myLibrary.splice(i, 1);
        }
    }
    target.parentNode.parentNode.remove();
    if(myLibrary.length == 0){
        toggleText()
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
    readButtons[readButtons.length - 1].addEventListener("click", (event) => toggleRead(event.target));
    removeButtons[removeButtons.length - 1].addEventListener("click", (event) => removeBookFromLibrary(event.target));
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
        addBookToLibrary(title, author, pages, read);
        form.reset();
        dialog.close();
    } else {
        form.reportValidity();
    }
})