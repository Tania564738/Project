from flask import Flask, render_template, request
import pandas as pd
import joblib
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load dataset and models
df = pd.read_csv("merged_jobs_skills_cleaned.csv")
df['job_skills_list'] = df['job_skills_list'].fillna('')

vectorizer = joblib.load("tfidf_vectorizer.pkl")
job_vectors = joblib.load("job_vectors.pkl")

# Recommend jobs based on skills
def recommend_jobs(user_input, top_n=5):
    user_vec = vectorizer.transform([user_input])
    similarities = cosine_similarity(user_vec, job_vectors).flatten()
    
    # Top jobs
    top_indices = similarities.argsort()[::-1][:top_n]
    top_jobs = df.iloc[top_indices]['job_summary'].tolist()
    top_jobs = [job[:70] + '...' if len(job) > 70 else job for job in top_jobs]  # truncate

    # Similar jobs with missing skills
    similar_jobs_indices = similarities.argsort()[::-1][top_n:]
    similar_jobs = df.iloc[similar_jobs_indices][:top_n].copy()
    similar_jobs['job_summary'] = similar_jobs['job_summary'].apply(lambda x: x[:70] + '...' if len(x) > 70 else x)
    similar_jobs['similarity'] = similarities[similar_jobs_indices][:top_n]

    return top_jobs, similar_jobs

# Home route
@app.route("/", methods=["GET", "POST"])
def home():
    top_jobs = None
    similar_jobs = None
    if request.method == "POST":
        skills = request.form.get("skills")
        top_jobs, similar_jobs = recommend_jobs(skills, top_n=5)
    return render_template("index.html", top_jobs=top_jobs, similar_jobs=similar_jobs)

if __name__ == "__main__":
    app.run(debug=True)
