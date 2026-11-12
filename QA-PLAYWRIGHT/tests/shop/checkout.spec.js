import { test, expect } from '../fixtures.js';
import checkoutData from '../../test-data/checkout-data.json';

// la cuenta de prueba y su carrito son compartidos: estos tests no pueden correr en paralelo
test.describe.configure({ mode: 'serial' });

test.describe('Checkout', () => {
 // CP-01 es data-driven: el mismo flujo corre una vez por cada pedido del JSON
for (const order of checkoutData.orders) {
  test.describe(`Pedido de ${order.label}`, () => {
    test.use({ orderProduct: order.product });

    test(`CP-CHECKOUT-01: completar el pedido con tarjeta (${order.label})`, async ({
      checkoutAtAddress: checkoutPage,
      paymentPage,
    }) => {
      await checkoutPage.placeOrder(order.comment);
      await paymentPage.payWithCard(checkoutData.card);
      await expect(paymentPage.orderConfirmation).toBeVisible();
    });
  });
}

  test('CP-CHECKOUT-02: el resumen muestra la dirección y el producto', async ({
    checkoutAtAddress: checkoutPage,
  }) => {
    await expect(checkoutPage.deliveryAddress).toContainText(/\S/);
    await expect(checkoutPage.orderReview).toContainText(checkoutData.product);
  });

  test('CP-CHECKOUT-03: pagar sin datos no confirma el pedido', async ({
    page,
    checkoutAtAddress: checkoutPage,
    paymentPage,
  }) => {
    await checkoutPage.placeOrder(checkoutData.comment);
    await paymentPage.submitEmpty();
    await expect(page).toHaveURL(/\/payment\/?$/);
    await expect(paymentPage.orderConfirmation).toBeHidden();
  });
});

// CP-04: la sesión guardada se entrega a un contexto nuevo
const testWithSession = test.extend({
  storageState: async ({ shopStorageState }, use) => {
    await use(shopStorageState);
  },
});


testWithSession(
  'CP-CHECKOUT-04: con sesión guardada llega a la dirección sin iniciar sesión',
  async ({ page, checkoutAtAddressWithSession: checkoutPage }) => {
    await expect(page.getByText('Logged in as')).toBeVisible();
    await expect(checkoutPage.orderReview).toContainText(checkoutData.product);
  }
);
