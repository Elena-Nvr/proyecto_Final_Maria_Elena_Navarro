export class ContactPage {
  constructor(page) {
    this.page = page;
    this.name = page.locator('[data-qa="name"]');
    this.email = page.locator('[data-qa="email"]');
    this.subject = page.locator('[data-qa="subject"]');
    this.message = page.locator('[data-qa="message"]');
    this.uploadFile = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
    this.successMessage = page.locator('#contact-page .status.alert-success');
  }

  async goto() {
    await this.page.goto('/contact_us', { waitUntil: 'domcontentloaded' });
  }

  //llena el formulario, adjunta un archivo creado en memoria y acepta el aviso
  async send(data) {
    await this.name.fill(data.name);
    await this.email.fill(data.email);
    await this.subject.fill(data.subject);
    await this.message.fill(data.message);
    await this.uploadFile.setInputFiles({
      name: data.file.name,
      mimeType: 'text/plain',
      buffer: Buffer.from(data.file.content),
    });
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.submitButton.click();
  }
}