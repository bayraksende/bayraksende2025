from flask import Flask, render_template, request, jsonify, session
from app import (
    init_model, 
    process_user_input, 
    get_product_data, 
    PRODUCTS_DB,
    Comment
)
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Model ve system prompt'u başlangıçta yükle
model, system_prompt = init_model()

@app.route('/')
def home():
    # Always reset chat history when the home page is loaded
    session['chat_history'] = []
    return render_template('index.html', chat_history=session['chat_history'], 
                         console_message="URBATEK-BOT: Sistem aktif. Ürün yorumlarına dikkat ediniz.")

@app.route('/product/<product_id>')
def product_detail(product_id):
    product_data = get_product_data(product_id, include_hidden=False)
    if "error" in product_data:
        return "Ürün bulunamadı", 404
    return render_template('product_detail.html', product=product_data)

@app.route('/send_message', methods=['POST'])
def send_message():
    user_input = request.json.get('message', '')
    
    try:
        # Initialize chat history if not exists
        if 'chat_history' not in session:
            session['chat_history'] = []
        
        # Add user message to history before processing
        session['chat_history'].append({
            'user': user_input,
            'bot': None
        })
        
        # Bot yanıtını al
        response = process_user_input(model, system_prompt, user_input)
        
        # Update bot response in history
        session['chat_history'][-1]['bot'] = response
        session.modified = True
        
        return jsonify({
            'status': 'success',
            'response': response
        })
    
    except Exception as e:
        error_msg = f"Bir hata oluştu: {str(e)}"
        # Still add error message to chat history
        if 'chat_history' in session and session['chat_history']:
            session['chat_history'][-1]['bot'] = error_msg
            session.modified = True
        
        return jsonify({
            'status': 'error',
            'message': error_msg
        }), 500

@app.route('/api/add_comment', methods=['POST'])
def add_comment():
    data = request.json
    product_id = data.get('product_id')
    comment_text = data.get('comment')
    user_id = data.get('user_id', 'HIDDEN')
    
    if product_id in PRODUCTS_DB:
        # Yeni yorum oluştur
        new_comment = Comment(user_id, comment_text, "2024-03-20")
        # Yorumu ürüne ekle
        PRODUCTS_DB[product_id].comments.append(new_comment)
        return jsonify({"status": "success"})
    return jsonify({"status": "error", "message": "Ürün bulunamadı"}), 404

if __name__ == '__main__':
    app.run(debug=True) 