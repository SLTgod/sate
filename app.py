from flask import Flask, request, render_template, jsonify
import sqlite3

app = Flask(__name__)

# Функция для подключения к базе данных
def get_db_connection():
    conn = sqlite3.connect('emails.db')
    conn.row_factory = sqlite3.Row
    return conn

# Создание таблицы для хранения данных
def create_table():
    conn = get_db_connection()
    conn.execute('''CREATE TABLE IF NOT EXISTS emails (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL
                    )''')
    conn.commit()
    conn.close()

# Обработка отправки формы
@app.route('/submit-email', methods=['POST'])
def submit_email():
    email = request.form['email']

    # Записываем email в базу данных
    conn = get_db_connection()
    conn.execute('INSERT INTO emails (email) VALUES (?)', (email,))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Email записан.'})

# Отображение страницы с формой
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    create_table()  # Создаём таблицу перед запуском приложения
    app.run(debug=True)