import pytest
import subprocess


@pytest.mark.parametrize("path", ["app", "tests"])
def test_flake8_conformance(path):
    result = subprocess.run(["flake8", path], capture_output=True, text=True)
    assert result.returncode == 0, f"Flake8 check failed for {path}:\
        {result.stdout}"
