import functions_framework
from langchain.embeddings.openai import OpenAIEmbeddings
import tiktoken
import pinecone
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Pinecone
from PyPDF2 import PdfReader
from google.cloud import storage
import io
import urllib
from urllib.request import Request, urlopen
from uuid import uuid4
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from langchain.prompts import PromptTemplate, ChatPromptTemplate, HumanMessagePromptTemplate
from langchain.chat_models import ChatOpenAI
import os
import json


OPENAI_API_KEY = "..."
PINECONE_KEY = "..."
pinecone.init(api_key=PINECONE_KEY, environment="gcp-starter")
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

storage_client = storage.Client()
bucket = storage_client.get_bucket("hackgtx.appspot.com")

index_name = "hackgt"


def get_pdf_from_url(file_name):
    """
    :param url: url to get pdf file
    :return: PdfFileReader object
    """
    print(file_name)
    url = 'https://firebasestorage.googleapis.com/v0/b/hackgtx.appspot.com/o/notes%2F' + file_name + '?alt=media'
    print("URL:", url)
    remote_file = urlopen(Request(url)).read()
    memory_file = io.BytesIO(remote_file)
    reader = PdfReader(memory_file)
    pages = reader.pages
    s = ""
    for p in pages:
      s += p.extract_text().replace("\n", " ")

    return {"text": s, "file_path": url}

def setup_pinecone():
  if index_name not in pinecone.list_indexes():
    # we create a new index
    pinecone.create_index(
        name=index_name,
        metric='cosine',
        dimension=1536  # 1536 dim of text-embedding-ada-002
    )
  return pinecone.Index(index_name)

index = setup_pinecone()


def tokenize():
  # tiktoken.encoding_for_model('gpt-3.5-turbo')
  return tiktoken.get_encoding('cl100k_base')

tokenizer = tokenize()

def tiktoken_len(text):
    tokens = tokenizer.encode(
        text,
        disallowed_special=()
    )
    return len(tokens)

def chunk(text):
  text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=100,
    chunk_overlap=15,
    length_function=tiktoken_len,
    separators=["\n\n", "\n", " ", ""]
  )
  print("After splitter")
  chunks = text_splitter.split_text(text)
  return chunks

def get_embeddings():
  model_name = "text-embedding-ada-002"
  embed = OpenAIEmbeddings(
      model=model_name,
      openai_api_key=OPENAI_API_KEY
  )
  return embed

embed = get_embeddings()

def insert_pinecone(data):
  batch_limit = 100

  texts = []
  metadatas = []

  for i, record in enumerate(data):
    print(i, record)
    # first get metadata fields for this record
    metadata = {
        'pdf-url': record["file_path"],
    }
    print("metadata:", metadata)
    # now we create chunks from the record text
    record_texts = chunk(record['text'])
    print("record_text:", record_texts)
    # create individual metadata dicts for each chunk
    record_metadatas = [{
        "chunk": j, "text": text, **metadata
    } for j, text in enumerate(record_texts)]
    print("record_metadatas:", record_metadatas)
    # append these to current batches
    texts.extend(record_texts)
    metadatas.extend(record_metadatas)
    # if we have reached the batch_limit we can add texts
    if len(texts) >= batch_limit:
        print("before uuid")
        ids = [str(uuid4()) for _ in range(len(texts))]
        print("before embed")
        embeds = embed.embed_documents(texts)
        print("after embed")
        index.upsert(vectors=zip(ids, embeds, metadatas))
        print("after upsert")
        texts = []
        metadatas = []

  if len(texts) > 0:
      ids = [str(uuid4()) for _ in range(len(texts))]
      embeds = embed.embed_documents(texts)
      index.upsert(vectors=zip(ids, embeds, metadatas))


MCQ_response_schemas = [
    ResponseSchema(name="question", description="A multiple choice question generated from input text snippet."),
    ResponseSchema(name="options", description="Possible choices for the multiple choice question."),
    ResponseSchema(name="answer", description="Correct answer for the question.")
]

TF_response_schemas = [
    ResponseSchema(name="question", description="A true/false question generated from input text snippet."),
    ResponseSchema(name="options", description="True and False separately"),
    ResponseSchema(name="answer", description="Correct answer for the question.")
]

# The parser that will look for the LLM output in my schema and return it back
output_parser = StructuredOutputParser.from_response_schemas(MCQ_response_schemas)

# The format instructions that LangChain makes
format_instructions = output_parser.get_format_instructions()

# ChatGPT object
chat_model = ChatOpenAI(temperature=0, model_name='gpt-3.5-turbo')
# prompt template - to bring everything together
prompt = ChatPromptTemplate(
    messages=[
        HumanMessagePromptTemplate.from_template("""
        Given a text input, generate multiple choice questions
        from it along with the correct answer generate in json format without any markup where options is an array of options.
        \n{format_instructions}\n{user_prompt}
      """)
    ],
    input_variables=["user_prompt"],
    partial_variables={"format_instructions": format_instructions}
)

keyPointPrompt = ChatPromptTemplate(
  messages=[
        HumanMessagePromptTemplate.from_template("""
        Generate a multiple bullet point summary of the entire text in the json format without any markup where 
        each bullet point is a separate string and all of them are in an array.
        \n{format_instructions}\n{user_prompt}
      """)
    ],
    input_variables=["user_prompt"],
    partial_variables={"format_instructions": format_instructions}
)

vectorstore = Pinecone(index, embed.embed_query, "text")


# CloudEvent function to be triggered by an Eventarc Cloud Audit Logging trigger
# Note: this is NOT designed for second-party (Cloud Audit Logs -> Pub/Sub) triggers!
@functions_framework.cloud_event
def test(cloudevent):
  if '.pdf' in cloudevent['subject']:
    # Print out the CloudEvent's (required) `type` property
    # See https://github.com/cloudevents/spec/blob/v1.0.1/spec.md#type
    print(f"HELLOO ITS WORKING")

    # index.upsert([("C", [0.1]*1536)])
    # Print out the CloudEvent's (optional) `subject` property
    # See https://github.com/cloudevents/spec/blob/v1.0.1/spec.md#subject
    print(f"Before getting from url")
    print(cloudevent['subject'])
    file_name = cloudevent['subject'].split('/')[2]
    data = get_pdf_from_url(file_name)
    text = data['text']
    print(data)
    print(f"After getting from url")

    insert_pinecone([data])
    print(f"After inserting")

    user_query = prompt.format_prompt(user_prompt = text)
    user_query_output = chat_model(user_query.to_messages())

    user_query_key = keyPointPrompt.format_prompt(user_prompt = text)
    user_query_output_key = chat_model(user_query_key.to_messages())

    print(user_query_output.content)
    print(len(user_query_output.content))
    print(user_query_output_key.content)

    key_sentence_sources = []
    for key_sentence in user_query_output_key.content.split("."):
      key_sentence_sources.append(vectorstore.similarity_search(key_sentence, k=1)[0].page_content)

    print(file_name)

    blob = bucket.blob(file_name[:-4] + ".json")
    blobKey = bucket.blob(file_name[:-4] + "-key.json")
    blobKeySources = bucket.blob(file_name[:-4]+"-key-sources.json")
    print("blob")
    blob.upload_from_string(user_query_output.content)
    blobKey.upload_from_string(user_query_output_key.content)
    blobKeySources.upload_from_string(str(key_sentence_sources))

    print("DONE")
