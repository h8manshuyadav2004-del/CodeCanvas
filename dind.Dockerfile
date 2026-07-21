# ✅ THIS SUCCEEDS
FROM docker:dind

COPY preload-images.sh /usr/local/bin/preload-images.sh
RUN chmod +x /usr/local/bin/preload-images.sh

# Starts the pre-loader ONLY when the container boots up with privileged access
ENTRYPOINT ["/bin/sh", "-c", "/usr/local/bin/preload-images.sh & exec dockerd-entrypoint.sh"]