const passwordInput = document.getElementById("password-input");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const strengthText = document.getElementById("strength-text");
const strengthFill = document.getElementById("strength-fill");

// Caracteres possíveis
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}<>?/|";

// Atualiza valor do slider
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Função para gerar senha
function generatePassword() {
  let chars = "";
  if (uppercaseCheckbox.checked) chars += uppercaseChars;
  if (lowercaseCheckbox.checked) chars += lowercaseChars;
  if (numbersCheckbox.checked) chars += numberChars;
  if (symbolsCheckbox.checked) chars += symbolChars;

  if (chars === "") {
    passwordInput.value = "";
    return;
  }

  let password = "";
  for (let i = 0; i < lengthSlider.value; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordInput.value = password;
  updateStrength(password);
}

// Função para medir força da senha
function updateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    strengthText.textContent = "Weak";
    strengthFill.style.width = "33%";
    strengthFill.style.background = "red";
  } else if (strength <= 4) {
    strengthText.textContent = "Medium";
    strengthFill.style.width = "66%";
    strengthFill.style.background = "orange";
  } else {
    strengthText.textContent = "Strong";
    strengthFill.style.width = "100%";
    strengthFill.style.background = "green";
  }
}

// Função copiar senha
copyBtn.addEventListener("click", () => {
  if (passwordInput.value) {
    navigator.clipboard.writeText(passwordInput.value);
    copyBtn.innerHTML = "<i class='bx bx-check'></i>";
    setTimeout(() => {
      copyBtn.innerHTML = "<i class='bx bx-copy'></i>";
    }, 1500);
  }
});

// Evento gerar senha
generateBtn.addEventListener("click", generatePassword);

// Gera senha inicial
generatePassword();
