const passwordInput = document.querySelector('#password') as HTMLInputElement;
const copyBtn = document.querySelector('#copyBtn') as HTMLButtonElement;
const generateBtn = document.querySelector('#generateBtn') as HTMLButtonElement;
const lengthInput = document.querySelector('#length') as HTMLInputElement;
const lengthValue = document.querySelector('#lengthValue') as HTMLElement;
const message = document.querySelector('#message') as HTMLElement;

// Character sets
type CharacterOption = {
  element: HTMLInputElement;
  characters: string;
};
const characterOptions: CharacterOption[] = [
  {
    element: document.querySelector('#uppercase') as HTMLInputElement,
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  {
    element: document.querySelector('#numbers') as HTMLInputElement,
    characters: '0123456789',
  },
  {
    element: document.querySelector('#symbols') as HTMLInputElement,
    characters: '!@#$%^&*_+-=',
  },
];

const lowercase = 'abcdefghijklmnopqrstuvwxyz';

const generatePassword = (): void => {
  // Get only the checked options
  const selectedCharacters = characterOptions
    .filter((option) => option.element.checked)
    .map((option) => option.characters)
    .join('');

  const characters = lowercase + selectedCharacters;

  // Generate random characters
  const password = Array.from({ length: Number(lengthInput.value) }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);

    return characters[randomIndex];
  }).join('');

  passwordInput.value = password;
  message.textContent = '';
};

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;

  generatePassword();
});

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', async (): Promise<void> => {
  if (!passwordInput.value) return;

  await navigator.clipboard.writeText(passwordInput.value);

  message.textContent = 'Password copied!';
});
