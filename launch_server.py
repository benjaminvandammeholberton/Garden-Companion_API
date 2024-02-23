""" Module to launch virtual environnement and
    the uvicorn server in local
"""

import os

os.system('uvicorn app.app:app --reload')
