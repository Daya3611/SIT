from pydantic import BaseModel

class TransactionInput(BaseModel):
    buyer_id: int
    buyer_base_delay_rate: float
    crop_type: str
    season: str
    quantity: int
    price: float
    shipment_duration: int
    sale_date: str