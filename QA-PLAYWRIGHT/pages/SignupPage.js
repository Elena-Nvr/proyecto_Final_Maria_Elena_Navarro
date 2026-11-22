export class SignupPage {
  constructor(page) {
    this.page = page;

    // paso 1: nombre y correo en /login
    this.newUserName = page.locator('[data-qa="signup-name"]');
    this.newUserEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.existingEmailError = page.getByText('Email Address already exist!');

    // paso 2: formulario de la cuenta
    this.accountInfoTitle = page.getByText('Enter Account Information');
    this.titleMrs = page.locator('#id_gender2');
    this.password = page.locator('[data-qa="password"]');
    this.day = page.locator('[data-qa="days"]');
    this.month = page.locator('[data-qa="months"]');
    this.year = page.locator('[data-qa="years"]');
    this.firstName = page.locator('[data-qa="first_name"]');
    this.lastName = page.locator('[data-qa="last_name"]');
    this.company = page.locator('[data-qa="company"]');
    this.address = page.locator('[data-qa="address"]');
    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('[data-qa="state"]');
    this.city = page.locator('[data-qa="city"]');
    this.zipcode = page.locator('[data-qa="zipcode"]');
    this.mobile = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');

    // paso 3: confirmaciones
    this.accountCreated = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.loggedInText = page.getByText('Logged in as');
    this.deleteAccountLink = page.getByRole('link', { name: /Delete Account/ });
    this.accountDeleted = page.locator('[data-qa="account-deleted"]');
  }

  //paso 1: pide crear la cuenta con nombre y correo
  async startSignup(name, email) {
    await this.newUserName.fill(name);
    await this.newUserEmail.fill(email);
    await this.signupButton.click();
  }

  //paso 2: llena el formulario con los datos del JSON y envía
  async fillAccountForm(data) {
    await this.titleMrs.check();
    await this.password.fill(data.password);
    await this.day.selectOption(data.birth.day);
    await this.month.selectOption(data.birth.month);
    await this.year.selectOption(data.birth.year);
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.company.fill(data.company);
    await this.address.fill(data.address);
    await this.country.selectOption(data.country);
    await this.state.fill(data.state);
    await this.city.fill(data.city);
    await this.zipcode.fill(data.zipcode);
    await this.mobile.fill(data.mobile);
    await this.createAccountButton.click();
  }
}
