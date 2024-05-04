TEMPERATURA_C = {
    (0, 13): {
        "Aula": "",
        "Indice": "Muy frio",
        "Mensaje": "Temperatura helada 🥶⛄, Abrigate lo mas pronto.🧤❄️",
    },
    (35, 80): {
        "Aula": "",
        "Indice": "Caluroso",
        "Mensaje": "Temperatura caliente 🌡️🌞, puede resultar incómoda.",
    },
}

UV = {
    (6, 7): {
        "Zona": "",
        "Indice": "Alta 🌞",
        "Mensaje": "Evite exponerse al sol durante las horas pico. ☀️",
        "Alerta": "Necesita protección. ⚠️",
        "Recomendación": "Use camisa, crema de protección solar y sombrero! 👕🧴🕶️👒, Use gafas con filtro UV-B y UV-A 🕶️",
    },
    (8, 10): {
        "Zona": "",
        "Indice": "Muy Alta ☀️",
        "Mensaje": "Evite salir durante las horas centrales del día! ¡Busque la sombra! 🌳",
        "Alert": "Necesita protección. ⚠️",
        "Recomendación": "Son imprescindibles camisa, crema de protección solar y sombrero! 👕🧴🕶️👒",
    },
    (11, 15): {
        "Zona": "",
        "Indice": "Extremadamente Alta 🌞",
        "Mensaje": "Manténgase en interiores y evite la exposición al sol. 🏠",
        "Alerta": "Necesita protección. ⚠️",
        "Recomendación": "Son imprescindibles camisa, crema de protección solar y sombrero! 👕🧴🕶️👒, ¡Use gafas con filtros UV-B y UV-A 🕶️",
    },
}

HUMEDAD = {
    (51, 60): {
        "Indice": "Alta  ☁️",
        "Mensaje": "La humedad está aumentando, puede sentirse húmedo. 🌧️",
    },
    (61, 70): {
        "Indice": "Muy Alta 🌧️",
        "Mensaje": "La humedad es alta, puede sentirse incómodo. 🌧️",
    },
    (71, 100): {
        "Indice": "Extremadamente Alta 🌧️",
        "Mensaje": "La humedad es demasiado alta, se recomienda ventilación. 🌧️",
    },
}
CO2 = {
    (4600, 7600): {
        "Aula": "",
        "Indice": "MALA 🚨",
        "Mensaje": "Aire interior malo y muy contamiado, ventilacion requerida. 🤢",
    },
    (7601, 10000): {
        "Aula": "",
        "Indice": "PELIGROSA ❌💀",
        "Mensaje": "Aire extremadamente malo y muy contamiado, ventilacion requerida.🏴‍☠️⚰️",
    },
}

CALIDAD_AIRE = {
    (210, 310): {
        "Zona": "",
        "Indice": "MALA 🚨",
        "Mensaje": "Se detecta una ligera elevación en la calidad de aire. 💨",
    },
    (311, 1000): {
        "Zona": "",
        "Indice": "EXTRAMADAMENTE MALA ❌",
        "Mensaje": "Alerta, síntomas anormales.💀",
    },
}


CO = {
    (700, 1100): {
        "Aula": "",
        "Indice": "MEDIOCRE 💨",
        "Mensaje": "se recomienda una ventilacion, contaminacion mediocre.🤧😷 ",
    },
    (1101, 1600): {
        "Aula": "",
        "Indice": "MALA 🚨",
        "Mensaje": "CO peligrosamente elevado, sintomas fatales. 🤢",
    },
    (1601, 2000): {
        "Aula": "",
        "Indice": "EXTREMADAMENTE MALA❌💀",
        "Mensaje": "Hay posibilidad de muerte.🏴‍☠️⚰️",
    },
}

LLUVIA = {
    0: {
        "Zona": "",
        "Indice": "DESPEJADO ⛅🌤️",
        "Mensaje": "No se a detectado lluvia. ",
    },
    1: {
        "Zona": "",
        "Indice": "LLUVIA LIGERA. 💦🌂☔",
        "Mensaje": "Se ha detectado lluvia ligera. 🌧️🌫️",
    },
}

LUMINOSIDAD = {
    (0, 20): {
        "Aula": "",
        "Indice": "MUY OSCURO 🌑",
        "Mensaje": "La luminosidad es muy baja en este momento. 🌑",
    },
    (20, 40): {
        "Aula": "",
        "Indice": "OSCURO 🌚",
        "Mensaje": "La luminosidad es baja en este momento. 🌚",
    },
}

__all__ = [
    "LLUVIA",
    "LUMINOSIDAD",
    "CO",
    "CO2",
    "HUMEDAD",
    "UV",
    "TEMPERATURA_C",
    "CALIDAD_AIRE",
]
