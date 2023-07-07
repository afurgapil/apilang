import json

words = []

with open('./tables/c1.txt', 'r', encoding='utf-8') as file:
    for id, row in enumerate(file, start=3983):
        wrod = row.strip().split('\t')
        wordInput = {
            'id': id,
            'en': wrod[0],
            'tr': wrod[1],
            'de': wrod[2],
            'fr':wrod[3]
        }
        words.append(wordInput)


with open('./c1.json', 'w', encoding='utf-8') as file:
    json.dump(words, file, ensure_ascii=False, indent=4)

print("c1.json created.")
