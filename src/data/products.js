const slugify = (text = '') => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // eliminar diacríticos
    .toLowerCase()
    .trim()
    .replace(/&/g, '-y-')
    .replace(/[^a-z0-9]+/g, '-') // todo no alfanumérico → guión
    .replace(/^-+|-+$/g, '')
}

const normalizeCategory = (category = '') => {
  const cat = String(category || '').trim()
  if (!cat) return 'sin-categoria'
  return slugify(cat)
}

const normalizeImage = (url = '') => {
  // Evitar errores si Cloudinary no permite transformaciones f_auto,q_auto
  let clean = url.replace('image/upload/f_auto,q_auto/', 'image/upload/')
  // Asegurar https y sin espacios
  clean = clean.trim()
  return clean
}

const rawProducts = [
  {
    id: 1,
    product: 'STAR NUTRITION WHEY PROTEIN 2LB DOYPACK',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: 'STAR NUTRITION WHEY PROTEIN es una proteína de suero concentrada de alta calidad, ideal para deportistas y personas activas que buscan complementar su ingesta diaria de proteínas. En su práctico formato doypack, ofrece un suplemento proteico delicioso y efectivo para favorecer la recuperación y el desarrollo muscular después del entrenamiento.\n\nBeneficios:\n\n• Proteína de suero concentrada de alta calidad\n• Rico en aminoácidos esenciales y BCAAs\n• Favorece la recuperación y el desarrollo muscular\n• Rápida absorción post-entrenamiento\n• Práctico envase doypack con cierre zip\n• Excelente relación calidad-precio\n\nDisponible en los deliciosos sabores: VAINILLA, CHOCOLATE, COOKIES & CREAM, FRUTILLA, BANANA\n\nContenido: 908 gramos (2 libras)\n\nModo de uso: Mezclar 1 medida (30g) en 200-250ml de agua o leche. Consumir 1-3 porciones diarias, preferentemente después del entrenamiento o como complemento proteico en cualquier momento del día. Para una mejor disolución, utilizar shaker o batidora.',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-whey-protein-2lb-doypack-vainilla-7abe5238c0f9f77b8117501819090274-1024-1024_bicvek.webp',
    brand: 'STAR NUTRITION'
  },
  {
    id: 2,
    product: 'STAR NUTRITION PLATINUM WHEY PROTEIN 3 KG ZIPPER PACK',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: 'STAR NUTRITION PLATINUM WHEY PROTEIN en su formato económico de 3 kilos con cierre zipper es una proteína premium de suero que combina concentrado y aislado en una proporción óptima para maximizar tus resultados. Con un elevado contenido proteico, perfil completo de aminoácidos y enriquecida con enzimas digestivas, esta fórmula superior ofrece una rápida absorción y excelente digestibilidad para potenciar la recuperación y el desarrollo muscular a largo plazo.\n\nBeneficios:\n\n• Fórmula premium con concentrado y aislado de suero\n• Alto contenido proteico con mínimo de grasas y carbohidratos\n• Perfil completo de aminoácidos esenciales y BCAAs\n• Enriquecida con enzimas digestivas para una absorción óptima\n• Envase económico con cierre zipper para mayor duración\n• Ideal para consumo prolongado y resultados consistentes\n\nDisponible en los deliciosos sabores: VAINILLA, CHOCOLATE, COOKIES & CREAM, FRUTILLA, BANANA\n\nContenido: 3000 gramos (3 kilos)\n\nModo de uso: Mezclar 1 medida (30g) en 200-250ml de agua o leche. Consumir 1-3 porciones diarias, preferentemente después del entrenamiento o como complemento proteico en cualquier momento del día. Para una mejor disolución, utilizar shaker o batidora.',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-platinum-whey-protein-3-kilos-zipper-pack-vainilla-7e62abd9171542338c17501870441260-1024-1024_u1ppsm.webp',
    brand: 'STAR NUTRITION'
  },
  {
    id: 3,
    product: 'STAR NUTRITION CREATINA MONOHIDRATO EEUU 300 GRS DOYPACK',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: 'STAR NUTRITION CREATINA MONOHIDRATO en práctico formato doypack con cierre zip es un suplemento de creatina pura importada de EEUU de la más alta calidad y pureza. La creatina es uno de los suplementos más estudiados y efectivos para aumentar la fuerza, la potencia muscular y el rendimiento en ejercicios de alta intensidad. Esta fórmula premium proporciona 5g de creatina monohidrato por porción para optimizar los niveles de fosfocreatina muscular y potenciar tus resultados.\n\nBeneficios:\n\n• Aumenta la fuerza y la potencia muscular\n• Mejora el rendimiento en ejercicios de alta intensidad\n• Favorece el incremento de masa muscular\n• Acelera la recuperación entre series\n• Práctico envase doypack con cierre zip\n• Creatina importada de EEUU de máxima pureza\n\nDisponible en los deliciosos sabores: Polvo sin sabor que puede mezclarse con cualquier bebida\n\nContenido: 300 gramos (60 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (5g) en 200-250ml de agua, jugo o tu bebida preferida. Consumir 1 porción diaria, preferentemente después del entrenamiento junto con carbohidratos para maximizar la absorción. Para mejores resultados, consumir de forma constante todos los días, incluso en días sin entrenamiento. No requiere período de carga, aunque puede realizarse tomando 4 porciones diarias durante 5-7 días para saturar más rápidamente los depósitos musculares.',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-creatina-monohidrato-eeuu-300-grs-doypack-fb7a13ee68a7ac5dd017502073418286-1024-1024_t5uhy7.webp',
    brand: 'STAR NUTRITION'
  },
  {
    id: 4,
    product: 'STAR NUTRITION MTOR BCAA 270G',
    category: 'AMINOACIDOS',
    description: 'STAR NUTRITION MTOR BCAA es un suplemento avanzado de aminoácidos de cadena ramificada (BCAAs) en proporción 2:1:1 (Leucina, Isoleucina, Valina) con co-factores metabólicos que activan la vía mTOR, responsable de la síntesis proteica y el crecimiento muscular. Esta fórmula superior está diseñada para maximizar la recuperación, prevenir el catabolismo muscular y optimizar el desarrollo de masa magra en deportistas de todos los niveles.\n\nBeneficios:\n\n• Activa la vía mTOR para potenciar la síntesis proteica\n• Reduce el catabolismo muscular durante entrenamientos intensos\n• Acelera la recuperación entre sesiones de entrenamiento\n• Proporciona energía durante el ejercicio y reduce la fatiga\n• Favorece la hidratación y el rendimiento muscular\n• Preserva la masa muscular durante períodos de definición\n\nDisponible en los deliciosos sabores: BLUE RAZ, FRUIT PUNCH, GRAPE ATTACK, GREEN LEMONADE, STRAWBERRY LIME\n\nContenido: 270 gramos (30 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (9g) en 200-250ml de agua. Consumir 1 porción antes, durante o después del entrenamiento según el objetivo deseado. Para prevenir el catabolismo, tomar durante el entrenamiento. Para optimizar la recuperación, tomar inmediatamente después del entrenamiento. Para mejores resultados, puede combinarse con otros suplementos de la línea STAR NUTRITION.',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-mtor-bcaa-270g-blue-raz-086b1f9393925f1c8d17502063829379-1024-1024_fm4cfy.webp',
    brand: 'STAR NUTRITION'
  },
  {
    id: 5,
    name: 'STAR NUTRITION PUMP V8 285 GRS',
    category: 'PRE ENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-pump-v8-285-grs-watermelon-f010561d9189e0c1d817501806116387-1024-1024_yjbxue.webp',
    description: 'STAR NUTRITION PUMP V8 es un pre-entreno avanzado de última generación formulado para maximizar la bomba muscular, la resistencia y el rendimiento. Con 8 ingredientes activos específicamente seleccionados, este producto te proporciona una experiencia de entrenamiento superior con un increíble pump y sin exceso de estimulantes, permitiéndote alcanzar nuevos límites en cada sesión.\n\nBeneficios:\n\n• Incrementa la producción de óxido nítrico y la vasodilatación\n• Proporciona una energía sostenida sin crashes posteriores\n• Mejora la resistencia y retrasa la fatiga muscular\n• Aumenta la concentración y el enfoque mental\n• Optimiza el rendimiento durante todo el entrenamiento\n• No contiene exceso de estimulantes, ideal para entrenamientos por la tarde\n\nDisponible en los deliciosos sabores: ACAÍ, LIMA LIMÓN, GRAPE, WATERMELON\n\nContenido: 285 gramos (30 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (9.5g) en 200-250ml de agua fría y consumir 20-30 minutos antes del entrenamiento. Para una experiencia de pump extremo, se puede tomar junto con N.O BOOSTER 5. No exceder la dosis recomendada.'
  },
  {
    id: 6,
    name: 'STAR NUTRITION Omega3 Fish Oil x 60 Caps',
    category: 'MAGNESIO Y OMEGA 3',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-omega3-fish-oil-x-60-caps-24a2a02fa3c6787af217501726265886-1024-1024_alsaot.webp',
    description: 'STAR NUTRITION Omega3 Fish Oil es un suplemento de alta calidad que proporciona ácidos grasos esenciales EPA y DHA derivados de aceite de pescado. Estos nutrientes son fundamentales para la salud cardiovascular, cerebral y articular.\n\nBeneficios:\n\n• Promueve la salud cardiovascular\n• Contribuye al funcionamiento óptimo del cerebro\n• Ayuda a reducir la inflamación\n• Mejora la salud de articulaciones\n• Fórmula de alta concentración y pureza\n• Made in USA para garantizar máxima calidad\n\nContenido: 60 cápsulas\n\nModo de uso: Tomar 2 cápsulas diarias con las comidas. Para mejores resultados, consumir de forma constante como parte de una alimentación equilibrada.'
  },
  {
    id: 7,
    name: 'STAR NUTRITION CREATINA MONOHIDRATO EEUU 1 KG',
    category: 'CREATINAS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-creatina-monohidrato-eeuu-1-kilo-989360f0cf3a1ff61c17502077407625-1024-1024_v9ikz6.webp',
    description: 'STAR NUTRITION CREATINA MONOHIDRATO es un suplemento de creatina pura importada de EEUU de la más alta calidad y pureza en formato económico de 1 kilo. La creatina es uno de los suplementos más estudiados y efectivos para aumentar la fuerza, la potencia muscular y el rendimiento en ejercicios de alta intensidad. Esta fórmula premium proporciona 5g de creatina monohidrato por porción para optimizar los niveles de fosfocreatina muscular y potenciar tus resultados a largo plazo.\n\nBeneficios:\n\n• Aumenta la fuerza y la potencia muscular\n• Mejora el rendimiento en ejercicios de alta intensidad\n• Favorece el incremento de masa muscular\n• Acelera la recuperación entre series\n• Creatina importada de EEUU de máxima pureza\n• Formato super económico para tratamiento prolongado o consumo grupal\n\nDisponible en los deliciosos sabores: Polvo sin sabor que puede mezclarse con cualquier bebida\n\nContenido: 1000 gramos (1 kilo - 200 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (5g) en 200-250ml de agua, jugo o tu bebida preferida. Consumir 1 porción diaria, preferentemente después del entrenamiento junto con carbohidratos para maximizar la absorción. Para mejores resultados, consumir de forma constante todos los días, incluso en días sin entrenamiento. No requiere período de carga, aunque puede realizarse tomando 4 porciones diarias durante 5-7 días para saturar más rápidamente los depósitos musculares.'
  },
  {
    id: 8,
    name: 'STAR NUTRITION CREATINA MONOHIDRATO EEUU 500 GRS',
    category: 'CREATINAS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-creatina-monohidrato-eeuu-500-grs-fa3b9ff524cdf614e017502076005365-1024-1024_amxpzc.webp',
    description: 'STAR NUTRITION CREATINA MONOHIDRATO es un suplemento de creatina pura importada de EEUU de la más alta calidad y pureza en formato económico de 500 gramos. La creatina es uno de los suplementos más estudiados y efectivos para aumentar la fuerza, la potencia muscular y el rendimiento en ejercicios de alta intensidad. Esta fórmula premium proporciona 5g de creatina monohidrato por porción para optimizar los niveles de fosfocreatina muscular y potenciar tus resultados.\n\nBeneficios:\n\n• Aumenta la fuerza y la potencia muscular\n• Mejora el rendimiento en ejercicios de alta intensidad\n• Favorece el incremento de masa muscular\n• Acelera la recuperación entre series\n• Creatina importada de EEUU de máxima pureza\n• Formato económico para tratamiento prolongado\n\nDisponible en los deliciosos sabores: Polvo sin sabor que puede mezclarse con cualquier bebida\n\nContenido: 500 gramos (100 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (5g) en 200-250ml de agua, jugo o tu bebida preferida. Consumir 1 porción diaria, preferentemente después del entrenamiento junto con carbohidratos para maximizar la absorción. Para mejores resultados, consumir de forma constante todos los días, incluso en días sin entrenamiento. No requiere período de carga, aunque puede realizarse tomando 4 porciones diarias durante 5-7 días para saturar más rápidamente los depósitos musculares.'
  },
  {
    id: 9,
    name: 'STAR NUTRITION CREATINA MONOHIDRATO EEUU 300 GRS',
    category: 'CREATINAS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-creatina-monohidrato-eeuu-300-grs-d46cc0b62fff86de0c17502072341937-1024-1024_bjeooc.webp',
    description: 'STAR NUTRITION CREATINA MONOHIDRATO es un suplemento de creatina pura importada de EEUU de la más alta calidad y pureza. La creatina es uno de los suplementos más estudiados y efectivos para aumentar la fuerza, la potencia muscular y el rendimiento en ejercicios de alta intensidad. Esta fórmula premium proporciona 5g de creatina monohidrato por porción para optimizar los niveles de fosfocreatina muscular y potenciar tus resultados.\n\nBeneficios:\n\n• Aumenta la fuerza y la potencia muscular\n• Mejora el rendimiento en ejercicios de alta intensidad\n• Favorece el incremento de masa muscular\n• Acelera la recuperación entre series\n• Creatina importada de EEUU de máxima pureza\n• Formato económico para tratamiento prolongado\n\nDisponible en los deliciosos sabores: Polvo sin sabor que puede mezclarse con cualquier bebida\n\nContenido: 300 gramos (60 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (5g) en 200-250ml de agua, jugo o tu bebida preferida. Consumir 1 porción diaria, preferentemente después del entrenamiento junto con carbohidratos para maximizar la absorción. Para mejores resultados, consumir de forma constante todos los días, incluso en días sin entrenamiento. No requiere período de carga, aunque puede realizarse tomando 4 porciones diarias durante 5-7 días para saturar más rápidamente los depósitos musculares.'
  },
  {
    id: 10,
    name: 'STAR NUTRITION CREATINA MONOHIDRATO EEUU 150 GRS',
    category: 'CREATINAS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-creatina-monohidrato-eeuu-150-grs-68c14055bbd01b7bca17502070079189-1024-1024_jg8glt.webp',
    description: 'STAR NUTRITION CREATINA MONOHIDRATO es un suplemento de creatina pura importada de EEUU de la más alta calidad y pureza. La creatina es uno de los suplementos más estudiados y efectivos para aumentar la fuerza, la potencia muscular y el rendimiento en ejercicios de alta intensidad. Esta fórmula premium proporciona 5g de creatina monohidrato por porción para optimizar los niveles de fosfocreatina muscular y potenciar tus resultados.\n\nBeneficios:\n\n• Aumenta la fuerza y la potencia muscular\n• Mejora el rendimiento en ejercicios de alta intensidad\n• Favorece el incremento de masa muscular\n• Acelera la recuperación entre series\n• Creatina importada de EEUU de máxima pureza\n• No requiere fase de carga para obtener resultados\n\nDisponible en los deliciosos sabores: Polvo sin sabor que puede mezclarse con cualquier bebida\n\nContenido: 150 gramos (30 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (5g) en 200-250ml de agua, jugo o tu bebida preferida. Consumir 1 porción diaria, preferentemente después del entrenamiento junto con carbohidratos para maximizar la absorción. Para mejores resultados, consumir de forma constante todos los días, incluso en días sin entrenamiento. No requiere período de carga, aunque puede realizarse tomando 4 porciones diarias durante 5-7 días para saturar más rápidamente los depósitos musculares.'
  },
  {
    id: 11,
    name: 'STAR NUTRITION CLA1000 x 90 Caps',
    category: 'QUEMADORES',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-cla1000-x-90-caps-dba3302bd0a8fff3ad17501725210790-1024-1024_zlbqia.webp',
    description: 'STAR NUTRITION CLA1000 es un suplemento de ácido linoleico conjugado que ayuda a reducir la grasa corporal mientras mantienes tu masa muscular. Ideal para complementar tus rutinas de definición muscular.\n\nBeneficios:\n\n• Contribuye a la reducción de grasa corporal\n• Ayuda a mantener la masa muscular\n• Mejora la composición corporal\n• Potencia los resultados de tu entrenamiento\n• Formula de alta concentración\n• Made in USA para garantizar máxima calidad\n\nContenido: 90 cápsulas\n\nModo de uso: Tomar 3 cápsulas diarias, preferentemente con las comidas principales. Para mejores resultados, combinar con una alimentación equilibrada y ejercicio regular.'
  },
  {
    id: 12,
    name: 'STAR NUTRITION Just Carbs 1kg',
    category: 'PRE ENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-just-carbs-1kg-2e1c7fcd7a5923802f17501727931617-1024-1024_qfrpfw.webp',
    description: 'STAR NUTRITION Just Carbs es un carbohidrato puro en polvo diseñado para proporcionar energía rápida antes, durante y después del entrenamiento. Su fórmula de fácil absorción permite una recarga efectiva de glucógeno para potenciar tu rendimiento y recuperación.\n\nBeneficios:\n\n• Proporciona energía rápida para el entrenamiento\n• Facilita la recuperación del glucógeno muscular\n• Mejora la resistencia y rendimiento\n• Ideal para entrenamientos intensos y de larga duración\n• Se disuelve fácilmente sin dejar grumos\n• No contiene azúcares añadidos\n\nDisponible en los deliciosos sabores: Natural\n\nContenido: 1000 gramos (1kg)\n\nModo de uso: Mezclar 30 gramos (aproximadamente 1 medida) en 300ml de agua. Consumir antes, durante o después del entrenamiento según necesidades energéticas. Ideal para combinar con proteínas post-entrenamiento.'
  },
  {
    id: 13,
    name: 'STAR NUTRITION Resveratrol 500 x 60 Caps',
    category: 'COLAGENOS Y RESVERATROL',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-resveratrol-500-x-60-caps-2e43af294b8e3faf9e17501731003631-1024-1024_buzmdj.webp',
    description: 'STAR NUTRITION Resveratrol 500 es un potente antioxidante derivado de plantas como las uvas y el knotweed japonés. Con 500mg por cápsula, este suplemento ayuda a combatir el envejecimiento celular, promueve la salud cardiovascular y apoya el sistema inmunológico.\n\nBeneficios:\n\n• Potente acción antioxidante contra radicales libres\n• Promueve la salud cardiovascular\n• Apoya la longevidad celular\n• Contribuye al bienestar general\n• Refuerza el sistema inmunológico\n• Alta concentración de 500mg por cápsula\n\nContenido: 60 cápsulas\n\nModo de uso: Tomar 1 cápsula diaria preferentemente con alguna comida. Para mejores resultados, mantener un consumo constante como parte de un estilo de vida saludable.'
  },
  {
    id: 14,
    name: 'STAR NUTRITION Iron Pack Multivitamin Powder 383G 44 Serv',
    category: 'VITAMINAS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-iron-pack-multivitamin-powder-44-serv-26324c09ea563453e817501742700542-1024-1024_p2f6ie.webp',
    description: 'STAR NUTRITION Iron Pack Multivitamin Powder es un completo multivitamínico en polvo diseñado especialmente para deportistas y personas activas. Su avanzada fórmula incluye vitaminas, minerales, aminoácidos y extractos herbales para maximizar el rendimiento y la recuperación.\n\nBeneficios:\n\n• Fórmula completa con más de 30 ingredientes activos\n• Mejora el rendimiento físico y mental\n• Acelera la recuperación post-entrenamiento\n• Fortalece el sistema inmunológico\n• Proporciona energía sostenida durante todo el día\n• Made in USA para garantizar máxima calidad\n\nDisponible en los deliciosos sabores: Tropical\n\nContenido: 44 porciones\n\nModo de uso: Mezclar una medida en 200ml de agua una vez al día, preferentemente por la mañana. Para atletas con alta demanda física, puede tomarse una segunda porción después del entrenamiento.'
  },
  {
    id: 15,
    name: 'STAR NUTRITION Magnesio 500 mg x 60 Caps',
    category: 'MAGNESIO Y OMEGA 3',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-magnesio-500-mg-x-60-caps-8499f195a74068313017501743965251-1024-1024_ykau48.webp',
    description: 'STAR NUTRITION Magnesio 500 mg es un suplemento mineral esencial para el funcionamiento óptimo del organismo. El magnesio contribuye a la relajación muscular, función nerviosa normal, salud ósea y es vital para más de 300 reacciones enzimáticas en el cuerpo.\n\nBeneficios:\n\n• Previene calambres y contracturas musculares\n• Mejora la calidad del sueño y reduce el estrés\n• Contribuye a un adecuado metabolismo energético\n• Ayuda a mantener la salud cardiovascular\n• Fundamental para la salud ósea\n• Alta concentración de 500mg por cápsula\n\nContenido: 60 cápsulas\n\nModo de uso: Tomar 1 cápsula diaria con abundante agua, preferentemente antes de dormir. Para atletas o personas con alta demanda física, puede tomarse 1 cápsula adicional después del entrenamiento.'
  },
  {
    id: 16,
    name: 'STAR NUTRITION Magnesio Sin Sabor 500gr',
    category: 'MAGNESIO Y OMEGA 3',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-magnesio-sin-sabor-500gr-ea534e24f757be727b17501744311806-1024-1024_ygywuw.webp',
    description: 'STAR NUTRITION Magnesio Sin Sabor es un suplemento en polvo de alta biodisponibilidad que aporta magnesio elemental, mineral esencial para numerosas funciones corporales. Su formato en polvo facilita la absorción y permite ajustar la dosis según las necesidades individuales.\n\nBeneficios:\n\n• Previene calambres y contracturas musculares\n• Mejora la recuperación post-entrenamiento\n• Contribuye al equilibrio electrolítico\n• Favorece la relajación y el descanso nocturno\n• Apoya la salud ósea y cardiovascular\n• Formato en polvo para una absorción superior\n\nContenido: 500 gramos (500g)\n\nModo de uso: Disolver 1 medida (aproximadamente 5g) en 200ml de agua. Consumir preferentemente antes de dormir o después del entrenamiento. Se puede mezclar con jugos o batidos para una mejor palatabilidad.'
  },
  {
    id: 17,
    name: 'STAR NUTRITION Magnesio Frutos Rojos 500gr',
    category: 'MAGNESIO Y OMEGA 3',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-magnesio-frutos-rojos-500gr-3456415fdf006d412d17501747849293-1024-1024_mk7mf7.webp',
    description: 'STAR NUTRITION Magnesio Frutos Rojos es un suplemento en polvo con delicioso sabor que aporta magnesio elemental de alta biodisponibilidad. Este mineral es esencial para la función muscular, nerviosa y para más de 300 procesos enzimáticos en el organismo.\n\nBeneficios:\n\n• Previene calambres y contracturas musculares\n• Mejora la recuperación post-entrenamiento\n• Contribuye al equilibrio electrolítico\n• Favorece la relajación y el descanso nocturno\n• Apoya la salud ósea y cardiovascular\n• Delicioso sabor a frutos rojos para un consumo agradable\n\nContenido: 500 gramos (500g)\n\nModo de uso: Disolver 1 medida (aproximadamente 5g) en 200ml de agua. Consumir preferentemente antes de dormir o después del entrenamiento. Su agradable sabor facilita el consumo diario.'
  },
  {
    id: 18,
    name: 'STAR NUTRITION Collagen Limón 210gr',
    category: 'COLAGENOS Y RESVERATROL',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-collagen-limon-210gr-d689d63c9430327e7517501748565755-1024-1024_lnxtx6.webp',
    description: 'STAR NUTRITION Collagen Limón es un suplemento de colágeno hidrolizado con delicioso sabor a limón, diseñado para favorecer la salud de articulaciones, piel, cabello y uñas. Su fórmula de rápida absorción proporciona los aminoácidos necesarios para la regeneración de tejidos.\n\nBeneficios:\n\n• Promueve la salud articular y reduce molestias\n• Mejora la elasticidad y firmeza de la piel\n• Fortalece cabello y uñas\n• Contribuye a la recuperación de tendones y ligamentos\n• Apoya la salud ósea\n• Delicioso sabor a limón para un consumo agradable\n\nContenido: 210 gramos (210g)\n\nModo de uso: Disolver 1 medida (aproximadamente 7g) en 200ml de agua fría o tibia. Consumir una vez al día, preferentemente en ayunas para una mejor absorción. Para resultados óptimos, mantener un consumo constante durante al menos 8 semanas.'
  },
  {
    id: 19,
    name: 'STAR NUTRITION Collagen Whey 2LB',
    category: 'COLAGENOS Y RESVERATROL',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-collagen-whey-2lb-vainilla-39b3bc02fc4cdc138717501749034507-1024-1024_b8pr6v.webp',
    description: 'STAR NUTRITION Collagen Whey es una innovadora combinación de proteína de suero (whey protein) y colágeno hidrolizado para brindar doble beneficio: desarrollo muscular y salud articular. Esta fórmula única proporciona aminoácidos completos para el crecimiento muscular y recuperación, mientras cuida tus articulaciones, piel, cabello y uñas.\n\nBeneficios:\n\n• Promueve el desarrollo muscular\n• Contribuye a la salud de articulaciones y tendones\n• Mejora la elasticidad de la piel\n• Acelera la recuperación post-entrenamiento\n• Fortalece cabello y uñas\n• Fórmula completa 2 en 1\n\nDisponible en los deliciosos sabores: Chocolate, Vainilla\n\nContenido: 908 gramos (2LB)\n\nModo de uso: Mezclar 1 medida (30g) en 200-250ml de agua o leche. Consumir 1-3 porciones diarias según objetivos, preferentemente después del entrenamiento y/o entre comidas.'
  },
  {
    id: 20,
    name: 'STAR NUTRITION Collagen Plus Limón 360gr',
    category: 'COLAGENOS Y RESVERATROL',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-collagen-plus-limon-360gr-aab9475380eb0bda0717501752360384-1024-1024_qxinty.webp',
    description: 'STAR NUTRITION Collagen Plus Limón es una fórmula avanzada de colágeno hidrolizado con vitamina C y otros nutrientes sinérgicos para maximizar la salud de articulaciones, piel, cabello y uñas. Su delicioso sabor a limón hace que sea agradable de consumir diariamente.\n\nBeneficios:\n\n• Fórmula reforzada para una mayor efectividad\n• Contiene vitamina C para potenciar la síntesis de colágeno\n• Alivia molestias articulares y mejora la movilidad\n• Promueve una piel más firme y elástica\n• Fortalece cabello y uñas\n• Mayor concentración para resultados superiores\n\nContenido: 360 gramos (360g)\n\nModo de uso: Disolver 1 medida (12g) en 200ml de agua. Consumir una vez al día, preferentemente en ayunas para una mejor absorción. Para resultados óptimos, mantener un consumo constante durante al menos 8-12 semanas.'
  },
  {
    id: 21,
    name: 'STAR NUTRITION Collagen Sport Naranja 360gr',
    category: 'COLAGENOS Y RESVERATROL',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-collagen-sport-naranja-360gr-37cbcf827ead10554917501752897125-1024-1024_tr2yei.webp',
    description: 'STAR NUTRITION Collagen Sport Naranja es una fórmula especializada de colágeno hidrolizado diseñada específicamente para deportistas y personas activas. Contiene nutrientes adicionales que apoyan la salud articular, tendones y ligamentos, ayudando a prevenir lesiones y mejorar la recuperación.\n\nBeneficios:\n\n• Protege articulaciones sometidas a alto impacto\n• Acelera la recuperación de tendones y ligamentos\n• Previene lesiones deportivas\n• Reduce molestias articulares por ejercicio intenso\n• Contribuye a mantener la movilidad y flexibilidad\n• Delicioso sabor a naranja para un consumo agradable\n\nContenido: 360 gramos (360g)\n\nModo de uso: Disolver 1 medida (12g) en 200ml de agua. Para deportistas, se recomienda consumir una porción diaria después del entrenamiento para favorecer la recuperación. Para prevención, puede tomarse en cualquier momento del día.'
  },
  {
    id: 22,
    name: 'STAR NUTRITION TNT-DYNAMITE 240GRS',
    category: 'PRE ENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-tnt-dynamite-240grs-grape-attack-23853e22914e56b34117501761600282-1024-1024_imkznn.webp',
    description: 'STAR NUTRITION TNT-DYNAMITE es un potente pre-entreno diseñado para maximizar tu rendimiento durante los entrenamientos más intensos. Con una fórmula avanzada que combina estimulantes, potenciadores de óxido nítrico y compuestos energéticos, este suplemento te proporcionará la energía explosiva que necesitas para superar tus límites.\n\nBeneficios:\n\n• Energía explosiva instantánea\n• Mayor concentración y enfoque mental\n• Mejora el bombeo muscular y la vasodilatación\n• Retrasa la fatiga muscular\n• Aumenta la resistencia durante entrenamientos intensos\n• Mejora el rendimiento general en el gimnasio\n\nDisponible en los deliciosos sabores: ACAÍ POWER, BLUE RAZ, CITRUS SLUSH, GRAPE ATTACK\n\nContenido: 240 gramos (30 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (8g) con 200-250ml de agua fría 20-30 minutos antes del entrenamiento. Para mejores resultados, no consumir después de las 18:00hs o 6 horas antes de dormir. No exceder la dosis recomendada.'
  },
  {
    id: 23,
    name: 'STAR NUTRITION PUMP 3D EVOLUTION RIPPED 315 GRS',
    category: 'PRE ENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-pump-3d-evolution-ripped-315-grs-strawberry-lime-51eb2b71eed1b854c317501808792439-1024-1024_zfmbu2.webp',
    description: 'STAR NUTRITION PUMP 3D EVOLUTION RIPPED es un pre-entreno premium de triple acción que combina potenciadores de energía, maximizadores de bomba muscular y quemadores de grasa en una fórmula avanzada.\n\nBeneficios:\n\n• Triple acción: energía + pump + quema de grasa\n• Proporciona energía explosiva y sostenida\n• Maximiza la vasodilatación y la bomba muscular\n• Activa el metabolismo y favorece la quema de grasa\n• Mejora el enfoque mental y la concentración\n• Optimiza el rendimiento en entrenamientos de alta intensidad\n\nContenido: 315 gramos (30 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (10.5g) en 250ml de agua fría y consumir 20-30 minutos antes del entrenamiento. No exceder la dosis recomendada.'
  },
  {
    id: 24,
    name: 'STAR NUTRITION JUST PLANT 2 LBS',
    category: 'PROTEINAS Y GANADORES DE PESO',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-just-plant-2-lbs-7f5bc8a7052c51838f17501813976470-1024-1024_modymo.webp',
    description: 'STAR NUTRITION JUST PLANT es una proteína 100% vegetal formulada a base de arveja y arroz, ideal para dietas veganas y vegetarianas.\n\nBeneficios:\n\n• 100% proteína vegetal\n• Perfil completo de aminoácidos esenciales\n• Excelente digestibilidad\n• Libre de lactosa, colesterol y gluten\n• Ideal para dietas veganas y vegetarianas\n\nContenido: 908 gramos (2 libras)\n\nModo de uso: Mezclar 1 medida (30g) en 200-250ml de agua o bebida vegetal. Consumir 1-2 porciones diarias.'
  },
  {
    id: 25,
    name: 'STAR NUTRITION THERMO FUEL MAX 120 CAPS',
    category: 'QUEMADORES',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-thermo-fuel-max-120-caps-7f4903d8b20a5ca40d17502053862225-1024-1024_ksuhcx.webp',
    description: 'STAR NUTRITION THERMO FUEL MAX es un potente quemador de grasa termogénico diseñado para acelerar el metabolismo y promover la quema de grasas.\n\nBeneficios:\n\n• Acelera el metabolismo\n• Potencia la oxidación de grasas\n• Aumenta los niveles de energía\n• Mejora el enfoque mental\n• Ayuda a controlar el apetito\n\nContenido: 120 cápsulas\n\nModo de uso: Tomar 2 cápsulas por la mañana y 2 cápsulas antes del entrenamiento. No exceder la dosis recomendada.'
  },
  {
    id: 26,
    name: 'STAR NUTRITION ZMA 90 CAPS',
    category: 'MAGNESIO Y OMEGA 3',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-zma-90-caps-b391e775b5a56075c017502058635936-1024-1024_ikxnag.webp',
    description: 'STAR NUTRITION ZMA combina Zinc, Magnesio y Vitamina B6 para optimizar la recuperación muscular, el descanso nocturno y el rendimiento deportivo.\n\nBeneficios:\n\n• Favorece la recuperación muscular\n• Mejora la calidad del sueño\n• Optimiza niveles hormonales naturales\n• Refuerza el sistema inmunológico\n\nContenido: 90 cápsulas\n\nModo de uso: Tomar 3 cápsulas antes de dormir con el estómago vacío.'
  },
  {
    id: 27,
    name: 'STAR NUTRITION HMB 180 CAPS',
    category: 'PROTEINAS Y GANADORES DE PESO',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-hmb-180-caps-296a42e519638c918017502062026924-1024-1024_ytewnk.webp',
    description: 'STAR NUTRITION HMB es un suplemento anti-catabólico derivado de la leucina que ayuda a preservar la masa muscular y mejorar la recuperación.\n\nBeneficios:\n\n• Reduce el catabolismo muscular\n• Favorece la síntesis proteica\n• Mejora la recuperación\n• Preserva la masa muscular en definición\n\nContenido: 180 cápsulas\n\nModo de uso: Tomar 3 cápsulas 3 veces al día con las comidas. No exceder la dosis recomendada.'
  },
  {
    id: 28,
    name: 'STAR NUTRITION L-GLUTAMINE 150 GRS',
    category: 'AMINOACIDOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-l-glutamine-150-grs-108742a78035915c2017502081813244-1024-1024_mydcgi.webp',
    description: 'STAR NUTRITION L-GLUTAMINE es un suplemento de L-Glutamina pura, el aminoácido más abundante en el tejido muscular y fundamental para la recuperación. En períodos de estrés físico intenso como el entrenamiento, los niveles de glutamina disminuyen significativamente, lo que puede comprometer la recuperación y el sistema inmunológico. Este suplemento aporta 5g de glutamina por porción para restaurar los niveles y optimizar la recuperación muscular y la salud general.\n\nBeneficios:\n\n• Acelera la recuperación muscular post-entrenamiento\n• Reduce el catabolismo y la degradación de proteínas musculares\n• Fortalece el sistema inmunológico durante períodos de estrés físico\n• Contribuye a la salud intestinal y la absorción de nutrientes\n• Optimiza la síntesis proteica y la hidratación muscular\n• Potencia los resultados del entrenamiento a largo plazo\n\nDisponible en los deliciosos sabores: Polvo sin sabor que puede mezclarse con cualquier bebida\n\nContenido: 150 gramos (30 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (5g) en 200ml de agua o jugo. Consumir 1 porción preferentemente justo después del entrenamiento para maximizar la recuperación. Para mejores resultados, se puede tomar una porción adicional antes de dormir para favorecer la recuperación nocturna. No exceder la dosis recomendada.'
  },
  {
    id: 29,
    name: 'STAR NUTRITION L-GLUTAMINE 300 GRS',
    category: 'AMINOACIDOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-l-glutamine-300-grs-ae95241637c733056b17502085464613-1024-1024_g1dpf1.webp',
    description: 'STAR NUTRITION L-GLUTAMINE en formato económico de 300 gramos es un suplemento de L-Glutamina pura, el aminoácido más abundante en el tejido muscular y fundamental para la recuperación. En períodos de estrés físico intenso como el entrenamiento, los niveles de glutamina disminuyen significativamente, lo que puede comprometer la recuperación y el sistema inmunológico. Este suplemento aporta 5g de glutamina por porción para restaurar los niveles y optimizar la recuperación muscular y la salud general.\n\nBeneficios:\n\n• Acelera la recuperación muscular post-entrenamiento\n• Reduce el catabolismo y la degradación de proteínas musculares\n• Fortalece el sistema inmunológico durante períodos de estrés físico\n• Contribuye a la salud intestinal y la absorción de nutrientes\n• Optimiza la síntesis proteica y la hidratación muscular\n• Formato económico para tratamiento prolongado\n\nDisponible en los deliciosos sabores: Polvo sin sabor que puede mezclarse con cualquier bebida\n\nContenido: 300 gramos (60 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (5g) en 200ml de agua o jugo. Consumir 1 porción preferentemente justo después del entrenamiento para maximizar la recuperación. Para mejores resultados, se puede tomar una porción adicional antes de dormir para favorecer la recuperación nocturna. No exceder la dosis recomendada.'
  },
  {
    id: 30,
    name: 'STAR NUTRITION BCAA 2000 120 CAPS',
    category: 'AMINOACIDOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-bcaa-2000-120-caps-6a54bcd3dd4b59a2b617502086944976-1024-1024_iz6kvz.webp',
    description: 'STAR NUTRITION BCAA 2000 proporciona aminoácidos de cadena ramificada (Leucina, Isoleucina y Valina) en su forma encapsulada para mayor comodidad y precisión en la dosificación. Los BCAAs son fundamentales para prevenir el catabolismo muscular, acelerar la recuperación y favorecer la síntesis proteica, especialmente durante entrenamientos intensos o períodos de definición. Cada cápsula aporta 2000mg de BCAAs en la proporción óptima 2:1:1 para maximizar los resultados.\n\nBeneficios:\n\n• Reduce el catabolismo muscular durante entrenamientos intensos\n• Acelera la recuperación post-entrenamiento\n• Favorece la síntesis proteica y el desarrollo muscular\n• Proporciona energía adicional para el entrenamiento\n• Formato en cápsulas para mayor comodidad y precisión\n• No requiere preparación, ideal para llevar a cualquier parte\n\nDisponible en los deliciosos sabores: Presentación en cápsulas (sin sabor)\n\nContenido: 120 cápsulas\n\nModo de uso: Tomar 4 cápsulas (8g de BCAAs) antes o durante el entrenamiento para prevenir el catabolismo muscular. Alternativamente, pueden tomarse 4 cápsulas inmediatamente después del entrenamiento para potenciar la recuperación. En días de entrenamiento muy intenso, se puede tomar una dosis adicional entre comidas. No exceder la dosis recomendada.'
  },
  {
    id: 31,
    name: 'STAR NUTRITION HYDROPLUS SPORT DRINK 700 GRS',
    category: 'PRE ENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-hydroplus-sport-drink-700-grs-blue-razz-044c85592e98582de317580389117292-1024-1024_qt7hdw.webp',
    description: 'STAR NUTRITION HYDROPLUS SPORT DRINK es una bebida isotónica avanzada para deportistas de resistencia, formulada específicamente para optimizar la hidratación, reponer electrolitos y proporcionar energía sostenida durante actividades físicas prolongadas. Su fórmula balanceada con carbohidratos y electrolitos favorece la absorción rápida de líquidos, previene calambres musculares y retrasa la fatiga, permitiéndote mantener un rendimiento óptimo durante más tiempo.\n\nBeneficios:\n\n• Optimiza la hidratación durante el ejercicio\n• Repone electrolitos perdidos a través del sudor\n• Proporciona energía sostenida para actividades de resistencia\n• Previene calambres y fatiga muscular\n• Mejora la absorción de líquidos durante el ejercicio\n• Rinde hasta 10 litros de bebida lista para consumir\n\nDisponible en los deliciosos sabores: LIMA LIMON, BLUE RAZZ\n\nContenido: 700 gramos (rinde 10 litros aproximadamente)\n\nModo de uso: Disolver 70g (2 medidas) en 1 litro de agua. Agitar hasta completa disolución. Consumir antes, durante y después de la actividad física. Para actividades de más de 60 minutos, se recomienda beber 150-250ml cada 15-20 minutos. Para preparación individual, disolver 1 cucharada pequeña (7g) en 100ml de agua. Mantener el producto siempre bien cerrado en lugar fresco y seco.'
  },
  {
    id: 32,
    name: 'STAR NUTRITION Vitamin K2 + D3 60 Caps',
    category: 'VITAMINAS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/vitaminas-k2d3-1-462e3f13db2321451617631256419283-1024-1024_aeqgig.webp',
    description: 'STAR NUTRITION Vitamin K2 + D3 60 Cápsulas es un suplemento diseñado para brindar un soporte integral a tu sistema óseo y cardiovascular mediante la acción combinada de las vitaminas K2 y D3.\n\nLa Vitamina D3 (Colecalciferol) facilita la absorción intestinal del calcio, asegurando que tu organismo pueda aprovecharlo al máximo. Por su parte, la Vitamina K2 (Menaquinona-7) dirige ese calcio hacia los huesos y dientes, previniendo su acumulación en arterias y tejidos blandos, lo que mantiene tus arterias limpias y saludables.\n\nBeneficios destacados:\nMejora la absorción y fijación del calcio en los huesos, fortaleciendo tu estructura ósea.\nPreviene la calcificación arterial, ayudando a mantener una circulación saludable.\nFavorece la salud cardiovascular, contribuyendo al bienestar general.\nRefuerza el sistema inmunológico para una defensa natural más efectiva.\nIdeal para deportistas, adultos mayores o personas con deficiencia de vitamina D que buscan un cuidado completo.\n\nModo de uso:\nConsumí 1 cápsula diaria, preferentemente junto a una comida, o según indicación médica para obtener los mejores resultados.\n\nIngredientes:\nMagnesio estearato, dióxido de silicio, Vitamina K2 (Menaquinona-7) y Vitamina D3 (Colecalciferol). Libre de gluten.\n\nAdvertencias:\nNo consumir durante el embarazo, la lactancia ni en niños. Mantener fuera del alcance de los niños. El consumo de suplementos dietarios no reemplaza una dieta variada y equilibrada. Conservar en un lugar fresco y seco, a temperatura inferior a 25°C.\n\nInformación Nutricional (por cápsula):\nVitamina D3 (Colecalciferol): 100 mcg (2000% VD*)\nVitamina K2 (Menaquinona-7): 100 mcg (154% VD*)\n*Valores diarios basados en una dieta de 2000 kcal.\n\nCon STAR NUTRITION Vitamin K2 + D3, asegurás un aporte efectivo para mantener huesos fuertes y un sistema cardiovascular saludable, promoviendo tu bienestar día a día.'
  },
  {
    id: 33,
    name: 'STAR NUTRITION PLATINUM WHEY PROTEIN 2 LBS',
    category: 'PROTEINAS Y GANADORES DE PESO',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-platinum-whey-protein-2-lbs-vainilla-ad490ec0480c3cd26217501868129692-1024-1024_oxzbcg.webp',
    description: 'STAR NUTRITION PLATINUM WHEY PROTEIN es una proteína premium de suero que combina concentrado y aislado en una proporción óptima para maximizar tus resultados. Con un elevado contenido proteico, aminoácidos esenciales y enriquecida con enzimas digestivas, esta fórmula superior ofrece una rápida absorción y excelente digestibilidad para potenciar la recuperación y el desarrollo muscular.\n\nBeneficios:\n\n• Fórmula premium con concentrado y aislado de suero\n• Alto contenido proteico con mínimo de grasas y carbohidratos\n• Perfil completo de aminoácidos esenciales y BCAAs\n• Enriquecida con enzimas digestivas para una absorción óptima\n• Promueve el crecimiento y la recuperación muscular\n• Excelente solubilidad y delicioso sabor\n\nDisponible en los deliciosos sabores: VAINILLA, CHOCOLATE, COOKIES & CREAM, FRUTILLA, BANANA\n\nContenido: 908 gramos (2 libras)\n\nModo de uso: Mezclar 1 medida (30g) en 200-250ml de agua o leche. Consumir 1-3 porciones diarias, preferentemente después del entrenamiento o como complemento proteico en cualquier momento del día. Para una mejor disolución, utilizar shaker o batidora.'
  },
  {
    id: 34,
    name: 'STAR NUTRITION All-In-One Vitamin x60 Comp',
    category: 'VITAMINAS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-all-in-one-vitamin-x60-comp-3fc306ea140be090b217501741206220-1024-1024_bgvgw9.webp',
    description: 'STAR NUTRITION All-In-One Vitamin es un completo multivitamínico diseñado para cubrir todas tus necesidades nutricionales diarias en un solo comprimido. Contiene vitaminas esenciales, minerales y antioxidantes para mantener un óptimo estado de salud y bienestar.\n\nBeneficios:\n\n• Proporciona todas las vitaminas y minerales esenciales\n• Fortalece el sistema inmunológico\n• Combate la fatiga y aumenta la energía\n• Mejora la salud ósea y articular\n• Promueve la salud cardiovascular\n• Optimiza las funciones cognitivas\n\nContenido: 60 comprimidos\n\nModo de uso: Tomar 1 comprimido diario preferentemente con el desayuno. Para asegurar la absorción óptima de nutrientes, consumir con alimentos.'
  },
  {
    id: 35,
    name: 'STAR NUTRITION MUTANTMASS 1,5K',
    category: 'PROTEINAS Y GANADORES DE PESO',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-mutantmass-15k-vainilla-ice-cream-ac294d3907ca066bf417501880312529-1024-1024_srns9n.webp',
    description: 'STAR NUTRITION MUTANTMASS es un ganador de peso de alta calidad, especialmente formulado para personas que buscan aumentar su masa muscular de forma efectiva. Con una combinación precisa de proteínas, carbohidratos complejos y grasas saludables, este suplemento aporta las calorías y nutrientes necesarios para favorecer el aumento de peso y el desarrollo muscular en personas con metabolismo acelerado o dificultad para ganar masa.\n\nBeneficios:\n\n• Alto aporte calórico para favorecer el aumento de peso\n• Mezcla de proteínas de liberación rápida y sostenida\n• Carbohidratos complejos para energía prolongada\n• Contiene creatina para potenciar el desarrollo muscular\n• Mezcla de vitaminas y minerales para optimizar resultados\n• Delicioso sabor y excelente disolución\n\nDisponible en los deliciosos sabores: VAINILLA ICE CREAM, CHOCOLATE SUIZO, COOKIES & CREAM, STRAWBERRY CREAM\n\nContenido: 1500 gramos (1,5 kilos)\n\nModo de uso: Mezclar 3 medidas (100g) en 300-350ml de agua o leche. Consumir 1-2 porciones diarias, preferentemente después del entrenamiento y/o entre comidas como complemento calórico.'
  },
  {
    id: 36,
    name: 'STAR NUTRITION MUTANTMASS 5 KG ZIPPER PACK',
    category: 'PROTEINAS Y GANADORES DE PESO',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-mutantmass-5-kilos-zipper-pack-vainilla-ice-cream-a06e4bee602fe7eebe17501881535079-1024-1024_h6jmsm.webp',
    description: 'STAR NUTRITION MUTANTMASS en su formato económico de 5 kilos con cierre zipper es un ganador de peso premium, desarrollado para personas que buscan aumentar su masa muscular de forma sostenida y efectiva. Esta fórmula avanzada combina proteínas de múltiples fuentes, carbohidratos complejos y grasas esenciales.\n\nBeneficios:\n\n• Elevado aporte calórico para maximizar el aumento de peso\n• Matriz proteica de liberación secuencial\n• Mezcla estratégica de carbohidratos\n• Contiene creatina para potenciar el volumen muscular\n• Formato económico de larga duración\n\nDisponible en los deliciosos sabores: VAINILLA ICE CREAM, CHOCOLATE SUIZO, COOKIES & CREAM, STRAWBERRY CREAM\n\nContenido: 5000 gramos (5 kilos)\n\nModo de uso: Mezclar 3 medidas (100g) en 300-350ml de agua o leche. Consumir 1-2 porciones diarias, preferentemente después del entrenamiento y/o entre comidas.'
  },
  {
    id: 37,
    name: 'STAR NUTRITION PLATINUM WHEY ISOLATE 2 LBS',
    category: 'PROTEINAS Y GANADORES DE PESO',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-platinum-whey-isolate-2-lbs-vainilla-c14ff587e446b41ded17501816271042-1024-1024_xdltgv.webp',
    description: 'STAR NUTRITION PLATINUM WHEY ISOLATE es una proteína de suero aislada premium importada de Milk Specialties USA, que ofrece la máxima pureza y concentración proteica.\n\nBeneficios:\n\n• 90% de contenido proteico por porción\n• Aislado de suero de máxima calidad\n• Mínimo contenido de grasas y carbohidratos\n• Enriquecida con enzimas digestivas\n• Rápida asimilación\n\nDisponible en los deliciosos sabores: VAINILLA, CHOCOLATE\n\nContenido: 908 gramos (2 libras)\n\nModo de uso: Mezclar 1 medida (30g) en 200-250ml de agua o leche descremada.'
  },
  {
    id: 38,
    name: 'STAR NUTRITION Caffeine 200 x 30Caps',
    category: 'PRE ENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-caffeine-200-x-30caps-2a57ca6dfef96413cc17501728493075-1024-1024_aajagr.webp',
    description: 'STAR NUTRITION Caffeine 200 es un suplemento de cafeína anhidra que provee 200mg por cápsula para maximizar la energía, mejorar el enfoque mental y potenciar el rendimiento físico.\n\nBeneficios:\n\n• Aumenta los niveles de energía\n• Mejora el rendimiento físico\n• Acelera el metabolismo\n• Mejora la concentración\n\nContenido: 30 cápsulas\n\nModo de uso: Tomar 1 cápsula 30 minutos antes del entrenamiento o cuando se necesite un impulso de energía.'
  },
  {
    id: 39,
    name: 'STAR NUTRITION Vitamin C 60 Caps',
    category: 'VITAMINAS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-vitamin-c-60-caps-62de7e1fbb33ddab4917501740959509-1024-1024_gpp1hw.webp',
    description: 'STAR NUTRITION Vitamin C es un suplemento esencial para fortalecer el sistema inmunológico y promover una óptima salud.\n\nBeneficios:\n\n• Fortalece el sistema inmunológico\n• Poderoso antioxidante\n• Favorece la producción de colágeno\n• Reduce la fatiga\n\nContenido: 60 cápsulas\n\nModo de uso: Tomar 1 cápsula diaria con alimentos.'
  },
  {
    id: 40,
    name: 'STAR NUTRITION N.O BOOSTER 5 NITRIC OXIDE PRECURSOR 180 TABS',
    category: 'PRE ENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-n-o-booster-5-nitric-oxide-precursor-180-tabs-12d0c06834ee7a98ea17501801748128-1024-1024_s5suto.webp',
    description: 'STAR NUTRITION N.O BOOSTER 5 NITRIC OXIDE PRECURSOR es un potente suplemento diseñado para maximizar la producción de óxido nítrico.\n\nBeneficios:\n\n• Incrementa la producción de óxido nítrico\n• Mejora el pump muscular\n• Optimiza el flujo sanguíneo\n\nContenido: 180 tabletas\n\nModo de uso: Tomar 6 tabletas 30 minutos antes del entrenamiento.'
  },
  {
    id: 41,
    name: 'STAR NUTRITION 100% BETA ALANINA 300GRS',
    category: 'AMINOACIDOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-100-beta-alanina-300grs-e4c0fb71b92733bb2817501811100270-1024-1024_cuyiyo.webp',
    description: 'STAR NUTRITION 100% BETA ALANINA es un suplemento de alto rendimiento que ayuda a retrasar la fatiga muscular.\n\nBeneficios:\n\n• Retrasa la fatiga\n• Aumenta la resistencia\n• Mejora el rendimiento\n\nContenido: 300 gramos\n\nModo de uso: Tomar 1 medida (3g) antes del entrenamiento.'
  },
  {
    id: 42,
    name: 'STAR NUTRITION JUST WHEY 2 LBS',
    category: 'PROTEINAS Y GANADORES DE PESO',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-just-whey-2-lbs-981b900f9c97dbb06017501814560702-1024-1024_x6ft08.webp',
    description: 'STAR NUTRITION JUST WHEY es una proteína de suero concentrada de alta calidad, sin aditivos ni saborizantes.\n\nBeneficios:\n\n• Alta pureza\n• Rápida absorción\n• Versátil\n\nContenido: 908 gramos\n\nModo de uso: Mezclar 1 medida (30g) en agua o leche.'
  },
  {
    id: 43,
    name: 'STAR NUTRITION L-CARNITINE 60 COMP',
    category: 'QUEMADORES',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-l-carnitine-60-comp-3e6e252c182bf4414617502054878333-1024-1024_gy3wqh.webp',
    description: 'STAR NUTRITION L-CARNITINE es un suplemento diseñado para optimizar el metabolismo de las grasas.\n\nBeneficios:\n\n• Favorece la quema de grasa\n• Mejora el rendimiento\n\nContenido: 60 comprimidos\n\nModo de uso: Tomar 2 comprimidos antes del entrenamiento.'
  },
  {
    id: 44,
    name: 'STAR NUTRITION L-CARNITINE LIQUID LIMA 500',
    category: 'QUEMADORES',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-l-carnitine-liquid-lima-500-307acb5fa941c83d1b17502058003138-1024-1024_ssjegk.webp',
    description: 'STAR NUTRITION L-CARNITINE LIQUID es un suplemento líquido de rápida absorción para optimizar el uso de grasa como energía.\n\nContenido: 500 ml\n\nModo de uso: Tomar 15ml antes del entrenamiento.'
  },
  {
    id: 45,
    name: 'STAR NUTRITION ESSENTIAL AMINO LIMON 360',
    category: 'AMINOACIDOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-essential-amino-limon-360-d1b88d8e0678b6299f17502069244526-1024-1024_cnhhwx.webp',
    description: 'STAR NUTRITION ESSENTIAL AMINO aporta los 9 aminoácidos esenciales para optimizar la recuperación y síntesis proteica.\n\nContenido: 360 gramos\n\nModo de uso: Mezclar 1 medida en agua durante o después del entrenamiento.'
  },
  {
    id: 46,
    name: 'STAR NUTRITION L-ARGININA GH 150 GRS',
    category: 'AMINOACIDOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-l-arginina-gh-150-grs-ddd9385aa28d5555ab17502079732667-1024-1024_a4up3v.webp',
    description: 'STAR NUTRITION L-ARGININA GH favorece la producción de óxido nítrico y el pump muscular.\n\nContenido: 150 gramos\n\nModo de uso: Tomar 1 medida antes del entrenamiento.'
  },
  {
    id: 47,
    name: 'STAR NUTRITION L-Citrulline x 300grs',
    category: 'AMINOACIDOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-l-citrulline-x-300grs-5c77590d2f4d90f37517501728964975-1024-1024_eooosz.webp',
    description: 'STAR NUTRITION L-Citrulline mejora el flujo sanguíneo y el rendimiento durante el entrenamiento.\n\nContenido: 300 gramos\n\nModo de uso: Tomar 3g antes del entrenamiento.'
  },
  {
    id: 48,
    name: 'STAR NUTRITION NITRO WHEY 2LBS',
    category: 'PROTEINAS Y GANADORES DE PESO',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-nitro-whey-2lbs-vainilla-60726758596b9592cb17501817935760-1024-1024_njt34s.webp',
    description: 'STAR NUTRITION NITRO WHEY es una proteína avanzada de rápida absorción diseñada para maximizar la recuperación muscular.\n\nContenido: 908 gramos\n\nModo de uso: Mezclar 1 medida en agua o leche después del entrenamiento.'
  }
]
// Productos GOLD
rawProducts.push(
  {
    id: 49,
    name: "AMINO ESSENTIAL 240GRS",
    category: "AMINOACIDOS",
    description: "Amino Essential de GOLD NUTRITION es una completa fórmula de aminoácidos esenciales (EAAs) que incluye todos los aminoácidos que el cuerpo no puede producir, fundamentales para el crecimiento muscular y la recuperación óptima.\nBeneficios:\n• Contiene los 9 aminoácidos esenciales en proporciones óptimas\n• Estimula la síntesis de proteínas musculares\n• Previene el catabolismo durante entrenamientos intensos\n• Mejora la resistencia y retrasa la fatiga\n• Favorece una recuperación más rápida\n• Fórmula en polvo de rápida absorción\nDisponible en los deliciosos sabores: Mango\nContenido: 240 gramos\nModo de uso: Mezclar una medida (8g) con 200ml de agua. Tomar una porción durante el entrenamiento para máximo aprovechamiento. En días de descanso, tomar una porción entre comidas para mantener un balance de aminoácidos positivo.",
    price: 25740,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912648/amino-essential-mango-240g-1-d89eb2f634f36e492517496775438794-1024-1024_ppy2nf.webp",
    brand: "GOLD"
  },
  {
    id: 50,
    name: "AMINO GOLD 280GRS",
    category: "AMINOACIDOS",
    description: "Amino Gold de GOLD NUTRITION es una avanzada fórmula de aminoácidos de cadena ramificada (BCAAs) enriquecida con L-Glutamina y electrolitos, diseñada para maximizar el rendimiento durante el entrenamiento y acelerar la recuperación muscular.\nBeneficios:\n• Proporciona BCAAs en proporción óptima 2:1:1 (leucina, isoleucina, valina)\n• Contiene L-Glutamina para mejorar la recuperación\n• Enriquecido con electrolitos para una mejor hidratación\n• Aumenta la resistencia durante entrenamientos intensos\n• Reduce el dolor muscular post-entrenamiento\n• Previene el catabolismo muscular\nDisponible en los deliciosos sabores: Grapefruit\nContenido: 280 gramos\nModo de uso: Mezclar una medida (10g) con 250ml de agua. Tomar una porción durante el entrenamiento para maximizar el rendimiento. En días de alta intensidad, puede tomarse una porción adicional después del entrenamiento para potenciar la recuperación.",
    price: 23140,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912847/amino-gold-grapefruit-280g-1-db515a372b705485d017496776541419-1024-1024_fqpglm.webp",
    brand: "GOLD"
  },
  {
    id: 51,
    name: "L-GLUTAMINE MICRONIZED 225GRS",
    category: "AMINOACIDOS",
    description: "L-Glutamine Micronized de GOLD NUTRITION es glutamina micronizada de máxima pureza, el aminoácido más abundante en el tejido muscular, esencial para la recuperación, el sistema inmunológico y la salud intestinal.\nBeneficios:\n• Favorece la recuperación muscular post-entrenamiento\n• Contribuye al mantenimiento del sistema inmunológico\n• Ayuda a preservar la masa muscular en periodos de definición\n• Promueve la salud intestinal\n• Formato micronizado para mayor biodisponibilidad\n• Reduce el tiempo de recuperación entre entrenamientos\nDisponible en los deliciosos sabores: Neutro\nContenido: 225 gramos\nModo de uso: Tomar 5g (una cucharada) al día, preferentemente después del entrenamiento o antes de dormir, disuelta en agua o tu bebida favorita. Para resultados óptimos, mantener un consumo regular.",
    price: 19110,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912727/l-glutamine-the-power-of-recovery-225g-1-d8d38c1e652f1ded9117496774879696-1024-1024_g2a0kh.webp",
    brand: "GOLD"
  },
  {
    id: 52,
    name: "COLLAGEN HIDROLIZED +AH+Q10+VIT C 60CÁP",
    category: "COLAGENOS Y RESVERATROL",
    description: "Collagen Hidrolized en cápsulas de GOLD NUTRITION ofrece todos los beneficios del colágeno hidrolizado, ácido hialurónico, coenzima Q10 y vitamina C en un práctico formato, ideal para personas con ritmo de vida acelerado que buscan mantener la salud y belleza de piel, articulaciones, cabello y uñas.\nBeneficios:\n• Formato en cápsulas para mayor comodidad y precisión\n• Promueve la producción natural de colágeno en el organismo\n• Reduce visiblemente líneas finas y arrugas\n• Mejora la elasticidad y firmeza de la piel\n• Fortalece cabello y uñas\n• Apoya la salud y movilidad articular\nDisponible en los deliciosos sabores: Único (cápsulas)\nContenido: 60 cápsulas\nModo de uso: Tomar 2 cápsulas al día con un vaso de agua, preferentemente con el desayuno o antes de dormir. Para mejores resultados, consumir de forma constante durante al menos 2-3 meses consecutivos.",
    price: 11960,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912759/hydrolyzed-collagen-60-comp-523a7c6d0303fdb5f117496820713436-1024-1024_zjjgrb.webp",
    brand: "GOLD"
  },
  {
    id: 53,
    name: "COLLAGEN HIDROLIZED +AH+TE B,+VIT C 200GRS",
    category: "COLAGENOS Y RESVERATROL",
    description: "Collagen Hidrolized de GOLD NUTRITION es una fórmula premium de colágeno hidrolizado enriquecida con ácido hialurónico, coenzima Q10 y vitamina C, diseñada para nutrir la piel, articulaciones, cabello y uñas desde el interior, promoviendo una belleza natural y duradera.\nBeneficios:\n• Mejora la elasticidad y firmeza de la piel\n• Reduce la aparición de arrugas y líneas de expresión\n• Fortalece cabello y uñas\n• Apoya la salud articular y reduce molestias\n• Promueve la producción natural de colágeno gracias a la vitamina C\n• Acción antioxidante por la coenzima Q10\nDisponible en los deliciosos sabores: Pomelo Rosado, Frutilla\nContenido: 200 gramos\nModo de uso: Mezclar una medida (6,7g) en 200ml de agua o jugo, preferentemente por la mañana en ayunas o por la noche antes de dormir. Consumir diariamente para resultados óptimos. Los efectos notables comienzan a partir de las 4-6 semanas de uso constante.",
    price: 19890,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912768/hydrolyzed-collagen-pomelo-rosado-200g-993ee38b92c060384b17496819682826-1024-1024_rmauit.webp",
    brand: "GOLD"
  },
  {
    id: 54,
    name: "CREATINE CREAPURE 200GR",
    category: "CREATINAS",
    description: "GOLD NUTRITION Creatine CREAPURE 200 Gramos La Creatina Monohidrato Creapure® de Gold Nutrition es el suplemento definitivo para quienes buscan maximizar su fuerza, potencia y volumen muscular. Elaborada en Alemania bajo estrictos estándares farmacéuticos por AlzChem Trostberg GmbH, esta creatina garantiza una pureza excepcional del 99.99%, libre de impurezas y contaminantes, lo que la convierte en la opción más segura y efectiva del mercado.\n¿Por qué elegir Creapure®?\nCreapure® es una marca registrada reconocida mundialmente por su: - Pureza certificada - Seguridad de grado farmacéutico - Control y trazabilidad total en su producción\nCada envase incluye un sello oficial Creapure® y un código de autenticidad (25GL21), asegurando la calidad y originalidad del producto.\nBeneficios clave\nIncrementa la fuerza y la potencia muscular para entrenamientos intensos.\nFavorece el aumento de masa muscular y acelera la recuperación entre series.\nRetrasa la fatiga muscular, mejorando tu rendimiento y resistencia.\nInformación nutricional\nPorción: 5 g (1 cucharadita)\nPor envase: 40 porciones\nContenido de creatina monohidrato por porción: 5000 mg\nLibre de gluten, apto para veganos y sin ingredientes añadidos que aporten calorías.\nModo de uso\nDisolver 1 porción (5 g) en 200–250 ml de agua. Se recomienda su consumo antes o después del entrenamiento para obtener mejores resultados.\nCertificaciones y garantías\nSello oficial Creapure®\nLibre de impurezas: dicianamida, dihidrotriazina\nCumple con estándares GMP, HACCP e ISO\nPresentación\nPolvo instantáneo\nContenido neto: 200 gramos\nAdvertencias: No utilizar durante el embarazo o la lactancia. Mantener fuera del alcance de los niños. No reemplaza una dieta equilibrada. Consultar al médico en caso de supervisión especial.\nCon GOLD NUTRITION Creatine CREAPURE, potencia tu entrenamiento con la pureza y calidad alemana que tu cuerpo necesita para alcanzar su máximo rendimiento.",
    price: 33150,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912779/creatine-creapure-monohidrato-200g-1-4da8ee608d90bdd36d17628758389024-1024-1024_sjs46h.webp",
    brand: "GOLD"
  },
  {
    id: 55,
    name: "CREATINE MONOHYDRATE 300GR",
    category: "CREATINAS",
    description: "Creatine Monohydrate de GOLD NUTRITION es un suplemento de creatina monohidrato pura de la más alta calidad y pureza, diseñado para aumentar la fuerza, potencia y rendimiento durante entrenamientos intensos.\nBeneficios:\n• Aumenta los niveles de ATP para mayor energía en ejercicios explosivos\n• Mejora la fuerza y potencia muscular\n• Facilita la ganancia de masa muscular\n• Ayuda a retrasar la fatiga durante entrenamientos intensos\n• 100% creatina monohidrato pura micronizada\n• Incrementa el volumen celular muscular\nDisponible en los deliciosos sabores: Neutro\nContenido: 300 gramos\nModo de uso: Tomar 5g (una cucharada) al día, preferentemente después del entrenamiento mezclada con agua, jugo o tu bebida favorita. En fase de carga, puedes tomar 20g diarios (divididos en 4 tomas) durante 5-7 días, seguido por fase de mantenimiento de 5g diarios.",
    price: 23140,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912784/creatine-monohydrate-300g-1-c7ab9af3f92c42296b17496774028064-1024-1024_f0oome.webp",
    brand: "GOLD"
  },
  {
    id: 56,
    name: "ZMA 60 CAPS",
    category: "HORMONALES",
    description: "ZMA de GOLD NUTRITION es una avanzada fórmula que combina Zinc, Magnesio y Vitamina B6 en proporciones científicamente estudiadas para optimizar los niveles hormonales, la recuperación muscular y la calidad del sueño en deportistas.\nBeneficios:\n• Contribuye a mantener niveles óptimos de testosterona\n• Mejora la calidad del sueño profundo y la recuperación\n• Optimiza la función muscular y previene calambres\n• Fortalece el sistema inmunológico\n• Incrementa la fuerza y el rendimiento físico\n• Combate deficiencias comunes en deportistas\nDisponible en los deliciosos sabores: Único (cápsulas)\nContenido: 60 cápsulas (30 servicios)\nModo de uso: Tomar 2 cápsulas al día, preferentemente con el estómago vacío 30-60 minutos antes de acostarse. Para mejores resultados, evitar consumir con alimentos ricos en calcio, ya que puede interferir con la absorción del zinc y magnesio.",
    price: 14950,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912809/zma-pro-hormonales-60comp-1-1d253ada1b3c0e59c817496784990319-1024-1024_wdiytl.webp",
    brand: "GOLD"
  },
  {
    id: 57,
    name: "MAGNESIUM CITRATE 60 CAPS",
    category: "MAGNESIO Y OMEGA 3",
    description: "Magnesium Citrate de GOLD NUTRITION proporciona magnesio en forma de citrato, altamente biodisponible y de fácil absorción, fundamental para más de 300 procesos bioquímicos en el cuerpo, incluida la función muscular, nerviosa y ósea.\nBeneficios:\n• Contribuye a la reducción del cansancio y la fatiga\n• Favorece el equilibrio electrolítico y la hidratación\n• Apoya la relajación muscular y previene calambres\n• Contribuye a la salud del sistema nervioso\n• Ayuda a la correcta mineralización ósea\n• Mejora la calidad del sueño y reduce el estrés\nDisponible en los deliciosos sabores: Único (cápsulas)\nContenido: 60 cápsulas\nModo de uso: Tomar 2 cápsulas al día, preferentemente con la cena o antes de dormir para favorecer la relajación muscular y mejorar el descanso. Puede dividirse la dosis en 1 cápsula por la mañana y 1 por la noche.",
    price: 14950,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912820/magnesium-citrate-800mg-1-fcb52cf09c4654cbf917496783651140-1024-1024_wwzzii.webp",
    brand: "GOLD"
  },
  {
    id: 58,
    name: "OMEGA 3 - FISH OIL 30 CAPS",
    category: "MAGNESIO Y OMEGA 3",
    description: "Omega 3 Fish Oil de GOLD NUTRITION proporciona ácidos grasos omega-3 (EPA y DHA) de alta concentración y pureza, derivados de pescados de aguas frías, fundamentales para la salud cardiovascular, cerebral, visual y para reducir la inflamación.\nBeneficios:\n• Promueve la salud cardiovascular y reduce triglicéridos\n• Apoya la función cerebral y cognitiva\n• Contribuye a reducir la inflamación en el organismo\n• Mantiene la salud de las articulaciones\n• Mejora la salud ocular y la visión\n• Alta concentración de EPA y DHA por cápsula\nDisponible en los deliciosos sabores: Único (cápsulas)\nContenido: 30 cápsulas\nModo de uso: Tomar 1 cápsula al día con las comidas para facilitar la absorción. Para condiciones inflamatorias o mayor demanda, puede aumentarse a 2 cápsulas diarias bajo supervisión profesional. Conservar en lugar fresco y seco.",
    price: 28990,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912830/omega-3-fish-oil-30-comp-1-9ef9bb04c0f09e455317496784643641-1024-1024_ux492y.webp",
    brand: "GOLD"
  },
  {
    id: 59,
    name: "N.O GOLD 195GRS",
    category: "PRE ENTRENOS",
    description: "N.O Gold de GOLD NUTRITION es un potente potenciador de óxido nítrico diseñado para aumentar el flujo sanguíneo, mejorar la vasodilatación y potenciar la congestión muscular durante el entrenamiento, proporcionando un efecto pump excepcional.\nBeneficios:\n• Aumenta los niveles de óxido nítrico para máxima vasodilatación\n• Mejora el flujo sanguíneo y la entrega de nutrientes al músculo\n• Proporciona un efecto pump intenso y duradero\n• Potencia la resistencia y el rendimiento durante el entrenamiento\n• Formulado con L-Arginina, Citrulina y ingredientes sinérgicos\n• Acelera la recuperación entre series\nDisponible en los deliciosos sabores: Raspberry\nContenido: 195 gramos\nModo de uso: Mezclar una medida (6.5g) con 200ml de agua. Tomar una porción 20-30 minutos antes del entrenamiento para maximizar el efecto vasodilatador. Para mayor efectividad, consumir con el estómago vacío.",
    price: 23140,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912838/n-o-gold-oxido-nitrico-195g-1-962bae23ff78608f6717496778053999-1024-1024_ik8shq.webp",
    brand: "GOLD"
  },
  {
    id: 60,
    name: "PRE WORK GOLD 280GRS",
    category: "PRE ENTRENOS",
    description: "Amino Gold de GOLD NUTRITION es una avanzada fórmula de aminoácidos de cadena ramificada (BCAAs) enriquecida con L-Glutamina y electrolitos, diseñada para maximizar el rendimiento durante el entrenamiento y acelerar la recuperación muscular.\nBeneficios:\n• Proporciona BCAAs en proporción óptima 2:1:1 (leucina, isoleucina, valina)\n• Contiene L-Glutamina para mejorar la recuperación\n• Enriquecido con electrolitos para una mejor hidratación\n• Aumenta la resistencia durante entrenamientos intensos\n• Reduce el dolor muscular post-entrenamiento\n• Previene el catabolismo muscular\nDisponible en los deliciosos sabores: Grapefruit\nContenido: 280 gramos\nModo de uso: Mezclar una medida (10g) con 250ml de agua. Tomar una porción durante el entrenamiento para maximizar el rendimiento. En días de alta intensidad, puede tomarse una porción adicional después del entrenamiento para potenciar la recuperación.",
    price: 23140,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912696/amino-gold-grapefruit-280g-1-db515a372b705485d017496776541419-1024-1024_nx61cu.webp",
    brand: "GOLD"
  },
  {
    id: 61,
    name: "100% WHEY PROTEIN 2LBS",
    category: "PROTEINAS Y GANADORES DE PESO",
    description: "La proteína de suero de leche 100% Whey Protein de GOLD NUTRITION es una fuente premium de proteínas de rápida absorción diseñada para ayudarte a desarrollar y mantener masa muscular magra.\nBeneficios:\n• Contiene 24g de proteína por porción para óptima recuperación muscular\n• Baja en carbohidratos y grasas\n• Fórmula de rápida absorción\n• Ayuda a la recuperación y crecimiento muscular\n• Delicioso sabor gourmet\n• Alta concentración de aminoácidos esenciales\nDisponible en los deliciosos sabores: Gourmet Milk Chocolate, Gourmet Vainilla, Strawberry Shake\nContenido: 908 gramos (2 libras)\nModo de uso: Mezclar una medida (30g) con 200-250ml de agua o leche. Consumir 1-3 porciones diarias, preferentemente antes o después del entrenamiento y/o entre comidas.",
    price: 45500,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912856/100-why-protein-2lb-vainilla-1-f2393dc2308f18ceb017496510202313-1024-1024_yylsrd.webp",
    brand: "GOLD"
  },
  {
    id: 62,
    name: "100% WHEY PROTEIN 5LBS",
    category: "PROTEINAS Y GANADORES DE PESO",
    description: "La proteína de suero de leche 100% Whey Protein de GOLD NUTRITION es una fuente premium de proteínas de rápida absorción en formato económico de 5 libras, diseñada para ayudarte a desarrollar y mantener masa muscular magra a largo plazo.\nBeneficios:\n• Contiene 24g de proteína por porción para óptima recuperación muscular\n• Baja en carbohidratos y grasas\n• Fórmula de rápida absorción\n• Ayuda a la recuperación y crecimiento muscular\n• Delicioso sabor gourmet\n• Formato económico de mayor duración\nDisponible en los deliciosos sabores: Gourmet Milk Chocolate, Gourmet Vainilla, Strawberry Shake\nContenido: 2268 gramos (5 libras)\nModo de uso: Mezclar una medida (30g) con 200-250ml de agua o leche. Consumir 1-3 porciones diarias, preferentemente antes o después del entrenamiento y/o entre comidas.",
    price: 109070,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912868/100-why-protein-5-lb-vainilla-1-48ebb7191935fe7f0317496510587737-1024-1024_naz14w.webp",
    brand: "GOLD"
  },
  {
    id: 63,
    name: "ISO GOLD PROTEIN 2LBS",
    category: "PROTEINAS Y GANADORES DE PESO",
    description: "ISO Gold Protein Hidrolized de GOLD NUTRITION es una proteína de suero aislada e hidrolizada premium, desarrollada para una absorción ultrarrápida y máxima pureza proteica, ideal para deportistas exigentes y personas intolerantes a la lactosa.\nBeneficios:\n• Máxima concentración proteica (90% de proteína)\n• Absorción ultrarrápida gracias al proceso de hidrólisis\n• Prácticamente libre de lactosa y grasas\n• Contribuye a la rápida recuperación y desarrollo muscular\n• Mínimo impacto digestivo\n• Ideal para periodos de definición muscular\nDisponible en los deliciosos sabores: Gourmet Milk Chocolate, Gourmet Vainilla\nContenido: 908 gramos (2 libras)\nModo de uso: Mezclar una medida (30g) con 200-250ml de agua fría. Consumir preferentemente después del entrenamiento para máxima absorción y aprovechamiento. También puede consumirse entre comidas o en cualquier momento que necesites un aporte rápido de proteínas.",
    price: 66950,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912877/gold-nutrition-protein-iso-gold-cocolate-1-2l-907g-204c60e21b34550cd717496511862205-1024-1024_sgetju.webp",
    brand: "GOLD"
  },
  {
    id: 64,
    name: "MUSCLE MASS GAINER 5LBS",
    category: "PROTEINAS Y GANADORES DE PESO",
    description: "Muscle Mass Gainer de GOLD NUTRITION es un ganador de peso premium diseñado especialmente para personas que buscan aumentar su masa muscular de forma rápida y efectiva con una equilibrada proporción de proteínas y carbohidratos de calidad.\nBeneficios:\n• Alto aporte calórico (700-800 calorías por porción)\n• 50g de proteína y 90g de carbohidratos por porción\n• Matriz de carbohidratos de liberación diferenciada\n• Enriquecido con creatina para potenciar el crecimiento muscular\n• Bajo contenido en azúcares y grasas\n• Fácil digestión y absorción\nDisponible en los deliciosos sabores: Gourmet Milk Chocolate, Gourmet Vainilla\nContenido: 2268 gramos (5 libras)\nModo de uso: Mezclar dos medidas (150g) con 450-500ml de agua o leche. Consumir 1-2 porciones diarias, preferentemente después del entrenamiento y/o entre comidas para maximizar el aporte calórico.",
    price: 50440,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912893/gainer-gold-nutrition-ganador-masa-muscular-2-267kg-5lb-chocolate-1-81b34f87f7c0601d5117496531757423-1024-1024_gljvnm.webp",
    brand: "GOLD"
  },
  {
    id: 65,
    name: "VEGETAL PROTEIN ISOLATE 2LBS",
    category: "PROTEINAS Y GANADORES DE PESO",
    description: "Vegetal Protein Isolate de GOLD NUTRITION es una proteína vegetal de alta calidad a base de aislado de proteína de arveja y arroz, desarrollada especialmente para veganos, vegetarianos o personas con intolerancias, ofreciendo un perfil completo de aminoácidos.\nBeneficios:\n• 100% vegetal y libre de alérgenos comunes\n• Perfil completo de aminoácidos esenciales\n• Fácil digestión y absorción\n• Ideal para veganos y vegetarianos\n• Bajo contenido en grasas y carbohidratos\n• Libre de gluten, lactosa y soya\nDisponible en los deliciosos sabores: Neutro, Manzana, Coco\nContenido: 908 gramos (2 libras)\nModo de uso: Mezclar una medida (30g) con 250ml de agua o bebida vegetal. Consumir 1-2 porciones diarias, preferentemente después del entrenamiento o entre comidas como aporte proteico.",
    price: 36400,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912902/vegetal_protein_isolate_gold_nutrition_neutro_2lb-vegan-907g-1-c142ef639ff16c7bab17496513739316-1024-1024_ysoefk.webp",
    brand: "GOLD"
  },
  {
    id: 66,
    name: "WHEY RIPPED 2LBS",
    category: "PROTEINAS Y GANADORES DE PESO",
    description: "Whey Ripped de GOLD NUTRITION combina proteína de suero de alta calidad con ingredientes termogénicos y lipolíticos, creando un suplemento único que ayuda al desarrollo muscular mientras favorece la pérdida de grasa corporal.\nBeneficios:\n• 22g de proteína por porción para desarrollo y mantenimiento muscular\n• Contiene L-Carnitina y cafeína para potenciar la quema de grasas\n• Extracto de té verde con potente efecto termogénico\n• Ayuda a mantener un metabolismo acelerado\n• Apoya la recuperación muscular\n• Ideal para fases de definición muscular\nDisponible en los deliciosos sabores: Gourmet Milk Chocolate, Gourmet Vainilla\nContenido: 908 gramos (2 libras)\nModo de uso: Mezclar una medida (35g) con 200-250ml de agua. Consumir 1-2 porciones diarias, preferentemente por la mañana y/o después del entrenamiento. Por su contenido de cafeína, evitar el consumo 5 horas antes de dormir.",
    price: 49660,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912912/whey-ripped-chocolate-1-dc3e4527420d0cf38f17496515540450-1024-1024_mjr0o6.webp",
    brand: "GOLD"
  },
  {
    id: 67,
    name: "LIPO GOLD ELITE 60 CAPS",
    category: "QUEMADORES",
    description: "Lipo Gold Elite U.C de GOLD NUTRITION es un quemador de grasa ultra concentrado de última generación que combina potentes extractos vegetales, estimulantes y nutrientes lipolíticos para maximizar la pérdida de grasa y preservar la masa muscular.\nBeneficios:\n• Fórmula ultra concentrada para máxima efectividad\n• Potente efecto termogénico que aumenta la temperatura corporal\n• Mejora la movilización y oxidación de ácidos grasos\n• Proporciona energía sostenida y enfoque mental\n• Ayuda a suprimir el apetito de forma natural\n• Incluye extractos vegetales que favorecen el metabolismo\nDisponible en los deliciosos sabores: Único (cápsulas)\nContenido: 60 cápsulas\nModo de uso: Debido a su alta concentración, comenzar con 1 cápsula antes del desayuno para evaluar tolerancia. Luego aumentar a 1 cápsula antes del desayuno y 1 cápsula antes del almuerzo o entrenamiento. No exceder las 2 cápsulas diarias. Evitar el consumo después de las 3 PM.",
    price: 16640,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912972/lipo-gold-elite-60-comp-1-382c99600cbdbe923117496780640898-1024-1024_ambgwf.webp",
    brand: "GOLD"
  },
  {
    id: 68,
    name: "LIPOBURN HARDCORE 120 TABS",
    category: "QUEMADORES",
    description: "Lipoburn Hardcore de GOLD NUTRITION es un potente quemador de grasa formulado con ingredientes termogénicos y lipolíticos que aceleran el metabolismo, aumentan la energía y optimizan la oxidación de grasas durante el ejercicio y a lo largo del día.\nBeneficios:\n• Potente efecto termogénico para aumentar el gasto calórico\n• Acelera el metabolismo de las grasas\n• Proporciona energía sostenida sin nerviosismo\n• Ayuda a controlar el apetito\n• Mejora el rendimiento durante el entrenamiento\n• Optimizado para regímenes de definición muscular\nDisponible en los deliciosos sabores: Único (cápsulas)\nContenido: 120 cápsulas\nModo de uso: Tomar 2 cápsulas 30 minutos antes del desayuno y 2 cápsulas 30 minutos antes del almuerzo o entrenamiento. Por su contenido de cafeína, no consumir después de las 4 PM para evitar interferencias con el sueño. Mantener una adecuada hidratación durante el uso.",
    price: 16640,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770912992/lipo-burn-hardcore-quemador-grasa-120-comp-1-e038c3cce18ba236c317496780288686-1024-1024_sxcwou.webp",
    brand: "GOLD"
  },
  {
    id: 69,
    name: "K2+D3 VITAMINS 30 COMPRIMIDOS",
    category: "VITAMINAS",
    description: "K2+D3 Vitamins de GOLD NUTRITION combina vitaminas K2 (MK-7) y D3 en su forma más biodisponible, una sinergia perfecta para la salud ósea, cardiovascular e inmunológica, asegurando la correcta mineralización de huesos y dientes.\nBeneficios:\n• Promueve la absorción y fijación de calcio en los huesos\n• Contribuye a la salud cardiovascular\n• Fortalece el sistema inmunológico\n• Previene la calcificación arterial\n• Mejora la densidad mineral ósea\n• Sinergia perfecta entre K2 y D3 para mayor efectividad\nDisponible en los deliciosos sabores: Único (comprimidos)\nContenido: 30 comprimidos\nModo de uso: Tomar 1 comprimido al día con una comida que contenga grasas para mejorar la absorción. Para mejores resultados, tomar de forma constante y a largo plazo como parte de un estilo de vida saludable.",
    price: 15730,
    image: "https://res.cloudinary.com/dzfpmiqds/image/upload/v1770913003/vitaminas-k2d3-30-comp-apto-vegano-1-04756a78a4a4cb21ef17496782983937-1024-1024_vwlgop.webp",
    
    brand: "GOLD"
  }
)

