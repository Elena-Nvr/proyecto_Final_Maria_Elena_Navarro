# 🧪 DOCUMENTO DE CASOS DE PRUEBA MANUALES

🛒 **Tienda Virtual (nopCommerce)**

| | |
|---|---|
| 👩‍💻 **Autora** | María Elena Navarro Amaya (QA) |
| 🎓 **Curso** | QA Automatizador (QA: Quality Assurance, en español Aseguramiento de la Calidad) · Tecsup · Módulo 1: Fundamentos de Calidad, Control de Versiones y Testing Manual |
| 📅 **Entrega** | 14 de octubre de 2026 |

---

## 📋 Resumen ejecutivo

El campo Quantity cumple su regla en la ficha de producto, pero el carrito no la aplica: hay 2 defectos abiertos y la cobertura del alcance es parcial. Resumen de cada sección:

| Sección | Resumen |
|---|---|
| 🎯 **1. Alcance y flujo crítico** | Se prueba nopCommerce solo por interfaz y de forma manual, en 8 módulos (M01 a M08; prioridad alta: M01, M02, M04 y M05). Flujo crítico elegido: iniciar sesión; con datos incorrectos el servidor responde 200 con un mensaje de error y con datos correctos responde 302. Hoy solo M01 y M04 tienen casos, parciales. |
| 🧩 **2. Casos de prueba por flujo** | 14 casos sobre el campo Quantity (CP-CANT-01 a 14), diseñados con partición de equivalencia (CE-01 a CE-07) y valores límite; los 14 pasaron. Además, CP-001 cubre el login con cuenta inexistente. Observación: casi todos los rechazos muestran el mismo mensaje genérico. |
| 🐞 **3. Defectos** | 2 defectos en el carrito: DEF-01, severidad y prioridad Alta (al editar, acepta 0 o 10001); DEF-02, severidad y prioridad Media (el máximo de 10 000 no se aplica al total acumulado). |
| ♿ **4. Accesibilidad y usabilidad** | Cinco pruebas rápidas y 3 hallazgos por confirmar en el navegador: ACC-01 (Alta; el teclado no llega a los apartados del pie de página), ACC-02 y ACC-03 (Media; foco poco visible y contraste de las flechas). |
| 🗂️ **5. Registro en Jira** | Proyecto Tienda virtual - nopCommerce con 14 casos en Done y 2 defectos en To Do (SCRUM-21 y SCRUM-22). |
| 🤖 **6. Uso de IA (Nivel 1)** | La IA apoyó la redacción, la organización de los casos y la explicación de ACC-01; revisé y verifiqué cada sugerencia antes de incorporarla. |

---

## 🎯 1. Alcance y flujo crítico

### 📌 1.1 Alcance de calidad

🎯 **Objetivo de calidad:** verificar que un cliente, como invitado o usuario registrado, pueda encontrar un producto, agregarlo al carrito y completar la compra sin errores, y que los datos de su cuenta y de sus pedidos se muestren y conserven correctamente.

