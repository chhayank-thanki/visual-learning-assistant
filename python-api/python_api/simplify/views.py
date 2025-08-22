from rest_framework.decorators import api_view
from rest_framework.response import Response
from transformers import pipeline

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

@api_view(["POST"])
def simplify_text(request):
    text = request.data.get("text", "").strip()

    if not text:
        return Response({"error": "No text provided"}, status=400)

    if len(text.split()) < 20:
        return Response({"simplified": text})  # Return original if too short to summarize

    try:
        # Lower max_length for more aggressive shortening
        summary = summarizer(
            text,
            max_length=40,  # You can reduce this more
            min_length=10,
            do_sample=False
        )
        simplified = summary[0]['summary_text'].strip()
        return Response({"simplified": simplified})
    except Exception as e:
        return Response({"error": str(e)}, status=500)
