"""
Kavimayil P K
Feb 22, 2025
File name : app.py 
Description : 

This file contains the code for a Flask app that serves as a chatbot for pregnancy-related questions. 
The chatbot uses the OpenAI API to generate responses based on user questions. 
It includes a function to check for sensitive keywords in the question and response, and a function to get pregnancy information based on the user question. 
It defines a route to handle chat requests and a main function to run the Flask app. 
It also includes a Streamlit test UI to test the chatbot functionality.

How to run the code: python app.py
"""
#Importing the required libraries
from flask import Flask, request, jsonify
from openai import OpenAI
import streamlit as st
import os

#Creating a Flask app
app = Flask(__name__)

# Get API key from environment variable

#PROVIDE THE API KEY WHILE RUNNING THE APP
api_key = os.environ.get("SAMBANOVA_API_KEY")

if not api_key:
    raise ValueError("SAMBANOVA_API_KEY environment variable not set.")

#Creating an OpenAI client
client = OpenAI(
    api_key=api_key,
    base_url="https://api.sambanova.ai/v1", 
)

#Sensitive keywords to check for in the question and response
sensitive_keywords = ["medication", "dosage", "diagnosis", "treatment", "medical condition", "prescription", "blood test", "ultrasound", "scan", "labor complications", "miscarriage", "abortion"]

def is_sensitive(question, response):
    """Checks if the question or response contains sensitive keywords."""
    combined_text = question.lower() + response.lower()
    for keyword in sensitive_keywords:
        if keyword in combined_text:
            return True
    return False

#Function to get pregnancy information based on the user question
def get_pregnancy_info(question):
    prompt = f"""
    User: {question}
    Context: The user may be pregnant, planning to conceive, a new mother, or dealing with pregnancy-related experiences (including loss or abortion). 
    Provide a compassionate, clear, and engaging response. Keep it short and to the point, offering structured advice only when necessary. 
    If medical advice is requested, include a disclaimer to consult a healthcare professional.
    Response:
    """
    try:
        response = client.completions.create( 
            model="Llama-3.1-Tulu-3-405B", 
            prompt=prompt,
            max_tokens=250,
            temperature=0.6,
        )
        answer = response.choices[0].text.strip()
        sensitive = is_sensitive(question, answer)

        if sensitive:
            disclaimer = "Disclaimer: This chatbot provides general information and is not a substitute for professional medical advice. Please consult with a qualified healthcare provider."
            return f"{answer}\n\n{disclaimer}"
        else:
            return answer

    except Exception as e:
        return f"An error occurred: {e}. Please consult with a healthcare professional."

#Route to handle chat requests
@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_question = data.get('question')

    if not user_question:
        return jsonify({"error": "Missing question parameter"}), 400

    chatbot_response = get_pregnancy_info(user_question)
    return jsonify({"response": chatbot_response})

#Main function to run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

"""
#Testing the URL endpoint using Streamlit
st.title("Pregnancy Chatbot Test UI")

user_input = st.text_input("Ask me Anything:")

if st.button("Send"):
    if user_input:
        with st.spinner("Generating response..."):
            try:
                chatbot_response = get_pregnancy_info(user_input)
                st.write("Chatbot Response:")
                st.write(chatbot_response)
            except Exception as e:
                st.error(f"An error occurred: {e}")
    else:
        st.warning("Please enter a question.")
"""
