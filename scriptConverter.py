import csv
import json

def csv_to_json(csv_file, json_file):
    # Lista para armazenar os dados convertidos
    data = []

    # Abrir o arquivo CSV e ler as linhas
    with open(csv_file, 'r', encoding='utf-8-sig') as file:
        csv_reader = csv.DictReader(file, delimiter=';')

        # Iterar sobre as linhas do arquivo CSV
        for row in csv_reader:
            data.append(row)

    # Escrever os dados em um arquivo JSON
    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

# Caminho do arquivo CSV de entrada e arquivo JSON de saída
csv_file = 'contratos2024.csv'
json_file = 'contratos2024.json'

# Converter CSV para JSON
csv_to_json(csv_file, json_file)

print("Arquivo JSON gerado com sucesso!")
