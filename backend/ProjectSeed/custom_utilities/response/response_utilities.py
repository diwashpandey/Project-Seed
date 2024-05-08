class ResponseUtilities:
    """
        This class provides a reusable utility for generating responses.

        It follows the DRY (Don't Repeat Yourself) principle, reducing redundancy in code.

        How to use:
        - Inherit this class in your view.
        - Set the attributes to be sent to the client.
        - Use the method get_generated_response() to create the response.

                        !!! Disclaimer !!!
        Make sure to return the result using JSONResponse() or Response(),
        as this method doesn't handle JSON serialization.

        Customization:
            To add additional functionality:
                1. Override the get_generated_response() method
                and customize it like any other class.

                2. You can add in *response_to_return* variable too too
    """
    
    message_to_client = None
    success_status = False
    data = None
    success_url = None

    def get_generated_response(self):
        """
        This generates the response according to the usage
        """
        response_to_return = {
            "success_status":self.success_status
        }

        if self.message_to_client:
            response_to_return["message_to_client"] = self.message_to_client

        if self.data:
            response_to_return["data"] = self.data

        if self.success_url:
            response_to_return["success_url"] = self.success_url

        return response_to_return