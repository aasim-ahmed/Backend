const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const isValidPassword = (password) => {
    // Password validation: Minimum 8 characters, 1 uppercase, 1 lowercase, 1 digit
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };
  
  const isRequired = (field, fieldName) => {
    if (!field || field.trim().length === 0) {
      return `${fieldName} is required.`;
    }
    return null;
  };
  
  const isValidRole = (role) => {
    const validRoles = ['user', 'admin', 'technicalExpert'];
    return validRoles.includes(role);
  };
  
  export {
    isValidEmail,
    isValidPassword,
    isRequired,
    isValidRole,
  };
  