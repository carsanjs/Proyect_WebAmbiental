TEMPERATURA_C = {
    (37, 45): "Temperatura caliente 🌡️🌞, puede resultar incómoda.",
    (53, 61): "Temperatura muy caliente 🥵🔥, potencialmente peligrosa.",
    (69, 77): "Temperatura extremadamente caliente 🌡️🔥, riesgo de golpe de calor.",
    (80, float("inf")): "Temperatura peligrosa ☠️🔥, riesgo extremo de golpe de calor.",
}

UV = {
    (0, 2): {
        "Category": "Baja ☁️",
        "Message": "Puedes permanecer en el exterior sin riesgo! 🌞",
        "Alert": "No necesita protección.",
        "Recommendation": "",
    },
    (3, 5): {
        "Category": "Moderada ⛅",
        "Message": "Manténgase a la sombra durante las horas centrales del día! 🌳",
        "Alert": "Necesita protección. ⚠️",
        "Recommendation": "Use camisa, crema de protección solar y sombrero! 🧴👒",
    },
    (6, 7): {
        "Category": "Alta 🌞",
        "Message": "Evite exponerse al sol durante las horas pico. ☀️",
        "Alert": "Necesita protección. ⚠️",
        "Recommendation": "Use camisa, crema de protección solar y sombrero! 👕🧴👒, Use gafas con filtro UV-B y UV-A 🕶️",
    },
    (8, 10): {
        "Category": "Muy Alta ☀️",
        "Message": "Evite salir durante las horas centrales del día! ¡Busque la sombra! 🌳",
        "Alert": "Necesita protección. ⚠️",
        "Recommendation": "Son imprescindibles camisa, crema de protección solar y sombrero! 👕🧴👒",
    },
    (11, 15): {
        "Category": "Extremadamente Alta 🌞",
        "Message": "Manténgase en interiores y evite la exposición al sol. 🏠",
        "Alert": "Necesita protección. ⚠️",
        "Recommendation": "Son imprescindibles camisa, crema de protección solar y sombrero! 👕🧴👒, ¡Use gafas con filtros UV-B y UV-A 🕶️",
    },
}

HUMEDAD = {
    (51, 60): {
        "Category": "Alta  ☁️",
        "Message": "La humedad está aumentando, puede sentirse húmedo. 🌧️",
    },
    (61, 70): {
        "Category": "Muy Alta 🌧️",
        "Message": "La humedad es alta, puede sentirse incómodo. 🌧️",
    },
    (71, 100): {
        "Category": "Extremadamente Alta 🌧️",
        "Message": "La humedad es demasiado alta, se recomienda ventilación. 🌧️",
    },
}
CO2 = {
    (350, 1057): {
        "Category": "Excelente 🌱",
        "mensaje": "Nivel de dióxido de carbono dentro de los límites normales. 🌿",
    },
    (1058, 2115): {
        "Category": "Bueno 🌿",
        "Message": "El nivel de dióxido de carbono está ligeramente elevado. 🌿",
    },
    (2116, 3175): {
        "Category": "Justo 🌿",
        "Message": "Moderada Elevación. 🌿",
    },
    (3176, 5592): {
        "Category": "Alta Elevación 🌿",
        "Message": "Se recomienda una ventilacion de aire interior contaminada mediocre. 🌿",
    },
    (5592, 8467): {
        "Category": "Alta Elevación 🌿",
        "Message": "Aire interior malo y muy contamiado, ventilacion requerida. 🌿",
    },
    (8468, 10000): {
        "Category": "Alta Elevación 🌿",
        "Message": "Aire extremadamente malo y muy contamiado, ventilacion requerida.🚨",
    },
}

CALIDAD_AIRE = {
    (10, 100): {
        "Category": "Gas ",
        "Message": "Nivel de monóxido de carbono dentro de los límites normales. 🍃",
    },
    (101, 200): {
        "Category": "CO2 ",
        "Message": "Nivel de monóxido de carbono dentro de los límites normales. 🍃",
    },
    (201, 400): {
        "Category": "Alcohol 🍺",
        "Message": "Se detecta una ligera elevación en el nivel de monóxido de carbono. 🌿",
    },
    (401, 700): {
        "Category": "Humo",
        "Message": "Alerta, síntomas anormales.",
    },
    (701, 1000): {
        "Category": "inflamable 🔥",
        "Message": "Se recomienda una ventilación, contaminación mediocre. 🌲",
    },
}


CO = {
    (20, 200): {
        "Category": "Moderado 🍃",
        "Message": "Nivel de monóxido de carbono dentro de los límites normales. 🍃",
    },
    (201, 400): {
        "Category": "Ligera Elevación 🌿",
        "Message": "Se detecta una ligera elevación en el nivel de monóxido de carbono. 🌿",
    },
    (401, 700): {
        "Category": "Moderada Elevación 🌳",
        "Message": "alerta, sintomas anormales.",
    },
    (701, 1100): {
        "Category": "Alta Elevación 🌲",
        "Message": "se recomienda una ventilacion, contaminacion mediocre. 🌲",
    },
    (1001, 1600): {
        "Category": "Alta Elevación 🚨",
        "Message": "CO peligrosamente elevado, sintomas fatales.",
    },
    (1601, 2000): {
        "Category": "Extremadad Elevación",
        "Message": "hay posibilidad de muerte.",
    },
}

LLUVIA = {
    1: {
        "Category": "Despejado ⛅",
        "Message": "No se a detectado lluvia. ",
    },
    0: {
        "Category": "Lluvia Ligera. 🌧️",
        "Message": "Se ha detectado lluvia ligera. 🌧️",
    },
}

LUMINOSIDAD = {
    (0, 19): {
        "Category": "Muy oscuro 🌑",
        "Message": "La luminosidad es muy baja en este momento. 🌑",
    },
    (20, 39): {
        "Category": "Oscuro 🌚",
        "Message": "La luminosidad es baja en este momento. 🌚",
    },
    (40, 59): {
        "Category": "Moderadamente iluminado 🌙",
        "Message": "La luminosidad es moderada en este momento. 🌙",
    },
    (60, 79): {
        "Category": "Bien iluminado ☀️",
        "Message": "La luminosidad es buena en este momento. ☀️",
    },
    (80, 100): {
        "Category": "Muy bien iluminado 💡",
        "Message": "La luminosidad es excelente en este momento. 💡",
    },
}

__all__ = ["LLUVIA", "LUMINOSIDAD", "CO", "CO2", "HUMEDAD", "UV", "TEMPERATURA_C", "CALIDAD_AIRE"]
