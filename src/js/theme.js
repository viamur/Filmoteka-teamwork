const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const checkBox = document.querySelector('.theme-switch__toggle');
checkBox.addEventListener('change', onCheked);
footer = document.querySelector('.footer');
header = document.querySelector('.header');
modal = document.querySelector('.modal');
console.log(modal);
function chekLocalstorage() {
  if (localStorage.getItem('cheked') === 'true') {
    checkBox.checked = true;
    document.body.classList.add('dark-theme');
    footer.classList.add('dark-theme');
  }
}
chekLocalstorage();

function onCheked(event) {
  if (checkBox.checked) {
    header.classList.add('dark-theme');
    document.body.classList.add('dark-theme');
    footer.classList.add('dark-theme');
    footer.classList.remove('light-theme');
    localStorage.setItem('Theme', 'DARK');
    localStorage.setItem('cheked', 'true');
    checkBox.checked = true;
    return;
  }

  document.body.classList.remove('dark-theme');
  footer.classList.remove('dark-theme');
  header.classList.remove('dark-theme');
  footer.classList.add('light-theme');
  localStorage.setItem('Theme', 'LIGHT');
  localStorage.setItem('cheked', 'false');
}
