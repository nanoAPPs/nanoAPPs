# Sobre la licencia

nanoAPPs se licencia como software de "fuente disponible" en lugar de "Open Source" (como lo define la Open Source Initiative).

El propósito de este documento es proporcionar algunas razones detrás de esta decisión y responder algunas preguntas comunes que puedan surgir.


## Un rápido recorrido por las licencias.

Existen varios esquemas comunes de licencias (y modelos de negocios que lo acompañan) para negocios de software:

- Código cerrado y propietario.
- El modelo de "núcleo abierto": una versión de código abierto con una funcionalidad reducida y una versión comercial con licencia propietaria con más funcionalidades (por ejemplo, GitLab).
- Código abierto con servicios administrados adicionales (por ejemplo, Discourse y Ghost).
- Fuente disponible (similar a "código abierto" pero con algunas restricciones adicionales, como la "Commons Clause").

La mayoría opta por elegir el modelo propietario de código cerrado. El cálculo es bastante sencillo: la compañía financia el desarrollo del producto y conserva todos los derechos de propiedad intelectual para monetizarlo.

Los modelos de núcleo abierto y código abierto abren más posibilidades: las personas de la comunidad pueden descargarlo y utilizarlo de forma gratuita y pueden contribuir con sus esfuerzos de desarrollo al proyecto si así lo desean. Hay muchas licencias de código abierto oficialmente "aprobadas" con diferentes propiedades que se adhieren a la definición de código abierto definida por la Open Source Initiative.

En general, las compañías que otorgan licencias a su código como código abierto dependen de la venta de alojamiento (u otros servicios administrados) para generar ingresos. Además, la mayoría reserva sus marcas registradas / derechos de autor para evitar que una empresa competidora comercialice su código base con el mismo nombre (o algo confusamente similar).


## ¿Por qué "fuente disponible" es el modelo correcto para nanoAPPs?

Cuando tomé la decisión de construir nanoAPPs de forma abierta, tenía varios objetivos:

- Crear aplicaciones sencillas para usar desde cualquier dispositivo y en cualquier momento, con independencia de la conexión a la red.
- Ofrecer a los usuarios avanzados la posibilidad de agregar sus propias aplicaciones a la plataforma, integradas con las aplicaciones y datos existentes.
- Garantizar la privacidad de los datos de los usuarios, mediante el uso en modo offline de las aplicaciones, no se envía ningún dato del usuario fuera de su dispositivo.
- Permitir a personas y empresas la posibilidad de descargar y usar el software de forma gratuita.
- Ofrecer un servicio adicional para la sincronización de datos de las aplicaciones que el usuario decida, entre varios dispositivos.
- Construir una pequeña empresa rentable para apoyar el desarrollo contínuo del producto.

Las licencias de código abierto no impiden que una empresa más grande bifurque el código base, cambie el nombre y compita con el creador utilizando una oferta idéntica. Si nanoAPPs cumple con mis expectativas, entonces solo tendría sentido racional que alguien aprovechara esa oportunidad con el tiempo. Tuve que preguntarme: "¿Es eso lo que deseo que suceda?".

La respuesta, evidentemente, es "No".

Hay varias formas de desincentivar que las personas hagan esto:

- Con doble licencia del código base y reservando las funciones más valiosas para la versión propietaria.
- Haciendo, intencionalmente, que sea difícil poner en funcionamiento el software (o mantener ese tipo de información privada por completo).
- Recaudar fondos de capital de riesgo para nivelar el campo de juego con otros oportunistas bien financiados.

Ninguna de estas opciones se alinea con mis valores y mi visión para nanoAPPs. En lugar de adoptar una licencia 100% permisiva e intentar jugar a la defensa contra los actores racionales, tiene más sentido que la licencia de nanoAPPs se alinee con mis objetivos originales.


## Cómo funciona la Commons Clause ("Cláusula de los Comunes")

nanoAPPs está licenciado utilizando una combinación de la licencia Apache 2.0 y la [Commons Clause](https://commonsclause.com/), una condición de licencia redactada por Heather Meeker. La cláusula se puede agregar a una licencia de código abierto existente para no permitir un derecho en particular: el derecho a vender un producto "cuyo valor se deriva, total o sustancialmente, de la funcionalidad del Software".

Esto significa que todavía puedes:

- Usar el software para fines personales y comerciales.
- Bifurcar el código base y utilizarlo como la base para un producto o servicio no competitivo.
- Vender servicios de consultoría para ayudar a las personas a implantar nanoAPPs para su propio uso.

Pero no puedes hacer lo siguiente sin permiso:

- Vender una versión alojada de nanoAPPs
- Vender una versión descargable de nanoAPPs
- Vender servicios de sincronización de datos para nanoAPPs

Realmente creo que este es el esquema de licencia más razonable y sostenible para que nanoAPPs avance.
