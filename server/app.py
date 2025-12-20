import os
import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyCharacterAI import get_client

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
    global GLOBAL_CHAT_ID
    
    token = os.environ.get("CAI_TOKEN") or MANUAL_TOKEN
    char_id = os.environ.get("CAI_CHAR_ID") or MANUAL_CHAR_ID
    
    if not token or not char_id:
        return "Error: Token AI belum disetting."

    client = None
    try:
        client = await get_client(token=token)
        
        # Resume or Create Chat
        chat_id = GLOBAL_CHAT_ID
        chat = None
        
        # NOTE: PyCharacterAI documentation is sparse on "Resuming", but typically 
        # creating a chat with same char_id creates a NEW session.
        # However, to be interactive, we should ideally keep the session alive.
        # BUT since we close session in finally block (as per docs recommend), 
        # we might lose context if the library clears backend state on close.
        # For now, let's create a NEW chat and send context history effectively via prompt engineering
        # because managing persistent connection in stateless Flask is hard without a full rewrite.
        #
        # Better Idea for "Tutor": ALWAYS send context.
        
        chat, _ = await client.chat.create_chat(char_id)

        # Prepare Context
        array_data = step_data.get('array', [])
        array_str = str(array_data) if len(array_data) <= 20 else str(array_data[:20]) + "..."
        indices = f"i={step_data.get('i')}, j={step_data.get('j')}"
        if step_data.get('minIndex') is not None: indices += f", minIndex={step_data.get('minIndex')}"
        
        prompt = ""
        if user_message:
             prompt = f"""
            [System]
            Algorithm: {algorithm}
            Current State: {array_str}
            Indices: {indices}
            
            [User Question]
            {user_message}
            
            [Instruction]
            Answer the user's question in Indonesian, acting as a helpful Sorting Algorithm Tutor.
            """
        else:
            prompt = f"""
            [System]
            Algorithm: {algorithm}
            Current State: {array_str}
            Indices: {indices}
            
            [Instruction]
            Explain what is currently happening in this step briefly (max 2 sentences) in Indonesian.
            """

        answer = await client.chat.send_message(char_id, chat.chat_id, prompt)
        return answer.get_primary_candidate().text
        
    except Exception as e:
        return f"AI Error: {str(e)}"
    finally:
        if client:
            await client.close_session()

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    data = request.json
    algorithm = data.get('algorithm', 'Generic Sort')
    step_data = data.get('step', {})
    user_message = data.get('message', None) # Optional
    
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    response = loop.run_until_complete(generate_ai_response(algorithm, step_data, user_message))
    
    return jsonify({"response": response})

@app.route('/explain_step', methods=['POST'])
def explain_step():
    data = request.json
    algorithm = data.get('algorithm', 'Generic Sort')
    step_data = data.get('step', {})
    
    # Run async AI call
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    # Call new function with no user message (auto explanation)
    response = loop.run_until_complete(generate_ai_response(algorithm, step_data))
    
    # Return structure matching old expectations for now, or unified?
    # App.jsx expects { explanation: ... }
    return jsonify({"explanation": response})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
