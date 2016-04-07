module.exports = function(RED) {
    "use strict";
    function holdNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        var msg = {};
        node.context().storedmessage = node.context().storedmessage || null;
        this.on('input', function (msg) {
            if ((msg.trigger==null)||(msg.trigger!=true)) {
              node.context().storedmessage = msg;
            } else {
              if(node.context().storedmessage!=null) {
                node.send(node.context().storedmessage);
              } else {
                node.warn("Hold '"+n.name+"' triggered without message in buffer.");
              }
            }
        });
    }
    RED.nodes.registerType("hold",holdNode);
}
