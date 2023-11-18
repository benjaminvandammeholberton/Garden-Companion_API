# Adding a New Route Endpoint to the API

To add a new route endpoint to the FastAPI application, follow these steps:

## 1. Create the Route Endpoint in Handlers:
In the ```handlers``` directory, create a new Python file, e.g., ```new_endpoint.py```, to define the new route endpoint. Include a test route to ensure that the endpoint is connected. Here's an example:

```
# app/api/api_v1/handlers/new_endpoint.py
from fastapi import APIRouter

new_endpoint_router = APIRouter()

@new_endpoint_router.get('/test')
def test_new_endpoint():
    return {"message": "New Endpoint router working"}
```

## 2. Add the Route to the Router File:
Open the ```router.py``` file in ```app/api/api_v1/``` and import the new route. Add it to the router using ```include_router```. For example:

```
app/api/api_v1/router.py
from fastapi import APIRouter
from app.api.api_v1.handlers import user, todo, new_endpoint
from app.api.auth.jwt import auth_router

router = APIRouter()

router.include_router(user.user_router, prefix='/users', tags=["users"])
router.include_router(todo.todo_router, prefix='/todo', tags=["todo"])
router.include_router(new_endpoint.new_endpoint_router, prefix='/new', tags=["new"])
router.include_router(auth_router, prefix='/auth', tags=["auth"])
```

## 3. Check the Route in the Docs:
Start the FastAPI development server and go to ```http://localhost:8000/docs``` to check if the new endpoint is documented.

## 4. Create the Model:
In the ```models``` directory, create a new file, e.g., ```new_model.py```, to define the data model for the new endpoint. Ensure to import necessary modules and dependencies. Example:

```
# app/models/new_model.py
from datetime import datetime
from uuid import UUID, uuid4
from beanie import Document, Indexed, Link, before_event, Replace, Insert
from pydantic import Field

class NewModel(Document):
    model_id: UUID = Field(default_factory=uuid4, unique=True)
    # Add other fields as needed
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    def __repr__(self) -> str:
        return f"<NewModel {self.model_id}>"

    # Add other methods and events as needed
```

## 5. Register the Model in ```app.py```:
Open ```app.py``` and import the new model. Register it during the application initialization:
```
# app/app.py
from app.models.new_model import NewModel

await init_beanie(
    database=db_client,
    document_models=[
        User,
        Todo,
        NewModel  # Add the new model here
    ]
)
```

## 6. Check Database Creation:
Restart the FastAPI development server, and upon relaunch, check if the database is created with the new model.

## 7. Create the Schema:

In the ```schemas``` directory, create a new file, e.g., ```new_schemas.py```, to define Pydantic schemas for request and response validation. Example:

```
# app/schemas/new_schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field

class TodoCreate(BaseModel):
    title: str = Field(..., title='Title', max_length=55, min_length=1)
    description: str = Field(..., title='Description', max_length=755, min_length=1)
    status: Optional[bool] = False

class TodoUpdate(BaseModel):
    title: Optional[str] = Field(..., title='Title', max_length=55, min_length=1)
    description: Optional[str] = Field(..., title='Description', max_length=755, min_length=1)
    status: Optional[bool] = False

class TodoOut(BaseModel):
    todo_id: UUID
    status: bool
    title: str
    description: str
    created_at: datetime
    update_at: datetime
```

## 8. Create the Service:

In the ```services``` directory, create a new file, e.g., ```new_service.py```, to define the business logic and service layer for the new functionality. Example:

```
# app/services/new_service.py
from typing import List
from uuid import UUID
from app.models.user_model import User
from app.models.todo_model import Todo
from app.schemas.new_schemas import TodoCreate, TodoUpdate

class NewService:
    @staticmethod
    async def list_items(user: User) -> List[Todo]:
        items = await Todo.find(Todo.owner.id == user.id).to_list()
        return items

    @staticmethod
    async def create_item(user: User, data: TodoCreate) -> Todo:
        item = Todo(**data.dict(), owner=user)
        return await item.insert()
    
    @staticmethod
    async def retrieve_item(current_user: User, item_id: UUID):
        item = await Todo.find_one(Todo.todo_id == item_id, Todo.owner.id == current_user.id)
        return item
    
    @staticmethod
    async def update_item(current_user: User, item_id: UUID, data: TodoUpdate):
        item = await NewService.retrieve_item(current_user, item_id)
        await item.update({"$set": data.dict(exclude_unset=True)})
        item.update_update_at()
        await item.save()
        return item
    
    @staticmethod
    async def delete_item(current_user: User, item_id: UUID):
        item = await NewService.retrieve_item(current_user, item_id)
        if item:
            await item.delete()

        return None
```

## 9. Create the Real Endpoints:

In the ```new_endpoint.py``` file inside the ```handlers``` directory, create the actual API endpoints using FastAPI. Example:

```
# app/api/api_v1/handlers/new_endpoint.py
from uuid import UUID
from fastapi import APIRouter, Depends
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.schemas.new_schemas import TodoOut, TodoCreate, TodoUpdate
from app.services.new_service import NewService
from app.models.todo_model import Todo
from typing import List

new_endpoint_router = APIRouter()

@new_endpoint_router.get('/', summary='Get all items of the user', response_model=List[TodoOut])
async def list(current_user: User = Depends(get_current_user)):
    return await NewService.list_items(current_user)

@new_endpoint_router.post('/create', summary="Create Item", response_model=Todo)
async def create_item(data: TodoCreate, current_user: User = Depends(get_current_user)):
    return await NewService.create_item(current_user, data)

@new_endpoint_router.get('/{item_id}', summary='Get an item by item_id', response_model=TodoOut)
async def retrieve(item_id: UUID, current_user: User = Depends(get_current_user)):
    return await NewService.retrieve_item(current_user, item_id)

@new_endpoint_router.put('/{item_id}', summary="Update item by item_id", response_model=TodoOut)
async def update(item_id: UUID, data: TodoUpdate, current_user: User = Depends(get_current_user)):
    return await NewService.update_item(current_user, item_id, data)

@new_endpoint_router.delete('/{item_id}', summary="Delete item by item_id")
async def delete(item_id: UUID, current_user: User = Depends(get_current_user)):
    await NewService.delete_item(current_user, item_id)
    return None
```

## 10. Test the Route in the Docs:

Test the newly added endpoints in the FastAPI documentation. First, log in, and then try the new routes you've created.

These steps provide a comprehensive guide to adding a new route endpoint to your FastAPI application. Ensure that you follow each step carefully, and your new functionality should be integrated smoothly into your application.

## 11. Workflow

### 1. Requested Route

- The client initiates a request by specifying a route, e.g., `/api/users`.

### 2. Request Validation (Pydantic Schemas)

- FastAPI validates the incoming request against defined Pydantic schemas.
- If validation fails, an error response is generated.

### 3. Dependency Injection

- Dependencies, such as the authenticated user (`current_user`), are injected into the endpoint.

### 4. Business Logic

- The application's business logic is executed, which may involve interactions with services, models, and other components.

### 5. Database Interaction

- The application interacts with the database to perform operations such as CRUD operations.

### 6. Response Preparation (Pydantic Schemas)

- The response data is structured according to defined Pydantic schemas.
- This step ensures a consistent response structure.

### 7. Response Serialization (JSON Format)

- FastAPI serializes the response data into JSON format, suitable for transfer over HTTP.

### 8. Response to Client (HTTP Response)

- The final response, now in the form of an HTTP response, is sent back to the client.

---

**Note:** This overview provides a high-level understanding of the typical data flow in a FastAPI application. The specific implementation details and endpoints may vary based on the application's structure and requirements.
