let myLibrary = [];

function book(title, author, pages, status) {
	(this.title = title),
		(this.author = author),
		(this.pages = pages),
		(this.status = status);
}

function addBookToLibrary(booToAdd) {
	myLibrary.push(booToAdd);
}

console.table(myLibrary);
console.log(myLibrary[0]);

const bookshelf = document.getElementById("bookshelf");
const buttons = document.getElementById("buttons");

const drawBookshelf = () => {
	let currentBookshelf = document.getElementById("bookshelf");
	while (currentBookshelf.lastElementChild) {
		currentBookshelf.removeChild(currentBookshelf.lastChild);
	}
	for (let i = 0; i < myLibrary.length; i++) {
		const book = document.createElement("div");
		book.id = `bookID${i}`;
		book.className = "books";
		const bookTitle = document.createElement("div");
		bookTitle.innerText = myLibrary[i].title;
		book.appendChild(bookTitle);
		const bookAuthor = document.createElement("div");
		bookAuthor.innerText = myLibrary[i].author;
		book.appendChild(bookAuthor);
		const bookPages = document.createElement("div");
		bookPages.innerText = `Pages: ${myLibrary[i].pages}`;
		book.appendChild(bookPages);
		const bookStatus = document.createElement("div");
		bookStatus.innerText = `Status: ${
			myLibrary[i].status ? "Read" : "Not read"
		}`;
		bookStatus.addEventListener("click", () => {
			myLibrary[i].status = !myLibrary[i].status;
			bookStatus.innerText = `Status: ${
				myLibrary[i].status ? "Read" : "Not read"
			}`;
		});
		book.appendChild(bookStatus);
		bookshelf.appendChild(book);
	}
};

const addButton = document.createElement("button");
addButton.innerText = "Add Book!";

addButton.addEventListener("click", () => {
	if (document.getElementById("bookForm").style.display === "inline") {
		document.getElementById("bookForm").style.display = "none";
	} else {
		document.getElementById("bookForm").style.display = "inline";
	}
});

addButton.style.position = "absolute";
addButton.style.top = 0;
addButton.style.left = 0;

const addBook = document.getElementById("addBook");
addBook.addEventListener("click", () => {
	addBookToLibrary({
		title: document.getElementById("titleInput").value,
		author: document.getElementById("authorInput").value,
		pages: document.getElementById("pagesInput").value,
		status: document.getElementById("statusInput").checked,
	});
	drawBookshelf();
});

buttons.appendChild(addButton);
