import os
import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize CharacterAI Client (Requires Token)
# CARA MENGGUNAKAN AI:
# 1. Dapatkan Token Character.ai Anda.
# 2. Masukkan token di bawah ini (ganti string kosong) ATAU set environment variable CAI_TOKEN.
#    Contoh: my_token = "e3412..."
# 3. Masukkan Character ID (ID karakter yang ingin digunakan sebagai tutor).

# --- KONFIGURASI MANUAL (JKA PERLU) ---
MANUAL_TOKEN = "1156934d72bd4942c096fbbc5ef2143f0081932f" # PASTE TOKEN DISINI JIKA TIDAK MAU PAKAI ENV
MANUAL_CHAR_ID = "eWxQEIjF9r6nNjyQG2L5GsIpkD1J12nIbSPQIbKXNL0" # PASTE CHARACTER ID DISINI
# --------------------------------------

# Global variable to store active chat session
GLOBAL_CHAT_ID = None

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
