#!/usr/bin/env python
import SimpleHTTPServer


class MyHTTPRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()
        SimpleHTTPServer.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        if self.path.split(".")[-1] == "gz":
            print "found gz", self.path
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Content-type", "application/octet-stream")


if __name__ == '__main__':
    SimpleHTTPServer.test(HandlerClass=MyHTTPRequestHandler)
