from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError, PyMongoError
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB configuration - with validation
MONGO_DB_URL = os.getenv("MONGO_DB_URL")
if not MONGO_DB_URL:
    raise ValueError("MONGO_DB_URL environment variable not set")

MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
if not MONGO_DB_NAME:
    raise ValueError("MONGO_DB_NAME environment variable not set")

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Server is starting...")
    # Initialize MongoDB connection
    app.mongodb_client = AsyncIOMotorClient(MONGO_DB_URL)
    app.db = app.mongodb_client[MONGO_DB_NAME]
    
    # Create indexes
    try:
        await app.db.waitlists.create_index("email", unique=True)
    except PyMongoError as e:
        print(f"Error creating index: {e}")
        raise
    
    yield
    
    print("Server is stopping...")
    # Close MongoDB connection
    app.mongodb_client.close()

app = FastAPI(lifespan=lifespan)

class WaitlistRequest(BaseModel):
    email: EmailStr

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/waitlist/")
async def waitlist_user(waitlist: WaitlistRequest):
    waitlist_data = {
        "email": waitlist.email.lower()
    }

    try:
        result = await app.db.waitlists.insert_one(waitlist_data)
        created_waitlist = await app.db.waitlists.find_one({"_id": result.inserted_id})
        if not created_waitlist:
            raise HTTPException(status_code=500, detail="Failed to retrieve created waitlist")
        
        return {"id": str(created_waitlist["_id"]), "email": created_waitlist["email"]}
    
    except DuplicateKeyError:
        raise HTTPException(
            status_code=400,
            detail="Email already in waitlist"
        )
    except PyMongoError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )
