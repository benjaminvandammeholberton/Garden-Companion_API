"""
Main API router for version 1 of the Garden-Companion API.

Includes sub-routers for user-related and todo-related endpoints,
as well as authentication endpoints.

Usage:
    Include this router in your FastAPI application to\
        define version 1 API routes.
"""

from fastapi import APIRouter

from app.api.api_v1.handlers import area, todo, user, vegetable_info, vegetable_manager, chat_bot
from app.api.auth.jwt import auth_router

# Main APIRouter instance
router = APIRouter()

# Include user-related, todo-related, and authentication routers
router.include_router(area.area_router,
                      prefix='/area', tags=["area"])
router.include_router(todo.todo_router, prefix='/todo', tags=["todo"])
router.include_router(user.user_router, prefix='/users', tags=["users"])
router.include_router(vegetable_info.vegetable_info_router,
                      prefix='/vegetable_info', tags=["vegetable_info"])
router.include_router(vegetable_manager.vegetable_manager_router,
                      prefix='/vegetable_manager', tags=["vegetable_manager"])
router.include_router(chat_bot.chat_bot_router,
                      prefix='/assistant', tags=["assistant"])
router.include_router(auth_router, prefix='/auth', tags=["auth"])
