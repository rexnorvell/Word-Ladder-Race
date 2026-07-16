import json

def main():
	inputFile = "filtered-words.txt"
	outputFile = "words.json"
	
	# Open the file, creating a dictionary with words as keys and definitions as values
	with open(inputFile) as file:
		lines = file.readlines()
	words = {line[:4]: line[6:-1] for line in lines}

	# Write the dictionary to the output file
	with open(outputFile, "w", encoding="utf-8") as file:
		json.dump(words, file, indent=4, ensure_ascii=False)
	print("Wrote %s" % outputFile)


if __name__ == "__main__":
	main()
