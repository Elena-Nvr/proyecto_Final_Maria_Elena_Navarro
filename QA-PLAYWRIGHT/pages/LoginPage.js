export class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByPlaceholder('Email Address').first();
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Your email or password is incorrect!');
    this.loggedInText = page.getByText('Logged in as');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }
  //metodo para navegar a la página de login
  async goto() {
    await this.page.goto('/login');
  }

  //metodo para iniciar sesion
  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}