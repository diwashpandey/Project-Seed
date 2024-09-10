class ValidateNewFullName():
    is_valid:bool = False
    message_to_client:str = ""

    def __init__(self, data):
        self.first_name = data["first_name"]
        self.last_name = data["last_name"]
        self.full_name = data["full_name"]

        if (self.validate_name()):
            self.is_valid = True
        
    
    def validate_name(self):
        
        if (not self.first_name) or (not self.last_name):
            self.message_to_client = "Name required"
            return False

        
        elif (len(self.first_name) > 25) and (len(self.last_name) > 25):
            self.message_to_client = "Max character length is 25"
            return False
        
        return True