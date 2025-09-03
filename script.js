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
        const bookButtons = document.createElement("div");
        const booktitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookReadState = document.createElement("p");
        const deleteBook = document.createElement("button");
        const toggleReadStatus = document.createElement("button");
        deleteBook.classList.add("delete-book");
        toggleReadStatus.classList.add("toggle-read");
        bookButtons.classList.add("book-buttons");
        bookCard.classList.add("book-card");
        
        booktitle.textContent = `${book.title}`;
        bookAuthor.textContent = `${book.author}`;
        bookPages.textContent = `${book.pages}`;
        bookReadState.textContent = book.hasRead ? "Read" : "Not Read";
        deleteBook.textContent = "Delete Book";
        toggleReadStatus.textContent = "Toggle";        

        toggleReadStatus.addEventListener("click", () => {
            book.hasRead = !book.hasRead;
            displayBooks();
        })

        bookCard.append(booktitle);
        bookCard.append(bookAuthor);
        bookCard.append(bookPages);
        bookCard.append(bookReadState);
        bookButtons.append(deleteBook);
        bookButtons.append(toggleReadStatus);

        bookCard.append(bookButtons);
        container.append(bookCard);
    }
}

// delete book function using delegation
container.addEventListener("click", (e) => {
    if (e.target.matches(".delete-book")) {
        const id = e.target.id;
        const bookDeleteIndex = myLibrary.findIndex(book => book.id === id);

        myLibrary.splice(bookDeleteIndex, 1);
        displayBooks();
    }
});

newBook.addEventListener("click", () => {
    dialog.showModal();
    console.log("working!");
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

