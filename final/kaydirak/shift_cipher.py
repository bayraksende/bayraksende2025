#!/usr/bin/env python3

def text_to_binary(text):
    """Convert text to binary representation"""
    binary = ''
    for char in text:
        # Convert each character to its binary representation
        binary_char = bin(ord(char))[2:].zfill(8)  # Remove '0b' prefix and pad to 8 bits
        binary += binary_char
    return binary

def encrypt(plaintext):
    """Encrypt the plaintext using the shift cipher"""
    # Convert plaintext to binary
    binary = text_to_binary(plaintext)
    
    # Ensure the binary is at least 15 characters long
    while len(binary) < 15:
        binary += '0'
    
    # Process: XOR 1st and 15th elements, append result, shift 142 times
    for _ in range(142):
        # XOR the 1st and 15th elements
        xor_result = int(binary[0]) ^ int(binary[14])
        
        # Append result to the end
        binary += str(xor_result)
        
        # Shift data (remove first element)
        binary = binary[1:]
    
    return binary

def main():
    """Main function to run the encryption"""
    print("CTF Crypto Challenge - Shift Cipher")
    plaintext = input("Enter text to encrypt: ")
    
    encrypted = encrypt(plaintext)
    print(f"\nEncrypted binary: {encrypted}")
    print(f"Length of encrypted data: {len(encrypted)}")

if __name__ == "__main__":
    main() 