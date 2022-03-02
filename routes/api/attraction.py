from flask import *
from data.database.database import cursor

attractions = Blueprint("attractions", __name__)

#取得資料庫資料總筆數，放進totalId變數裡
cursor.execute("SELECT COUNT(`id`) FROM `attraction`")
totalId = cursor.fetchone()


@attractions.route("/api/attractions")
def check():
	#取得前端傳回來的query string
	page = request.args.get("page")
	keyword = request.args.get("keyword")

	

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
		page = int(page)
		if page >= 0 and page < maxPage:

			#set 12 datas in one page. set start and finish according to page
			start = 12*page+1
			finish = start+11
			cursor.execute("SELECT * FROM `attraction` WHERE `id` >= %s AND `id` <=%s",[start, finish])
			search_page_data = cursor.fetchall()
			search_page_data = handleListImage(search_page_data)

			return {"nextPage":nextPage, "data":search_page_data},200
		else: return {
				"error":True,
				"message":"請輸入正確的範圍"
			},400

	elif page == None and keyword != None:

		cursor.execute("SELECT * FROM `attraction` WHERE `name` LIKE CONCAT('%', %s,'%') LIMIT 0,11",[keyword])
		search_keyword_data = cursor.fetchall()
		if search_keyword_data == []:
			return {
			"error":True,
			"message":"無相關資料"
			},400
		else:
			search_keyword_data = handleListImage(search_keyword_data)
			return {"datas": search_keyword_data},200
	else:
		cursor.execute("SELECT * FROM `attraction` WHERE `name` LIKE CONCAT('%', %s,'%')",[keyword])
		search_keyword_data = cursor.fetchall()
		if search_keyword_data == []:
			return {
				"error":True,
				"message":"無相關資料"
				},400
		elif page.isdigit() == False:
			return {
				"error":True,
				"message":"請在頁數輸入正數字"
				},400
		else:
			page = int(page)
			maxPage = checkMaxPage(len(search_keyword_data))
			nextPage = checkNextPage(page, maxPage)
			if page >= 0 and page < maxPage:
				start = 12*page
				finish = start+11
			
				cursor.execute("SELECT * FROM `attraction` WHERE `name` LIKE CONCAT('%', %s,'%') LIMIT %s,%s",[keyword, start, finish])
				search_both_data = cursor.fetchall()
				search_both_data = handleListImage(search_both_data)
				return {"nextPage":nextPage, "data":search_both_data},200
			else:
				return {
					"error":True,
					"message":"請輸入正確的範圍"
					},400

@attractions.route("/api/attraction/<attractionId>")
def checkId(attractionId):
	#確認id是否為數字，且不超過資料庫裡的最大id
	if attractionId.isdigit() == True:
		attractionId = int(attractionId)
		if attractionId > 0 and attractionId <= totalId["COUNT(`id`)"]:
			#找到資料庫相對應的資料，對images做split變成list，並整理
			cursor.execute("SELECT * FROM `attraction` WHERE `id` = %s",[attractionId])
			searchId_data = cursor.fetchone()
			searchId_data = handleDictImage(searchId_data)
			return {"datas": searchId_data}
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

@attractions.errorhandler(500)
def interal_server_error(e):
	return {
  		"error": True,
  		"message": "伺服器壞掉了"
	,},500


def checkMaxPage(count):
	if count / 12 == 0:
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

def handleDictImage(dict):
	searchId_data_images = dict["images"].split(",")
	searchId_data_images.pop(-1)
	dict["images"] = searchId_data_images
	return dict
def handleListImage(list):
	for num in list:
		searchId_data_images = num["images"].split(",")
		searchId_data_images.pop(-1)
		num["images"] = searchId_data_images
	return list