🖥️ **Sistema bajo prueba:** nopCommerce, una tienda virtual de demostración de código abierto (https://demo.nopcommerce.com/). Ofrece productos de siete categorías (Computers, Electronics, Apparel, Digital downloads, Books, Jewelry y Gift Cards). No es un negocio real, por lo que se puede probar sin riesgo. Roles: invitado y usuario registrado.

| Campo | Detalle |
|---|---|
| Código del documento de alcance | QA-NAE-001 |
| Versión | 1.0 (07-oct-2026) |
| Autora | María Elena Navarro Amaya (QA) |
| Revisor | Hamet Calderón |
| Estado | Emitido para revisión |
| Clasificación | Uso académico |

✅ **Dentro del alcance.** Los módulos se priorizan por el daño que causaría un fallo al negocio. Prioridad alta: impide comprar o cobrar. Media: degrada la experiencia o los datos del cliente. Baja: no afecta la compra.

| Código | Módulo | Qué se verifica | Prioridad | Riesgo si falla |
|---|---|---|---|---|
| M01 | Registro e inicio de sesión | Crear cuenta, entrar y salir; validación de campos y mensajes de error | 🔴 Alta | El cliente no puede comprar ni ver sus pedidos |
| M02 | Catálogo de productos | Listado, detalle de producto, búsqueda | 🔴 Alta | El cliente no encuentra lo que quiere comprar |
| M03 | Filtros y ordenamiento | Filtrar por categoría y ordenar el listado | 🟡 Media | Resultados incorrectos hacen perder ventas |
| M04 | Carrito de compras | Agregar, quitar y cambiar cantidades; cálculo del total | 🔴 Alta | Totales incorrectos o carrito que pierde productos |
| M05 | Proceso de compra y pago | Datos de envío, métodos de pago y confirmación del pedido | 🔴 Alta | La tienda no puede cobrar o cobra mal |
| M06 | Cuenta del cliente | Perfil, lista de deseos y pedidos | 🟡 Media | Datos personales incorrectos o pérdida de historial |
| M07 | Formulario de contacto | Envío de mensajes y validación de campos | 🟢 Baja | El cliente no puede comunicarse con la tienda |
| M08 | Panel de administración | Revisión básica de acceso y gestión visible | 🟢 Baja | Afecta solo a quien administra la tienda |

🚫 **Fuera del alcance**

- Pruebas de carga y de rendimiento (Módulo 4 del curso).
- Pruebas de seguridad avanzadas (Módulo 4 del curso).
- Automatización de pruebas (desde el Módulo 2): en el Módulo 1 todo es manual.
- Compatibilidad en múltiples navegadores y dispositivos móviles: se prueba solo en un navegador de escritorio.
- Revisión profunda de accesibilidad: se identifican solo 2 o 3 problemas básicos.
- Código fuente, base de datos e infraestructura: se prueba desde la interfaz, sin acceso interno.

Declarar lo que queda fuera evita que "no se encontró ningún defecto" se interprete como "se probó todo".

🧪 **Tipos y niveles de prueba aplicables**

| Tipo de prueba | Nivel | Módulos | Cómo se aplica |
|---|---|---|---|
| Funcional | Sistema | M01 a M08 | Casos manuales con partición de equivalencia y valores límite |
| Funcional | Integración | M02, M04, M05 | Verificar que catálogo, carrito y pago intercambian bien la información |
| Funcional | Aceptación | M01, M04, M05 | Recorrer la compra completa como un cliente real |
| Exploratoria | Sistema | M02 a M06 | Sesiones estructuradas de 60 a 90 minutos con una meta definida |
| Usabilidad y accesibilidad (básica) | Sistema | M01 a M05 | Identificar 2 o 3 problemas básicos visibles |
| Regresión | Sistema | M04, M05 | Repetir los casos críticos cuando se reporta y corrige un defecto |

🛠️ **Entorno y herramientas:** sitio público de nopCommerce con un mismo navegador de escritorio actualizado; Git y repositorio propio en GitHub; tablero Kanban (GitHub Projects o Trello); Jira para casos y defectos; evidencias (capturas y grabaciones) en la carpeta `evidencias/` del repositorio. Las cuentas de cliente se crean con el registro.

🏁 **Criterios de salida del Módulo 1**

- El 100 % de los módulos de prioridad alta (M01, M02, M04, M05) tiene casos diseñados y ejecutados.
- Cada requisito está vinculado a al menos un caso en la matriz de trazabilidad.
- Los módulos de prioridad media y baja tienen casos para sus flujos principales.
- Se documentaron al menos 5 defectos con pasos para reproducir, resultado esperado, resultado obtenido, severidad y evidencia.
- Se ejecutó al menos una sesión de testing exploratorio y se registraron sus hallazgos.

El detalle de riesgos, supuestos, roles y cronograma está en el documento de alcance QA-NAE-001 v1.0.

### 🗺️ 1.2 Mapa de flujos críticos

Todas las peticiones fueron registradas por mí desde el navegador (pestaña Network) en nopCommerce.

⭐ **Flujo crítico elegido: iniciar sesión.** Es crítico porque, si falla, el usuario no puede entrar a su cuenta ni cumplir el objetivo del sistema: comprar a su nombre y ver sus pedidos.

🔄 **Diagrama cliente-servidor: iniciar sesión**

![Diagrama de secuencia cliente-servidor del inicio de sesión](evidencias/flujo-login.png)

*Figura 1. Secuencia cliente-servidor del inicio de sesión (rojo: datos incorrectos; verde: datos correctos).*

👀 **Observación:** cuando el login es incorrecto, el servidor responde 200 y el error se muestra en el contenido de la página ("No customer account found"). Cuando es correcto, responde 302 y redirige a la página principal, donde ya aparecen MY ACCOUNT y LOG OUT.

🌐 **Tabla de endpoints**

| Flujo | Acción | Método | Endpoint | Código |
|---|---|---|---|---|
| Iniciar sesión | Ver el formulario | GET | /login?returnUrl=%2F | 200 |
| Iniciar sesión | Enviar datos inexistentes | POST | /login?returnurl=%2F | 200 |
| Iniciar sesión | Enviar datos válidos | POST | /login?returnurl=%2F | 302 |
| Registro | Ver el formulario | GET | /register?returnUrl=%2F | 200 |
| Cerrar sesión | Hacer clic en LOG OUT | GET | /logout | 302 |

*Leyenda: GET = consulta · POST = envío de datos · 200 = respuesta correcta · 302 = redirección.*

💻 **Pseudocódigo del caso de prueba**

```
CLASE CasoDePrueba
    ATRIBUTOS
        id
        titulo
        flujo
        precondiciones
        pasos
        datos_de_prueba
        resultado_esperado
        resultado_obtenido
        estado
    FIN ATRIBUTOS
FIN CLASE

caso1 = NUEVO CasoDePrueba
    id                 = "CP-001"
    titulo             = "Login con cuenta inexistente"
    flujo              = "Iniciar sesión"
    precondiciones     = "Usuario sin sesión iniciada"
    pasos              = ["Abrir /login", "Escribir correo y contraseña", "Clic en LOG IN"]
    datos_de_prueba    = "prueba@correo.com / 123456"
    resultado_esperado = "Código 200 y mensaje 'No customer account found'"
    resultado_obtenido = "Código 200 y mensaje 'No customer account found'"
    estado             = "Pasó"
```

Los atributos de la clase son los campos (columnas) de los casos de prueba de la sección 2.

### 📊 1.3 Cobertura frente al alcance y riesgo residual

Según los casos documentados, solo M01 y M04 tienen pruebas. Lo demás es riesgo residual: no se puede afirmar nada sobre esos módulos.

| Módulo | Prioridad | Cobertura actual | Pendiente |
|---|---|---|---|
| M01 Registro e inicio de sesión | 🔴 Alta | 🟡 Parcial: CP-001 (login con cuenta inexistente) | Login válido, registro, cierre de sesión |
| M02 Catálogo de productos | 🔴 Alta | ❌ Sin casos | Listado, detalle, búsqueda |
| M03 Filtros y ordenamiento | 🟡 Media | ❌ Sin casos | Filtrar y ordenar |
| M04 Carrito de compras | 🔴 Alta | 🟡 Parcial: campo Quantity (CP-CANT-01 a 14) y DEF-01, DEF-02 | Quitar productos, cálculo del total |
| M05 Proceso de compra y pago | 🔴 Alta | ❌ Sin casos | Envío, pago, confirmación |
| M06 a M08 | Media y baja | ❌ Sin casos | Flujos principales |

---

## 🧩 2. Casos de prueba por flujo

Cada caso se registra con los campos del pseudocódigo: ID, título, flujo, precondiciones, pasos, datos de prueba, resultado esperado, resultado obtenido y estado.

### 🔐 2.1 Flujo: Iniciar sesión (M01)

| Campo | Detalle |
|---|---|
| ID | CP-001 |
| Título | Login con cuenta inexistente |
| Flujo | Iniciar sesión |
| Precondiciones | Usuario sin sesión iniciada |
| Pasos | 1. Abrir /login. 2. Escribir correo y contraseña. 3. Clic en LOG IN. |
| Datos de prueba | prueba@correo.com / 123456 |
| Resultado esperado | Código 200 y mensaje "No customer account found" |
| Resultado obtenido | Código 200 y mensaje "No customer account found" |
| Estado | ✅ Pasó |

*Este caso corresponde al mapa de flujos críticos. El tablero de Jira contiene solo los 14 casos CP-CANT y los 2 defectos.*

### 🛍️ 2.2 Flujo: Agregar producto al carrito, campo Quantity (M04)

🔎 **Campo seleccionado:** "Quantity (cantidad)" de la ficha de producto. Permite al usuario indicar cuántas unidades desea comprar antes de pulsar "Add to cart".

![Ficha de producto con el campo Quantity y el botón Add to cart](evidencias/ficha-quantity.png)

*Figura 2. Ficha de producto con el campo Quantity y el botón Add to cart (recuadro).*

📏 **Regla de validación:** la cantidad debe ser un número entero positivo entre 1 y 10 000.

- Valor mínimo: 1. El sistema rechaza el 0 y los números negativos con el mensaje "La cantidad debe ser positiva".
- Valor máximo: 10 000. El sistema indica "La cantidad máxima permitida para la compra es 10000".

🧮 **Clases de equivalencia.** Agrupé los valores de entrada según sus características y seleccioné un valor representativo para cada grupo.

| Clase | Descripción | Valor representante | Resultado esperado |
|---|---|---|---|
| CE-01 | Campo vacío | (sin valor) | Rechazo |
| CE-02 | Menor que 1 (negativo) | -1 | Rechazo |
| CE-03 | Igual a 0 | 0 | Rechazo |
| CE-04 | Dentro del rango (1 a 10 000) | 5 | Se acepta |
| CE-05 | Mayor que 10 000 | 10001 | Rechazo |
| CE-06 | No numérica (letras) | abc | Rechazo |
| CE-07 | Decimal | 1.5 | Rechazo |

▶️ **Casos de prueba ejecutados.** Precondición: estar en la ficha de un producto con el botón "Add to cart" disponible.

| ID | Técnica | Valor ingresado | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| CP-CANT-01 | Clase inválida | (vacío) | Rechazar la cantidad vacía | La cantidad debe ser positiva |
| CP-CANT-02 | Clase inválida | abc | Rechazar: contiene letras | La cantidad debe ser positiva |
| CP-CANT-03 | Clase inválida | -1 | Rechazar la cantidad negativa | La cantidad debe ser positiva |
| CP-CANT-04 | Límite (debajo del mínimo) | 0 | Rechazar la cantidad cero | La cantidad debe ser positiva |
| CP-CANT-05 | Límite (mínimo) | 1 | Agregar al carrito con cantidad 1 | El producto se ha agregado al carrito de compras |
| CP-CANT-06 | Límite (encima del mínimo) | 2 | Agregar al carrito con cantidad 2 | El producto se ha agregado al carrito de compras |
| CP-CANT-07 | Clase válida | 5 | Agregar al carrito con cantidad 5 | El producto se ha agregado al carrito de compras |
| CP-CANT-08 | Límite (debajo del máximo) | 9999 | Agregar al carrito con cantidad 9999 | El producto se ha agregado al carrito de compras |
| CP-CANT-09 | Límite (máximo) | 10000 | Agregar al carrito con cantidad 10000 | El producto se ha agregado al carrito de compras |
| CP-CANT-10 | Límite (encima del máximo) | 10001 | Rechazar: supera 10 000 | La cantidad máxima permitida para la compra es 10000 |
| CP-CANT-11 | Clase inválida | 1.5 | Rechazar: no es entero | La cantidad debe ser positiva |
| CP-CANT-12 | Clase inválida | Espacios en blanco | Rechazar la cantidad no válida | La cantidad debe ser positiva |
| CP-CANT-13 | Clase inválida | 5a | Rechazar: contiene letras | La cantidad debe ser positiva |
| CP-CANT-14 | Valor extremo | 99999999999999 | Rechazar con un mensaje comprensible | La cantidad debe ser positiva |

💡 **Observaciones del QA**

- Vacío, letras, negativo, 0, decimal, espacios, "5a" y 99999999999999 devuelven el mismo mensaje: "La cantidad debe ser positiva". Para letras y decimales no explica la causa real; es una mejora de usabilidad, no un defecto funcional.
- CP-CANT-14 esperaba un "mensaje comprensible" y el sistema muestra "La cantidad debe ser positiva", que no dice que el valor supera el máximo. Está en Pasó porque rechaza el valor; conviene confirmar con el revisor si el mensaje cumple la expectativa.
- Estos 14 casos prueban solo la ficha de producto. La misma regla en el carrito se probó aparte y falló (DEF-01).

🔗 **Matriz de trazabilidad (propuesta).** Los códigos RF son provisionales hasta contar con la lista oficial de requisitos.

| Requisito | Descripción | Casos | Defectos |
|---|---|---|---|
| RF-01 | Mostrar error al iniciar sesión con una cuenta inexistente | CP-001 | — |
| RF-02 | La ficha de producto acepta cantidades enteras de 1 a 10 000 | CP-CANT-05 a 09 | — |
| RF-03 | La ficha de producto rechaza cantidades vacías, no numéricas, decimales, 0, negativas y mayores a 10 000 | CP-CANT-01 a 04 y 10 a 14 | — |
| RF-04 | El carrito valida la cantidad al editarla (1 a 10 000) | 📝 Por diseñar (CP-CANT-15) | DEF-01 |
| RF-05 | El máximo de 10 000 se aplica al total acumulado del producto en el carrito | 📝 Por diseñar (CP-CANT-16) | DEF-02 |

---

## 🐞 3. Defectos

Durante la ejecución se plantearon dos defectos sobre el carrito de compras, clasificados por severidad (qué tanto daña al sistema) y prioridad (qué tan pronto conviene corregirlo).

| | DEF-01: edición de la cantidad en el carrito | DEF-02: cantidad acumulada en el carrito |
|---|---|---|
| **Qué se prueba** | Que el carrito valide la cantidad igual que la ficha del producto | Que el máximo de 10 000 se aplique al total acumulado |
| **Pasos** | 1. Agregar el producto con cantidad 1. 2. Abrir Shopping cart. 3. Escribir 10001 (o 0) en Qty. 4. Pulsar Update shopping cart. | 1. Agregar 5000 unidades. 2. Volver a la ficha y agregar otras 5000. 3. Agregar 1 unidad más. |
| **Resultado esperado** | Rechazo, porque el máximo es 10 000 y el mínimo es 1 | Rechazo o aviso, porque el carrito quedaría con 10001 unidades |
| **Es defecto si** | El carrito acepta 10001 o 0 y recalcula el total | El carrito termina con más de 10 000 unidades del mismo producto |
| **Severidad** | **🔴 Alta** | **🟡 Media** |
| **Justificación de severidad** | Se salta la regla del campo en pleno flujo de compra y el total puede quedar mal calculado | El carrito supera el máximo, pero hay que repetir varios pasos y el total sí se calcula bien |
| **Prioridad** | **🔴 Alta** | **🟡 Media** |
| **Justificación de prioridad** | Editar el carrito es una acción muy común, así que conviene corregirlo pronto | Es un caso menos frecuente y puede planificarse sin urgencia |

📌 **Datos de seguimiento**

| Campo | DEF-01 | DEF-02 |
|---|---|---|
| Clave Jira | SCRUM-21 | SCRUM-22 |
| Módulo | M04 Carrito de compras | M04 Carrito de compras |
| Entorno | demo.nopcommerce.com, navegador de escritorio | demo.nopcommerce.com, navegador de escritorio |
| Estado | 🔲 To Do | 🔲 To Do |
| Caso de regresión | CP-CANT-15 (por diseñar) | CP-CANT-16 (por diseñar) |
| Resultado obtenido | ⏳ Por registrar al reproducir | ⏳ Por registrar al reproducir |
| Evidencia | 📎 Por adjuntar: captura del carrito | 📎 Por adjuntar: captura del carrito |

---

## ♿ 4. Accesibilidad y usabilidad

### ⌨️ 4.1 Las cinco pruebas rápidas

| Prueba | Qué se revisa | Hallazgo posible |
|---|---|---|
| 1. Navegación con teclado | Con Tab, llegar a los apartados del pie de página y activarlos con Enter o la barra espaciadora | Los apartados desplegables no reciben el foco del teclado |
| 2. Foco visible | Al presionar Tab, aparece un borde o indicador que muestre qué elemento está seleccionado | No se distingue visualmente el elemento enfocado |
| 3. Contraste de colores | Textos, iconos y controles con suficiente contraste con el fondo (en la captura, los iconos claros sobre el fondo azul) | Poco contraste en los iconos |
| 4. Tamaño y activación de controles | Abrir y cerrar los apartados desplegables con ratón y teclado | El control es difícil de activar o no responde al teclado |
| 5. Ampliación y adaptación | Ampliar el navegador al 200 % y comprobar que el contenido sigue legible y los controles funcionan sin quedar ocultos | Contenido o controles ocultos al ampliar |

### 📝 4.2 Registro de problemas encontrados

| ID | Prueba rápida | Problema encontrado | Severidad | Evidencia |
|---|---|---|---|---|
| ACC-01 | Navegación con teclado | La tecla Tab no pasa por los apartados desplegables del pie de página | 🔴 Alta | Los apartados "Information", "Customer service" y "My account" no reciben el foco del teclado |
| ACC-02 | Foco visible | No se distingue visualmente qué elemento está seleccionado al navegar con el teclado | 🟡 Media | No se observa un indicador de foco claro durante la navegación |
| ACC-03 | Contraste de colores | Los iconos de las flechas de los apartados desplegables podrían tener poco contraste con el fondo azul | 🟡 Media | Las flechas son de color claro sobre el fondo azul |

🤖 **Explicación del hallazgo ACC-01 con IA:** la navegación mediante teclado es importante para las personas que no utilizan un ratón. Si los apartados desplegables no reciben el foco al presionar Tab, el usuario podría no acceder a su contenido. Mejora propuesta: revisar el código HTML y JavaScript de los apartados desplegables para permitir la navegación con Tab y su activación mediante Enter o la barra espaciadora.

⚠️ **Nota:** la captura permite identificar un área que conviene revisar, pero no confirma por sí sola los tres defectos. Cada uno se verifica en el navegador antes de marcarlo como encontrado.

---

## 🗂️ 5. Registro en la herramienta de gestión (Jira)

Los casos y defectos se registraron en Jira, en el proyecto **Tienda virtual - nopCommerce**, y se gestionan en el tablero (Scrum) con las columnas To Do, In Progress y Done.

📊 **Estado del tablero:** To Do: 2 (los dos defectos) · In Progress: 0 · Done: 14 (los casos de prueba ejecutados). El tablero contiene solo 14 casos y 2 defectos.

🏷️ **Convención de nombres:** los casos de prueba usan el tipo "Caso de prueba" y el formato CP-CANT-xx - Título; los defectos usan el tipo Defecto y el formato DEF-xx - Título.

| N.º | Clave Jira | Elemento | Estado |
|---|---|---|---|
| 1 | SCRUM-7 | 🧪 CP-CANT-01 - Cantidad vacía | ✅ Finalizada (Done) |
| 2 | SCRUM-8 | 🧪 CP-CANT-02 - Cantidad con letras (abc) | ✅ Finalizada (Done) |
| 3 | SCRUM-9 | 🧪 CP-CANT-03 - Cantidad negativa (-1) | ✅ Finalizada (Done) |
| 4 | SCRUM-10 | 🧪 CP-CANT-04 - Límite debajo del mínimo (0) | ✅ Finalizada (Done) |
| 5 | SCRUM-11 | 🧪 CP-CANT-05 - Límite mínimo (1) | ✅ Finalizada (Done) |
| 6 | SCRUM-12 | 🧪 CP-CANT-06 - Límite encima del mínimo (2) | ✅ Finalizada (Done) |
| 7 | SCRUM-13 | 🧪 CP-CANT-07 - Cantidad válida (5) | ✅ Finalizada (Done) |
| 8 | SCRUM-14 | 🧪 CP-CANT-08 - Límite debajo del máximo (9999) | ✅ Finalizada (Done) |
| 9 | SCRUM-15 | 🧪 CP-CANT-09 - Límite máximo (10000) | ✅ Finalizada (Done) |
| 10 | SCRUM-16 | 🧪 CP-CANT-10 - Límite encima del máximo (10001) | ✅ Finalizada (Done) |
| 11 | SCRUM-17 | 🧪 CP-CANT-11 - Cantidad decimal (1.5) | ✅ Finalizada (Done) |
| 12 | SCRUM-18 | 🧪 CP-CANT-12 - Espacios en blanco | ✅ Finalizada (Done) |
| 13 | SCRUM-19 | 🧪 CP-CANT-13 - Cantidad con letras y número (5a) | ✅ Finalizada (Done) |
| 14 | SCRUM-20 | 🧪 CP-CANT-14 - Valor extremo (99999999999999) | ✅ Finalizada (Done) |
| 15 | SCRUM-21 | 🐞 DEF-01 - El carrito no valida la cantidad al editar (10001 o 0) | 🔲 To Do |
| 16 | SCRUM-22 | 🐞 DEF-02 - El máximo de 10 000 no se aplica a la cantidad acumulada en el carrito | 🔲 To Do |

🎫 **Ejemplo de ficha de caso (SCRUM-7, CP-CANT-01 - Cantidad vacía):**

- Flujo: agregar producto al carrito (campo Quantity).
- Precondición: estar en la ficha de un producto con el botón "Add to cart" disponible.
- Pasos: 1. Abrir la ficha del producto. 2. Dejar Quantity vacío. 3. Pulsar "Add to cart".
- Resultado esperado: rechazar la cantidad vacía.
- Resultado obtenido: la cantidad debe ser positiva.
- Estado: Pasó (en Jira: Finalizada).

📸 **Evidencia:** tablero de Jira con los casos en Done y los defectos DEF-01 y DEF-02 en To Do.

![Tablero de Jira del proyecto Tienda virtual - nopCommerce](evidencias/tablero-jira.png)

*Figura 3. Tablero de Jira del proyecto Tienda virtual - nopCommerce, con los totales To Do (2) y Done (14) resaltados y el detalle de CP-CANT-01 (SCRUM-7).*

🔍 **Detalle del caso en Jira:** ficha del caso SCRUM-7 (CP-CANT-01) con su prioridad, descripción, pasos, resultado esperado, resultado obtenido y estado.

![Detalle del caso CP-CANT-01 (SCRUM-7) en Jira](evidencias/detalle-scrum-7.png)

*Figura 4. Detalle del caso CP-CANT-01 (SCRUM-7) en Jira, estado Finalizada.*

---

## 🤖 6. Uso de IA (Nivel 1)

Usé la inteligencia artificial como apoyo en la redacción y la organización del trabajo; las decisiones y la verificación fueron mías.

| Dónde la usé | Qué me aportó | Qué hice yo |
|---|---|---|
| Informe de casos y defectos | Mejoró la redacción, ayudó a organizar mejor los casos de prueba y a expresar con más claridad los resultados esperados y obtenidos | Revisé cada recomendación y decidí cuáles incorporar para que el informe fuera claro, ordenado y fácil de entender |
| Descripción de defectos | Sugerencias para describir los posibles defectos y clasificar su severidad y prioridad | Contrasté las sugerencias con mis pruebas y fijé la severidad y la prioridad con mi propia justificación |
| Accesibilidad (ACC-01) | Una explicación de por qué importa el hallazgo y una mejora propuesta | Verifiqué el hallazgo en el navegador antes de marcarlo como encontrado, porque la captura por sí sola no lo confirma |

✅ **Criterio de uso:** la IA propone; yo reviso, verifico y decido. Ninguna respuesta se incorporó sin comprobarla contra lo que observé al ejecutar las pruebas.

---

## 📚 Referencias

- nopCommerce (https://demo.nopcommerce.com/): aplicación bajo prueba.
- Repositorio del proyecto nopCommerce (https://github.com/nopSolutions/nopCommerce): funcionalidades y tecnología.
- Malla curricular del curso QA Automatizador (Tecsup Virtual): objetivos y entregables del Módulo 1.
