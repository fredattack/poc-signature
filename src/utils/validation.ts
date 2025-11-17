/**
 * Validation Utilities
 *
 * Client-side validation functions for authentication forms.
 * All validation functions return null on success or an error message on failure.
 */

import { PasswordStrength, PasswordStrengthResult } from '../types/auth.types';
import { AUTH_ERROR_MESSAGES } from '../constants/auth-design';

// ============================================================================
// EMAIL VALIDATION
// ============================================================================

/**
 * Validates an email address
 * @param email - Email address to validate
 * @returns Error message or null if valid
 */
export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') {
    return AUTH_ERROR_MESSAGES.fr.invalid_email;
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return AUTH_ERROR_MESSAGES.fr.invalid_email;
  }

  // Additional checks
  if (email.length > 254) {
    return 'Email trop long (max 254 caractères)';
  }

  return null;
};

// ============================================================================
// PASSWORD VALIDATION
// ============================================================================

/**
 * Validates a password against security requirements
 * @param password - Password to validate
 * @returns Error message or null if valid
 */
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Mot de passe requis';
  }

  if (password.length < 8) {
    return 'Minimum 8 caractères';
  }

  if (password.length > 128) {
    return 'Maximum 128 caractères';
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return 'Au moins une minuscule requise';
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Au moins une majuscule requise';
  }

  if (!/(?=.*\d)/.test(password)) {
    return 'Au moins un chiffre requis';
  }

  // Optional: Check for special characters (recommended but not required)
  // if (!/(?=.*[@$!%*?&#])/.test(password)) {
  //   return 'Au moins un caractère spécial recommandé';
  // }

  return null;
};

/**
 * Calculates password strength and provides feedback
 * @param password - Password to analyze
 * @returns Password strength result with score and feedback
 */
export const calculatePasswordStrength = (
  password: string
): PasswordStrengthResult => {
  let score = 0;
  const feedback: string[] = [];

  // Length check
  const hasMinLength = password.length >= 8;
  if (hasMinLength) {
    score += 1;
  } else {
    feedback.push('Utilisez au moins 8 caractères');
  }

  // Bonus for longer passwords
  if (password.length >= 12) {
    score += 0.5;
  }
  if (password.length >= 16) {
    score += 0.5;
  }

  // Character type checks
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&#]/.test(password);

  if (hasLowerCase) score += 0.5;
  else feedback.push('Ajoutez des minuscules');

  if (hasUpperCase) score += 0.5;
  else feedback.push('Ajoutez des majuscules');

  if (hasNumber) score += 0.5;
  else feedback.push('Ajoutez des chiffres');

  if (hasSpecialChar) score += 1;
  else feedback.push('Ajoutez des caractères spéciaux (@$!%*?&#)');

  // Check for common patterns
  if (/^(123|abc|qwerty|password)/i.test(password)) {
    score -= 1;
    feedback.push('Évitez les mots de passe courants');
  }

  // Check for repeating characters
  if (/(.)\1{2,}/.test(password)) {
    score -= 0.5;
    feedback.push('Évitez les caractères répétés');
  }

  // Normalize score to 0-4 range
  const normalizedScore = Math.max(0, Math.min(4, score));

  // Determine strength
  let strength: PasswordStrength;
  if (normalizedScore < 2) {
    strength = 'weak';
  } else if (normalizedScore < 3) {
    strength = 'medium';
  } else if (normalizedScore < 4) {
    strength = 'strong';
  } else {
    strength = 'very-strong';
  }

  return {
    strength,
    score: normalizedScore,
    feedback,
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  };
};

/**
 * Validates password confirmation matches password
 * @param password - Original password
 * @param confirmation - Password confirmation
 * @returns Error message or null if valid
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmation: string
): string | null => {
  if (!confirmation) {
    return 'Confirmation du mot de passe requise';
  }

  if (password !== confirmation) {
    return AUTH_ERROR_MESSAGES.fr.password_mismatch;
  }

  return null;
};

// ============================================================================
// NAME VALIDATION
// ============================================================================

/**
 * Validates a name field (first name or last name)
 * @param name - Name to validate
 * @param field - Field name for error messages
 * @returns Error message or null if valid
 */
export const validateName = (name: string, field: string): string | null => {
  if (!name || name.trim() === '') {
    return `${field} requis`;
  }

  if (name.trim().length < 2) {
    return `${field} trop court (minimum 2 caractères)`;
  }

  if (name.length > 50) {
    return `${field} trop long (maximum 50 caractères)`;
  }

  // Allow letters, spaces, hyphens, and apostrophes
  // This regex supports international characters (é, ñ, etc.)
  if (!/^[\p{L}\s'-]+$/u.test(name)) {
    return `${field} contient des caractères invalides`;
  }

  return null;
};

// ============================================================================
// MFA CODE VALIDATION
// ============================================================================

/**
 * Validates a 6-digit MFA code
 * @param code - MFA code to validate
 * @returns Error message or null if valid
 */
export const validateMFACode = (code: string): string | null => {
  if (!code) {
    return 'Code MFA requis';
  }

  if (!/^\d{6}$/.test(code)) {
    return 'Code MFA doit contenir 6 chiffres';
  }

  return null;
};

// ============================================================================
// TERMS ACCEPTANCE VALIDATION
// ============================================================================

/**
 * Validates that terms and conditions have been accepted
 * @param accepted - Whether terms have been accepted
 * @returns Error message or null if valid
 */
export const validateTermsAcceptance = (accepted: boolean): string | null => {
  if (!accepted) {
    return "Vous devez accepter les conditions d'utilisation";
  }

  return null;
};

// ============================================================================
// FORM VALIDATION HELPERS
// ============================================================================

/**
 * Validates a complete registration form
 * @param data - Registration form data
 * @returns Object with validation status and errors
 */
export const validateRegistrationForm = (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  accept_terms: boolean;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const firstNameError = validateName(data.first_name, 'Prénom');
  if (firstNameError) errors.first_name = firstNameError;

  const lastNameError = validateName(data.last_name, 'Nom');
  if (lastNameError) errors.last_name = lastNameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  const confirmationError = validatePasswordConfirmation(
    data.password,
    data.password_confirmation
  );
  if (confirmationError) errors.password_confirmation = confirmationError;

  const termsError = validateTermsAcceptance(data.accept_terms);
  if (termsError) errors.accept_terms = termsError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a complete login form
 * @param data - Login form data
 * @returns Object with validation status and errors
 */
export const validateLoginForm = (data: {
  email: string;
  password: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  if (!data.password) {
    errors.password = 'Mot de passe requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a forgot password form
 * @param email - Email address
 * @returns Object with validation status and errors
 */
export const validateForgotPasswordForm = (
  email: string
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a reset password form
 * @param data - Reset password form data
 * @returns Object with validation status and errors
 */
export const validateResetPasswordForm = (data: {
  password: string;
  password_confirmation: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  const confirmationError = validatePasswordConfirmation(
    data.password,
    data.password_confirmation
  );
  if (confirmationError) errors.password_confirmation = confirmationError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
