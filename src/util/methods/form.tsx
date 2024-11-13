export const checkIsStringLetter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only alphabets (both uppercase and lowercase)
    if (!/[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
    }
}