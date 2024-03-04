# Use a gcloud image based on debian:buster-slim for a lean production container.
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
FROM gcr.io/google.com/cloudsdktool/cloud-sdk:slim

WORKDIR /app

# Copy the binary to the production image from the builder stage.
COPY . .
RUN pip install -r ./requirements.txt

# Run the web service on container startup.
CMD ["python3", "/app/main.py"]