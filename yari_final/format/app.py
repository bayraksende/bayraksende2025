from flask import Flask, request, jsonify, make_response
from datetime import datetime, timedelta
import jwt
import os

app = Flask(__name__)

CONFIG={
    "DATE": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    "APP_NAME": "BayrakSende",
    "SECRET_KEY": "807c137d7324af1721f7108aca3872752cd894370e79e2f81d97b6d72d0b861d",
    "GREETING": "Merhaba, "
}

FLAG="BayrakBende{t3k_c0zum_f0rm4t_k4rdo}"

def generate_greeting(greeting):
    return greeting.format(CONFIG=CONFIG)

def create_token(role="user"):
    expiration = datetime.utcnow() + timedelta(minutes=60)
    payload = {
        'role': role,
        'exp': expiration
    }
    token = jwt.encode(payload, CONFIG["SECRET_KEY"], algorithm="HS256")
    return token

def token_required(f):
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        
        if not token:
            return jsonify({'message': 'Token bulunamadı!'}), 401
        
        try:
            data = jwt.decode(token, CONFIG["SECRET_KEY"], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token süresi dolmuş!'}), 401
        except jwt.InvalidSignatureError:
            return jsonify({'message': 'Token imzası geçersiz!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Geçersiz token!'}), 401
            
        return f(data, *args, **kwargs)
    
    decorated.__name__ = f.__name__
    return decorated

def admin_required(f):
    def decorated(data, *args, **kwargs):
        if data['role'] != 'admin':
            return jsonify({'message': 'Bu sayfaya erişim yetkiniz yok!'}), 403
        return f(data, *args, **kwargs)
    
    decorated.__name__ = f.__name__
    return decorated

@app.route('/')
def index():
    name = request.args.get('name', '')
    
    r = make_response()
    token = request.cookies.get('token')
    
    if not token:
        token = create_token()
        r.set_cookie('token', token, httponly=True)
    gday = "{}. İyi günler dileriz!".format(name)
    
    greeting = generate_greeting("{CONFIG[GREETING]}"+gday)
    
    html_template = """
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BayrakSende</title>
        <style>
            :root {
                --primary-color: #00e676;
                --primary-dark: #00c853;
                --secondary-color: #69f0ae;
                --text-color: #e0e0e0;
                --text-muted: #9e9e9e;
                --dark-bg: #121212;
                --darker-bg: #0a0a0a;
                --card-bg: #1e1e1e;
                --header-bg: #161616;
                --footer-bg: #161616;
                --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                --border-color: #333;
                --hover-color: #00e676;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: var(--text-color);
                background: linear-gradient(135deg, var(--dark-bg) 0%, var(--darker-bg) 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            
            .container {
                max-width: 800px;
                width: 100%;
                background-color: var(--card-bg);
                border-radius: 10px;
                box-shadow: var(--shadow);
                overflow: hidden;
                border: 1px solid var(--border-color);
            }
            
            .header {
                background: linear-gradient(to right, var(--darker-bg), var(--header-bg));
                color: var(--primary-color);
                padding: 25px 30px;
                text-align: center;
                border-bottom: 1px solid var(--border-color);
            }
            
            .header h1 {
                font-size: 2.2rem;
                margin-bottom: 10px;
                text-shadow: 0 0 10px rgba(0, 230, 118, 0.5);
                animation: glow 3s infinite;
            }
            
            .header p {
                color: var(--text-muted);
            }
            
            .content {
                padding: 30px;
            }
            
            .greeting {
                font-size: 1.5rem;
                margin-bottom: 25px;
                color: var(--primary-color);
                text-align: center;
                padding: 10px;
                border-radius: 5px;
                background-color: rgba(0, 230, 118, 0.05);
                border-left: 3px solid var(--primary-color);
            }
            
            .card {
                background-color: rgba(30, 30, 30, 0.6);
                border-radius: 8px;
                padding: 25px;
                margin-top: 25px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                border: 1px solid var(--border-color);
            }
            
            .footer {
                text-align: center;
                padding: 20px;
                background-color: var(--footer-bg);
                color: var(--text-muted);
                font-size: 0.9rem;
                border-top: 1px solid var(--border-color);
            }
            
            .btn {
                display: inline-block;
                background-color: var(--primary-dark);
                color: #121212;
                padding: 12px 24px;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
                transition: all 0.3s ease;
                margin-top: 15px;
                border: none;
                position: relative;
                overflow: hidden;
                z-index: 1;
            }
            
            .btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                background-color: var(--primary-color);
                transition: width 0.3s ease;
                z-index: -1;
            }
            
            .btn:hover {
                color: #000;
                box-shadow: 0 0 15px rgba(0, 230, 118, 0.5);
            }
            
            .btn:hover::before {
                width: 100%;
            }
            
            .links {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 30px;
                flex-wrap: wrap;
            }
            
            @keyframes glow {
                0% { text-shadow: 0 0 5px rgba(0, 230, 118, 0.5); }
                50% { text-shadow: 0 0 20px rgba(0, 230, 118, 0.8), 0 0 30px rgba(0, 230, 118, 0.6); }
                100% { text-shadow: 0 0 5px rgba(0, 230, 118, 0.5); }
            }
            
            @media (max-width: 600px) {
                .header h1 {
                    font-size: 1.8rem;
                }
                
                .greeting {
                    font-size: 1.2rem;
                }
                
                .content {
                    padding: 20px;
                }
                
                .links {
                    flex-direction: column;
                    align-items: center;
                }
                
                .btn {
                    width: 100%;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Selam</h1>
                <p>Saçma Sapan Bir Site</p>
            </div>
            
            <div class="content">
                <div class="greeting">""" + greeting + """</div>
                
                <div class="card">
                    <p>Tek işlevi seni selamlamak.</p>
                </div>
                
              
            </div>
            
            <div class="footer">
                <p>&copy; """ + CONFIG["DATE"].split()[0] + """ BayrakSende. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    r.set_data(html_template)
    return r

@app.route('/flag')
@token_required
@admin_required
def flag(data):
    return FLAG

@app.route('/whoami')
@token_required
def whoami(data):
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
