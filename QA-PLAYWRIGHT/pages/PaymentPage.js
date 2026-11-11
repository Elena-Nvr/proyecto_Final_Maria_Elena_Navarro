export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.orderConfirmation = page.getByText(/Your order has been confirmed/i);
  }

  //estación 4: llena la tarjeta y confirma el pedido
  async payWithCard(card) {
    await this.nameOnCard.fill(card.name);
    await this.cardNumber.fill(card.number);
    await this.cvc.fill(card.cvc);
    await this.expiryMonth.fill(card.expiryMonth);
    await this.expiryYear.fill(card.expiryYear);
    await this.payButton.click();
  }

  //intenta pagar sin llenar nada (para la validación)
  async submitEmpty() {
    await this.payButton.click();
  }
}