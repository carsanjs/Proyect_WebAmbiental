TEMPERATURA_C = {
    (35, 39): "Temperatura caliente 🌡️🌞, puede resultar incómoda.",
    (40, 44): "Temperatura muy caliente 🥵🔥, potencialmente peligrosa.",
    (45, 49): "Temperatura extremadamente caliente 🌡️🔥, riesgo de golpe de calor.",
    (50, float("inf")): "Temperatura peligrosa ☠️🔥, riesgo extremo de golpe de calor.",
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
    (45, 50): {
        "Category": "Normal ☁️",
        "Message": "La humedad se encuentra en un nivel normal. ☁️",
    },
    (51, 60): {
        "Category": "Alta 🌧️",
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
    (0, 400): {
        "Category": "Normal 🌱",
        "mensaje": "Nivel de dióxido de carbono dentro de los límites normales. 🌿",
    },
    (401, 800): {
        "Category": "Ligera Elevación 🌿",
        "Message": "El nivel de dióxido de carbono está ligeramente elevado. 🌿",
    },
    (801, 1200): {
        "Category": "Moderada Elevación 🌿",
        "Message": "Se detecta una elevación en el nivel de dióxido de carbono. 🌿",
    },
    (1201, 2000): {
        "Category": "Alta Elevación 🌿",
        "Message": "El nivel de dióxido de carbono es alto, se recomienda ventilación inmediata. 🌿",
    },
}
CO = {
    (0, 5): {
        "Category": "Normal 🍃",
        "Message": "Nivel de monóxido de carbono dentro de los límites normales. 🍃",
    },
    (6, 10): {
        "Category": "Ligera Elevación 🌿",
        "Message": "Se detecta una ligera elevación en el nivel de monóxido de carbono. 🌿",
    },
    (11, 15): {
        "Category": "Moderada Elevación 🌳",
        "Message": "Se detecta una elevación en el nivel de monóxido de carbono. 🌳",
    },
    (16, 20): {
        "Category": "Alta Elevación 🌲",
        "Message": "El nivel de monóxido de carbono es alto, se recomienda ventilación inmediata. 🌲",
    },
}

LLUVIA = {
    1: {
        "Category": "Lluvia Ligera 🌧️",
        "Message": "Se ha detectado lluvia ligera. 🌧️",
    }
}

LDR = {
    (0, 10): {
        "Category": "Luz Baja 🌙",
        "Message": "La luz es tenue en este momento. 🌙",
    },
    (11, 50): {
        "Category": "Luz Moderada ☀️",
        "Message": "La luz tiene una intensidad moderada. ☀️",
    },
    (51, 100): {
        "Category": "Luz Alta 💡",
        "Message": "La luz es intensa en este momento. 💡",
    },
}

__all__ = ["LLUVIA", "LDR", "CO", "CO2", "HUMEDAD", "UV", "TEMPERATURA_C"]
