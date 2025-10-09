from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Path to your local model folder
MODEL_PATH = "./mental_health_chatbot_model"

# Load model
try:
    emotion_classifier = pipeline(
        "text-classification",
        model=MODEL_PATH,
        tokenizer=MODEL_PATH,
        return_all_scores=True
    )
    print(f"✅ Model loaded successfully from: {MODEL_PATH}")
except Exception as e:
    print(f"⚠️ Error loading model: {e}")
    emotion_classifier = None

# Store logs and counters
emotion_log = []
depression_counter = 0

# Coping tips dictionary
coping_tips = {
    "depressed": [
        "Try writing your thoughts in a journal 📝",
        "Listen to calm music 🎶 or go for a short walk 🚶",
        "Reach out to someone you trust 💬"
    ],
    "anxiety": [
        "Practice deep breathing for 5 minutes 🌬️",
        "Try mindfulness or short meditation 🧘",
        "Write down your worries and let them go ✨"
    ],
    "stress": [
        "Take a short walk outside 🌤️",
        "Stretch or do light exercise 🏋️",
        "Drink some water and take a break ☕"
    ],
    "happy": [
        "Share your happiness with someone 💚",
        "Keep a gratitude journal ✨",
        "Celebrate your small wins 🎉"
    ]
}

# Crisis detection keywords
crisis_keywords = [
    "suicide", "kill myself", "end my life",
    "i want to die", "no reason to live", "can't go on"
]


# Core chatbot logic
def mental_health_bot(user_input):
    global depression_counter

    user_input_lower = user_input.lower()

    # Crisis detection
    if any(phrase in user_input_lower for phrase in crisis_keywords):
        return (
            "⚠️ It sounds like you're in deep distress. Please know you're **not alone** 💙\n"
            "If you are in danger or need help right now:\n"
            "- 📞 India: 1800-599-0019 (KIRAN Helpline)\n"
            "- 📞 USA: 988 (Suicide & Crisis Lifeline)\n"
            "- 🌍 Find other helplines: https://findahelpline.com\n\n"
            "Please reach out to someone you trust — it can make a huge difference 💙"
        )

    # Greetings
    if any(word in user_input_lower for word in ["hi", "hello", "hey"]):
        return "Hi there! 👋 I’m here to listen. How are you feeling today?"

    # Check model
    if not emotion_classifier:
        return "⚠️ The model could not be loaded. Please check the server."

    # Run emotion prediction
    results = emotion_classifier(user_input)[0]
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    top_emotion = results[0]["label"]
    confidence = results[0]["score"]

    # Generate response
    if top_emotion == "sadness":
        condition = "depressed"
        response = "It seems you’re feeling **down** 💙. You’re not alone — it’s okay to feel this way."
        depression_counter += 1
    elif top_emotion == "fear":
        condition = "anxiety"
        response = "I sense some **anxiety** 🌱. Try to take slow, deep breaths — you got this."
        depression_counter = 0
    elif top_emotion == "anger":
        condition = "stress"
        response = "You seem a bit **stressed** 😔. Taking short breaks or talking it out might help."
        depression_counter = 0
    elif top_emotion == "joy":
        condition = "happy"
        response = "I’m so glad you’re feeling **happy** today! 😊"
        depression_counter = 0
    else:
        condition = "neutral"
        response = "Thanks for sharing your thoughts. It’s good to express how you feel."
        depression_counter = 0

    # Add coping tips
    if condition in coping_tips:
        response += "\n\nHere are some things that might help:\n"
        for tip in coping_tips[condition]:
            response += f"- {tip}\n"

    # Log the message
    emotion_log.append({
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "input": user_input,
        "emotion": condition,
        "confidence": round(confidence, 2)
    })

    # Repeated sadness warning
    if depression_counter >= 3:
        response += (
            "\n⚠️ I’ve noticed you’ve been feeling **sad** repeatedly. "
            "It might help to talk to a counselor 💙. "
            "You can visit our **Counselor Support Page** for help."
        )
        depression_counter = 0

    response += "\n\n💭 Would you like to share more about what’s on your mind?"
    return response


# Root route — prevents "Not Found" error
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "🌿 Mental Health Chatbot API is running! Use POST /chat to talk to the bot."
    })


# Chat route
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"reply": "Please type something to begin."}), 400

    bot_reply = mental_health_bot(user_message)
    return jsonify({"reply": bot_reply})


# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
    
    