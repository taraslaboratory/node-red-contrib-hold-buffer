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

            if ((msg.trigger==null)&&(msg.trigger=="reset")) {
                node.context().storedmessage =[];
                node.status({fill: "green", shape: "ring", text: "0 items"});

            } else if ( (msg.trigger==null) || ((msg.trigger!=true)&&(msg.trigger!="reset")) ) {
                node.context().storedmessage.push(msg);
                node.status({fill: "green", shape: "dot", text: ""+ node.context().storedmessage.length +"items"});
            } else {
              if(node.context().storedmessage!=null && node.context().storedmessage.length>0) {
                  if(1) {node.send(node.context().storedmessage.shift());}
                  else {node.send(node.context().storedmessage.pop());}

                  if(node.context().storedmessage.length>0) {
                      node.status({
                          fill: "green",
                          shape: "dot",
                          text: "" + node.context().storedmessage.length + "items"
                      });
                  } else {
                      node.status({
                          fill: "green",
                          shape: "ring",
                          text: "" + node.context().storedmessage.length + "items"
                      });

                  }
              } else {
                node.warn("Hold '"+n.name+"' triggered without message in buffer.");
                  node.status({fill: "red", shape: "ring", text: ""+ node.context().storedmessage.length +"items"});
              }
            }
        });
    }
    RED.nodes.registerType("hold-buffer",holdNodeBuffer);
}
