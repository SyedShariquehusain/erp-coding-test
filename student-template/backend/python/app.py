from fastapi import FastAPI
from sqlalchemy import select

from database import SessionLocal
from models import Inventory

app = FastAPI(title="ERP Inventory API")


@app.get("/api/inventory/alerts")
def get_inventory_alerts():

    db = SessionLocal()

    try:

        items = db.execute(
            select(Inventory).where(
                Inventory.quantity <= Inventory.reorder_level
            )
        ).scalars().all()

        result = []

        for item in items:

            result.append({
                "id": str(item.id),
                "product_name": item.product_name,
                "quantity": item.quantity,
                "reorder_level": item.reorder_level
            })

        return result

    finally:

        db.close()
