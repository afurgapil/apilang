with open("/randomText/randomText.txt", "r") as file:
    lines = file.readlines()

first_words = [line.split()[0] for line in lines]

with open("c1.txt", "w") as output_file:
    for word in first_words:
        output_file.write(word + "\n")

