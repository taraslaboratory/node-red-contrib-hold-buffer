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

            if(msg.trigger !== undefined) {
                if(msg.trigger === "reset") {
                    node.context().storedmessage =[];
                    node.context().trigger = undefined;
                    node.status({fill: "green", shape: "ring", text: "0 items"});
                    msg.resetted = 1;
                }
                if(msg.trigger === true) {
                    msg.triggered = 1;
//                    console.log(msg);
                    if(node.context().storedmessage!=null && node.context().storedmessage.length>0) {
                        if(1) {node.send(node.context().storedmessage.shift());}
                        else {node.send(node.context().storedmessage.pop());}

                        if(node.context().storedmessage.length>0) {
                            node.status({
                                fill: "green",
                                shape: "dot",
                                text: "" + node.context().storedmessage.length + " items"
                            });
                        } else {
                            node.status({
                                fill: "green",
                                shape: "ring",
                                text: "" + node.context().storedmessage.length + " items"
                            });
                        }
                    } else {
                        if(node.context().trigger !== undefined) {
                            node.warn("Hold triggered without message in buffer.");
                            node.status({fill: "red", shape: "ring", text: ""+ node.context().storedmessage.length +" items"});

                        } else {
                            node.context().trigger = true;
                            node.status({
                                fill: "green",
                                shape: "ring",
                                text: "" + node.context().storedmessage.length + " items"
                            });
                        }
                    }
                    return;
                }

            } else { //process message
                if(node.context().trigger !== undefined) {
                    node.context().trigger = undefined;
                    msg.transparent = 1;
                    node.send(msg);
                    node.status({
                        fill: "green",
                        shape: "ring",
                        text: "" + node.context().storedmessage.length + " items"
                    });
                } else {
                    msg.stored = 1;
                    node.context().storedmessage.push(msg);
                    node.status({
                        fill: "green",
                        shape: "dot",
                        text: "" + node.context().storedmessage.length + " items"
                    });
                }
            }
            return;
        });
    }
    RED.nodes.registerType("hold-buffer",holdNodeBuffer);
}
