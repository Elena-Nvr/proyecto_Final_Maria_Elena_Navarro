export class SubscriptionPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByPlaceholder('Your email address');
    this.subscribeButton = page.locator('#subscribe');
    this.successMessage = page.getByText('You have been successfully subscribed!');
  }

  //suscribe un correo desde el pie de página
  async subscribe(email) {
    await this.email.fill(email);
    await this.subscribeButton.click();
  }
}
