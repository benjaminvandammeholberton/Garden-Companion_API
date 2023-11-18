"""
Main API router for version 1 of the Garden-Companion API.

Includes sub-routers for user-related and todo-related endpoints,
as well as authentication endpoints.

Usage:
    Include this router in your FastAPI application to\
        define version 1 API routes.
"""

from fastapi import APIRouter

from app.api.api_v1.handlers import todo
from app.api.api_v1.handlers import user
from app.api.auth.jwt import auth_router

# Main APIRouter instance
router = APIRouter()

# Include user-related, todo-related, and authentication routers
router.include_router(user.user_router, prefix='/users', tags=["users"])
router.include_router(todo.todo_router, prefix='/todo', tags=["todo"])
router.include_router(auth_router, prefix='/auth', tags=["auth"])
