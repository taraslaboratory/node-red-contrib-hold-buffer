A node that stores incoming messages and emits it when it is triggered.

1. Send a message to the node
2. Send a message which has the .trigger property set to true. One message will be poped out from FIFO buffer or warning.
2. Send a message which has the .trigger property set to "reset". buffer will be reset and all data lost
