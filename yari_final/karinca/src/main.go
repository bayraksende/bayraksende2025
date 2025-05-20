package main

import (
	"fmt"
	"image"
	"image/color"
	"image/png"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
)

const (
	pixelSize    = 1
	frameWidth   = 100
	frameHeight  = 100
	framesPerSec = 24
)

func main() {
	if len(os.Args) != 2 {
		return
	}

	data, err := os.ReadFile(os.Args[1])
	if err != nil {
		return
	}

	tempDir, err := ioutil.TempDir("", "frames")
	if err != nil {
		return
	}
	defer os.RemoveAll(tempDir)

	frameCount := createFrames(data, tempDir)

	createVideo(tempDir, frameCount)
}

func createFrames(data []byte, tempDir string) int {
	frameCount := 0
	bitCount := 0
	currentFrame := image.NewRGBA(image.Rect(0, 0, frameWidth*pixelSize, frameHeight*pixelSize))

	for byteIndex, b := range data {
		for bitIndex := 0; bitIndex < 8; bitIndex++ {
			bit := (b >> (7 - bitIndex)) & 1
			x := (bitCount % frameWidth) * pixelSize
			y := ((bitCount / frameWidth) % frameHeight) * pixelSize

			var c color.Color
			if bit == 1 {
				c = color.Black
			} else {
				c = color.White
			}

			for px := 0; px < pixelSize; px++ {
				for py := 0; py < pixelSize; py++ {
					currentFrame.Set(x+px, y+py, c)
				}
			}

			bitCount++

			if bitCount%(frameWidth*frameHeight) == 0 || byteIndex == len(data)-1 {
				filename := filepath.Join(tempDir, fmt.Sprintf("frame_%04d.png", frameCount))
				f, _ := os.Create(filename)
				png.Encode(f, currentFrame)
				f.Close()
				frameCount++
				currentFrame = image.NewRGBA(image.Rect(0, 0, frameWidth*pixelSize, frameHeight*pixelSize))
			}
		}
	}
	return frameCount
}

func createVideo(tempDir string, frameCount int) {
	cmd := exec.Command("ffmpeg",
		"-framerate", fmt.Sprintf("%d", framesPerSec),
		"-i", filepath.Join(tempDir, "frame_%04d.png"),
		"-c:v", "libx264",
		"-preset", "veryslow",
		"-crf", "0",
		"-pix_fmt", "yuv444p",
		"output.mp4")

	err := cmd.Run()
	if err != nil {
		fmt.Printf("Video oluşturma hatası: %v\n", err)
		return
	}

	fmt.Println("video başarıyla oluşturuldu: output.mp4")
}
