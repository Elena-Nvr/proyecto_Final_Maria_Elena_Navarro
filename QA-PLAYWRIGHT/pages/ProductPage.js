export class ProductPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.product-information').getByRole('heading', { level: 2 });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.confirmation = page.getByText('Your product has been added to cart.');
    this.cartLink = page.getByRole('link', { name: 'View Cart' });
  }

  async addToCart() {
    await this.page.waitForLoadState('load');
    await this.addToCartButton.click();
  }

  //método para abrir el carrito de compras
  async openCart() {
    await this.cartLink.click();
  }
}
