window.addEventListener("load", func);
    
    function func(){
        console.log("LOADED");
        
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
        c.addPaths([
            ["AA", "BB"],
            ["BB", "EE"],
            ["BB", "FF"],
            ["AA", "CC", "DD"]
        ]);
        
        var d = new flowjs.DiGraph();
        d.addPaths([
            ["Peter Q", "Gamora", "Nova Prime", "Rocket"],
            ["Drax", "Groot", "Rocket"],
            ["Merdith Q", "Groot"]
        ]);
        
        new flowjs.DiFlowChart("canvas1", a).draw();
        new flowjs.DiFlowChart("canvas2", b).draw();
        new flowjs.DiFlowChart("canvas4", d).draw();
        
        
        // Advanced Example with loading animation
        var cf = new flowjs.DiFlowChart("canvas3", c);
        cf.draw();
        simuLoad(cf, c);    
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
        
