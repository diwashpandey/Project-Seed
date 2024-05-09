# The main serializer module by DRF
from rest_framework import serializers

# Django built-in module to get the AUTH User
from django.contrib.auth import get_user_model

# Getting the user model using the django provided function
User = get_user_model()

class UserPasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length = 500)
    confirm_old_password = serializers.CharField(max_length = 500)
    new_password = serializers.CharField(max_length = 500, min_length = 8)

    # OVER-RIDING the method for validating new password
    def validate_new_password(self, value):

        if len(value) < 8:
            raise serializers.ValidationError("Password should be at least 8 characters long")
        return value

        #       **********  More password validation codes will be written later  **********    #

    def validate(self, data):

        validated_data = super().validate(data) # First getting the validated data from the Parent Class

        # Now just validating if both passwords are same or not
        if validated_data.get("old_password") == validated_data.get("confirm_old_password"):
            return validated_data

        return serializers.ValidationError("Password didn't match")