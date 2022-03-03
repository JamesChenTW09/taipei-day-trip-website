from mysql.connector import pooling
from .Config import dbConfig
import json



connection_pool = pooling.MySQLConnectionPool(
                                pool_name=dbConfig["db_poolName"],
                                pool_size=dbConfig["db_poolSize"],
                                pool_reset_session=True,
                                port = dbConfig["db_port"],
                                host=dbConfig["db_host"],
                                user=dbConfig["db_user"],
                                password=dbConfig["db_password"],
                                database=dbConfig["db_database"])

connect = connection_pool.get_connection()
cursor = connect.cursor(dictionary = True)


#新增資料庫和table
#cursor.execute("CREATE DATABASE `taipei_attractions`;")
#cursor.execute("USE `taipei_attractions`;")
#cursor.execute("CREATE TABLE `attraction`(`id` INT PRIMARY KEY AUTO_INCREMENT,`name` VARCHAR(20),`category` VARCHAR(10),`description` TEXT,`address` TEXT,`transport` TEXT,`mrt` VARCHAR(10),`latitude` VARCHAR(15),`longitude` VARCHAR(15),`images` TEXT);")


#將資料寫進資料庫
# with open("taipei-attractions.json", encoding="utf-8")as file:

#     attractions_info= json.load(file)["result"]["results"]

# for attract in attractions_info:
#     name = attract["stitle"]
#     category = attract["CAT2"]
#     description = attract["xbody"]
#     address = attract["address"].replace(" ","")
#     transport = attract["info"]
#     mrt = attract["MRT"]
#     latitude = attract["latitude"]
#     longitude = attract["longitude"]
#     images = attract["file"].split("https://")
#     images.pop(0)
#     final_image = ""

#     for image in images:
#         if image[-3:].lower()=="jpg" or image[-3:].lower()=="png":
#             final_image += "https://"+image+","
    

#     insert = "INSERT INTO `attraction`(`name`,`category`,`description`,`address`,`transport`,`mrt`,`latitude`,`longitude`,`images`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
#     value = [name, category, description, address, transport, mrt, latitude, longitude, final_image]
#     cursor.execute(insert, value)
#     connect.commit()
        

