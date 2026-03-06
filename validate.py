import json
try:
    with open('src/data.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print('JSON is valid')
except json.JSONDecodeError as e:
    print(f'JSON Error: {e}')
