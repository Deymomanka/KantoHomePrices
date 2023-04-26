from flask import Flask, request, jsonify
import util

app = Flask(__name__)


@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    util.load_saved_artifacts()
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_kouzou_names', methods=['GET'])
def get_kouzou_names():
    util.load_saved_artifacts()
    response = jsonify({
        'locations': util.get_kouzou_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

# THINGS TO DO:
# How GET and POST work


@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    get_sqft = float(request.form.get('get_sqft'))
    location = request.form.get('location')
    using = int(request.form.get('using'))
    kouzou = request.form.get('kouzou')

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, get_sqft, using, kouzou)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()
