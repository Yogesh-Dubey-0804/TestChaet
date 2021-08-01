import datetime
# function for checking and making time stamps 
        
listq = []
while True:
    
    a = str (input("Enter the nmber you want "))
    print(listq)
    def message_object_creator():
        message = {
            "id":str(datetime.datetime.now()),
            "message":a}
        return message

    listq.append(message_object_creator())

    print(message_object_creator())
    print(listq)