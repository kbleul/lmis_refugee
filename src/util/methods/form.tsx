export const checkIsStringLetter = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  // Allow only alphabets (both uppercase and lowercase)
  if (!/[a-zA-Z]/.test(e.key)) {
    e.preventDefault();
  }
};

export const validateMinAge = (value: string): boolean | string => {
    const selectedDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - selectedDate.getFullYear();
    const monthDifference = today.getMonth() - selectedDate.getMonth();
    const dayDifference = today.getDate() - selectedDate.getDate();
  
    // Adjust age if the birthday hasn't occurred this year yet
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age -= 1;
    }
  
    return age >= 15 || "You must be at least 15 years old";
  };
