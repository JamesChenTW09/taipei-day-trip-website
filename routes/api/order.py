from base64 import encode
import time
import requests
from flask import *
from data.database import connection_pool

orders = Blueprint("orders", __name__)

@orders.route("/api/orders", methods=["POST"])
def newOrder():

    orderData = request.get_json()    
    # booking number
    bookingTime = time.time()
    bookingTime = str(bookingTime).split(".")
    bookingTime = bookingTime[0][4:-1]
    bookingNumber = session["tourDate"].replace("-","")
    bookingNumber = bookingNumber+str(session["id"])+str(session["tourId"])+bookingTime 

    session["phone"] = orderData["order"]["contact"]["phone"],
    if "id" in session:
        postData = {
        "prime": orderData["prime"],
        "partner_key": "partner_bmtgUVQljFVp7HzcdZGMFqAXZxG6Iy4OhZmHGIdE7jU9rRE7EydkUpGK",
        "merchant_id": "js1031222_ESUN",
        "order_number":int(bookingNumber),
        "details":"TapPay Test",
        "amount": orderData["order"]["price"],
        "cardholder": {
            "phone_number": orderData["order"]["contact"]["phone"],
            "name": orderData["order"]["contact"]["name"],
            "email": orderData["order"]["contact"]["email"],
            "address": orderData["order"]["trip"]["attraction"]["address"],
        },
        "remember": False
        }
        headers ={
        "Content-Type": "application/json",
        "x-api-key": "partner_bmtgUVQljFVp7HzcdZGMFqAXZxG6Iy4OhZmHGIdE7jU9rRE7EydkUpGK"
        }
        paymentStatus = requests.post("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime", data =json.dumps(postData).encode("utf-8"), headers=headers) 
        paymentStatus = paymentStatus.json()
        if paymentStatus["status"] == 0:
            connect = connection_pool.get_connection()
            cursor = connect.cursor(dictionary = True)
            value = (session["id"], postData["order_number"],postData["amount"],session["tourId"],session["tourName"],session["tourAddress"],session["tourImage"],session["tourDate"], session["tourTime"],postData["cardholder"]["name"],postData["cardholder"]["email"],postData["cardholder"]["phone_number"],0  )
            insert = "INSERT INTO `order`(`userId`,`number`,`price`,`attractionId`,`attractionName`,`attractionAddress`,`attractionImage`,`attractionDate`,`attractionTime`,`name`,`email`,`phone`,`status`) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "
            cursor.execute(insert,(value))
            connect.commit()
            cursor.close()
            connect.close()
            return {"data":{
               "number":paymentStatus["order_number"],
                "payment":{
                "status":0,
                "message":"付款成功"
                }
            }
        },200
        else:
            return {
                "error":True,
                "message": paymentStatus["msg"]
            },400
    
    else:
        return {
            "error":True,
            "message":"請先登入"
        },403



@orders.errorhandler(500)
def internal_server_error(e):
    error={
        "error":True,
        "message":"Server has problem"
    }
    return error,500


@orders.route("/api/order/<orderNumber>", methods=["GET"])
def getBooking(orderNumber):
    session["orderNumber"] = orderNumber
    return {
        "data": {
        "number":orderNumber ,
        "price": session["tourPrice"],
           "trip": {
              "attraction": {
                 "id": session["tourId"],
                 "name": session["tourName"],
                 "address": session["tourAddress"],
                 "image": session["tourImage"]
                },
               "date": session["tourDate"],
               "time": session["tourTime"]
               },
           "contact": {
                 "name": session["name"],
                 "email": session["email"],
                 "phone": session["phone"]
            },
            "status": 0
  }
}