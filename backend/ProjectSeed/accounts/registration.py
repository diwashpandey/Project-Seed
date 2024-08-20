"""

Disclaimer: This module is not django module.

This was custom created by Diwash on 2024/03/12.

If you have any questions while using this, ask him.

"""


from django.contrib.auth import get_user_model

User = get_user_model()
# This will be used to create a user model.

class CustomUserRegistration:
    """
    Takes registration_data, verifies it using modules, and creates a new user if all is well.

    How to Use:
        - Simply use register_user_if_valid() module by giving request.POST
        - Will return True or False
        - use self.message_to_client attribute to send message to client
        - Message will be assigned to self.message_to_client

    Methods:
        1. register_user_if_valid(self, registration_data) -> bool
        2. valid_password(self) -> bool
        3. user_doesnot_exist(self) -> bool
        4. get_full_name(self) -> str
        5. check_gender(self) -> bool
    """

    message_to_client = None
    success_status:bool = False
    # This messege is sent to the client as a error/success message
    
    def register_user_if_valid(self, registration_data):
        """
        This is the main method of this class:

            Steps:
                1. Takes out all the values and assign it to the attributes.
                2. Creates a user if every other method returns True.
                3. If any error happens when creating user in last then catches error and print and set sorry message to self.message_to_client

        """

        self.first_name = registration_data.get("first_name")
        self.last_name = registration_data.get("last_name")

        self.new_email = registration_data.get("new_email")
        self.new_username = registration_data.get("new_username")
        
        self.new_password = registration_data.get("new_password")
        self.confirm_password = registration_data.get("confirm_password")

        self.gender = registration_data.get("gender")
        self.is_teacher = registration_data.get("is_teacher")

        # Returning none if something among the list is not provided
        if not self.all_exists():
            self.message_to_client = "All credentials were not provided"
            return False
        
        self.full_name = self.get_full_name()

        # Checks if user has sent valid form or not.
        # Returns False when not valid.
        if self.valid_password() and self.user_doesnot_exist() and self.check_gender():
            try:
                created_user = User.objects.create(username=self.new_username,
                                    email = self.new_email,
                                    first_name = self.first_name,
                                    last_name = self.last_name,
                                    full_name = self.full_name,
                                    is_teacher = self.is_teacher,
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
                return False
        
        else:
            return False

    # Checks if given passwords are same or not
    def valid_password(self) -> bool:
        if len(self.new_password) > 7:
            if self.new_password == self.confirm_password:
                return True
            else:
                self.message_to_client = "Sorry, password didn't match"
                return False
        else:
            self.message_to_client = "Password should be atlease 8 characters"
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
        valid_genders = ["m", "f", "o"]

        if self.gender.lower() in valid_genders:
            return True
        else:
            self.message_to_client = "Sorry, Some error occurred"
            return False
        # This will return if gender is in valid_genders or not
        # Note:
        #   This is for situations where the client uses the browser's Inspect Element capability to do anything incorrect here. 

    def all_exists(self) -> bool :
        lst = [self.first_name, self.last_name, self.new_email, self.new_username, self.new_password, self.confirm_password, self.gender, self.is_teacher]
        
        if None in lst:
            self.message_to_client = "You haven't provided all things"
            return False
        
        return True