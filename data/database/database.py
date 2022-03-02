from mysql.connector import pooling
from .Config import dbConfig



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

