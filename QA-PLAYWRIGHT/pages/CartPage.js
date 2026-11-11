
import { expect } from '@playwright/test';
export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('.check_out'); //metodo para obtener el boton de checkout
    this.deleteButtons = page.locator('.cart_quantity_delete'); //las x que eliminan cada fila del carrito

  }
  
  rowFor(name) {
    return this.page.getByRole('row').filter({ hasText: name });
  }
 //metodo para obtener el precio del producto 
  quantityOf(name) {
    return this.rowFor(name).locator('.cart_quantity button'); // ← tu tabla
  }

  //vacía el carrito de la cuenta para no arrastrar productos de corridas anteriores
  async empty() {
    await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
    while ((await this.deleteButtons.count()) > 0) {
      const before = await this.deleteButtons.count();
      await this.deleteButtons.first().click();
      await expect(this.deleteButtons).toHaveCount(before - 1);
    }
  }

  //estación 1: del carrito al checkout
async startCheckout() {
  await this.page.waitForLoadState('load');
  await expect(this.checkoutButton).toBeVisible();
  await this.checkoutButton.click();
  await expect(this.page).toHaveURL(/\/checkout/);
  }
}
