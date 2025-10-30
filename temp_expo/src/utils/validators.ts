// Input validation utilities

export const validateCelebrityName = (name: string): { isValid: boolean; error?: string } => {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'Celebrity name is required' };
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: 'Celebrity name must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { isValid: false, error: 'Celebrity name must be less than 100 characters' };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: 'Celebrity name contains invalid characters' };
  }

  return { isValid: true };
};

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }

  if (password.length > 128) {
    return { isValid: false, error: 'Password must be less than 128 characters' };
  }

  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return { isValid: false, error: 'Password must contain letters and numbers' };
  }

  return { isValid: true };
};

export const validateSignaturePaths = (paths: any[]): { isValid: boolean; error?: string } => {
  if (!paths || paths.length === 0) {
    return { isValid: false, error: 'Please draw at least one stroke' };
  }

  return { isValid: true };
};
