module.exports = function(RED) {
    "use strict";
    function holdNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        var msg = {};
        node.context().storedmessage = node.context().storedmessage || null;

        this.on('input', function (msg) {
            if ((msg.trigger==null)||(msg.trigger!=true)) {
              node.warn("Stored message: "+msg.payload);
              node.context().storedmessage = msg;
            } else {
              node.warn("Hold triggered!");
              if(node.context().storedmessage!=null) {
                node.send(node.context().storedmessage);
              } else {
                node.warn("No message in buffer.");
              }
            }
        });

        this.on("close", function() {

        });
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("hold",holdNode);

}
