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
    this.hasRead = hasRead;
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
        const booktitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookReadState = document.createElement("p");
        
        booktitle.textContent = `${book.title}`;
        bookAuthor.textContent = `${book.author}`;
        bookPages.textContent = `${book.pages}`;
        bookReadState.textContent = `${book.hasRead}`;

        bookCard.append(booktitle);
        bookCard.append(bookAuthor);
        bookCard.append(bookPages);
        bookCard.append(bookReadState);

        container.append(bookCard);
    }
}

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
    const hasRead = document.getElementById("book-read").value;

    addBookToLibrary(title, author, pages, hasRead);
    displayBooks();
    dialog.close()
});