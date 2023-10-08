window.addEventListener("load", func);

var graphData = [];
    function parseData(){
        
        var data= [
            {
              "id": 1,
              "serviceName": "Service-1",
              "dependentServices": [
                {
                  "id": 2,
                  "serviceName": "Service-2",
                  "dependentServices": null
                },{
                    "id": 3,
                    "serviceName": "Service-3",
                    "dependentServices": null 
                }
              ]
            },
            {
              "id": 2,
              "serviceName": "Service-2",
              "dependentServices": [
                {
                  "id": 4,
                  "serviceName": "Service-3",
                  "dependentServices": null
                },
                {
                    "id": 6,
                    "serviceName": "Service-4",
                    "dependentServices": null
                  }
              ]
            },
            {
              "id": 4,
              "serviceName": "Service-3",
              "dependentServices":  null /*[
                {
                  "id": 6,
                  "serviceName": "Service-4",
                  "dependentServices": null
                }
              ]*/
            }
        ]
        $.each(data, function(i, item) {
            var flowData = [];
          //  console.log("dependentService=="+item.dependentServices.length);
            console.log(item.serviceName);
            
           /* $.each(item.dependentServices, function(j, item1) {
                console.log(item1.serviceName);
                flowData.push(item1.serviceName);
            });*/

            if(item.dependentServices!=null){
            for (let i = 0; i < item.dependentServices.length; i++) {
                console.log(item.dependentServices[i].serviceName);
                flowData.push(item.serviceName);
                flowData.push(item.dependentServices[i].serviceName);
                graphData.push(flowData);
                flowData=[];
            
              }
            }
            
            
        });
        
    }

    function func(){

        console.log("LOADED");
        parseData();
        
        var a = new flowjs.DiGraph();
        a.addPaths([
            ["A1", "A2"],
            ["A1", "B2"],
            //["B1", "B2"],
            ["B1", "A2"]
        ]);
        
        var b = new flowjs.DiGraph();
        b.addPaths([
            ["AA", "BB", "CC"],
            ["DD", "EE", "CC"]
        ]);
        
        var c = new flowjs.DiGraph();
        c.addPaths(graphData);
        /*c.addPaths([
            ["AA", "BB"],
            ["BB", "EE"],
            ["BB", "FF"],
            ["AA", "CC", "DD"]
        ]);
        c.addPaths([
            [""]
        ]);*/
    
        var d = new flowjs.DiGraph();
       d.addPaths([
            ["Service-1", "Service-2", "Service-3", "Service-4"],
            ["Service-5", "Service-6", "Service-4"],
            ["Service-7", "Service-6"]
        ]);
        /*d.addPaths([
            ["", ""]
        ]);*/
        console.log("c");
        console.log(c);

       // d.addPaths(graphData);
        console.log("d")
        //document.getElementById("")
        console.log(d._nodes);

        /*new flowjs.DiFlowChart("canvas1", a).draw();
        new flowjs.DiFlowChart("canvas2", b).draw();*/
        new flowjs.DiFlowChart("canvas4", d).draw();
        
        
        // Advanced Example with loading animation
         //var cf = new flowjs.DiFlowChart("canvas3", c);
         //cf.draw();
         //simuLoad(cf, c);    
    }
    
    
    function simuLoad(flowChart, graph){
        var walker = new flowjs.GraphWalker(graph);
        walker.forEach(function(node){
            var start = Math.random() * 1000 * 5;
            var dur = Math.random() * 1000 * 5;
            simulateLoading(node.id, start);
            simulateDoneLoading(node.id, start + dur);
        }, this);
        
        
        function simulateLoading(itemId, timeout){
            setTimeout(function(){
                flowChart.updateItem(itemId, function(item){
                    item.flowItem.toggleFlashing();
                });
            }, timeout);
            
        }
        
        function simulateDoneLoading(itemId, timeout){
            setTimeout(function(){
                flowChart.updateItem(itemId, function(item){
                    item.flowItem.toggleFlashing();
                    item.flowItem.color = "red";
                    if (item.connectors === undefined){return;}
                    item.connectors.forEach(function(conn){
                       conn.color = "red"; 
                    });
                });
            }, timeout);
        }
    }
        




