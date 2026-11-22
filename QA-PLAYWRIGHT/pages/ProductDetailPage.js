export class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.info = page.locator('.product-information');
    this.name = this.info.getByRole('heading', { level: 2 });
    this.category = this.info.locator('p').filter({ hasText: 'Category:' });
    this.price = this.info.getByText(/Rs\. \d+/);
    this.availability = this.info.locator('p').filter({ hasText: 'Availability:' });
    this.condition = this.info.locator('p').filter({ hasText: 'Condition:' });
    this.brand = this.info.locator('p').filter({ hasText: 'Brand:' });
    this.quantity = page.locator('#quantity');

    // reseña
    this.reviewName = page.locator('#name');
    this.reviewEmail = page.locator('#email');
    this.reviewText = page.locator('#review');
    this.reviewButton = page.locator('#button-review');
    this.reviewSuccess = page.getByText('Thank you for your review.');
  }

  //escribe y envía una reseña con los datos del JSON
  async writeReview(review) {
    await this.reviewName.fill(review.name);
    await this.reviewEmail.fill(review.email);
    await this.reviewText.fill(review.text);
    await this.reviewButton.click();
  }
}