// Productos XTRENGHT
rawProducts.push(
  {
    id: 70,
    name: 'BCAA PRO 120 CAPS',
    category: 'AMINOACIDOS',
    description: 'XTRENGHT BCAA Pro es un suplemento de aminoácidos ramificados en cápsulas que proporciona la proporción óptima 2:1:1 de Leucina, Isoleucina y Valina. Estos aminoácidos esenciales son fundamentales para la síntesis proteica, la recuperación muscular y la prevención del catabolismo durante entrenamientos intensos.',
    price: 12350,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918182/xtrenght-bcaa-pro-120-caps-d76054810b95334fca17502115228286-1024-1024_oqszza.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 71,
    name: 'BETA ALANINE 180 CAPS',
    category: 'AMINOACIDOS',
    description: 'XTRENGHT Beta Alanine es un suplemento avanzado en cápsulas diseñado para aumentar los niveles de carnosina muscular, lo que retrasa la aparición de fatiga y mejora significativamente la resistencia durante entrenamientos de alta intensidad.',
    price: 13520,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918197/xtrenght-beta-alanine-180-caps-f0c11d48e28b0e81be17502116568701-1024-1024_ltqtwp.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 72,
    name: 'CARNITINE 90 CAPS',
    category: 'AMINOACIDOS',
    description: 'XTRENGHT L-Carnitine en cápsulas es un suplemento premium de L-Carnitina, ideal para deportistas que buscan optimizar su metabolismo de grasas y mejorar su rendimiento físico.',
    price: 12350,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918220/xtrenght-l-carnitine-90-caps-dbaeaa60f2d822ba2017502117111975-1024-1024_jlmk3q.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 73,
    name: 'GLUTAMINE 300GRS',
    category: 'AMINOACIDOS',
    description: 'XTRENGHT Glutamine es un suplemento de L-Glutamina pura de alta calidad, diseñado para optimizar la recuperación muscular y fortalecer el sistema inmunológico.',
    price: 26520,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918225/xtrenght-glutamine-300-grs-c3b8938cad061d43bc17502115839549-1024-1024_pu9qui.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 74,
    name: 'HYDRO BCAA PRO 360GRS',
    category: 'AMINOACIDOS',
    description: 'XTRENGHT Hydro BCAA es un suplemento avanzado de aminoácidos de cadena ramificada (BCAAs) en formato hidrosoluble para máxima absorción.',
    price: 24830,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918245/xtrenght-hydro-bcaa-360-grs-fruit-puch-48b928f36df193a14317581169134426-1024-1024_d94ful.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 75,
    name: 'CREATINE 250GRS',
    category: 'CREATINAS',
    description: 'XTRENGHT Creatine es un suplemento de monohidrato de creatina micronizada de la más alta pureza, diseñado para aumentar la fuerza, la potencia y el rendimiento.',
    price: 25220,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918253/xtrenght-creatine-250-grs-7d3175448f48c2feea17502116052851-1024-1024_jg8u89.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 76,
    name: 'CREATINE 500GRS',
    category: 'CREATINAS',
    description: 'XTRENGHT Creatine 500 GRS es un suplemento de monohidrato de creatina micronizada de máxima pureza en formato económico.',
    price: 49400,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918266/xtrenght-creatine-500-grs-288da4621db1a0fed017502116296856-1024-1024_pqygdk.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 77,
    name: 'NITROX 180 CAPS',
    category: 'PRE ENTRENOS',
    description: 'XTRENGHT Nitrox es un potente suplemento pre-entrenamiento en cápsulas diseñado para maximizar la energía, el rendimiento y el bombeo muscular.',
    price: 13390,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918275/xtrenght-nitrox-180-caps-1b7b9678836547634c17502114897108-1024-1024_gilyc3.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 78,
    name: 'ADVANCE WHEY 2LB',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: 'XTRENGHT Advanced Whey Protein es una fórmula superior que combina tres fuentes de proteína de suero (isolate, hidrolizado y concentrado).',
    price: 49400,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918283/xtrenght-advanced-whey-protein-2-lbs-chocolate-bd03733eb7fa1190c517502104246421-1024-1024_r4btht.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 79,
    name: 'BEST WHEY 2LB',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: 'XTRENGHT Best Whey es una proteína de suero premium diseñada para maximizar la recuperación muscular y el crecimiento.',
    price: 42900,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918313/xtrenght-best-whey-2-lbs-chocolate-b831e06cf715eda02c17502094071340-1024-1024_ynlla2.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 80,
    name: 'BEST WHEY 3KG BIG SIZE',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: 'XTRENGHT Best Whey Big Size es una proteína de suero premium en formato económico de 3 kg.',
    price: 128050,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918307/xtrenght-best-whey-2-lbs-chocolate-b831e06cf715eda02c17502094071340-1024-1024_n3f0p4.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 81,
    name: 'NITROGAIN 1.5KG',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: 'XTRENGHT Nitrogain es un ganador de peso premium diseñado para deportistas que buscan aumentar su masa muscular de forma efectiva.',
    price: 25870,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918335/xtrenght-nitrogain-1-5-kg-chocolate-878f720271f29bc17317502111693875-1024-1024_s1a33y.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 82,
    name: 'NITROGAIN 5KG BIG SIZE',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: 'XTRENGHT Nitrogain Big Size es un ganador de peso premium en formato económico de 5 kg.',
    price: 67600,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918323/xtrenght-nitrogain-big-size-5-kg-chocolate-64b8305efcbe31409217502113311659-1024-1024_mimjnp.webp',
    brand: 'XTRENGHT'
  },
  {
    id: 83,
    name: 'CUTTER 120CAPS',
    category: 'VITAMINAS',
    description: 'XTRENGHT Cutter es un potente quemador de grasa en cápsulas formulado con ingredientes específicos para acelerar el metabolismo, suprimir el apetito y aumentar los niveles de energía.',
    price: 11050,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770918328/xtrenght-cutter-120-caps-dc48832355c86fe02817502116814602-1024-1024_clikle.webp',
    brand: 'XTRENGHT'
  }
)

