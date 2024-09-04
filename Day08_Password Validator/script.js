const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eye-icon');
let passwordVisible = false;

const rules = {
    length: document.getElementById('length'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number'),
    special: document.getElementById('special'),
};

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    
    // Check if password meets the criteria
    checkRule(password.length >= 8, rules.length);
    checkRule(/[A-Z]/.test(password), rules.uppercase);
    checkRule(/[a-z]/.test(password), rules.lowercase);
    checkRule(/[0-9]/.test(password), rules.number);
    checkRule(/[@#$%^&*(),.?":{}|<>]/.test(password), rules.special);
});

function checkRule(condition, element) {
    if (condition) {
        element.querySelector('.circle').classList.add('valid');
    } else {
        element.querySelector('.circle').classList.remove('valid');
    }
}

function togglePassword() {
    if (passwordVisible) {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
    passwordVisible = !passwordVisible;
}

function copyPassword() {
    const password = passwordInput.value;

    if (password) {
        navigator.clipboard.writeText(password)
            .then(() => {
                alert('Password copied to clipboard!');
            })
            .catch(err => {
                alert('Failed to copy password: ', err);
            });
    } else {
        alert('No password to copy');
    }
}
