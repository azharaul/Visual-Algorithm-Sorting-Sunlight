import os
import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS Configuration - Professional Setup
ALLOWED_ORIGINS = [
    "https://sunlight.breakdownaz.my.id",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

CORS(
    app,
    supports_credentials=True,
    resources={r"/*": {"origins": ALLOWED_ORIGINS}}
)

@app.after_request
def after_request(response):
    """Add CORS headers to all responses"""
    origin = request.headers.get('Origin')
    if origin in ALLOWED_ORIGINS:
        response.headers.add('Access-Control-Allow-Origin', origin)
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# ============================================
# Configuration from Environment Variables
# ============================================
CAI_TOKEN = os.environ.get("CAI_TOKEN")
CAI_CHAR_ID = os.environ.get("CAI_CHAR_ID")
FLASK_PORT = int(os.environ.get("FLASK_PORT", 5001))
FLASK_DEBUG = os.environ.get("FLASK_DEBUG", "false").lower() == "true"

# ============================================
# Health Check Endpoint
# ============================================
@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        "status": "running",
        "message": "SunBot AI Server is active!",
        "version": "1.0.0"
    })

@app.route('/health', methods=['GET'])
def health():
    """Alternative health check"""
    return jsonify({"status": "ok"})

# ============================================
# AI Integration
# ============================================
async def generate_ai_response(algorithm, step_data, user_message=None):
    """
    Generate AI explanation using Character.AI
    
    Args:
        algorithm: Name of the sorting algorithm
        step_data: Current step data (array, indices, etc.)
        user_message: Optional user question
    
    Returns:
        AI generated response string
    """
    if not CAI_TOKEN or not CAI_CHAR_ID:
        return "⚠️ AI belum dikonfigurasi. Silakan hubungi administrator."

    client = None
    try:
        from PyCharacterAI import get_client
        client = await get_client(token=CAI_TOKEN)
        
        # Create new chat session
        chat, _ = await client.chat.create_chat(CAI_CHAR_ID)

        # Prepare context
        array_data = step_data.get('array', [])
        array_str = str(array_data) if len(array_data) <= 15 else f"{str(array_data[:15])}... ({len(array_data)} items)"
        
        indices_parts = []
        if step_data.get('i') is not None:
            indices_parts.append(f"i={step_data.get('i')}")
        if step_data.get('j') is not None:
            indices_parts.append(f"j={step_data.get('j')}")
        if step_data.get('minIndex') is not None:
            indices_parts.append(f"minIndex={step_data.get('minIndex')}")
        if step_data.get('pivotIndex') is not None:
            indices_parts.append(f"pivot={step_data.get('pivotIndex')}")
        indices = ", ".join(indices_parts) if indices_parts else "N/A"

        # Build prompt
        if user_message:
            prompt = f"""[Konteks Sistem]
Algoritma: {algorithm}
Array Saat Ini: {array_str}
Indeks Aktif: {indices}

[Pertanyaan Pengguna]
{user_message}

[Instruksi]
Jawab pertanyaan pengguna dengan bahasa Indonesia yang mudah dipahami. Kamu adalah tutor algoritma sorting yang ramah dan membantu."""
        else:
            prompt = f"""[Konteks Sistem]
Algoritma: {algorithm}
Array Saat Ini: {array_str}
Indeks Aktif: {indices}

[Instruksi]
Jelaskan apa yang sedang terjadi pada langkah ini dengan singkat (maksimal 2 kalimat) dalam Bahasa Indonesia. Fokus pada operasi yang dilakukan dan mengapa."""

        answer = await client.chat.send_message(CAI_CHAR_ID, chat.chat_id, prompt)
        return answer.get_primary_candidate().text
        
    except ImportError:
        return "⚠️ PyCharacterAI library tidak terinstall. Jalankan: pip install PyCharacterAI"
    except Exception as e:
        error_msg = str(e)
        if "token" in error_msg.lower() or "auth" in error_msg.lower():
            return "⚠️ Token AI tidak valid atau sudah expired."
        return f"⚠️ Terjadi kesalahan: {error_msg}"
    finally:
        if client:
            try:
                await client.close_session()
            except:
                pass

# ============================================
# API Endpoints
# ============================================
@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat_endpoint():
    """
    Chat endpoint for user interactions
    
    Expects JSON body:
    {
        "algorithm": "selection",
        "step": { "array": [...], "i": 0, "j": 1 },
        "message": "Optional user question"
    }
    """
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        algorithm = data.get('algorithm', 'Generic Sort')
        step_data = data.get('step', {})
        user_message = data.get('message')
        
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        response = loop.run_until_complete(generate_ai_response(algorithm, step_data, user_message))
        loop.close()
        
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/explain_step', methods=['POST', 'OPTIONS'])
def explain_step():
    """
    Auto-explanation endpoint for step-by-step mode
    
    Expects JSON body:
    {
        "algorithm": "selection",
        "step": { "array": [...], "i": 0, "j": 1 }
    }
    """
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        algorithm = data.get('algorithm', 'Generic Sort')
        step_data = data.get('step', {})
        
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        response = loop.run_until_complete(generate_ai_response(algorithm, step_data))
        loop.close()
        
        return jsonify({"explanation": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ============================================
# Main Entry Point
# ============================================
if __name__ == '__main__':
    print("=" * 50)
    print("🌟 SunBot AI Server")
    print("=" * 50)
    print(f"📍 Running on: http://127.0.0.1:{FLASK_PORT}")
    print(f"🔧 Debug Mode: {FLASK_DEBUG}")
    print(f"🔑 Token Configured: {'Yes ✓' if CAI_TOKEN else 'No ✗'}")
    print(f"🤖 Character ID Configured: {'Yes ✓' if CAI_CHAR_ID else 'No ✗'}")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=FLASK_PORT, debug=FLASK_DEBUG)
