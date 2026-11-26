# proyecto_Final_Maria_Elena_Navarro
Proyecto final del bootcamp - Tecsup

**🧪 PRUEBA DE CALIDAD**

| | |
| :--- | :--- |
| 👤 **Autora** | María Elena Navarro Amaya (QA) |
| 📁 **Proyecto** | Tienda virtual (E-commerce) |

## 🗂️ Estructura del repositorio

```text
📦 proyecto_Final_Maria_Elena_Navarro/
│
├── 📂 docs/                  # Documentación del proyecto
├── 📂 Evidencia/             # Capturas de pantalla y evidencias
│
├── 📂 QA-PLAYWRIGHT/
│   ├── 📂 pages/            
│   │   ├── 📄 CartPage.js
│   │   ├── 📄 CheckoutPage.js
│   │   ├── 📄 ContactPage.js
│   │   ├── 📄 HomePage.js
│   │   ├── 📄 LoginPage.js
│   │   ├── 📄 PaymentPage.js
│   │   ├── 📄 ProductDetailPage.js
│   │   ├── 📄 ProductListPage.js
│   │   ├── 📄 ProductPage.js
│   │   ├── 📄 SignupPage.js
│   │   └── 📄 SubscriptionPage.js
│   │
│   ├── 📂 tests/
│   │   ├── 📂 auth/
│   │   │   ├── 🧪 login.spec.js
│   │   │   └── 🧪 signup.spec.js
│   │   ├── 📂 shop/
│   │   │   ├── 🧪 cart.spec.js
│   │   │   ├── 🧪 catalog.spec.js
│   │   │   ├── 🧪 checkout.spec.js
│   │   │   ├── 🧪 contact.spec.js
│   │   │   ├── 🧪 product-detail.spec.js
│   │   │   ├── 🧪 search.spec.js
│   │   │   └── 🧪 subscription.spec.js
│   │   └── 🧩 fixtures.js
│   │
│   ├── 📂 test-data/         # Datos de prueba en JSON
│   ├── 🔒 .env.example      
│   ├── 🚫 .gitignore
│   ├── ⚙️ playwright.config.js
│   ├── 📦 package.json
│   └── 📦 package-lock.json
│
└── 📘 README.md
```


## 📌 Resumen
 
Este repositorio reúne el trabajo de QA sobre una tienda virtual en dos frentes complementarios:
 
1. **Pruebas manuales y documentación:** diseño de pruebas basado en riesgo, con casos, defectos y trazabilidad.
2. **Automatización de pruebas web (QA):** una suite con Playwright (JavaScript) que automatiza los flujos de autenticación y de tienda.

## 📚 Pruebas manuales
 
| Tema | Qué se hizo |
|---|---|
| **Casos de prueba** | Diseño con ID, precondiciones, pasos, resultado esperado y resultado obtenido |
| **Tablas de decisión** | Combinación de condiciones y reglas de negocio para cubrir todos los escenarios posibles |
| **Matriz de trazabilidad** | Relación de cada requisito con sus casos de prueba para asegurar la cobertura |
| **Pruebas exploratorias** | Exploración sin guion fijo para encontrar defectos que los casos formales no detectan |
| **Reporte de defectos** | Errores documentados con pasos para reproducir, severidad, prioridad y evidencia |
| **Tipos de pruebas** | Funcionales, de regresión, de humo, exploratorias y no funcionales (usabilidad y accesibilidad) |
| **Git y GitHub** | Ramas, commits y Pull Requests para organizar y entregar el trabajo |

## 📘 Automatización en Playwright 
 
| Tema | Qué aprendí |
|---|---|
| **Localizadores** | Priorizar los más estables (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`) y respetar el modo estricto, que falla si un localizador coincide con más de un elemento |
| **Esperas** | Distinguir la implícita (`fill` y `click` esperan solos), la explícita (`await expect(...)`) y la fija (`waitForTimeout`), que se evita por volver los tests lentos e inestables |
| **Assertions** | Un test sin assertion solo ejecuta acciones y no verifica nada; se usa `await expect(...)` en lugar de `expect(await ...)` |
| **Trace Viewer** | Permite ver paso a paso por qué falló un test, en lugar de adivinarlo |
| **Page Object Model y fixtures** | Concentran localizadores y acciones de cada página; un cambio en la página se corrige en un solo lugar |
| **Configuración por entorno** | `baseURL` en la configuración y credenciales en `.env` con `dotenv` |
| **Git** | Una rama por cambio, commits con prefijo (`feat`, `fix`, `refactor`, `docs`, `test`) y Pull Request con descripción de qué cambia, cómo se probó y qué casos cubre |



## ▶️ Cómo ejecutar la automatización

**Requisitos:** Node.js 18 o superior y Git.

```bash
cd QA-PLAYWRIGHT
npm install
npx playwright install
```

**Ejecución:**

```bash
npx playwright test                       # todas las pruebas
npx playwright test --project=chromium    # solo chromium (más estable)
npx playwright test -g "CP-MAR-01"        # un caso
npx playwright show-report                # ver el reporte HTML
```

## 🛠️ Tecnologías utilizadas
* 💻 JavaScript
* 🟢 Node.js
* 🎭 Playwright
* 🧩 Page Object Model (POM)
* 🌿 Git y GitHub
* 💙 Visual Studio Code

## 🔐 Seguridad y buenas prácticas

* No subir archivos `.env` al repositorio.
* No publicar contraseñas ni datos sensibles.
* Mantener `node_modules/` fuera del control de versiones.
* Utilizar nombres de archivos, clases, métodos y variables en inglés.
* Redactar los nombres de los tests en español e incluir su ID.
* Evitar pausas fijas (`waitForTimeout`).
* Mantener los tests independientes.
* Colocar las validaciones `expect` dentro de los tests.
