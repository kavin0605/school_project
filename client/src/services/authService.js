// API configuration - use relative path when serving from same port
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

class AuthService {
  // Login user
  async login(identifier, password, role) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: identifier, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data and token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user, token: data.token };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  // Register user (for admin use)
  async register(userData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  // Get current user profile
  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'No token found' };
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
        return { success: true, user: data.data.user };
      } else {
        // Token might be expired
        this.logout();
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Get profile error:', error);
      this.logout();
      return { success: false, message: 'Failed to get user profile' };
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check user role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }

  // Check if user is admin
  isAdmin() {
    return this.hasRole('admin');
  }

  // Check if user is student
  isStudent() {
    return this.hasRole('student');
  }

  // Check if user is parent
  isParent() {
    return this.hasRole('parent');
  }

  // Check if user is teacher
  isTeacher() {
    return this.hasRole('teacher');
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;