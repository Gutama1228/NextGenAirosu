// Email validation
export const validateEmail = (email) => {
  if (!email) return 'Email wajib diisi';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Format email tidak valid';
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password wajib diisi';
  if (password.length < 8) return 'Password minimal 8 karakter';
  if (!/[A-Z]/.test(password)) return 'Password harus mengandung huruf besar';
  if (!/[a-z]/.test(password)) return 'Password harus mengandung huruf kecil';
  if (!/[0-9]/.test(password)) return 'Password harus mengandung angka';
  return null;
};

// Name validation
export const validateName = (name) => {
  if (!name) return 'Nama wajib diisi';
  if (name.length < 3) return 'Nama minimal 3 karakter';
  if (name.length > 50) return 'Nama maksimal 50 karakter';
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Konfirmasi password wajib diisi';
  if (password !== confirmPassword) return 'Password tidak cocok';
  return null;
};

// Form validation
export const validateLoginForm = (email, password) => {
  const errors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  if (!password) errors.password = 'Password wajib diisi';
  
  return errors;
};

export const validateRegisterForm = (name, email, password, confirmPassword) => {
  const errors = {};
  
  const nameError = validateName(name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  return errors;
};
