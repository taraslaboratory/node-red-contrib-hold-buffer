module.exports = function(RED) {
    "use strict";
    function holdNodeBuffer(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        var msg = {};
        if(! node.context().storedmessage) {
            node.context().storedmessage =[];
            node.status({fill: "green", shape: "ring", text: "0 items"});
        }

        this.on('input', function (msg) {
            if ((msg.trigger==null)||(msg.trigger!=true)) {
              node.context().storedmessage.push(msg);
                this.node.status({fill: "green", shape: "dot", text: ""+ node.context().storedmessage.length +"items"});
            } else {
              if(node.context().storedmessage!=null && node.context().storedmessage.length>0) {
                node.send(node.context().storedmessage.pop());
                  if(node.context().storedmessage.length>0) {
                      this.node.status({
                          fill: "green",
                          shape: "dot",
                          text: "" + node.context().storedmessage.length + "items"
                      });
                  } else {
                      this.node.status({
                          fill: "green",
                          shape: "ring",
                          text: "" + node.context().storedmessage.length + "items"
                      });

                  }
              } else {
                node.warn("Hold '"+n.name+"' triggered without message in buffer.");
                  this.node.status({fill: "red", shape: "ring", text: ""+ node.context().storedmessage.length +"items"});
              }
            }
        });
    }
    RED.nodes.registerType("hold-buffer",holdNodeBuffer);
}
