const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

if (registerBtn && loginBtn && container) {
  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
} else {
  console.error("Login/Register Elements not found in the DOM.");
}

// Theme switching logic
const lightThemeButton = document.getElementById("theme-light-button");
const darkThemeButton = document.getElementById("theme-dark-button");
const systemThemeButton = document.getElementById("theme-system-button");
const bodyElement = document.body;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setActiveThemeButton(themeName) {
  [lightThemeButton, darkThemeButton, systemThemeButton].forEach((button) => {
    if (button.id === `theme-${themeName}-button`) {
      button.classList.add("active-theme");
    } else {
      button.classList.remove("active-theme");
    }
  });
}

function applySystemTheme() {
  if (prefersDarkScheme.matches) {
    bodyElement.dataset.theme = "dark";
  } else {
    bodyElement.dataset.theme = "light";
  }
}

// Listener for system theme changes
function systemThemeChangeListener(event) {
  applySystemTheme();
}

function applyTheme(themeName) {
  localStorage.setItem("theme", themeName);
  setActiveThemeButton(themeName);

  // Remove system theme listener if an explicit choice is made
  prefersDarkScheme.removeEventListener("change", systemThemeChangeListener);

  if (themeName === "light") {
    bodyElement.dataset.theme = "light";
  } else if (themeName === "dark") {
    bodyElement.dataset.theme = "dark";
  } else if (themeName === "system") {
    applySystemTheme(); // Apply current system theme immediately
    // Add listener for future system theme changes
    prefersDarkScheme.addEventListener("change", systemThemeChangeListener);
  }
}

// Event listeners for theme buttons
if (lightThemeButton && darkThemeButton && systemThemeButton) {
  lightThemeButton.addEventListener("click", () => {
    applyTheme("light");
  });

  darkThemeButton.addEventListener("click", () => {
    applyTheme("dark");
  });

  systemThemeButton.addEventListener("click", () => {
    applyTheme("system");
  });
} else {
  console.error("Theme toggle buttons not found in the DOM.");
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Default to system theme if no preference is saved
    applyTheme("system");
  }
});
