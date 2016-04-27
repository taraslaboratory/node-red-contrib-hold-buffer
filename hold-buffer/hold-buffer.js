module.exports = function(RED) {
    "use strict";
    function holdNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        var msg = {};
        if(! node.context().storedmessage) {
            node.context().storedmessage =[];
        }

        this.on('input', function (msg) {
            if ((msg.trigger==null)||(msg.trigger!=true)) {
              node.context().storedmessage.push(msg);
            } else {
              if(node.context().storedmessage!=null && node.context().storedmessage.length()>0) {
                node.send(node.context().storedmessage.pop());
              } else {
                node.warn("Hold '"+n.name+"' triggered without message in buffer.");
              }
            }
        });
    }
    RED.nodes.registerType("hold-buffer",holdNode);
}
