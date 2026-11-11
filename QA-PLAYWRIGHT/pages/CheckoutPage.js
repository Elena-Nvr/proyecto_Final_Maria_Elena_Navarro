import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.orderReview = page.locator('#cart_info');
    this.comment = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
  }

  //espera a que la tienda cargue la dirección de la cuenta 
  async waitForSavedAddress() {
    await expect(this.deliveryAddress).toContainText(/\S/);
    await expect(this.billingAddress).toContainText(/\S/);
  }

  //estación 3: escribe el comentario y pasa al pago
  async placeOrder(comment) {
    await this.comment.fill(comment);
    await this.placeOrderButton.click();
  }
}