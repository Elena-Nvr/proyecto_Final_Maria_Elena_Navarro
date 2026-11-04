export class HomePage {
  constructor(page) {
    this.page = page;
  }
  //metodo para navegar a la página de inicio
  async goto() {
    await this.page.goto('/');
  }
//metodo para abrir la página de un producto 
  async openProduct(name) {
    await this.page
      .locator('.product-image-wrapper')
      .filter({ hasText: name })
      .getByRole('link', { name: 'View Product' })
      .click();
  }
}