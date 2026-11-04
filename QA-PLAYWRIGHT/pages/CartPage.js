export class CartPage {
  constructor(page) {
    this.page = page;
  }
  
  rowFor(name) {
    return this.page.getByRole('row').filter({ hasText: name });
  }
 //metodo para obtener el precio del producto 
  quantityOf(name) {
    return this.rowFor(name).locator('.cart_quantity button'); // ← tu tabla
  }
}