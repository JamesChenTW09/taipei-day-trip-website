
import json
from database.database import connect

cursor = connect.cursor()




with open("taipei-attractions.json", encoding="utf-8")as file:

    attractions_info= json.load(file)["result"]["results"]

for attract in attractions_info:
    name = attract["stitle"]
    category = attract["CAT2"]
    description = attract["xbody"]
    address = attract["address"].replace(" ","")
    transport = attract["info"]
    mrt = attract["MRT"]
    latitude = attract["latitude"]
    longitude = attract["longitude"]
    images = attract["file"].split("https://")
    images.pop(0)
    final_image = ""

    for image in images:
        if image[-3:].lower()=="jpg" or image[-3:].lower()=="png":
            final_image += "https://"+image+","
    

    insert = "INSERT INTO `attraction`(`name`,`category`,`description`,`address`,`transport`,`mrt`,`latitude`,`longitude`,`images`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    value = [name, category, description, address, transport, mrt, latitude, longitude, final_image]
    cursor.execute(insert, value)
    connect.commit()
        


