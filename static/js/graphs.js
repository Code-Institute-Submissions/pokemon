queue()
    .defer(d3.json, "/pokemonfull")
    .await(makegraphs);

function makeGraphs () {

}