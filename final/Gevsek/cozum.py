import requests
import json
import os

SLACK_BOT_TOKEN = "xoxb-8760529812614-8780113141185-5IQI8P3sUQHxHIgrHDMML6jq" 
SLACK_CHANNEL_ID = "C08NCFTGJ3G"

DOWNLOAD_DIR = "files"

FILES_LIST_URL = "https://slack.com/api/files.list"

def download_file(url, token, filename):
    """Slack'ten dosya indir"""
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    if not os.path.exists(DOWNLOAD_DIR):
        os.makedirs(DOWNLOAD_DIR)
    filepath = os.path.join(DOWNLOAD_DIR, filename)
    
    print(f"İndiriliyor: {filename}...")
    
    try:
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        filesize = os.path.getsize(filepath)
        print(f"✓ Başarıyla indirildi: {filename} ({format_size(filesize)})")
        return filepath
    except Exception as e:
        print(f"✗ İndirme hatası ({filename}): {e}")
        return None

def format_size(size):
    """Byte cinsinden boyutu insan tarafından okunabilir formata çevirir"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size < 1024.0:
            return f"{size:.2f} {unit}"
        size /= 1024.0
    return f"{size:.2f} TB"

def list_files_in_channel(token, channel_id):
    """Belirtilen Slack kanalındaki dosyaları listeler."""

    if not token or not token.startswith("xoxb-"):
        print("Hata: Geçersiz Slack Bot Token. 'xoxb-' ile başlamalı.")
        return

    if not channel_id:
        print("Hata: Slack Kanal ID belirtilmedi.")
        return

    headers = {
        "Authorization": f"Bearer {token}"
    }

    params = {
        "channel": channel_id,
        "count": 100,     
        "page": 1,       
        "sort_by": "created", 
        "sort_dir": "desc" 
    }

    print(f"'{channel_id}' kanalındaki dosyalar listeleniyor...")

    try:
        response = requests.get(FILES_LIST_URL, headers=headers, params=params)
        response.raise_for_status() # HTTP hatası varsa (4xx veya 5xx) exception fırlat

        data = response.json()

        # API'den başarılı bir cevap geldi mi kontrol et
        if data.get("ok"):
            files = data.get("files", [])
            if not files:
                print("Bu kanalda hiç dosya bulunamadı.")

            print("\n--- Bulunan Dosyalar ---")
            found_files = []  # İndirme için dosya bilgilerini saklayacak liste
            
            for file in files:
                file_id = file.get("id")
                file_name = file.get("name", "İsimsiz Dosya")
                file_type = file.get("filetype", "Bilinmeyen Tür")
                created_timestamp = file.get("created", 0)
                download_url = file.get("url_private_download")

                from datetime import datetime
                created_date = datetime.fromtimestamp(created_timestamp).strftime('%Y-%m-%d %H:%M:%S')

                print(f"\nDosya Adı: {file_name}")
                print(f"Dosya ID: {file_id}")
                print(f"Tür: {file_type}")
                print(f"Oluşturulma Tarihi: {created_date}")
                if download_url:
                    print(f"Özel İndirme Linki: {download_url}")
                    found_files.append({
                        "id": file_id,
                        "name": file_name,
                        "url": download_url
                    })
                else:
                    public_url = file.get("url_private") or file.get("permalink_public") or file.get("permalink")
                    if public_url:
                         print(f"Genel Link: {public_url}")


            paging_info = data.get("paging")
            if paging_info and paging_info.get("pages", 1) > 1:
                print("\nNot: Bu kanalda daha fazla dosya olabilir. Tam liste için sayfalama ('paging') gerekebilir.")
                
            if found_files:
                print("\n--- Dosyalar İndiriliyor ---")
                downloaded_files = []
                for file_info in found_files:
                    filepath = download_file(file_info["url"], token, file_info["name"])
                    if filepath:
                        downloaded_files.append(filepath)
                
                if downloaded_files:
                    print(f"\nToplam {len(downloaded_files)} dosya başarıyla indirildi.")
                    print(f"İndirilen dosyalar: {DOWNLOAD_DIR} klasöründe")
            else:
                print("\nİndirilebilecek dosya bulunamadı.")

        else:
            error_message = data.get("error", "Bilinmeyen API hatası")
            print(f"\nSlack API Hatası: {error_message}")
            if error_message == "not_in_channel":
                print("Görünüşe göre bot bu kanalda değil. /invite @bot_ismi komutuyla eklemeyi dene.")
            elif error_message == "invalid_auth":
                 print("Sağlanan bot token geçersiz veya süresi dolmuş.")
            elif error_message in ["missing_scope", "permission_denied"]:
                 print(f"Botun bu işlemi yapmak için gerekli izinleri yok. ({error_message}) "
                       "Gerekli izinler: files:read ve channels:history/groups:history.")

        print("\n--- Ham API Cevabı ---")
        print(json.dumps(data, indent=2))

    except requests.exceptions.RequestException as e:
        print(f"\nAğ Hatası: Slack API'sine bağlanırken bir sorun oluştu: {e}")
    except json.JSONDecodeError:
        print("\nHata: Slack API'sinden gelen cevap JSON formatında değil.")
    except Exception as e:
        print(f"\nBeklenmeyen bir hata oluştu: {e}")


if __name__ == "__main__":
    list_files_in_channel(SLACK_BOT_TOKEN, SLACK_CHANNEL_ID)
