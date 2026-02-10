const normalizeCategory = (category = '') => {
  const upper = category.toUpperCase()
  if (upper.includes('CREATINA')) return 'creatina'
  if (upper.includes('PRE') && upper.includes('ENTRENO')) return 'performance'
  if (upper.includes('PERFORMANCE')) return 'performance'
  if (upper.includes('AMINOACIDO')) return 'performance'
  if (upper.includes('QUEMADOR')) return 'performance'
  if (upper.includes('BEBIDAS ISOTONICAS')) return 'performance'
  if (upper.includes('PROTEIN')) return 'proteina'
  if (upper.includes('GANADOR')) return 'proteina'
  if (upper.includes('VITAMIN')) return 'vitaminas'
  if (upper.includes('MAGNESIO') || upper.includes('OMEGA')) return 'vitaminas'
  if (upper.includes('COLAGENO') || upper.includes('RESVERATROL')) return 'vitaminas'
  return 'performance'
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
    category: 'PREENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-tnt-dynamite-240grs-grape-attack-23853e22914e56b34117501761600282-1024-1024_imkznn.webp',
    description: 'STAR NUTRITION TNT-DYNAMITE es un potente pre-entreno diseñado para maximizar tu rendimiento durante los entrenamientos más intensos. Con una fórmula avanzada que combina estimulantes, potenciadores de óxido nítrico y compuestos energéticos, este suplemento te proporcionará la energía explosiva que necesitas para superar tus límites.\n\nBeneficios:\n\n• Energía explosiva instantánea\n• Mayor concentración y enfoque mental\n• Mejora el bombeo muscular y la vasodilatación\n• Retrasa la fatiga muscular\n• Aumenta la resistencia durante entrenamientos intensos\n• Mejora el rendimiento general en el gimnasio\n\nDisponible en los deliciosos sabores: ACAÍ POWER, BLUE RAZ, CITRUS SLUSH, GRAPE ATTACK\n\nContenido: 240 gramos (30 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (8g) con 200-250ml de agua fría 20-30 minutos antes del entrenamiento. Para mejores resultados, no consumir después de las 18:00hs o 6 horas antes de dormir. No exceder la dosis recomendada.'
  },
  {
    id: 23,
    name: 'STAR NUTRITION PUMP 3D EVOLUTION RIPPED 315 GRS',
    category: 'PREENTRENOS',
    brand: 'STAR NUTRITION',
    price: '$$$',
    image: 'https://res.cloudinary.com/dzfpmiqds/image/upload/star-nutrition-pump-3d-evolution-ripped-315-grs-strawberry-lime-51eb2b71eed1b854c317501808792439-1024-1024_zfmbu2.webp',
    description: 'STAR NUTRITION PUMP 3D EVOLUTION RIPPED es un pre-entreno premium de triple acción que combina potenciadores de energía, maximizadores de bomba muscular y quemadores de grasa en una fórmula avanzada.\n\nBeneficios:\n\n• Triple acción: energía + pump + quema de grasa\n• Proporciona energía explosiva y sostenida\n• Maximiza la vasodilatación y la bomba muscular\n• Activa el metabolismo y favorece la quema de grasa\n• Mejora el enfoque mental y la concentración\n• Optimiza el rendimiento en entrenamientos de alta intensidad\n\nContenido: 315 gramos (30 porciones aproximadamente)\n\nModo de uso: Mezclar 1 medida (10.5g) en 250ml de agua fría y consumir 20-30 minutos antes del entrenamiento. No exceder la dosis recomendada.'
  },
  {
    id: 24,
    name: 'STAR NUTRITION JUST PLANT 2 LBS',
    category: 'PROTEINAS',
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
    category: 'PERFORMANCE',
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
    category: 'BEBIDAS ISOTONICAS',
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
    category: 'PROTEINAS',
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
