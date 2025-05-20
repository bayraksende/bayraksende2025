import threading

def write_flag():
    while True:
        with open("flag.txt", "w") as f:
            f.write("bende")

threads = []
for _ in range(10):
    t = threading.Thread(target=write_flag)
    t.daemon = True
    threads.append(t)
    t.start()

for t in threads:
    t.join()
