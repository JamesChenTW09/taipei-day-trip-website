from flask import *
from data.database import cursor

attractions = Blueprint("attractions", __name__)



@attractions.route("/api/attractions")
def check():
	#取得前端傳回來的query string
	page = request.args.get("page")
	keyword = request.args.get("keyword")

	#取得資料庫總筆數
	cursor.execute("SELECT COUNT(`id`) FROM `attraction`")
	totalId = cursor.fetchone()

	#if page and keyword are empty
	if page == None and keyword == None:
		return {
				"error":True,
				"message":"請輸入page 和 keyword"
				},400
	# if only keyword is empty
	elif keyword == None and page != None:
		maxPage = checkMaxPage(totalId["COUNT(`id`)"])
		#check page is number or not?
		if str(page).isdigit() == True:	
			page = int(page)		
			if page+1 >maxPage:
				nextPage = None
			else:
				nextPage = page+1
		#if page is not a number
		else: return {
				"error":True,
				"message":"請輸入數字"
			},400
		#check page is between valid range
		# page = int(page)
		if page >= 0 and page < maxPage:
			start = 12*page
			cursor.execute("SELECT * FROM `attraction` LIMIT %s,12",[start])
			search_page_data = cursor.fetchall()
			search_page_data = handleImage(search_page_data)
			return {"nextPage":nextPage, "data":search_page_data},200
		#if page number is not in valid range
		else: return {
				"error":True,
				"message":"請輸入正確的範圍"
			},400
	# if only keyword isn't empty
	elif page == None and keyword != None:
		cursor.execute("SELECT * FROM `attraction` WHERE `name` LIKE CONCAT('%', %s,'%') LIMIT 0,12",[keyword])
		search_keyword_data = cursor.fetchall()
		if search_keyword_data == []:
			return {
			"error":True,
			"message":"無相關資料"
			},400
		else:
			search_keyword_data = handleImage(search_keyword_data)
			return {"datas": search_keyword_data},200
	else:  # both page and keyword have data
		if page.isdigit() == False:
			return {
				"error":True,
				"message":"請在頁數輸入正數字"
				},400
		cursor.execute("SELECT * FROM `attraction` WHERE `name` LIKE CONCAT('%', %s,'%')",[keyword])
		search_keyword_data = cursor.fetchall()
		if search_keyword_data == []:
			return {
				"error":True,
				"message":"無相關資料"
				},400
		else:
			page = int(page)
			maxPage = checkMaxPage(len(search_keyword_data))
			nextPage = checkNextPage(page, maxPage)
			if page >= 0 and page <= maxPage:
				start = 12*page
				cursor.execute("SELECT * FROM `attraction` WHERE `name` LIKE CONCAT('%', %s,'%') LIMIT %s,12",[keyword, start])
				search_both_data = cursor.fetchall()
				search_both_data = handleImage(search_both_data)
				return {"nextPage":nextPage, "data":search_both_data},200
			else:
				return {
					"error":True,
					"message":"請輸入正確的範圍"
					},400

@attractions.route("/api/attraction/<attractionId>")
def checkId(attractionId):
	#取得資料庫裡總筆數
	cursor.execute("SELECT COUNT(`id`) FROM `attraction`")
	totalId = cursor.fetchone()
	#確認id是否為數字，且不超過資料庫裡的最大id
	if attractionId.isdigit() == True:
		attractionId = int(attractionId)
		if attractionId > 0 and attractionId <= totalId["COUNT(`id`)"]:
			#找到資料庫相對應的資料，對images做split變成list，並整理
			cursor.execute("SELECT * FROM `attraction` WHERE `id` = %s",[attractionId])
			searchId_data = cursor.fetchone()
			searchId_data = handleImage(searchId_data)
			return {"data": searchId_data}
		else:
			#如果數字超過最大的id
			return {
				"error":True,
				"message":"請輸入正確的數字範圍"
			},400
	else:
		#如果輸入的不是數字
		return {
				"error":True,
				"message":"請輸入正確的數字範圍"
			},400


def checkMaxPage(count):
	if count % 12 == 0:
		maxPage = count/12-1
		return maxPage
	else:
		maxPage = count/12
		return maxPage

def checkNextPage(page, maxPage):
	if str(page).isdigit() == True:
		if page+1 >maxPage:
			nextPage = None
			return nextPage
		else:
			nextPage = int(page)+1
			return nextPage

def handleImage(images):
	if type(images) == type([]):
		for image in images:
			searchId_data_images = image["images"].split(",")
			searchId_data_images.pop(-1)
			image["images"] = searchId_data_images
		return images
	elif type(images) == type({}):
			searchId_data_images = images["images"].split(",")
			searchId_data_images.pop(-1)
			images["images"] = searchId_data_images
			return images


