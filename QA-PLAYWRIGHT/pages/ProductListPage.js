import { expect } from '@playwright/test';

export class ProductListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.title = page.locator('.features_items .title');
    this.cards = page.locator('.features_items .product-image-wrapper');
    this.names = page.locator('.features_items .productinfo p');
    this.categories = page.locator('.category-products');
    this.brands = page.locator('.brands_products');
  }

  async goto() {
    await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
  }

async search(term) {
  await this.searchInput.fill(term);
  const [response] = await Promise.all([
    this.page.waitForResponse(
      (r) => r.url().includes('/products?search=') && r.request().resourceType() === 'document'
    ),
    this.searchButton.click(),
  ]);
  expect(response.status(), `El sitio devolvió ${response.status()} (error del servidor, no del test)`).toBeLessThan(500);
}

  //nombre exacto: ^ inicio y $ fin, para que "Blue Top" no coincida con otros
  productNamed(name) {
    return this.names.filter({ hasText: new RegExp(`^\\s*${name}\\s*$`) });
  }

  //abre el grupo (Women, Men, Kids) y luego la subcategoría
   async openCategory(group, sub) {
    await this.categories.locator(`a[href="#${group}"]`).click();
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (r) => r.url().includes('/category_products/') && r.request().resourceType() === 'document'
      ),
      this.page.locator(`#${group}`).getByRole('link', { name: sub, exact: true }).click(),
    ]);
    expect(response.status(), `El sitio devolvió ${response.status()} (error del servidor, no del test)`).toBeLessThan(500);
  }

   async openBrand(name) {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (r) => r.url().includes('/brand_products/') && r.request().resourceType() === 'document'
      ),
      this.brands.getByRole('link').filter({ hasText: name }).click(),
    ]);
    expect(response.status(), `El sitio devolvió ${response.status()} (error del servidor, no del test)`).toBeLessThan(500);
  }
}