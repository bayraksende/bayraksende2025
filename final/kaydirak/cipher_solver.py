#!/usr/bin/env python3
from shift_cipher import text_to_binary

def binary_to_text(binary):
    """Convert binary back to text"""
    text = ""
    for i in range(0, len(binary), 8):
        # Make sure we have a full byte
        if i + 8 <= len(binary):
            byte = binary[i:i+8]
            try:
                # Convert byte to character
                text += chr(int(byte, 2))
            except ValueError:
                # Skip invalid bytes
                continue
    return text

def reverse_shift_cipher(encrypted, num_shifts):
    """Attempt to reverse the shift cipher with a specific number of shifts"""
    binary = encrypted
    
    # We need to reverse the process by determining what bits were at the beginning
    # before they were removed by the shift
    reversed_binary = binary
    
    # Reverse the process num_shifts times
    for _ in range(num_shifts):
        # We need to determine what bit was at the beginning
        # The XOR operation is reversible: if a XOR b = c, then a = b XOR c
        # We know the 15th bit (index 14) and the result (last bit)
        
        if len(reversed_binary) < 15:
            return None  # Can't reverse further
        
        # The last bit is the XOR result of the first and 15th bits
        xor_result = int(reversed_binary[-1])
        bit_15th = int(reversed_binary[13])
        
        # Determine what the first bit was
        first_bit = xor_result ^ bit_15th
        
        # Add the first bit back to the beginning
        reversed_binary = str(first_bit) + reversed_binary[:-1]
    
    return reversed_binary

def search_for_merhaba(encrypted, log_file):
    """Try different shift counts and look for 'merhaba'"""
    results = []
    
    # Write header to log file
    log_file.write("DECRYPTION STEPS LOG\n")
    log_file.write("===================\n\n")
    log_file.write(f"Original encrypted binary: {encrypted}\n\n")
    log_file.write("Shifts | Contains 'merhaba' | Decrypted Text\n")
    log_file.write("-" * 60 + "\n")
    
    # Try from 1 to 200 shifts
    for shifts in range(1, 201):
        reversed_binary = reverse_shift_cipher(encrypted, shifts)
        
        if reversed_binary:
            # Convert to text
            text = binary_to_text(reversed_binary)
            
            # Check if it contains 'merhaba'
            contains_merhaba = 'merhaba' in text.lower()
            
            # Write to log file
            status = "YES" if contains_merhaba else "NO"
            log_file.write(f"{shifts:6d} | {status:17s} | {text}\n")
            
            # Print to console and add to results if it contains 'merhaba'
            if contains_merhaba:
                results.append((shifts, text))
                print(f"Found 'merhaba' after {shifts} reversals: {text}")
    
    # Add a footer to the log file
    log_file.write("\nSUMMARY\n")
    log_file.write("=======\n")
    if results:
        log_file.write(f"Found {len(results)} matches containing 'merhaba':\n")
        for shifts, text in results:
            log_file.write(f"- After {shifts} reversals: {text}\n")
    else:
        log_file.write("No matches found containing 'merhaba'.\n")
    
    return results

def main():
    print("Merhaba Finder in Shift Cipher")
    encrypted = input("Enter encrypted binary: ")
    
    # Open a file for logging all decryption steps
    log_filename = "decryption_steps.txt"
    with open(log_filename, 'w', encoding='utf-8') as log_file:
        print(f"\nSearching for 'merhaba' with 1-200 shift reversals...")
        print(f"Logging all steps to {log_filename}...")
        results = search_for_merhaba(encrypted, log_file)
    
    print(f"\nAll steps have been written to {log_filename}")
    
    if results:
        print("\nAll matches found:")
        for shifts, text in results:
            print(f"- After {shifts} reversals: {text}")
    else:
        print("\nNo matches found containing 'merhaba'.")

if __name__ == "__main__":
    main() 