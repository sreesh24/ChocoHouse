from flask import Flask, request, jsonify, render_template
import sqlite3
from models import initialize_db

app = Flask(__name__)

# initializing the database
with app.app_context():
    initialize_db()

# function for database connection
def get_db_connection():
    conn = sqlite3.connect('database/chocolate.db')
    conn.row_factory = sqlite3.Row
    return conn

# homepage route
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# function to update seasonal flavours
@app.route('/flavors', methods=['POST'])
def add_flavor():
    data = request.json
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO seasonal_flavors (name, available_from, available_until, status) VALUES (?, ?, ?, ?)', 
        (data['flavor_name'], data['available_from'], data['available_until'], data['status'])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Flavor added successfully!"}), 201

# function to view seasonal flavours
@app.route('/flavors', methods=['GET'])
def get_flavors():
    conn = get_db_connection()
    flavors = conn.execute('SELECT * FROM seasonal_flavors').fetchall()
    conn.close()
    flavor_list = [
        {
            "id": row["id"],
            "name": row["name"],
            "available_from": row["available_from"],
            "available_until": row["available_until"],
            "status": row["status"]
        }
        for row in flavors
    ]
    return jsonify(flavor_list), 200

# function to delete seasonal flavours
@app.route('/flavors/<int:id>', methods=['DELETE'])
def delete_flavor(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM seasonal_flavors WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Flavor deleted successfully!"}), 200

# funcation to update ingredient inventory
@app.route('/inventory', methods=['POST'])
def update_inventory():
    data = request.json
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO ingredients (name, quantity, unit) VALUES (?, ?, ?)',
        (data['ingredient_name'], data['quantity'], data['unit'])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Inventory updated successfully!"}), 201

# function to view ingredients in inventory
@app.route('/inventory', methods=['GET'])
def get_inventory():
    conn = get_db_connection()
    ingredients = conn.execute('SELECT * FROM ingredients').fetchall()
    conn.close()
    inventory_list = [
        {
            "id": row["id"],
            "name": row["name"],
            "quantity": row["quantity"],
            "unit": row["unit"],
        }
        for row in ingredients
    ]
    return jsonify(inventory_list), 200

# function to delete ingredients
@app.route('/inventory/<int:id>', methods=['DELETE'])
def delete_inventory(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM ingredients WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Ingredient deleted successfully!"}), 200

# function to add customer suggestion
@app.route('/suggestions', methods=['POST'])
def add_suggestion():
    data = request.json
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO customer_suggestions (customer_name, flavor_suggestion, allergy_concerns) VALUES (?, ?, ?)',
        (data['customer_name'], data['flavor_suggestion'], data['allergy_concerns'])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Suggestion added successfully!"}), 201

# function to view customer suggestions
@app.route('/suggestions', methods=['GET'])
def get_suggestions():
    conn = get_db_connection()
    suggestions = conn.execute('SELECT * FROM customer_suggestions').fetchall()
    conn.close()
    suggestions_list = [dict(row) for row in suggestions] 
    return jsonify(suggestions_list), 200

# function to delete customer suggestion
@app.route('/suggestions/<int:id>', methods=['DELETE'])
def delete_suggestion(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM customer_suggestions WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Suggestion deleted successfully!"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
