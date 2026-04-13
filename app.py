from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# Dummy model for demo
model = RandomForestClassifier()
X = np.array([[100,0,12],[50000,1,2]])
y = np.array([0,1])
model.fit(X,y)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    amount = data['amount']
    location = 1 if data['location'] == "Unknown" else 0
    time = int(data['time'].split(":")[0])
    
    prediction = model.predict([[amount, location, time]])
    
    return jsonify({
        "fraud": bool(prediction[0])
    })

if __name__ == '__main__':
    app.run(port=5001)
