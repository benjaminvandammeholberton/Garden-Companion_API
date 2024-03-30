import requests


def test_server_returns_200_status_code():
    """
    The test checks if the server is returning a 200
    status code when calling the test_server endpoint.
    """
    response = requests.get('http://localhost:8000/')
    assert response.status_code == 200


def test_server_returns_correct_response_body():
    """
    The test checks if the server is returning the correct response
    body when calling the test_server endpoint.
    """
    response = requests.get('http://localhost:8000/')
    assert response.json() == {'message': 'server is running'}
