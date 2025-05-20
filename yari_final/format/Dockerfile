FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Güvenlik için root olmayan bir kullanıcı oluştur
RUN adduser --disabled-password --gecos '' appuser
USER appuser

# Uygulama için port açıklaması
EXPOSE 5000

# Uygulamayı başlat
CMD ["python", "app.py"] 