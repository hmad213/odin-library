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
    updateDisplay();
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

function toggleRead(){
    
}

function updateDisplay(){
    if(myLibrary.length <= 1){
        toggleText();
    }
    if(myLibrary.length >= 1){
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        for(let i = 0; i < myLibrary.length; i++){
            let readClass = "";
            if(myLibrary[i].read){
                readClass = "checked";
            }else{
                readClass = "unchecked";
            }
            bookDiv.innerHTML = `<p class="book-index">Book ${i+1}:</p>
                                <p>${myLibrary[i].title}</p>
                                <p>By ${myLibrary[i].author}</p>
                                <p>Pages: ${myLibrary[i].pages}</p>
                                <button class="read-button ${readClass}">Read</button>
                                <button class="remove-button">Remove</button>`
            bookContainer.insertBefore(bookDiv, document.querySelector(".book-container .add-book"));
        }
    }
}

function removeBookFromLibrary(){

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