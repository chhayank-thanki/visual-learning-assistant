from rest_framework.decorators import api_view
from rest_framework.response import Response
import spacy

# Load spaCy English NLP model
nlp = spacy.load("en_core_web_sm")

@api_view(["POST"])
def generate_flowchart(request):
    text = request.data.get("text", "")
    if not text:
        return Response({"error": "No text provided"}, status=400)

    try:
        doc = nlp(text)
        flow = ["graph TD"]
        for sent in doc.sents:
            prev = None
            for token in sent:
                current = token.text.replace(" ", "_")
                if prev:
                    flow.append(f"{prev} --> {current}")
                prev = current
        mermaid_code = "\n".join(flow)
        return Response({"flowchart": mermaid_code})
    except Exception as e:
        return Response({"error": str(e)}, status=500)