// Productos PITBULL
rawProducts.push(
  {
    id: 95,
    name: 'WHEY PROTEIN 2LBS CHOCOLATE',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Este suplemento a base de proteína de suero lácteo está disponible en sabor chocolate. Cada servicio aporta 24 gramos de proteína de alta calidad y tan solo 1,4 gramos de carbohidratos. Esta cantidad es ideal para quienes buscan incrementar su ingesta diaria de proteínas con el objetivo de promover el desarrollo muscular y acelerar la recuperación post-entrenamiento.  MODO DE USO: Disolver un scoop del producto (34g) en 200ml de agua o leche. Batir enérgicamente por 30 segundos y consumir preferentemente justo después de finalizar la actividad física. INGREDIENTES: Proteína concentrada de suero lácteo, cacao, saborizante de chocolate, goma xántica, sucralosa y glicosidos de esteviol. CONTIENE DERIVADOS DE LECHE, PUEDE CONTENER DERIVADOS DE SOJA.`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770920799/D_NQ_NP_2X_767022-MLA99891344621_112025-F_rwvqc0.webp',
    brand: 'PITBULL'
  },
  {
    id: 96,
    name: 'WHEY PROTEIN 2LBS VAINILLA',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Este suplemento a base de proteína de suero lácteo está disponible en sabor vainilla. Cada servicio aporta 24 gramos de proteína de alta calidad y tan solo 1,4 gramos de carbohidratos. Esta cantidad es ideal para quienes buscan incrementar su ingesta diaria de proteínas con el objetivo de promover el desarrollo muscular y acelerar la recuperación post-entrenamiento.  MODO DE USO: Disolver un scoop del producto (34g) en 200ml de agua o leche. Batir enérgicamente por 30 segundos y consumir preferentemente justo después de finalizar la actividad física. INGREDIENTES: Proteína concentrada de suero lácteo, cacao, saborizante de chocolate, goma xántica, sucralosa y glicosidos de esteviol. CONTIENE DERIVADOS DE LECHE, PUEDE CONTENER DERIVADOS DE SOJA.`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770920804/D_NQ_NP_2X_602071-MLA99984791287_112025-F_upcyle.webp',
    brand: 'PITBULL'
  },
  {
    id: 97,
    name: 'WHEY PROTEIN 2LBS DOYPACK CHOCOLATE',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Este suplemento a base de proteína de suero lácteo. Cada servicio aporta 24 gramos de proteína de alta calidad y tan solo 1,4 gramos de carbohidratos. Esta cantidad es ideal para quienes buscan incrementar su ingesta diaria de proteínas con el objetivo de promover el desarrollo muscular, acelerar la recuperación post-entrenamiento o complementar una dieta equilibrada. MODO DE USO Disolver un scoop del producto (32g) en 200ml de agua o leche. Batir enérgicamente por 30 segundos y consumir preferentemente justo después de finalizar la actividad física. INGREDIENTES Proteína concentrada de suero lácteo, cacao, saborizante de chocolate, goma xántica, sucralosa y glicosidos de esteviol. Contiene derivados de leche, puede contener derivados de soja.`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770920814/D_NQ_NP_2X_692307-MLA99382688136_112025-F_xvgi5m.webp',
    brand: 'PITBULL'
  },
  {
    id: 98,
    name: 'WHEY PROTEIN 2LBS DOYPACK VAINILLA',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: "Este suplemento a base de proteína de suero lácteo. Cada servicio te aporta 24 gramos de proteína de alta calidad y tan solo 1,4 gramos de carbohidratos. Esta cantidad es ideal para quienes buscan incrementar su ingesta diaria de proteínas con el objetivo de promover el desarrollo muscular, acelerar la recuperación post-entreno o complementar una dieta equilibrada. MODO DE USO Disolver un scoop del producto (32g) en 200ml de agua o leche. Batir enérgicamente por 30 segundos y consumir preferentemente justo después de finalizar la actividad física. INGREDIENTES Proteína concentrada de suero lácteo, cacao, saborizante de chocolate, goma xántica, sucralosa y glicosidos de esteviol. Contiene derivados de leche, puede contener derivados de soja.",
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921094/D_NQ_NP_2X_756487-MLA100061589577_122025-F_sj6ls1.webp',
    brand: 'PITBULL'
  },
  {
    id: 99,
    name: 'BISGLICINATO DE MAGNESIO 120 CAPS',
    category: 'MAGNESIO Y OMEGA 3',
    description: `El bisglicinato es una forma altamente biodisponible de magnesio quelado con glicina, un aminoácido que facilita su absorción y minimiza posibles molestias digestivas. Gracias a su óptima asimilación, este suplemento es ideal para quienes buscan mantener niveles adecuados de magnesio sin los efectos gastrointestinales que pueden presentarse con otras formas del mineral. El magnesio es un nutriente esencial involucrado en múltiples funciones del organismo, que incluyen el equilibrio muscular, nervioso y óseo. BENEFICIOS Colabora en la relajación del sistema nervioso, en la función cardiaca y la regulación de la presión arterial, y en el mantenimiento de la salud muscular y ósea. Mejora la energía y el rendimiento físico. Brinda apoyo digestivo. MODO DE USO Consumir 4 cápsulas diarias. Antes o después del entrenamiento o antes de ir a dormir. INGREDIENTES Bisglicinato de magnesio: ANAH; ESTEARATO DE MAGNESIO.`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921124/D_NQ_NP_2X_884745-MLA99988662961_112025-F_mhp3wu.webp',
    brand: 'PITBULL'
  },
  {
    id: 100,
    name: 'CITRATO DE MAGNESIO 300 G',
    category: 'MAGNESIO Y OMEGA 3',
    description: `El magnesio es un mineral esencial involucrado en múltiples funciones corporales, como la contraccion muscular, la produccion de energia y el equilibrio electrolitico. Cada porcion de 2.5 gramos suministra magnesio en una forma de alta biodisponiblidad, lo que permite que el cuerpo lo absorba y lo utilice de manera eficiente. BENEFICIOS Apoya la funcion muscular. Mejora el rendimiento fisico. Regula el sistema nervioso. Colabora con el mantenimiento de la salud ósea. Favorece el equilibrio electrolitico. MODO DE USO Diluir media cuchara de té (2,5grs) en un vaso de agua. Consumir con abundante agua en cualquier momento del dia. Ingesta diaria: 2,5Grs (1/2 cucharada de té) INGREDIENTES Citrato de magnesio. PUEDE CONTENER DERIVADOS DE LECHE Y SOJA`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921132/D_NQ_NP_2X_968864-MLA94881305756_102025-F_cnng7r.webp',
    brand: 'PITBULL'
  },
  {
    id: 101,
    name: 'CREATINA 402 G SABORIZADA MULTIFRUTA',
    category: 'CREATINAS',
    description: `La creatina en polvo es un suplemento ampliamente utilizado para mejorar el rendimiento fisico, particularmente en actividades de alta intensidad. Cada porcion tu ayuda a aumentar los niveles de fosfocreatina en los musculos, proporcionando mas energia rapida para esfuerzos explosivos como levantamientos de pesas, sprints y dportes de potencia. Este suplemento es ideal para quienes buscan aumentar la fuerza, mejorar el rendimiento deportivo y ganar masa muscular. MODO DE USO Disolver un scoop (6.7grs) en 200ml de agua. Puedes consumirlo antes o despues de entrenar. INGREDIENTES Monohidrato de creatina, ARO: Saborizante de multifruta, ACI: Ácido citrico, ANAH: Dióxido de silicio, EDU : Sucralosa. Puede contener derivados de leche y soja.`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921144/D_NQ_NP_2X_983028-MLA100586447187_122025-F_hettjh.webp',
    brand: 'PITBULL'
  },
  {
    id: 102,
    name: 'CREATINA 402 G SABORIZADA UVA',
    category: 'CREATINAS',
    description: `La creatina en polvo es un suplemento ampliamente utilizado para mejorar el rendimiento fisico, particularmente en actividades de alta intensidad. Cada porcion tu ayuda a aumentar los niveles de fosfocreatina en los musculos, proporcionando mas energia rapida para esfuerzos explosivos como levantamientos de pesas, sprints y dportes de potencia. Este suplemento es ideal para quienes buscan aumentar la fuerza, mejorar el rendimiento deportivo y ganar masa muscular. MODO DE USO Disolver un scoop (6.7grs) en 200ml de agua. Puedes consumirlo antes o despues de entrenar. INGREDIENTES Monohidrato de creatina, ARO: Saborizante de multifruta, ACI: Ácido citrico, ANAH: Dióxido de silicio, EDU : Sucralosa. Puede contener derivados de leche y soja.`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921152/D_NQ_NP_2X_725052-MLA99496628802_112025-F_xjaqx7.webp',
    brand: 'PITBULL'
  },
  {
    id: 103,
    name: 'CREATINA MICRONIZED 1KG',
    category: 'CREATINAS',
    description: `La creatina en polvo es un suplemento ampliamente utilizado para mejorar el rendimiento físico, particularmente en actividades de alta intensidad. Cada porción ayuda a aumentar los niveles de fosfocreatina en los músculos, proporcionando más energía rápida para esfuerzos explosivos como levantamientos de pesas, sprints y deportes de potencia. Este suplemento es ideal para quienes buscan aumentar la fuerza, mejorar el rendimiento deportivo y ganar masa muscular. MODO DE USO Disolver un scoop (5g) en 200ml de agua o jugo. Puedes consumirlo antes o después de entrenar. INGREDIENTES Monohidrato de creatina`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921173/11-6c5ceb66a57904226817692845789847-480-0_mpliut.webp',
    brand: 'PITBULL'
  },
  {
    id: 104,
    name: 'CREATINA MICRONIZED 300 G',
    category: 'CREATINAS',
    description: `La creatina en polvo es un suplemento ampliamente utilizado para mejorar el rendimiento físico, particularmente en actividades de alta intensidad. Cada porción ayuda a aumentar los niveles de fosfocreatina en los músculos, proporcionando más energía rápida para esfuerzos explosivos como levantamientos de pesas, sprints y deportes de potencia. Este suplemento es ideal para quienes buscan aumentar la fuerza, mejorar el rendimiento deportivo y ganar masa muscular. MODO DE USO Disolver un scoop (5g) en 200ml de agua o jugo. Puedes consumirlo antes o después de entrenar. INGREDIENTES Monohidrato de creatina`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921179/D_NQ_NP_2X_666462-MLA99985084933_112025-F_vzxeta.webp',
    brand: 'PITBULL'
  },
  {
    id: 105,
    name: 'COLAGENO SPORT 240 G MULTIFRUTA',
    category: 'COLAGENOS Y RESVERATROL',
    description: `El colágeno hidrolizado PITBULL SUPLEMENTOS es colágeno que fue dividido en partículas más pequeñas (péptidos) mediante un proceso llamado hidrolización. Al estar “pre-digerido”, el cuerpo lo absorbe más fácil y rápido. Se utiliza comúnmente para mejorar la salud de la piel, articulaciones, uñas, cabello y para favorecer la recuperación muscular. MODO DE USO Disolver un scoop (12grs) del producto, en 250 Ml de agua. Revolver hasta su completa disolución. Utilizar la cuchara del envase. INGREDIENTES Colágeno hidrolizado, ARO: saborizante de: pomelo/uva (según corresponda), citrato de magnesio, vitamina C, acido cítrico, carbonato de magnesio, COL: Cúrcuma, acido hialuronico, EDU: sucralosa y acesulfame K. PUEDE CONTENER DERIVADO DE LECHE Y DE SOJA`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921184/D_NQ_NP_2X_600085-MLA100095681958_122025-F_nxx3yh.webp',
    brand: 'PITBULL'
  },
  {
    id: 106,
    name: 'COLAGENO SPORT 240 G UVA',
    category: 'COLAGENOS Y RESVERATROL',
    description: `El colágeno hidrolizado PITBULL SUPLEMENTOS es colágeno que fue dividido en partículas más pequeñas (péptidos) mediante un proceso llamado hidrolización. Al estar “pre-digerido”, el cuerpo lo absorbe más fácil y rápido. Se utiliza comúnmente para mejorar la salud de la piel, articulaciones, uñas, cabello y para favorecer la recuperación muscular. MODO DE USO Disolver un scoop (12grs) del producto, en 250 Ml de agua. Revolver hasta su completa disolución. Utilizar la cuchara del envase. INGREDIENTES Colágeno hidrolizado, ARO: saborizante de: pomelo/uva (según corresponda), citrato de magnesio, vitamina C, acido cítrico, carbonato de magnesio, COL: Cúrcuma, acido hialuronico, EDU: sucralosa y acesulfame K. PUEDE CONTENER DERIVADO DE LECHE Y DE SOJA`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921198/D_NQ_NP_2X_663150-MLA100585390649_122025-F_diukoj.webp',
    brand: 'PITBULL'
  },
  {
    id: 107,
    name: 'GLUTAMINE MICRONIZED 300 G',
    category: 'AMINOACIDOS',
    description: `La glutamina es un aminoácido que se encuentra de forma natural en nuestro cuerpo. Es considerado un aminoácido no esencial, lo que significa que el cuerpo puede producirlo. Sin embargo, en situaciones de estrés físico, como durante el ejercicio intenso o enfermedades, la demanda de glutamina puede superar la capacidad del cuerpo para producirla. MODO DE USO Disolver un scoop (5g) en 200ml de agua o jugo. Preferentemente después de entrenar. INGREDIENTES L-Glutamina.`,
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770921204/D_NQ_NP_2X_893386-MLA99526846788_122025-F_bdb4t0.webp',
    brand: 'PITBULL'
  }
)

// Productos ENA
rawProducts.push(
  {
    id: 108,
    name: 'AMINO 4500 150TABS',
    category: 'AMINOACIDOS',
    description: `Amino 4500 de ENA es un completo suplemento que proporciona aminoácidos esenciales en una concentración alta de 4500mg por tableta, ideal para optimizar la recuperación muscular y promover el crecimiento de tejido magro.
  
  Beneficios:
  
  • Alta concentración de aminoácidos por tableta
  • Favorece la síntesis proteica y el desarrollo muscular
  • Acelera la recuperación post-entrenamiento
  • Previene el catabolismo muscular
  • Mejora el rendimiento deportivo
  • Formato práctico en tabletas
  
  Disponible en el formato: 150 Tabletas
  
  Contenido: 150 tabletas
  
  Modo de uso: Tomar 3 tabletas antes del entrenamiento y 3 tabletas después. En días de descanso, tomar 3 tabletas en ayunas y 3 tabletas antes de dormir para optimizar la recuperación.`,
    price: 2275,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771433974/amino_4500_150tab-1-2afbc108c0247c383717527639545279-1024-1024_ufgux1.webp',
    brand: 'ENA'
  },
  {
    id: 109,
    name: 'ENA Truemade Amino Full 146 GRS',
    category: 'AMINOACIDOS',
    description: `Truemade Amino Full de ENA es una completa fórmula de aminoácidos esenciales y BCAAs de máxima pureza, científicamente dosificada para optimizar la recuperación muscular, prevenir el catabolismo y potenciar el rendimiento durante el entrenamiento.
  
  Beneficios:
  
  • Fórmula avanzada con espectro completo de aminoácidos esenciales
  • Proporciona BCAAs en proporción óptima para máxima efectividad
  • Previene la degradación muscular durante ejercicios intensos
  • Acelera la recuperación y reduce el dolor muscular post-entrenamiento
  • Aumenta la resistencia y retrasa la fatiga durante el ejercicio
  • Fácil disolución, rápida absorción y alta biodisponibilidad
  
  Disponible en el sabor: Neutro
  
  Contenido: 146 gramos
  
  Modo de uso: Mezclar 1 medida (5g) con 200ml de agua. Para prevenir el catabolismo, consumir durante el entrenamiento para optimizar la recuperación, consumir inmediatamente después del mismo para aumentar la disponibilidad de aminoácidos, tomar entre comidas. Ideal para deportistas que realizan entrenamientos intensos o de larga duración.`,
    price: 1716,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771433987/truemade_amino_full_lemonade-146gr-1-3770dac0bc29fa905017527993887847-1024-1024_a0wz5o.webp',
    brand: 'ENA'
  },
  {
    id: 110,
    name: 'BCAA 12:1:1 COMP 120CAPS',
    category: 'AMINOACIDOS',
    description: `BCAA 12:1:1 de ENA ofrece una proporción avanzada de aminoácidos de cadena ramificada, con enfoque en la leucina para maximizar la síntesis proteica, el desarrollo muscular y la recuperación.
  
  Beneficios:
  
  • Proporción avanzada 12:1:1 con alta concentración de leucina
  • Maximiza la síntesis proteica muscular
  • Previene el catabolismo durante entrenamientos intensos
  • Acelera la recuperación post-entrenamiento
  • Preserva la masa muscular durante dietas de definición
  • Formato práctico en cápsulas
  
  Disponible en el formato: 120 Cápsulas
  
  Contenido: 120 cápsulas
  
  Modo de uso: Tomar 4 cápsulas antes del entrenamiento y 4 cápsulas después. En días de descanso, tomar 4 cápsulas en ayunas para mantener un estado anabólico y preservar la masa muscular.`,
    price: 1365,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434003/bcaa-12-1-1-1-a34bc520c00201fb2617531114388193-1024-1024_yw1k0i.webp',
    brand: 'ENA'
  },
  {
    id: 111,
    name: 'BCAA 2:1:1 COMP 90CAPS',
    category: 'AMINOACIDOS',
    description: `BCAA 2:1:1 de ENA proporciona la proporción clásica de aminoácidos de cadena ramificada, científicamente probada para mejorar la recuperación, prevenir el catabolismo y potenciar el rendimiento deportivo.
  
  Beneficios:
  
  • Proporción clásica 2:1:1 de leucina, isoleucina y valina
  • Previene la degradación muscular durante el ejercicio
  • Acelera la recuperación post-entrenamiento
  • Reduce el dolor muscular
  • Mejora la resistencia durante ejercicios prolongados
  • Formato práctico en cápsulas
  
  Disponible en el formato: 90 Cápsulas
  
  Contenido: 90 cápsulas
  
  Modo de uso: Tomar 3 cápsulas antes del entrenamiento y 3 cápsulas después. En días de descanso, tomar 3 cápsulas en cualquier momento del día para ayudar a la recuperación y preservación muscular.`,
    price: 1261,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434013/bcaa_211-90caps-b5e0ef8cab2a6ac20817531121486810-1024-1024_jb5lqz.webp',
    brand: 'ENA'
  },
  {
    id: 112,
    name: 'BETA ALANINE 60 TABS',
    category: 'AMINOACIDOS',
    description: `Beta Alanine de ENA es un suplemento avanzado que potencia tu rendimiento en entrenamientos de alta intensidad, prolongando el tiempo hasta la fatiga mediante la optimización del buffer muscular.
  
  Beneficios:
  
  • Aumenta los niveles de carnosina muscular
  • Potencia el rendimiento en ejercicios de alta intensidad
  • Retrasa la aparición de la fatiga muscular
  • Mejora la capacidad anaeróbica
  • Permite entrenamientos más intensos y prolongados
  • Formato en prácticas tabletas
  
  Disponible en el formato: 60 Tabletas
  
  Contenido: 60 tabletas
  
  Modo de uso: Tomar 2 tabletas al día, preferentemente 30 minutos antes del entrenamiento. Para resultados óptimos, mantener el consumo constante para saturar los niveles de carnosina muscular.`,
    price: 10660,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434147/beta_alanine-60-tablst-7a64008569a365895317527800801310-1024-1024_no76f4.webp',
    brand: 'ENA'
  },
  {
    id: 113,
    name: 'GLUTAMINA 150GRS',
    category: 'AMINOACIDOS',
    description: `Glutamina Micronizada de ENA proporciona el aminoácido más abundante en el tejido muscular, fundamental para la recuperación, salud intestinal y fortalecimiento del sistema inmunológico, especialmente en periodos de entrenamiento intenso.
  
  Beneficios:
  
  • Acelera la recuperación muscular post-entrenamiento
  • Previene el catabolismo muscular
  • Fortalece el sistema inmunológico
  • Mejora la salud intestinal
  • Micronizada para máxima absorción
  • 100% pura y libre de aditivos
  
  Disponible en el sabor: Neutro
  
  Contenido: 150 gramos
  
  Modo de uso: Mezclar 5g (1 cucharada) con agua o jugo y consumir preferentemente después del entrenamiento o antes de dormir. En periodos de entrenamiento intenso, puede dividirse en 2 tomas diarias.`,
    price: 16120,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434166/glutamine_micronized-150g-1-4b11a69f11f0f2428517525123104211-1024-1024_khftfh.webp',
    brand: 'ENA'
  },
  {
    id: 114,
    name: 'RELOAD BCAA 220GRS',
    category: 'AMINOACIDOS',
    description: `Reload de ENA es un completo suplemento intra-entrenamiento diseñado para mantener niveles óptimos de energía, hidratación y nutrientes durante todo tu entrenamiento, permitiéndote rendir al máximo por más tiempo.
  
  Beneficios:
  
  • Mantiene la energía durante todo el entrenamiento
  • Previene la deshidratación y los calambres
  • Favorece la recuperación muscular durante el ejercicio
  • Reabastece electrolitos y nutrientes clave
  • Retrasa la fatiga muscular
  • Mejora el rendimiento en entrenamientos prolongados
  
  Disponible en los deliciosos sabores: Fruit Punch, Lemonade
  
  Contenido: 220 gramos
  
  Modo de uso: Mezclar 1 medida (11g) en 500-750ml de agua y consumir durante el entrenamiento, especialmente en sesiones de más de 45 minutos de duración o de alta intensidad.`,
    price: 18980,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434175/reload_lemonade-1-638276098e2f657e7f17525085367503-1024-1024_tnao1f.webp',
    brand: 'ENA'
  },
  {
    id: 115,
    name: 'COLAGENO SPORT 407GRS',
    category: 'COLAGENOS Y RESVERATROL',
    description: `Colageno Sport de ENA es un suplemento diseñado específicamente para deportistas que buscan cuidar sus articulaciones y tejidos conectivos, con una fórmula potenciada con vitamina C para máxima absorción.
  
  Beneficios:
  
  • Protege y fortalece tendones, ligamentos y cartílagos
  • Previene lesiones asociadas al desgaste deportivo
  • Favorece la recuperación de lesiones
  • Contiene vitamina C para potenciar la síntesis de colágeno
  • Contribuye a la salud general de articulaciones
  • Refrescante sabor a naranja
  
  Disponible en los deliciosos sabores: Naranja, Fruit Punch
  
  Contenido: 407 gramos
  
  Modo de uso: Mezclar 1 medida (13g) con 200ml de agua fría. Consumir una vez al día, preferentemente entre comidas o después del entrenamiento.`,
    price: 26130,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434185/colagenossport-naranja-407g-1-29fa394a25b8bb507417527980679537-1024-1024_mmmhc4.webp',
    brand: 'ENA'
  },
  {
    id: 116,
    name: 'TM WHEY COLLAGEN 1,7LB',
    category: 'COLAGENOS Y RESVERATROL',
    description: `Truemade Whey Collagen de ENA es una revolucionaria fórmula que combina los beneficios de la proteína whey con colágeno hidrolizado, ofreciendo una solución integral para el desarrollo muscular y la salud de tejidos conectivos.
  
  Beneficios:
  
  • Combinación única de proteína whey y colágeno
  • Apoya simultáneamente el desarrollo muscular y la salud articular
  • Mejora la recuperación y previene lesiones
  • Contribuye a la elasticidad y salud de la piel
  • Alta biodisponibilidad de ambos componentes
  • Delicioso sabor y fácil disolución
  
  Disponible en los deliciosos sabores: Chocolate, Vainilla
  
  Contenido: 750 gramos
  
  Modo de uso: Mezclar 1 medida (25g) con 200ml de agua o leche. Ideal para consumir después del entrenamiento o en cualquier momento como complemento nutricional.`,
    price: 40950,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434198/tmwc_vainilla-1-7lb-750gr-1-c271ceda08d91266aa17527973314958-1024-1024_taw9nc.webp',
    brand: 'ENA'
  },
  {
    id: 117,
    name: 'CREATINA + ELECTROLITOS 302GRS',
    category: 'CREATINAS',
    description: `CREATINA + ELECTROLITOS es una combinación que aporta los beneficios de la creatina y optimiza la hidratación al reponer sales minerales
  
  Beneficios:
  
  • Incrementa la fuerza y potencia muscular
  • Hidratación óptima y balance mineral
  • Promueve el aumento de masa muscular
  • Máxima pureza y micronización para absorción superior
  • Retrasa la aparición de la fatiga
  • Delicioso sabor Pink Lemonade o Blue Lemon para una toma más agradable
  
  Disponible en los deliciosos sabores: Pink Lemonade, Blue Lemon
  
  Contenido: 300 gramos
  
  Modo de uso: Fase de carga (opcional): 5g (1 cucharada) 4 veces al día durante 5-7 días. Fase de mantenimiento: 5g (1 cucharada) al día, preferentemente después del entrenamiento o con el desayuno en días de descanso.`,
    price: 25090,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434209/7792981071386_ena-creatina-electrolitos-blue-lemon-293g-1-d3e3b50c8df171f78717524979973120-1024-1024_uex27h.webp',
    brand: 'ENA'
  },
  {
    id: 118,
    name: 'CREATINA 300GRS NEUTRO',
    category: 'CREATINAS',
    description: `Creatina Micronizada de ENA es un suplemento de máxima pureza que aumenta la fuerza, potencia y masa muscular, con partículas ultrafinas para una absorción superior y sin molestias digestivas.
  
  Beneficios:
  
  • Incrementa la fuerza y potencia muscular
  • Mejora el rendimiento en ejercicios explosivos
  • Promueve el aumento de masa muscular
  • Máxima pureza y micronización para absorción superior
  • Retrasa la aparición de la fatiga
  • Delicioso sabor fruit punch para una toma más agradable
  
  Disponible en los deliciosos sabores: Neutro, Fruit Punch
  
  Contenido: 300 gramos
  
  Modo de uso: Fase de carga (opcional): 5g (1 cucharada) 4 veces al día durante 5-7 días. Fase de mantenimiento: 5g (1 cucharada) al día, preferentemente después del entrenamiento o con el desayuno en días de descanso.`,
    price: 20930,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434223/crean300mono-neutro-30gr-1-bdbec4259f005c4da317527799956660-1024-1024_y0t4qz.webp',
    brand: 'ENA'
  },
  {
    id: 119,
    name: 'CREATINA SABORIZADA 300g',
    category: 'CREATINAS',
    description: `Creatina Micronizada de ENA es un suplemento de máxima pureza que aumenta la fuerza, potencia y masa muscular, con partículas ultrafinas para una absorción superior y sin molestias digestivas.
  
  Beneficios:
  
  • Incrementa la fuerza y potencia muscular
  • Mejora el rendimiento en ejercicios explosivos
  • Promueve el aumento de masa muscular
  • Máxima pureza y micronización para absorción superior
  • Retrasa la aparición de la fatiga
  • Delicioso sabor fruit punch para una toma más agradable
  
  Disponible en los deliciosos sabores: Neutro, Fruit Punch
  
  Contenido: 300 gramos
  
  Modo de uso: Fase de carga (opcional): 5g (1 cucharada) 4 veces al día durante 5-7 días. Fase de mantenimiento: 5g (1 cucharada) al día, preferentemente después del entrenamiento o con el desayuno en días de descanso.`,
    price: 27950,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771434190/7792981060113-3dfc4f32e6c50a26d117478407240694-640-0_vozt4p.webp',
    brand: 'ENA'
  },
  {
    id: 120,
    name: 'ZMA 60CAPS',
    category: 'HORMONALES',
    description: `ZMA de ENA es una fórmula especializada que combina zinc, magnesio y vitamina B6 en proporciones óptimas para mejorar la recuperación, optimizar los niveles hormonales y potenciar la calidad del sueño.
  
  Beneficios:
  
  • Optimiza los niveles de testosterona
  • Mejora la calidad del sueño y la recuperación nocturna
  • Previene deficiencias de zinc y magnesio comunes en deportistas
  • Promueve la síntesis proteica y el desarrollo muscular
  • Contribuye a la correcta función del sistema inmune
  • Mejora el rendimiento deportivo general
  
  Disponible en el formato: 60 Cápsulas
  
  Contenido: 60 cápsulas
  
  Modo de uso: Tomar 2 cápsulas antes de dormir con el estómago vacío para una óptima absorción. Evitar consumir con alimentos ricos en calcio o lácteos que pueden interferir con la absorción del zinc y magnesio.`,
    price: 10530,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438853/zma-1-542601c0664d9fcf0c17525108957746-1024-1024_xmlffp.webp',
    brand: 'ENA'
  },
  {
    id: 121,
    name: 'CITRATO DE MAGNESIO 192GRS LEMONADE',
    category: 'MAGNESIO Y OMEGA 3',
    description: `ENA Citrato de Magnesio en Polvo 192 g es un suplemento diseñado para quienes buscan potenciar su bienestar diario con un aporte eficiente y de alta biodisponibilidad de magnesio. Cada porción de 3,2 g entrega 260 mg de magnesio, facilitando una absorción óptima que favorece múltiples funciones corporales esenciales.
  
  Principales beneficios:
  Maximiza la absorción y biodisponibilidad del magnesio, asegurando que tu organismo lo aproveche al máximo.
  Reduce el cansancio y la fatiga, ayudando a mantener tu energía y vitalidad durante todo el día.
  Contribuye al mantenimiento saludable de huesos y músculos, fundamental para deportistas y personas activas.
  Favorece el adecuado funcionamiento del sistema nervioso y muscular, promoviendo un equilibrio integral.
  Sabor lemonade refrescante que hace su consumo agradable y libre de gluten.
  
  Modo de uso recomendado:
  Disolver 1/2 scoop (3,2 g) en 200 ml de agua. Agitar bien hasta su completa disolución. Para una mejor experiencia, dejar reposar 10 minutos o usar agua caliente antes de consumir.`,
    price: 15340,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438867/citratoenpolvo-195g-limon-1-cb539279244751b8bf17561332687881-1024-1024_vpgm6k.webp',
    brand: 'ENA'
  },
  {
    id: 122,
    name: 'CITRATO MAGNESIO 60 CAPS',
    category: 'MAGNESIO Y OMEGA 3',
    description: `Citrato de Magnesio de ENA es un suplemento mineral de alta biodisponibilidad que contribuye a la función muscular normal, reduce la fatiga, mejora la calidad del sueño y apoya la salud ósea y cardiovascular.
  
  Beneficios:
  
  • Previene y reduce calambres musculares
  • Contribuye a la relajación muscular y recuperación
  • Mejora la calidad del sueño
  • Reduce la fatiga y el cansancio
  • Apoya la salud ósea y cardiovascular
  • Alta biodisponibilidad y fácil absorción
  
  Disponible en el formato: 60 Cápsulas
  
  Contenido: 60 cápsulas
  
  Modo de uso: Tomar 2 cápsulas al día, preferentemente con las comidas o antes de dormir. Para deportistas con entrenamiento intenso o personas con alta sudoración, se puede aumentar a 3 cápsulas diarias divididas en diferentes tomas.`,
    price: 11960,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438885/citrato-de-magnesio-60-comp-1-6d72d667229c94caf017531113673673-1024-1024_jvedz8.webp',
    brand: 'ENA'
  },
  {
    id: 123,
    name: 'OMEGA 3 FISH OIL 60 CAPS',
    category: 'MAGNESIO Y OMEGA 3',
    description: `ENA Fish Oil - Omega 3 EPA & DHA 60 Softgels es un suplemento premium formulado con aceite de pescado concentrado, diseñado para aportar un equilibrio óptimo de DHA y EPA, nutrientes esenciales para el bienestar integral.
  
  Beneficios clave:
  Salud cardiovascular: contribuye al mantenimiento normal del corazón.
  Rendimiento cognitivo: favorece el funcionamiento saludable del cerebro.
  Visión: apoya el mantenimiento de la visión.
  Recuperación muscular: ayuda a modular la inflamación y acelerar la recuperación post entrenamiento.
  Pureza certificada: libre de metales pesados, asegurando un consumo seguro y limpio.
  
  Modo de uso:
  Consumir 2 cápsulas blandas diarias, preferentemente con comidas principales.`,
    price: 24440,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438916/fish-oil-omega-3-1-01955c41a61a73569117631249750166-1024-1024_geury4.webp',
    brand: 'ENA'
  },
  {
    id: 124,
    name: 'MUSCLE MAX 90TABS',
    category: 'PRE ENTRENOS',
    description: `Muscle Max de ENA es un potente complejo de testosterona natural que favorece el entorno hormonal óptimo para maximizar el desarrollo muscular, la fuerza y la recuperación sin efectos secundarios adversos.
  
  Beneficios:
  
  • Promueve niveles saludables de testosterona
  • Potencia el desarrollo de masa muscular
  • Aumenta la fuerza y la potencia
  • Mejora la recuperación entre entrenamientos
  • Fórmula a base de ingredientes naturales
  • No causa efectos secundarios adversos
  
  Disponible en el formato: 90 Tabletas
  
  Contenido: 90 tabletas
  
  Modo de uso: Tomar 3 tabletas al día con las comidas. Para resultados óptimos, consumir durante ciclos de 8-12 semanas, seguidos de 4 semanas de descanso para evitar la adaptación hormonal.`,
    price: 11570,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438916/musclemax-1-5f7fd1827b6c54830c17525126413875-1024-1024_qwadrl.webp',
    brand: 'ENA'
  },
  {
    id: 125,
    name: 'CAFEINA 60CAPS',
    category: 'PRE ENTRENOS',
    description: `Cafeína de ENA es un suplemento estimulante que proporciona energía rápida y sostenida, aumenta el enfoque mental y potencia el rendimiento deportivo con una dosis precisa de cafeína anhidra de alta calidad.
  
  Beneficios:
  
  • Incrementa los niveles de energía y estado de alerta
  • Mejora la concentración y el enfoque mental
  • Potencia el rendimiento físico durante el entrenamiento
  • Aumenta la resistencia y retrasa la fatiga
  • Acelera el metabolismo y la quema de grasas
  • Formato conveniente en cápsulas con dosis precisa
  
  Disponible en el formato: 60 Cápsulas
  
  Contenido: 60 cápsulas
  
  Modo de uso: Tomar 1 cápsula 30 minutos antes del entrenamiento o cuando necesites un impulso de energía. No consumir después de las 18hs o si eres sensible a la cafeína. No exceder 2 cápsulas al día.`,
    price: 10010,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438933/cafeina-1-c52b6ff47647217d3b17525113235802-1024-1024_y9hxtp.webp',
    brand: 'ENA'
  },
  {
    id: 126,
    name: 'CARBO ENERGY 540GRS',
    category: 'PRE ENTRENOS',
    description: `Carbo Energy de ENA es un suplemento deportivo a base de carbohidratos de rápida y media absorción, diseñado para proporcionar energía sostenida durante entrenamientos y competencias de larga duración.
  
  Beneficios:
  
  • Proporciona energía rápida y sostenida durante el ejercicio
  • Mezcla de carbohidratos para una entrega gradual de energía
  • Retrasa la aparición de la fatiga en actividades prolongadas
  • Mejora el rendimiento en deportes de resistencia
  • De fácil disolución y rápida absorción
  • No produce malestar estomacal
  
  Disponible en los sabores: Neutro, Blueberry
  
  Contenido: 540 gramos
  
  Modo de uso: Mezclar 2 medidas (35g) en 500ml de agua y consumir antes o durante entrenamientos o competencias prolongadas. Para actividades de más de 2 horas, consumir 1 medida cada 45-60 minutos durante el ejercicio.`,
    price: 11960,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438948/carbo_energy_fruit-puncch-540g-10f28d56443dd53a2d17528024872297-1024-1024_gtd30c.webp',
    brand: 'ENA'
  },
  {
    id: 127,
    name: 'CARNITINA 60CAPS',
    category: 'PRE ENTRENOS',
    description: `Carnitina Pro Burn de ENA combina L-Carnitina con ingredientes termogénicos en una fórmula avanzada que optimiza el transporte de ácidos grasos al interior de las mitocondrias para maximizar la quema de grasa como fuente de energía.
  
  Beneficios:
  
  • Facilita el transporte de grasas a las mitocondrias
  • Potencia la utilización de grasa como fuente de energía
  • Aumenta la resistencia durante el ejercicio aeróbico
  • Preserva la masa muscular durante la definición
  • Mejora la recuperación post-entrenamiento
  • Formato práctico en cápsulas
  
  Disponible en el formato: 60 Cápsulas
  
  Contenido: 60 cápsulas
  
  Modo de uso: Tomar 2 cápsulas al día: 1 cápsula 30 minutos antes del desayuno y 1 cápsula 30 minutos antes del entrenamiento, preferentemente cardiovascular.`,
    price: 13260,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438959/carnitina_1500-60ps-1-332a6540d44cffaf7617527997164665-1024-1024_b24sp2.webp',
    brand: 'ENA'
  },
  {
    id: 128,
    name: 'ENARGY GEL + CAFEÍNA 12U',
    category: 'PRE ENTRENOS',
    description: `Enargy Gel+ con Cafeína de ENA es la solución ideal para deportistas de resistencia que buscan un impulso energético inmediato con el beneficio adicional de la cafeína para potenciar el rendimiento y la concentración.
  
  Beneficios:
  
  • Proporciona energía rápida y sostenida durante el ejercicio
  • La cafeína añadida aumenta el estado de alerta y la concentración
  • Mejora el rendimiento en deportes de resistencia
  • Retrasa la fatiga física y mental
  • Formato práctico en gel para consumo durante la actividad
  • Delicioso sabor a uva
  
  Disponible en los deliciosos sabores: Vainilla Bean, Citrus, Uva
  
  Contenido: Caja con 12 sobres de 32g cada uno
  
  Modo de uso: Consumir 1 sobre cada 45-60 minutos durante la actividad física prolongada.`,
    price: 15210,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438978/enargygel__mas-cafeina-vainilla_12unid-1-0ed6276c8e878f489b17528020819321-1024-1024_ngm1ju.webp',
    brand: 'ENA'
  },
  {
    id: 129,
    name: 'OXIDO NITRICO 210GRS',
    category: 'PRE ENTRENOS',
    description: `Óxido Nítrico de ENA es un potente vasodilatador que maximiza el bombeo muscular, la oxigenación y nutrición celular durante el entrenamiento, mejorando el rendimiento y acelerando la recuperación muscular.
  
  Beneficios:
  
  • Aumenta la producción de óxido nítrico
  • Potencia la vasodilatación y el bombeo muscular
  • Mejora el flujo sanguíneo a los músculos
  • Optimiza la entrega de nutrientes y oxígeno
  • Aumenta la resistencia durante el entrenamiento
  • Acelera la recuperación post-entrenamiento
  
  Disponible en el sabor: Neutro
  
  Contenido: 210 gramos
  
  Modo de uso: Mezclar 7g (1 cucharada) con agua o jugo 20-30 minutos antes del entrenamiento.`,
    price: 16120,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771438991/oxido_nitrico-210gr-naranja-1-a1f0a68e4c9e5596e317527722730571-1024-1024_ssykfw.webp',
    brand: 'ENA'
  },
  {
    id: 130,
    name: 'PRE WAR 400GRS',
    category: 'PRE ENTRENOS',
    description: `Pre War de ENA es un potente pre-entrenamiento que combina estimulantes, vasodilatadores y componentes energéticos para maximizar tu rendimiento, fuerza y concentración durante el entrenamiento más exigente.
  
  Beneficios:
  
  • Aumenta la energía y el estado de alerta
  • Mejora la resistencia y el rendimiento
  • Potencia el bombeo muscular y la vasodilatación
  • Incrementa la concentración y el enfoque mental
  • Retrasa la aparición de la fatiga
  • Intensifica la experiencia de entrenamiento
  
  Disponible en los deliciosos sabores: Fruit Punch, Lemonade
  
  Contenido: 400 gramos
  
  Modo de uso: Mezclar 1 medida (13g) con 200ml de agua fría 20-30 minutos antes del entrenamiento.`,
    price: 26520,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439004/prewar_lemonade-400gr-1-f0a1b0d04e9d0403bd17527615156616-1024-1024_qff2yn.webp',
    brand: 'ENA'
  },
  {
    id: 131,
    name: 'RIPPED X 60CAPS',
    category: 'PRE ENTRENOS',
    description: `Ripped X de ENA es un quemador de grasa concentrado que acelera el metabolismo, aumenta la termogénesis y potencia la energía, ideal para quienes buscan una definición muscular rápida y efectiva.
  
  Beneficios:
  
  • Acelera la quema de grasa corporal
  • Aumenta los niveles de energía para entrenamientos intensos
  • Potencia el efecto termogénico
  • Mejora el enfoque mental y la concentración
  • Ayuda a preservar la masa muscular durante la definición
  • Formato conveniente en cápsulas
  
  Disponible en el formato: 60 Cápsulas
  
  Contenido: 60 cápsulas
  
  Modo de uso: Tomar 2 cápsulas al día: 1 cápsula 30 minutos antes del desayuno y 1 cápsula 30 minutos antes del entrenamiento o almuerzo.`,
    price: 10400,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439010/rippedx_-1-2a19a1db56416e2dcd17525118238443-1024-1024_ptands.webp',
    brand: 'ENA'
  },
  {
    id: 132,
    name: 'DIET PROTEIN',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Truemade Diet Protein de ENA es una fórmula especializada para quienes buscan una alimentación con control calórico, combinando proteínas de alta calidad con ingredientes que favorecen la pérdida de grasa mientras conservan la masa muscular.
  
  Beneficios:
  
  • Fórmula específica para pérdida de grasa
  • Alto contenido proteico para preservar masa muscular
  • Ingredientes que favorecen el metabolismo
  • Bajo en carbohidratos y grasas
  • Ayuda a controlar el apetito
  • Delicioso sabor y fácil preparación
  
  Disponible en los deliciosos sabores: Vainilla, Chocolate
  
  Contenido: 894 gramos
  
  Modo de uso: Mezclar 1 medida (30g) con 200-250ml de agua. Ideal como parte de un plan de alimentación controlado en calorías, consumir entre comidas o como sustituto ocasional de alguna comida.`,
    price: 44200,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439024/enadietwheyproteindoypack-chocolate_alta-870g-cc4c5e8087a7ec1a7317527976208849-1024-1024_mwydcn.webp',
    brand: 'ENA'
  },
  {
    id: 133,
    name: 'PROTEIN BAR 16U',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Protein Bar de ENA es un snack proteico de alta calidad, delicioso sabor y textura que proporciona 15g de proteína por barrita, ideal para complementar la alimentación entre comidas o como recuperación post-entrenamiento.
  
  Beneficios:
  
  • 15g de proteína de alta calidad por barrita
  • Delicioso sabor y textura no arenosa
  • Alternativa nutritiva a los snacks convencionales
  • Práctica para llevar y consumir en cualquier momento
  • Ideal para mantener el aporte proteico entre comidas
  • Perfecta para la recuperación post-entrenamiento
  
  Disponible en los deliciosos sabores: Frutilla, , Banana, Chocolate
  
  Contenido: Caja con 16 barritas de 46g cada una
  
  Modo de uso: Consumir 1 barrita como snack entre comidas, 30-60 minutos antes del entrenamiento o inmediatamente después del mismo para favorecer la recuperación muscular.`,
    price: 24570,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439042/enaproteinbarcajactfrutilla-a-la-crema-750gr-16-barritas-1-f260c62d1f5cef8a4e17528012601771-1024-1024_uwratr.webp',
    brand: 'ENA'
  },
  {
    id: 134,
    name: 'STARTER PROTEIN 400GRS',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Starter Protein de ENA es la opción perfecta para quienes comienzan en el mundo de los suplementos, con una fórmula equilibrada de proteínas y sabor único de café con leche para disfrutar mientras complementas tu nutrición.
  
  Beneficios:
  
  • Ideal para principiantes en suplementación
  • Fórmula balanceada de proteínas
  • Delicioso sabor exclusivo a café con leche
  • Apoya el desarrollo muscular
  • Facilita la recuperación post-entrenamiento
  • Excelente disolución y fácil preparación
  
  Disponible en el delicioso sabor: Café con Leche
  
  Contenido: 400 gramos
  
  Modo de uso: Mezclar 1 medida (30g) con 200ml de agua o leche. Consumir después del entrenamiento o como complemento nutricional entre comidas para aumentar el aporte proteico diario.`,
    price: 24440,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439053/starterprotein-coffee-400gr-1-65c091ad5c18900cc517527799248533-1024-1024_xe7k86.webp',
    brand: 'ENA'
  },
  {
    id: 135,
    name: 'ULTRA MASS 1.5KG',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Ultra Mass de ENA es un ganador de peso premium diseñado para quienes buscan aumentar su masa muscular de manera efectiva, con una combinación óptima de proteínas, carbohidratos y calorías de calidad.
  
  Beneficios:
  
  • Fórmula completa para aumento de masa muscular
  • Blend de proteínas para liberación sostenida
  • Carbohidratos de calidad para máxima energía
  • Vitaminas y minerales para un desarrollo óptimo
  • Facilita alcanzar el superávit calórico
  • Excelente digestibilidad y delicioso sabor
  
  Disponible en los deliciosos sabores: Chocolate, Vainilla
  
  Contenido: 1500 gramos
  
  Modo de uso: Mezclar 2 scoops (70g) con 300-350ml de agua o leche. Consumir como suplemento entre comidas o después del entrenamiento para maximizar el aporte calórico y nutricional.`,
    price: 37700,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439061/ultramass_kilo_vainilla_1-5kg-11-82cc39a142f3516f4417527577611962-1024-1024_coprzz.webp',
    brand: 'ENA'
  },
  {
    id: 136,
    name: 'ULTRA MASS 3KG BIG SIZE',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Ultra Mass Big Size de ENA es un ganador de peso premium en formato económico de 3kg, ideal para quienes buscan maximizar su masa muscular con un aporte nutricional completo y de calidad superior.
  
  Beneficios:
  
  • Mayor rendimiento con formato de 3kg
  • Fórmula completa para ganancia de masa muscular
  • Combinación óptima de proteínas y carbohidratos
  • Aporta vitaminas y minerales esenciales
  • Facilita alcanzar las calorías diarias necesarias
  • Excelente digestibilidad y delicioso sabor
  
  Disponible en los deliciosos sabores: Chocolate, Vainilla
  
  Contenido: 3000 gramos
  
  Modo de uso: Mezclar 2 scoops (70g) con 300-350ml de agua o leche. Consumir entre comidas o después del entrenamiento para maximizar el aporte calórico y nutricional.`,
    price: 64350,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439080/ultramass_bigsize_vainilla2-3kg-1-a2b38bf5b4bf4a58eb17527576756003-1024-1024_lbgxcg.webp',
    brand: 'ENA'
  },
  {
    id: 137,
    name: 'WHEY PROTEIN TRUEMADE 1LB',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `True Made de ENA en formato de 1 libra es la opción ideal para quienes buscan una proteína de alta calidad en presentación más compacta, perfecta para probar nuevos sabores o llevarte de viaje.
  
  Beneficios:
  
  • Formato más pequeño, práctico y portátil
  • Mantiene la calidad premium de la proteína True Made
  • 24g de proteína por porción
  • Promueve el desarrollo muscular
  • Facilita la recuperación
  • Delicioso sabor y gran solubilidad
  
  Disponible en los deliciosos sabores: Sin Sabor, Chocolate, Cookies & Cream, Frutilla, Vainilla, Banana
  
  Contenido: 453 gramos (1 LB)
  
  Modo de uso: Mezclar 1 medida (30g) con 200ml de agua fría o leche descremada. Ideal para consumir después del entrenamiento o en cualquier momento que necesites un aporte extra de proteínas.`,
    price: 28210,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439095/tm_wp_1lb-453gr-vainilla-1-42d322caf7232c853c17527970518657-1024-1024_erajv1.webp',
    brand: 'ENA'
  },
  {
    id: 138,
    name: 'WHEY PROTEIN TRUEMADE 2,05LB',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `True Made de ENA es una proteína whey de alta calidad que combina aislado y concentrado para ofrecer resultados óptimos en tu desarrollo muscular y recuperación.
  
  Beneficios:
  
  • Aporta 24g de proteína por porción
  • Fórmula de rápida absorción
  • Bajo contenido en grasas y carbohidratos
  • Promueve la síntesis proteica
  • Excelente solubilidad
  • Delicioso sabor y textura cremosa
  
  Disponible en los deliciosos sabores: Double Rich Chocolate, Vanilla Ice Cream, Cookies & Cream, Strawberry Milkshake, Banana Shake
  
  Contenido: 930 gramos (2,05 LB)
  
  Modo de uso: Mezclar 1 medida (30g) con 200ml de agua fría o leche descremada. Ideal para consumir después del entrenamiento o en cualquier momento que necesites un aporte extra de proteínas.`,
    price: 58700,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439103/tmwp2lb-930gr-vainilla_2-1-f398e8687d4b3cd76217528021654905-1024-1024_fnnxcy.webp',
    brand: 'ENA'
  },
  {
    id: 139,
    name: 'WHEY PROTEIN TRUEMADE 5LB',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `True Made de ENA es una proteína whey de alta calidad que combina aislado y concentrado para ofrecer resultados óptimos en tu desarrollo muscular y recuperación.`,
    price: 111150,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439145/jveqenxdugqgvcncxtq9.jpg',
    brand: 'ENA'
  },
  {
    id: 140,
    name: 'WHEY X PRO 1LB',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `WHEY X PRO.
  ¡TODO EN UNO! MÁS DEFINICIÓN, MÁS ENERGÍA, RÁPIDA RECUPERACIÓN .
  
  Whey X Pro Complex Protein aporta una combinación explosiva de proteínas, creatina, aminoácidos, vitaminas, minerales y antioxidantes, en una nueva fórmula mejorada.`,
    price: 29900,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439167/Wxpro1lb-Va_zz67dw.png',
    brand: 'ENA'
  },
  {
    id: 141,
    name: 'WHEY X PRO 2LB',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `¡TODO EN UNO! MÁS DEFINICIÓN, MÁS ENERGÍA, RÁPIDA RECUPERACIÓN .`,
    price: 51350,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439202/tmwp2lb-930gr-vainilla_2-1-f398e8687d4b3cd76217528021654905-1024-1024_fnnxcy.webp',
    brand: 'ENA'
  },
  {
    id: 142,
    name: 'HYDROXY MAX BLACK 120TABS',
    category: 'PRE ENTRENOS',
    description: `Hydroxy Max Black de ENA es un potente quemador de grasa que combina ingredientes termogénicos, estimulantes y moduladores metabólicos para optimizar la pérdida de grasa mientras preserva la masa muscular durante periodos de definición.`,
    price: 12220,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439202/hydroxymaxblack-120tablets-1-f37f21bd6b8decd56017527996167472-1024-1024_uiwgq0.webp',
    brand: 'ENA'
  },
  {
    id: 143,
    name: 'HYDROXY MAX NIGHT 120TABS',
    category: 'PRE ENTRENOS',
    description: `Hydroxy Max Night de ENA es un innovador quemador de grasa nocturno diseñado para optimizar el metabolismo durante las horas de sueño, mejorar la calidad del descanso y favorecer la recuperación mientras continúa el proceso de definición.`,
    price: 10920,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439213/hydroxy_max-night_120tabs-1-e39bc0baaf9e4c0aa017528019223392-1024-1024_w8eo8e.webp',
    brand: 'ENA'
  },
  {
    id: 144,
    name: 'MULTIVITAMINICO 60COMPRIMIDOS',
    category: 'VITAMINAS',
    description: `ENA MultiVitamin 60 CAPS es un suplemento multivitamínico avanzado especialmente formulado para quienes buscan optimizar su rendimiento físico, concentración y vitalidad diaria.`,
    price: 15730,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1771439221/multivitamin-1-58fc9284e174add82217561339377070-1024-1024_lw4wre.webp',
    brand: 'ENA'
  }
)

