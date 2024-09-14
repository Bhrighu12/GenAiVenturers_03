from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Allow all CORS requests

# Load the model
model_path = os.path.join(os.path.dirname(__file__), 'model.p')
model_dict = pickle.load(open(model_path, 'rb'))
model = model_dict['model']

labels_dict = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I',
    9: 'K', 10: 'L', 11: 'M', 12: 'N', 13: 'O', 14: 'P', 15: 'Q', 16: 'R',
    17: 'S', 18: 'T', 19: 'U', 20: 'V', 21: 'W', 22: 'X', 23: 'Y', 24: 'Space'
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        data_aux = data['data']

        # Validate input
        if not isinstance(data_aux, list):
            return jsonify({'error': 'Invalid input data format'}), 400

        # Predict the character
        prediction = model.predict([np.asarray(data_aux)])
        predicted_character = labels_dict[int(prediction[0])]

        return jsonify({'predicted_character': predicted_character})

    except KeyError:
        return jsonify({'error': 'Missing or incorrect input data'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
