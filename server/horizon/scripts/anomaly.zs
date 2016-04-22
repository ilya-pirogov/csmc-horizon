val hole = <ExtraUtilities:microblocks:3>.withTag({mat: "tile.extrautils:cobblestone_compressed_6"}).onlyWithTag({mat: "tile.extrautils:cobblestone_compressed_6"});
val unstableIngot = <ExtraUtilities:unstableingot:0>.withTag({display: {Lore: ["Only Unstable Ingots", "Must be crafted in Overwold"]}}).onlyWithTag({dimension: 0}); 
val anomaly = <mo:gravitational_anomaly>.withTag({display: {Name: "Artificial Gravitational Anomaly", Lore: ["Looks like a real one..."]}}); 
recipes.addShaped(anomaly, [[unstableIngot, unstableIngot, unstableIngot], [unstableIngot, hole, unstableIngot], [unstableIngot, unstableIngot, unstableIngot]]);
