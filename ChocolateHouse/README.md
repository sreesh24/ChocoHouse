# Chocolate House Management Application

## Overview
The Chocolate House Management Application is a web-based solution developed using Flask, SQLite, and JavaScript. It provides functionality for managing seasonal chocolate flavors, ingredient inventory, and customer suggestions while ensuring allergy concerns are addressed.

## Features
- **Add Seasonal Flavors**: Users can input new seasonal flavors along with availability dates and status.
- **Update Ingredient Inventory**: Users can manage ingredients by adding their names, quantities, and units.
- **Customer Suggestions**: Customers can submit flavor suggestions and specify any allergy concerns.
- **View Inventory and Suggestions**: All seasonal flavors, ingredients, and customer suggestions can be displayed dynamically on the web interface.

## Edge Case Handling
This application incorporates several edge case handling mechanisms to ensure data integrity and improve user experience:

1. **Input Validation**:
   - Checks for empty fields before submission in all forms (adding flavors, updating inventory, and submitting suggestions).

2. **Numerical Validation**:
   - Confirms that the quantity entered for ingredients is a valid number. If not, an alert is shown.

3. **Network Response Handling**:
   - Handles network errors and unexpected responses when making fetch calls to the API. Alerts users to issues with their requests.

4. **Dynamic Form Resetting**:
   - Resets form fields after successful submissions, ensuring users can easily add more entries without manually clearing fields.


## Technologies Used
- **Backend**: Flask (Python web framework)
- **Database**: SQLite (for data storage)
- **Frontend**: HTML, CSS (Bootstrap for styling), JavaScript (for interactivity)
- **Containerization**: Docker (for environment isolation and deployment)

## Installation

### Prerequisites
- Python 3.9 or later
- pip (Python package installer)
- Docker (for containerization)

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd chocolate-house-management
   ```

2. **Install Dependencies**:
   Create a virtual environment and install the required packages:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. **Run the Application**:
   To start the Flask server, execute:
   ```bash
   python app.py
   ```

   The application will run on `http://localhost:5000`.

### Running with Docker
1. **Build the Docker Image**:
   Navigate to the project directory and run:
   ```bash
   docker build -t chocolate-house-management .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run -p 5000:5000 chocolate-house-management
   ```

   Access the application at `http://localhost:5000`.

## API Endpoints
- **POST /flavors**: Add a new seasonal flavor.
- **POST /inventory**: Update ingredient inventory.
- **POST /suggestions**: Add customer suggestion.
- **GET /inventory**: Fetch all ingredients.
- **GET /flavors**: Fetch all seasonal flavors.
- **GET /suggestions**: Fetch all customer suggestions.

## Database Schema
- **seasonal_flavors**: Stores information about seasonal flavors.
    - `id` (INTEGER, PRIMARY KEY)
    - `name` (TEXT)
    - `available_from` (DATE)
    - `available_until` (DATE)
    - `status` (TEXT)
  
- **ingredients**: Stores ingredient details.
    - `id` (INTEGER, PRIMARY KEY)
    - `name` (TEXT)
    - `quantity` (REAL)
    - `unit` (TEXT)

- **customer_suggestions**: Stores customer suggestions.
    - `id` (INTEGER, PRIMARY KEY)
    - `customer_name` (TEXT)
    - `flavor_suggestion` (TEXT)
    - `allergy_concerns` (TEXT)

## Viewing the Database with DB Browser for SQLite

1. **Install DB Browser for SQLite**: Download and install from [DB Browser for SQLite](https://sqlitebrowser.org/).

2. **Open the Database**:
   - Launch DB Browser for SQLite.
   - Click on "Open Database".
   - Navigate to your project directory and select `chocolate.db`.

3. **Explore the Database**:
   - Use the "Browse Data" tab to view the contents of each table.
   - You can also run custom SQL queries in the "Execute SQL" tab to interact with your data.

## Contributing
Feel free to submit issues and pull requests for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Bootstrap](https://getbootstrap.com/)
- [SQLite](https://www.sqlite.org/)
