from argon2 import extract_parameters

from app.utils.security import hash_password, verify_password


def test_password_hash_uses_argon2id_and_verifies():
    hashed = hash_password("a-long-test-password")
    assert extract_parameters(hashed).type.name == "ID"
    assert verify_password("a-long-test-password", hashed)
    assert not verify_password("incorrect-password", hashed)


def test_verification_handles_invalid_hash():
    assert not verify_password("password", "not-an-argon2-hash")
