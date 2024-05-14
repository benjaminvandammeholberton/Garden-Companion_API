"""
Integration tests for area endpoints
"""


def test_list_areas(test_client):
    response = test_client.get('api/v1/area')
    assert response.status_code == 401


def create_user(test_client):
    new_user = {
        "username": "BenJamminTest",
        "email": "benjamin.vandamme@me.com",
        "password": "testest"
    }
    response = test_client.post('api/v1/user', json=new_user)
    assert response.status_code == 200
