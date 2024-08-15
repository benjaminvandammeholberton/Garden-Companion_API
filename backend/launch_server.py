""" Module to launch virtual environnement and
    the uvicorn server in local
"""

import os

# Spécifiez l'adresse IP et le port sur lesquels le serveur doit écouter
adresse_ip = "0.0.0.0"  # écoute sur toutes les interfaces réseau
port = 8001

# Utilisez os.system pour lancer UVicorn avec les options d'adresse IP et
# de port
os.system(f"uvicorn app.app:app --reload --host {adresse_ip} --port {port}")
