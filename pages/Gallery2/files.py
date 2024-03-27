import os
import json

def listar_arquivos(caminho):
    # Lista todos os arquivos no diretório fornecido
    arquivos = [arq for arq in os.listdir(caminho) if os.path.isfile(os.path.join(caminho, arq))]
    
    # Cria um objeto JSON com os nomes dos arquivos
    objeto_json = json.dumps(arquivos)
    
    return objeto_json

# Exemplo de uso
caminho = input("Digite o caminho do diretório: ")
arquivos_json = listar_arquivos(caminho)
print(arquivos_json)
