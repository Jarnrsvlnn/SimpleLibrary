const container = document.querySelector(".container");
const newBook = document.querySelector(".new-book");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector("dialog button");
const bookForm = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead === "true";
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
}

function displayBooks() {
    container.innerHTML = "";

    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        const bookDetails = document.createElement("div");
        const bookText = document.createElement("div");
        const bookButtons = document.createElement("div");
        const bookImage = document.createElement("div");
        const booktitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookReadState = document.createElement("p");
        const deleteBook = document.createElement("button");
        const toggleReadStatus = document.createElement("button");

        // adding classes to each elements to style them in css
        deleteBook.classList.add("delete-book");
        toggleReadStatus.classList.add("toggle-read");
        bookButtons.classList.add("book-buttons");
        bookCard.classList.add("book-card");
        bookText.classList.add("book-text");
        bookImage.classList.add("book-image");
        bookDetails.classList.add("book-upper-container")
        
        // attach each books id to their respective buttons sothat we can call them properly later
        deleteBook.dataset.id = book.id;
        toggleReadStatus.dataset.id = book.id;

        booktitle.textContent = `${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages}`;
        bookReadState.textContent = book.hasRead ? "Status: Read" : "Status: Not Read";
        deleteBook.textContent = "Delete Book";
        toggleReadStatus.textContent = "Toggle";        

        bookText.append(booktitle);
        bookText.append(bookAuthor);
        bookText.append(bookPages);
        bookText.append(bookReadState);
        bookButtons.append(toggleReadStatus);
        bookButtons.append(deleteBook);

        bookDetails.append(bookImage);
        bookDetails.append(bookText);

        bookCard.append(bookDetails);
        bookCard.append(bookButtons);
        container.append(bookCard);
    }
}

// delete book function using delegation
container.addEventListener("click", (e) => {
    if (e.target.matches(".delete-book")) {
        const id = e.target.dataset.id;
        const bookDeleteIndex = myLibrary.findIndex(book => book.id === id);

        const cardToRemove = e.target.closest(".book-card");
        cardToRemove.classList.add("removing");

        // wait for animation, then remove
        setTimeout(() => {
            myLibrary.splice(bookDeleteIndex, 1);
            displayBooks();
        }, 300); // matches CSS transition duration
    }
});

// toggle book read status using delegation
container.addEventListener("click", (e) => {
    if (e.target.matches(".toggle-read")) {
        const id = e.target.dataset.id;
        const bookToToggle = myLibrary.findIndex(book => book.id === id);

        myLibrary[bookToToggle].hasRead = !myLibrary[bookToToggle].hasRead;
        displayBooks();
    }
});

newBook.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
})

bookForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const pages = document.getElementById("book-pages").value;
    const readStatus = document.getElementById("read-status").value;

    addBookToLibrary(title, author, pages, readStatus);
    displayBooks();
    dialog.close()
});

