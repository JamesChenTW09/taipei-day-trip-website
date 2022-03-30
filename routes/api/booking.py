
from flask import *
from data.database import connection_pool

bookings = Blueprint("bookings", __name__)

@bookings.route("/api/booking", methods=["POST"])
def postBooking():
    connect = connection_pool.get_connection()
    cursor = connect.cursor(dictionary = True)

    data = request.get_json()
    if data["date"] == "":
        return {
            "error":True,
            "message":"資料未填寫完整!!!"
        },400
    elif "id" not in session:
         return {
            "error":True,
            "message":"請先登入"
        },400
    else:
        cursor.execute("SELECT `name`, `address`, `images` FROM `attraction` WHERE `id` = %s",[data["attractionId"]])
        getData = cursor.fetchone()
        getImageData = getData["images"].split(",")[0]
        
        session["tourId"] =  data["attractionId"]
        session["tourDate"] = data["date"]
        session["tourTime"] = data["time"]
        session["tourPrice"] = data["price"]
        session["tourAddress"] = getData["address"]
        session["tourName"] = getData["name"]
        session["tourImage"] = getImageData
        
        cursor.close()
        connect.close()
        return {"ok":True},200

@bookings.route("/api/booking", methods=["GET"])
def getBooking():
    #check the booking is deleted or not
    if "tourId" not in session:
        return {"data":None},200
    elif "id" not in session:
        return{"error":True,
        "message":"請先登入"},403
    return {
        "data":{
            "attraction":{      
                "id":session["tourId"],
                "name": session["tourName"],
                "address":session["tourAddress"],
                "image":session["tourImage"]
                },
            "date":session["tourDate"],
            "time":session["tourTime"],
            "price":session["tourPrice"]      
        },
    },200

@bookings.route("/api/booking", methods=["DELETE"])
def deleteBooking():
    if "id" not in session:
        return {
            "error":True,
            "message": "請先登入"
        },403
    else:
        session.pop("tourId")
        session.pop("tourDate")
        session.pop("tourTime")
        session.pop("tourPrice")       
        session.pop("tourAddress") 
        session.pop("tourName")
        session.pop("tourImage")
        return {"ok":True},200   