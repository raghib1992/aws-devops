from flask import Flask

app = Flask(__name__)

@app.get("/cars")
def get_cars():
    return ["toyota", "honda", "mazda", "lexus"]

if __name__ == '__main__':
    app.run(port='5001')
