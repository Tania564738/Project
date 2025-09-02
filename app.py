from flask import Flask, render_template

# Create the Flask app
app = Flask(__name__)

# Home route
@app.route("/")
def home():
    return render_template("index.html")

# Another route
@app.route("/about")
def about():
    return "<h2>This is the About Page</h2>"

# Run the app
if __name__ == "__main__":
    app.run(debug=Tr
