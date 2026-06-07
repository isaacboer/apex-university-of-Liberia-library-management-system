import React, { useState, useEffect } from 'react';
import { BarChart3, Users, BookOpen, AlertCircle, Plus, Trash2, Edit } from 'lucide-react';
import { bookAPI, userAPI, fineAPI } from '../services/api';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalFines: 0,
    unpaidFines: 0,
  });
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    quantity: 1,
    description: '',
  });

  useEffect(() => {
    loadDashboardData();
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'overview') {
        const [booksRes, usersRes, finesRes] = await Promise.all([
          bookAPI.getBooks({ limit: 100 }),
          userAPI.getAllUsers({ limit: 100 }),
          fineAPI.getAllFines({ limit: 100 }),
        ]);

        setBooks(booksRes.data.data);
        setUsers(usersRes.data.data);
        setFines(finesRes.data.data);

        setStats({
          totalBooks: booksRes.data.data.length,
          totalUsers: usersRes.data.data.length,
          totalFines: finesRes.data.data.length,
          unpaidFines: finesRes.data.data.filter(f => f.status === 'unpaid').length,
        });
      } else if (activeTab === 'books') {
        const response = await bookAPI.getBooks({ limit: 100 });
        setBooks(response.data.data);
      } else if (activeTab === 'users') {
        const response = await userAPI.getAllUsers({ limit: 100 });
        setUsers(response.data.data);
      } else if (activeTab === 'fines') {
        const response = await fineAPI.getAllFines({ limit: 100 });
        setFines(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await bookAPI.addBook(newBook);
      toast.success('Book added successfully!');
      setShowAddBook(false);
      setNewBook({
        title: '',
        author: '',
        isbn: '',
        category: '',
        quantity: 1,
        description: '',
      });
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to add book');
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookAPI.deleteBook(bookId);
        toast.success('Book deleted successfully!');
        loadDashboardData();
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  return (
    <main className="admin-container">
      <div className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <p>Manage library operations and resources</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={20} />
          Overview
        </button>
        <button
          className={`admin-tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          <BookOpen size={20} />
          Books
        </button>
        <button
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={20} />
          Users
        </button>
        <button
          className={`admin-tab ${activeTab === 'fines' ? 'active' : ''}`}
          onClick={() => setActiveTab('fines')}
        >
          <AlertCircle size={20} />
          Fines
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading dashboard...</div>
      ) : activeTab === 'overview' ? (
        <div className="overview-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon books">
                <BookOpen size={40} />
              </div>
              <div className="stat-details">
                <h3>Total Books</h3>
                <p className="stat-value">{stats.totalBooks}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon users">
                <Users size={40} />
              </div>
              <div className="stat-details">
                <h3>Total Users</h3>
                <p className="stat-value">{stats.totalUsers}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon fines">
                <AlertCircle size={40} />
              </div>
              <div className="stat-details">
                <h3>Unpaid Fines</h3>
                <p className="stat-value">{stats.unpaidFines}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon total">
                <BarChart3 size={40} />
              </div>
              <div className="stat-details">
                <h3>Total Fines</h3>
                <p className="stat-value">{stats.totalFines}</p>
              </div>
            </div>
          </div>

          <div className="recent-section">
            <h2>Recent Books</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {books.slice(0, 5).map(book => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}</td>
                    <td>{book.category || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'books' ? (
        <div className="books-section">
          <div className="section-header">
            <h2>Book Management</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddBook(!showAddBook)}
            >
              <Plus size={20} />
              Add New Book
            </button>
          </div>

          {showAddBook && (
            <div className="add-book-form">
              <h3>Add New Book</h3>
              <form onSubmit={handleAddBook}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      required
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      placeholder="Book title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Author *</label>
                    <input
                      type="text"
                      required
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      placeholder="Author name"
                    />
                  </div>
                  <div className="form-group">
                    <label>ISBN *</label>
                    <input
                      type="text"
                      required
                      value={newBook.isbn}
                      onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                      placeholder="ISBN"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newBook.category}
                      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      <option value="Science">Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="History">History</option>
                      <option value="Literature">Literature</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={newBook.quantity}
                      onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    placeholder="Book description"
                    rows="3"
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="btn btn-success">Add Book</button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddBook(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.category || 'N/A'}</td>
                  <td>{book.quantity}</td>
                  <td>
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDeleteBook(book.id)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : activeTab === 'users' ? (
        <div className="users-section">
          <h2>User Management</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Student ID</th>
                <th>User Type</th>
                <th>Role</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.full_name}</td>
                  <td>{user.student_id || 'N/A'}</td>
                  <td>{user.user_type}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : activeTab === 'fines' ? (
        <div className="fines-section">
          <h2>Fine Management</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Email</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Created</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {fines.map(fine => (
                <tr key={fine.id} className={`status-${fine.status}`}>
                  <td>{fine.email}</td>
                  <td>{fine.amount}</td>
                  <td>
                    <span className={`status-badge status-${fine.status}`}>
                      {fine.status}
                    </span>
                  </td>
                  <td>{new Date(fine.created_at).toLocaleDateString()}</td>
                  <td>{fine.paid_at ? new Date(fine.paid_at).toLocaleDateString() : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
};

export default AdminDashboard;
