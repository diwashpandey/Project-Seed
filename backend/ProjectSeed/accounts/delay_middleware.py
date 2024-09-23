import time

class DelayMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # time.sleep(2)  # Delay for 2 seconds
        response = self.get_response(request)
        return response