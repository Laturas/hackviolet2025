import google.generativeai as genai

# Instructions:
# Run command: pip install google-generativeai
# Go to website and generate your apikey https://aistudio.google.com/apikey

# Set your API key
genai.configure(api_key="your-api-key-here")

# Choose a model
model = genai.GenerativeModel("gemini-pro")

# Generate a response
response = model.generate_content("Tell me a fun fact about space!")

# Print the result
print(response.text)