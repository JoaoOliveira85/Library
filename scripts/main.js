let myLibrary = [];

if (localStorage.getItem("myLibrary") === null) {
	myLibrary = [];
} else {
	myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

function book(title, author, pages, status) {
	(this.title = title),
		(this.author = author),
		(this.pages = pages),
		(this.status = status);
}

function addBookToLibrary(bookToAdd) {
	myLibrary.push(bookToAdd);
}

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
		const removeBook = document.createElement("div");
		removeBook.style.position = "relative";
		removeBook.style.top = "0px";
		removeBook.style.left = "100%";
		removeBook.innerText = "X";
		removeBook.addEventListener("click", () => {
			myLibrary.splice(1, i);
			drawBookshelf();
			saveItem("myLibrary", myLibrary);
		});
		book.appendChild(removeBook);
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
		bookStatus.style.fontWeight = "bold";
		bookStatus.addEventListener("click", () => {
			myLibrary[i].status = !myLibrary[i].status;
			bookStatus.innerText = `Status: ${
				myLibrary[i].status ? "Read" : "Not read"
			}`;
			saveItem("myLibrary", myLibrary);
		});
		book.appendChild(bookStatus);
		bookshelf.appendChild(book);
	}
};

const addButton = document.createElement("button");
addButton.innerText = "Add Book!";
document.getElementById("bookForm").style.display = "none";

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

const saveItem = (storageName, item) => {
	localStorage.setItem(`${storageName}`, JSON.stringify(item));
};

const addBook = document.getElementById("addBook");
addBook.addEventListener("click", () => {
	addBookToLibrary({
		title: document.getElementById("titleInput").value,
		author: document.getElementById("authorInput").value,
		pages: document.getElementById("pagesInput").value,
		status: document.getElementById("statusInput").checked,
	});
	saveItem("myLibrary", myLibrary);
	drawBookshelf();
});

buttons.appendChild(addButton);
drawBookshelf();
