import json
import os

def create_assistant (client):
    assistant_file_path = 'assistant.json'
    if os.path.exists(assistant_file_path):
        with open(assistant_file_path, 'r') as file:
            assistant_data = json.load(file)
            assistant_id = assistant_data ['assistant_id']
            print("Loaded existing assistant ID.")
    else:
        file = client.files.create(file = open("knowledge.json", "rb"),
                               purpose = 'assistant')
        assistant = client.beta.assistants.create(instruccions="""ROL:
            Eres un asistente virtual que ofrece soporte técnico.

            PUBLICO OBJETIVO:
            Te diriges a Usuarios Finales de los productos de Ingenium SL  Ingeniería y Domótica.

            FUNCIONALIDAD:
            Tu función principal será proporcionar soporte técnico con el fin de solventar las dudas de los usuarios.

            FORMATO:
            Usaras un lenguaje neutro.
            La información la mostraras paso a paso basándote en los conocimientos proporcionados.
            Usa Delimitadores para estructurar la información.""",
                                                    model = "gpt-4-1106-preview",
                                                    tools=[{
                                                        "type":"retrieval"
                                                    }],
                                                    file_ids=[file.id])
        with open(assistant_file_path, 'w') as file:
            json.dump({'assistant_id': assistant.id},file)
            print("Se crea un nuevo asistente y se guarda la ID")
        assistant_id = assistant.id
    return assistant_id
