from flask import *
from data.database import connection_pool

users = Blueprint("users", __name__)

#user, id, name, password, email 

@users.route("/api/user",methods=["PATCH"])
def userLogIn():    
    connect = connection_pool.get_connection()
    cursor = connect.cursor(dictionary = True)

    data = request.get_json()
    email = data["email"]
    password = data["password"]
    cursor.execute("SELECT `id`,`name`,`email` FROM `user` WHERE `email` = %s AND `password` = %s", [email, password])
    fetchData = cursor.fetchone()
    if fetchData == None:
        cursor.close()
        connect.close()
        return {
                "error": True,
                "message": "信箱或密碼輸入錯誤"
                },400
    else:
        session["id"] = fetchData["id"]
        session["name"] = fetchData["name"]
        session["email"] = fetchData["email"]
        cursor.close()
        connect.close()
        return {
            "ok":True
        },200


@users.route("/api/user",methods=["POST"])
def userSignUp():    
    connect = connection_pool.get_connection()
    cursor = connect.cursor(dictionary = True, buffered=True)
    data = request.get_json()
    name= data["name"]
    email = data["email"]
    password = data["password"]
    cursor.execute("SELECT `email` FROM `user` WHERE `email` = %s", [email])
    fetchData = cursor.fetchone()
    if fetchData != None:
        cursor.close()
        connect.close()
        return {  "error": True,
                 "message": "已有重複的信箱"},400
    else:
        if name == "" :
            cursor.close()
            connect.close()
            return {"ok":True}
        else:
            cursor.execute("INSERT INTO `user`(`name`,`email`,`password`) VALUES(%s,%s,%s)",[name, email, password])
            connect.commit()
            cursor.close()
            connect.close()
            return{
                "ok":True
            },200

        

@users.route("/api/user",methods=["GET"])
def userGetData():
    if "id" in session:
        return {"data":{
            "id":session["id"],
            "name":session["name"],
            "email":session["email"],
        }},200
    else:
        return {"data":None}

@users.route("/api/user",methods=["DELETE"])  
def userLogOut():
    session.pop("id")
    session.pop("name")
    session.pop("email")
    return {
        "ok":True
    },200

@users.errorhandler(500)
def internal_server_error(e):
    error={
        "error":True,
        "message":"Server has problem"
    }
    return error,500