// Productos GENTECH
rawProducts.push(
  {
    id: 84,
    name: 'PROTEIN BAR IRON BAR 12U',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `La Protein Crisp Bar de INTEGRALMEDICA es una deliciosa barrita proteica con 12g de proteína de alta calidad y solo 2g de azúcar, ideal para complementar tu nutrición deportiva en cualquier momento del día. Esta caja incluye 12 unidades para que nunca te falte tu snack proteico favorito.
Beneficios:
• 12g de proteína de alta calidad por porción
• Bajo contenido de azúcar (2g por barrita)
• Textura crujiente y sabor irresistible
• Ideal como snack saludable entre comidas
• Perfecta para después del entrenamiento
• Caja completa con 12 unidades
Disponible en los deliciosos sabores: Dulce de Coco, Duo Crunch, Peanut Butter, Trufa de Avellanas, Cookies and Cream, Churros con Dulce de Leche
Contenido: 540 gramos (12 barritas de 45g)
Modo de uso: Consumir como snack entre comidas o después del entrenamiento para contribuir a tu ingesta diaria de proteínas.`,
    price: 21840,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919399/integralmedica-protein-crisp-bar-caja-12-unidades-trufa-de-avellana-089794e3ca3a09f5ca17497591687899-1024-1024_yqcypb.webp',
    brand: 'GENTECH'
  },
  {
    id: 85,
    name: 'PROTEIN BAR IRON BAR 20U',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Iron Bar de GENTECH es una barra proteica de alta calidad, perfecta como snack nutritivo o post-entreno, con deliciosos sabores y textura irresistible.
Beneficios:
• Alto contenido proteico
• Snack conveniente y portátil
• Textura suave y deliciosa
• Sin azúcar agregada
• Ideal post-entreno
• Múltiples sabores disponibles
Disponible en los deliciosos sabores: Banana, Chocolate, Cookies & Cream, Dulce de Leche, Frutilla
Contenido: 20 unidades (46g cada una)
Modo de uso: Consumir 1 barra como snack entre comidas o después del entrenamiento. Ideal para complementar la ingesta proteica diaria.`,
    price: 36400,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919419/ironbarchoco-20c2783ad6f29178fd17516781881004-1024-1024_k0lyts.webp',
    brand: 'GENTECH'
  },
  {
    id: 86,
    name: 'PROTEIN BAR LOW CARB 10',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Low Carb Protein Bar de GENTECH es la elección perfecta para quienes buscan un snack proteico delicioso sin comprometer sus objetivos de definición y control de peso.
Beneficios:
• Menos de 5g de carbohidratos por barra
• 20g de proteína de alta calidad por porción
• Ideal para dietas cetogénicas y low carb
• Control efectivo del apetito
• Sin azúcares agregados
• Textura cremosa y sabor irresistible
Disponible en los deliciosos sabores: Peanut Butter, Chocolate Cookie Crunch, Brownie
Contenido: 10 unidades (45g cada una) - 450 gramos
Modo de uso: Consumir 1 barra como colación entre comidas principales o post-entreno. Ideal para complementar dietas de definición y control de peso. No exceder 2 barras por día.`,
    price: 25480,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919427/gtlcpb010-low-carb-barra-proteica-raspberry-crunch-caja-10-unid-3eb8d64ff00dc4d23517575101946062-1024-1024_tpox1a.webp',
    brand: 'GENTECH'
  },
  {
    id: 87,
    name: 'CREATINA 250GRS',
    category: 'CREATINAS',
    description: `Creatina Monohidrato de GENTECH es la forma más pura y estudiada de creatina, ideal para aumentar la fuerza, potencia y masa muscular en deportistas de alto rendimiento.
Beneficios:
• Aumenta la fuerza y potencia muscular
• Mejora el rendimiento en ejercicios de alta intensidad
• Acelera la recuperación entre series
• Incrementa la masa muscular magra
• Fórmula micronizada para mejor absorción
• 100% pura sin aditivos
Contenido: 250 gramos
Modo de uso: Mezclar 5g (1 cucharadita) con 250ml de agua o jugo, tomar 1 vez por día. Período de carga: 20g por día por 5 días, luego 5g diarios.`,
    price: 24830,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919446/crea250-efea70abeeb77c455e17516781695849-1024-1024_jqwx0t.webp',
    brand: 'GENTECH'
  },
  {
    id: 88,
    name: 'CREATINA 500GRS',
    category: 'CREATINAS',
    description: `Creatina Monohidrato de GENTECH es la forma más pura y estudiada de creatina, ideal para aumentar la fuerza, potencia y masa muscular en deportistas de alto rendimiento.
Beneficios:
• Aumenta la fuerza y potencia muscular
• Mejora el rendimiento en ejercicios de alta intensidad
• Acelera la recuperación entre series
• Incrementa la masa muscular magra
• Fórmula micronizada para mejor absorción
• 100% pura sin aditivos
Contenido: 500 gramos
Modo de uso: Mezclar 5g (1 cucharadita) con 250ml de agua o jugo, tomar 1 vez por día. Período de carga: 20g por día por 5 días, luego 5g diarios.`,
    price: 44200,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919454/crea500-e90a1d9e3acc807da817516781728886-1024-1024_ysxfn1.webp',
    brand: 'GENTECH'
  },
  {
    id: 89,
    name: 'OMEGA 3 FISH OIL 60 CAPS',
    category: 'MAGNESIO Y OMEGA 3',
    description: `Omega 3 EPA & DHA de GENTECH proporciona ácidos grasos esenciales de alta calidad para el soporte cardiovascular, cerebral y articular.
Beneficios:
• Rico en EPA y DHA
• Soporte cardiovascular
• Mejora la función cerebral
• Propiedades antiinflamatorias
• Salud articular
• Aceite de pescado puro
Presentación: 60 cápsulas blandas
Contenido: 84 gramos
Modo de uso: Tomar 1-2 cápsulas por día con las comidas o según indicación médica. Mantener refrigerado después de abrir.`,
    price: 34450,
    image: 'https://acdn-us.mitiendanube.com/stores/006/011/728/products/omega-6042bf09fb1163280517516784186922-1024-1024.webp',
    brand: 'GENTECH'
  },
  {
    id: 90,
    name: 'IRON GEL CON CAFEÍNA 24U',
    category: 'PRE ENTRENOS',
    description: `Iron Gel Turbo Coffee de GENTECH combina la energía de los carbohidratos con la potencia de la cafeína, perfecto para un impulso energético extra.
Beneficios:
• Doble fuente de energía: carbohidratos + cafeína
• Mejora el rendimiento físico y mental
• Aumenta la concentración
• Retrasa la fatiga
• Absorción rápida
• Sabor delicioso a café
Sabor: Turbo Coffee
Contenido: 6 unidades
Modo de uso: Consumir 1 gel 30-45 minutos antes del entrenamiento. No exceder 2 geles por día debido al contenido de cafeína.`,
    price: 22620,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919469/turbocoff-218ce511509741428e17516783970248-1024-1024_gjdhd8.webp',
    brand: 'GENTECH'
  },
  {
    id: 91,
    name: 'PRE WORKOUT 400GRS',
    category: 'PRE ENTRENOS',
    description: `Pre Workout Wild Red Berries de GENTECH es la fórmula pre-entreno más potente para maximizar tu rendimiento y energía en cada sesión de entrenamiento.
Beneficios:
• Aumento explosivo de energía
• Mejora del focus y concentración
• Mayor resistencia muscular
• Incremento del pump muscular
• Retraso de la fatiga
• Fórmula con ingredientes premium
Sabor: Red Berries (Frutos Rojos)
Contenido: 400 gramos
Modo de uso: Mezclar 1 scoop (10g) con 250ml de agua fría, consumir 30 minutos antes del entrenamiento. Comenzar con medio scoop para evaluar tolerancia.`,
    price: 30940,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919526/wild-aa7a607f9c5a1cb30717516784247122-1024-1024_pjpenl.webp',
    brand: 'GENTECH'
  },
  {
    id: 92,
    name: 'WHEY PROTEIN 7900 1KG DOYPACK',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Whey Protein 7900 de GENTECH es una proteína de suero de leche de alta calidad y rápida absorción, ideal para el crecimiento y recuperación muscular en deportistas de élite.
Beneficios:
• Proteína de suero de alta calidad
• Rápida absorción y digestión
• Promueve el crecimiento muscular
• Acelera la recuperación post-entreno
• Alto valor biológico
• Sabores deliciosos y cremosos
Disponible en los deliciosos sabores: Chocolate, Vainilla
Contenido: 1000 gramos
Modo de uso: Mezclar 1 scoop (30g) con 250ml de agua fría o leche. Consumir 1-2 veces por día, preferentemente después del entrenamiento y entre comidas.`,
    price: 48100,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919533/whey1kgchoco-41547017ac8b551fd417516781920351-1024-1024_b6cyfd.webp',
    brand: 'GENTECH'
  },
  {
    id: 93,
    name: 'WHEY PROTEIN 7900 3KG BALDE',
    category: 'PROTEINAS Y GANADORES DE PESO',
    description: `Whey Protein 7900 de GENTECH es una proteína de suero de leche de alta calidad y rápida absorción, ideal para el crecimiento y recuperación muscular en deportistas de élite.
Beneficios:
• Proteína de suero de alta calidad
• Rápida absorción y digestión
• Promueve el crecimiento muscular
• Acelera la recuperación post-entreno
• Alto valor biológico
• Sabores deliciosos y cremosos
Contenido: 3000 gramos
Modo de uso: Mezclar 1 scoop (30g) con 250ml de agua fría o leche. Consumir 1-2 veces por día, preferentemente después del entrenamiento y entre comidas.`,
    price: 131300,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919539/gentech-whey-protein-7900-vainilla-3kg-1-0823d9fdf8a8c657b717694424175845-1024-1024_yuyqyk.webp',
    brand: 'GENTECH'
  },
  {
    id: 94,
    name: 'MULTIVITAMINICO 60TABS',
    category: 'VITAMINAS',
    description: `Multivitamin de GENTECH es un complejo vitamínico completo que aporta todos los nutrientes esenciales para el óptimo funcionamiento del organismo y el soporte nutricional deportivo.
Beneficios:
• Complejo vitamínico completo
• Soporte al sistema inmunológico
• Mejora la energía y vitalidad
• Antioxidantes naturales
• Soporte para deportistas
• Fórmula kosher
Presentación: 60 comprimidos
Contenido: 72 gramos
Modo de uso: Tomar 1 comprimido por día con el desayuno o según indicación médica. No exceder la dosis recomendada.`,
    price: 10920,
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/v1770919543/multi-19dcace18c86d58f5f17516781419325-1024-1024_apv41n.webp',
    brand: 'GENTECH'
  }
)


export const products = rawProducts.map(item => {
  const name = item.name || item.product || 'Producto'
  const numericPrice = typeof item.price === 'number' ? item.price : 0
  const priceLabel = typeof item.price === 'string' ? item.price : undefined
  return {
    ...item,
    name,
    image: normalizeImage(item.image),
    price: numericPrice,
    priceLabel,
    imageType: 'url',
    categorySlug: normalizeCategory(item.category),
  }
})

export const productsByCategory = products.reduce((acc, product) => {
  const key = product.categorySlug
  if (!acc[key]) acc[key] = []
  acc[key].push(product)
  return acc
}, {})
