FROM python:3.12-slim

WORKDIR /app

# Install system dependencies and uv
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    && pip install --no-cache-dir uv \
    && rm -rf /var/lib/apt/lists/*

# Copy project files - maintain backend package structure
COPY pyproject.toml README.md uv.lock* ./
COPY . backend/

# Install dependencies using uv sync
RUN uv sync

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/docs || exit 1

# Run the application with auto-reload for development
CMD ["uv", "run", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
