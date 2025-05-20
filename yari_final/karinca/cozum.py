import sys
import os
import tempfile
from PIL import Image
import subprocess

FRAME_WIDTH = 100
FRAME_HEIGHT = 100

def main():
    if len(sys.argv) != 3:
        return

    video_path = sys.argv[1]
    output_path = sys.argv[2]

    with tempfile.TemporaryDirectory() as temp_dir:
        cmd = [
            'ffmpeg',
            '-i', video_path,
            '-vsync', '0',
            '-vcodec', 'png',
            os.path.join(temp_dir, 'frame_%04d.png')
        ]
        
        subprocess.run(cmd, check=True)

        with open(output_path, 'wb') as out_file:
            frame_index = 1
            current_byte = 0
            bit_position = 7

            while True:
                frame_path = os.path.join(temp_dir, f'frame_{frame_index:04d}.png')
                try:
                    frame = Image.open(frame_path)
                except FileNotFoundError:
                    break

                pixels = frame.load()
                for y in range(FRAME_HEIGHT):
                    for x in range(FRAME_WIDTH):
                        pixel = pixels[x, y]
                        gray = sum(pixel[:3]) // 3

                        if gray < 128:
                            current_byte |= (1 << bit_position)

                        bit_position -= 1

                        if bit_position < 0:
                            out_file.write(bytes([current_byte]))
                            current_byte = 0
                            bit_position = 7

                frame_index += 1

            if bit_position != 7:
                out_file.write(bytes([current_byte]))

        print("bitti:", output_path)

if __name__ == '__main__':
    main() 