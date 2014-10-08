from tornado import ioloop, web, websocket
import json
users = []
log = None

print("Restarted")

class WebSocket(websocket.WebSocketHandler):
    def open(self):
        global log
        islog = self.get_argument("log",None)
        if(islog != None):
            print('Log!')
            log = self
        else:
            print("WebSocket opened", self)
            users.append(self)
            if log != None:
                print('join')
                log.write_message('{"event": "userjoin"}')

    def send_message(self, recip, message):
        if log != None:
            print('sent')
            log.write_message('{"event" :"sent", "body": '+str(message)+ '}')
        recip.write_message(message)

    def on_message(self, message):
        if log != None:
            print('rec')
            log.write_message('{"event": "received", "body":'+str(message)+'}')

        for user in users:
            self.send_message(user,message)


    def on_close(self):
        global log
    
        islog = self.get_argument("log",None)
        if(islog != None):
            log = None
    
        if log != None:
            print('left')
            log.write_message('{"event": "userleft"}')

        if self in users:
            users.remove(self)

        pass

class MainHandler(web.RequestHandler):
    def get(self):
        self.render('control.html')

application = web.Application([
    (r"/ws",WebSocket),
    (r"/control",MainHandler),
    (r'/ws/([^/]+)', WebSocket),
], debug=True)

if __name__ == "__main__":
    application.listen(9008)
    ioloop.IOLoop.instance().start()