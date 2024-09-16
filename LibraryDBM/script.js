document.addEventListener('DOMContentLoaded', function () {
    const books = [
        { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, quantity: 5, status: 'Available' },
        { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, quantity: 8, status: 'Available' },
        { id: 3, title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', year: 1851, quantity: 3, status: 'Available' },
        { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925, quantity: 4, status: 'Available' },
        { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', year: 1813, quantity: 6, status: 'Available' },
        { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', year: 1951, quantity: 7, status: 'Available' },
        { id: 7, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', year: 1932, quantity: 5, status: 'Borrowed' },
        { id: 8, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954, quantity: 10, status: 'Available' },
        { id: 9, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937, quantity: 6, status: 'Available' },
        { id: 10, title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Historical', year: 1869, quantity: 4, status: 'Available' },
        { id: 11, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Philosophical', year: 1866, quantity: 3, status: 'Borrowed' },
        { id: 12, title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', genre: 'Philosophical', year: 1880, quantity: 2, status: 'Available' },
        { id: 13, title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', genre: 'Magical Realism', year: 1967, quantity: 5, status: 'Available' },
        { id: 14, title: 'The Divine Comedy', author: 'Dante Alighieri', genre: 'Epic', year: 1320, quantity: 1, status: 'Borrowed' },
        { id: 15, title: 'The Odyssey', author: 'Homer', genre: 'Epic', year: -800, quantity: 2, status: 'Available' },
        { id: 16, title: 'The Iliad', author: 'Homer', genre: 'Epic', year: -750, quantity: 2, status: 'Available' },
        { id: 17, title: 'Ulysses', author: 'James Joyce', genre: 'Modernist', year: 1922, quantity: 4, status: 'Borrowed' },
        { id: 18, title: 'Don Quixote', author: 'Miguel de Cervantes', genre: 'Adventure', year: 1605, quantity: 3, status: 'Available' },
        { id: 19, title: 'The Sound and the Fury', author: 'William Faulkner', genre: 'Southern Gothic', year: 1929, quantity: 3, status: 'Available' },
        { id: 20, title: 'Madame Bovary', author: 'Gustave Flaubert', genre: 'Realism', year: 1856, quantity: 5, status: 'Available' },
        { id: 21, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Philosophical', year: 1890, quantity: 6, status: 'Borrowed' },
        { id: 22, title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Gothic', year: 1847, quantity: 7, status: 'Available' },
        { id: 23, title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic', year: 1847, quantity: 4, status: 'Available' },
        { id: 24, title: 'Great Expectations', author: 'Charles Dickens', genre: 'Classic', year: 1861, quantity: 5, status: 'Available' },
        { id: 25, title: 'Anna Karenina', author: 'Leo Tolstoy', genre: 'Realism', year: 1877, quantity: 3, status: 'Borrowed' }

    ];

    const tableBody = document.getElementById('book-table-body');
    const editModal = document.getElementById('edit-book-modal');
    const closeEditModal = document.querySelector('.close-edit-modal');
    const editBookForm = document.getElementById('edit-book-form');
    const addBookButton = document.querySelector('.add-book');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.modal .close');
    const addBookForm = document.getElementById('add-book-form');
    const editStatusModal = document.getElementById('edit-status-modal');
    const closeEditStatusModal = document.querySelector('.close-edit-status-modal');
    const editStatusForm = document.getElementById('edit-status-form');
    const submitStatusBtn = document.getElementById('submit-status-btn');
    const cancelStatusBtn = document.querySelector('.cancel-status-btn');

    // Function to calculate and update total quantity
    function updateTotalQuantity() {
        const totalQuantity = books.reduce((sum, book) => sum + book.quantity, 0);
        localStorage.setItem('totalQuantity', totalQuantity);
    }

    // Function to render books in the table
    function renderBooks(filteredBooks) {
        tableBody.innerHTML = ''; // Clear existing rows
        const booksToRender = filteredBooks || books; // Render filtered or all books
        booksToRender.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.year}</td>
                <td>${book.quantity}</td>
                <td>${book.status}</td>
                <td>
                    <button class="edit-btn" data-id="${book.id}">Edit Book</button>
                    <button class="status-btn" data-id="${book.id}">Edit Status</button>
                    <button class="delete-btn" data-id="${book.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to filter books based on search input
    function filterBooks() {
        const idFilter = document.getElementById('search-bar-id').value.toLowerCase();
        const titleFilter = document.getElementById('search-bar-title').value.toLowerCase();
        const authorFilter = document.getElementById('search-bar-author').value.toLowerCase();

        const filteredBooks = books.filter(book => {
            return (idFilter === '' || book.id.toString().includes(idFilter)) &&
                   (titleFilter === '' || book.title.toLowerCase().includes(titleFilter)) &&
                   (authorFilter === '' || book.author.toLowerCase().includes(authorFilter));
        });

        renderBooks(filteredBooks);
    }

    // Event Listeners for Search Bars
    document.getElementById('search-bar-id').addEventListener('input', filterBooks);
    document.getElementById('search-bar-title').addEventListener('input', filterBooks);
    document.getElementById('search-bar-author').addEventListener('input', filterBooks);

    // Add Book Modal
    addBookButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    addBookForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const year = parseInt(document.getElementById('year').value);
        const quantity = parseInt(document.getElementById('quantity').value);
        const status = document.getElementById('status').value;

        const newId = books.length ? Math.max(...books.map(book => book.id)) + 1 : 1;

        const newBook = {
            id: newId,
            title: title,
            author: author,
            genre: genre,
            year: year,
            quantity: quantity,
            status: status
        };

        books.push(newBook);
        renderBooks();
        updateTotalQuantity(); // Update total quantity in localStorage
        modal.style.display = 'none';
        addBookForm.reset();
    });

    // Edit Book Modal
    function openEditModal(book) {
        document.getElementById('edit-title').value = book.title;
        document.getElementById('edit-author').value = book.author;
        document.getElementById('edit-genre').value = book.genre;
        document.getElementById('edit-year').value = book.year;
        document.getElementById('edit-quantity').value = book.quantity;
        document.getElementById('edit-status').value = book.status;
        editModal.style.display = 'block';
        editBookForm.dataset.id = book.id; // Store book ID in form dataset
    }

    closeEditModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    editBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = parseInt(editBookForm.dataset.id);
        const book = books.find(b => b.id === id);
        if (book) {
            book.title = document.getElementById('edit-title').value;
            book.author = document.getElementById('edit-author').value;
            book.genre = document.getElementById('edit-genre').value;
            book.year = parseInt(document.getElementById('edit-year').value);
            book.quantity = parseInt(document.getElementById('edit-quantity').value);
            book.status = document.getElementById('edit-status').value;
            renderBooks();
            updateTotalQuantity(); // Update total quantity in localStorage
            editModal.style.display = 'none';
        }
    });

    // Edit Status Modal
    function openEditStatusModal(book) {
        // Populate modal fields based on book details
        document.getElementById('borrowed-by').value = book.borrowedBy || '';
        document.getElementById('student-id').value = book.studentId || '';
        document.getElementById('date-borrowed').value = book.dateBorrowed || '';
        document.getElementById('date-returned').value = book.dateReturned || '';
        const statusSelect = document.getElementById('status');
        statusSelect.value = book.status;
        
        // Adjust button text based on current status
        submitStatusBtn.textContent = book.status === 'Available' ? 'Save Changes' : 'Mark as Returned';
        
        // Store book ID in form dataset
        editStatusForm.dataset.id = book.id;
        
        editStatusModal.style.display = 'block';
    }
    
    closeEditStatusModal.addEventListener('click', () => {
        editStatusModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editStatusModal) {
            editStatusModal.style.display = 'none';
        }
    });

    cancelStatusBtn.addEventListener('click', () => {
        editStatusModal.style.display = 'none';
        editStatusForm.reset(); // Reset the form fields (optional)
    });

    editStatusForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = parseInt(editStatusForm.dataset.id);
        const book = books.find(b => b.id === id);
        if (book) {
            if (submitStatusBtn.textContent === 'Save Changes') {
                book.borrowedBy = document.getElementById('borrowed-by').value;
                book.studentId = document.getElementById('student-id').value;
                book.dateBorrowed = document.getElementById('date-borrowed').value;
                book.dateReturned = document.getElementById('date-returned').value;
                book.status = 'Unavailable'; // Set status to Unavailable
            } else if (submitStatusBtn.textContent === 'Mark as Returned') {
                book.status = 'Available';
                book.borrowedBy = '';
                book.studentId = '';
                book.dateBorrowed = '';
                book.dateReturned = '';
            }
            renderBooks();
            updateTotalQuantity(); // Update total quantity in localStorage
            editStatusModal.style.display = 'none';
        }
    });

    // Edit and Delete Buttons
    tableBody.addEventListener('click', function (event) {
        const id = parseInt(event.target.dataset.id);
        const book = books.find(b => b.id === id);

        if (event.target.classList.contains('edit-btn')) {
            openEditModal(book);
        } else if (event.target.classList.contains('status-btn')) {
            openEditStatusModal(book);
        } else if (event.target.classList.contains('delete-btn')) {
            const confirmed = confirm(`Are you sure you want to delete "${book.title}"?`);
            if (confirmed) {
                const index = books.indexOf(book);
                if (index > -1) {
                    books.splice(index, 1);
                    renderBooks();
                    updateTotalQuantity(); // Update total quantity in localStorage
                }
            }
        }
    });

    // Initial render of books and update of total quantity
    renderBooks();
    updateTotalQuantity();
});
