from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import datetime

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Load your saved model (from Drive or local copy)
# Example: model saved locally inside 'saved_model/' folder
MODEL_PATH = "./saved_model"  # change if needed

try:
    emotion_classifier = pipeline(
        "text-classification",
        model="bhadresh-savani/distilbert-base-uncased-emotion",
        return_all_scores=True
    )
    print("✅ Model loaded successfully")
except Exception as e:
    print("⚠️ Error loading model:", e)

# Storage
emotion_log = []
depression_counter = 0

# Coping tips
coping_tips = {
    "depressed": [
        "Try writing your thoughts in a journal 📝.",
        "Listen to calming music 🎶.",
        "Reach out to a close friend or family member 💬."
    ],
    "anxiety": [
        "Practice deep breathing for 5 minutes 🌬️.",
        "Try meditation or mindfulness 🧘.",
        "Write down your worries and let them go ✨."
    ],
    "stress": [
        "Take a short walk outside 🚶.",
        "Do some light exercise or stretching 🏋️.",
        "Give yourself a break and rest ☕."
    ],
    "happy": [
        "Share your happiness with someone you care about 💚.",
        "Keep a gratitude journal ✨.",
        "Celebrate your small wins 🎉."
    ]
}

# Crisis phrases
crisis_keywords = ["suicide", "kill myself", "end my life", "i want to die", "no reason to live"]

# Core logic
def mental_health_bot(user_input):
    global depression_counter
    user_input_lower = user_input.lower()

    if any(phrase in user_input_lower for phrase in crisis_keywords):
        return (
            "⚠️ I hear you’re in deep pain. You are not alone. 💙\n"
            "Please reach out for immediate help:\n"
            "- 📞 India: 1800-599-0019 (KIRAN Mental Health Helpline)\n"
            "- 📞 USA: 988 (Suicide & Crisis Lifeline)\n"
            "- 🌍 Other countries: Find helplines at https://findahelpline.com\n\n"
            "Talking to a trusted friend, family member, or counselor right now can make a huge difference."
        )

    if "hi" in user_input_lower or "hello" in user_input_lower:
        return "Hi! I’m here to listen. How are you feeling today?"

    results = emotion_classifier(user_input)[0]
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    top_emotion = results[0]["label"]
    confidence = results[0]["score"]

    if top_emotion == "sadness":
        condition = "depressed"
        response = "It sounds like you may be feeling **depressed** 💙. Remember, you’re not alone."
        depression_counter += 1
    elif top_emotion == "fear":
        condition = "anxiety"
        response = "I sense some **anxiety** 🌱. It’s okay to take small steps to calm your mind."
        depression_counter = 0
    elif top_emotion == "anger":
        condition = "stress"
        response = "You seem **stressed** or frustrated 😔. Taking breaks and self-care can help."
        depression_counter = 0
    elif top_emotion == "joy":
        condition = "happy"
        response = "I’m glad you’re feeling **happy** today! 😊"
        depression_counter = 0
    else:
        condition = "neutral"
        response = "Thanks for sharing your feelings. It’s healthy to express them."
        depression_counter = 0

    if condition in coping_tips:
        response += "\n👉 Here are a few suggestions you could try:\n"
        for tip in coping_tips[condition]:
            response += f"- {tip}\n"

    emotion_log.append({
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "input": user_input,
        "emotion": condition,
        "confidence": round(confidence, 2)
    })

    if depression_counter >= 3:
        response += (
            "\n⚠️ I notice you’ve been feeling **depressed repeatedly**. "
            "It may help to connect with a **professional counselor**.\n"
            "👉 Please visit our **Counselor Support Page** on this website to chat with a counselor directly. 💙"
        )
        depression_counter = 0

    response += "\n💭 Would you like to share more about what’s on your mind?"
    return response

# Flask route
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"reply": "Please type a message."}), 400

    bot_reply = mental_health_bot(user_message)
    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
