"""

Disclaimer: This module is not django module.

This was custom created by Diwash on 2024/03/12.

If you have any questions while using this, ask him.

"""

from django.contrib.auth import get_user_model

# This will be used to create a user model.
User = get_user_model()

class CustomUserRegistration:
    """
        This class is custom created by Diwash.
        Takes registration_data, verifies it using modules, and creates a new user if all is well.

        How to Use:
            - Simply use register_user_if_valid() module by giving request.data
            - Will return True or False
            - use self.message_to_client attribute to send message to client
            - Message will be assigned to self.message_to_client
        
        Attributes:
            1. message_to_client(str) : You can send this to the user as success/error message 

        Methods:
            1. register_user_if_valid(self, registration_data) -> bool
            2. valid_password(self) -> bool
            3. user_doesnot_exist(self) -> bool
            4. get_full_name(self) -> str
            5. check_gender(self) -> bool
    """

    message_to_client:str = None
    success:bool = False
    # This messege is sent to the client as a error/success message
    
    def register_user_if_valid(self, registration_data) -> bool:
        """
        This is the main method of this class:

            Steps:
                1. Takes out all the values and assign it to the attributes.
                2. Creates a user if every other method returns True.
                3. If any error happens when creating user in last then catches error and print and set sorry message to self.message_to_client

        """

        self.first_name = registration_data.get("first_name", None)
        self.last_name = registration_data.get("last_name", None)

        self.new_email = registration_data.get("new_email", None)
        self.new_username = registration_data.get("new_username", None)
        
        self.new_password = registration_data.get("new_password", None)
        self.confirm_password = registration_data.get("confirm_password", None)

        self.gender = registration_data.get("gender", None)

        self.full_name = self.get_full_name()

        # Checks if user has sent valid form or not.
        # Returns False when not valid.
        if self.valid_password() and self.user_doesnot_exist() and self.check_gender():
            try:
                created_user = User.objects.create(username=self.new_username,
                                    email = self.new_email,
                                    full_name = self.full_name,
                                    gender = self.gender
                                    )
                
                created_user.set_password(self.new_password)
                created_user.save()

                self.message_to_client = "Your Account was created successfully"
                self.success = True
                return created_user
            
            except Exception as e:
                print("Error happened when creating a new user:",e)
                self.message_to_client = "Some error happened when creating your account."
                return None
        
        else:
            return False

    # Checks if given passwords are same or not
    def valid_password(self) -> bool:
        if self.new_password == self.confirm_password:
            return True
        else:
            self.message_to_client = "Sorry, password didn't match"
            return False
    
    def user_doesnot_exist(self) -> bool:
        """
        Checks if both email or username already exists or not
        """
        if User.objects.filter(username = self.new_username).exists():
            self.message_to_client = "Sorry, username already exists"
            return False
        if User.objects.filter(email=self.new_email).exists():
            self.message_to_client = "Sorry, this email already exists"
            return False
        
        return True
    
    def get_full_name(self) -> str:
        full_name = f"{self.first_name.capitalize()} {self.last_name.capitalize()}"
        return full_name
    
    def check_gender(self) -> bool:
        valid_genders = ["male", "female", "other"]

        if self.gender.lower() in valid_genders:
            return True
        else:
            self.message_to_client = "Sorry, Some error occurred"
            return False
        # This will return if gender is in valid_genders or not
        # Note:
        #   This is for situations where the client uses the browser's Inspect Element capability to do anything incorrect here. 
