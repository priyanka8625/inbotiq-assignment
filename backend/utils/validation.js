export const validateSignup = ({ name, email, password, role }) => {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!role || !['USER', 'ADMIN'].includes(role)) {
    errors.push('Role must be USER or ADMIN');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateLogin = ({ email, password }) => {
  const errors = [];

  if (!email || !email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};