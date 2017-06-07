queue()
    .defer(d3.json, "/pokemonproject")
    .await(makeGraphs);

function makeGraphs (error, projectsJson) {
    var pokemonproject = projectsJson;
    // pokemonproject.forEach(function (d) {
    //   d["gender_rate"] = d["gender_rate"];
    // });


    var ndx = crossfilter(pokemonproject);
    var all = ndx.groupAll();

    var pokeTypeDim = ndx.dimension(function (d) {
        return d["type1"];
    });
    var pokeNameDim = ndx.dimension(function (d) {
        return d["identifier"];
    });
    var pokeGenderRateDim = ndx.dimension(function (d) {
        return d["gender_rate"];
    });
    var pokeHPDim = ndx.dimension(function (d) {
        return d["hp"];
    });
    var pokeAttackDim = ndx.dimension(function (d) {
        return d["attack"];
    });
    var pokeSpecialAttackDim = ndx.dimension(function (d) {
        return d["special_attack"];
    });
    var pokeDefenseDim = ndx.dimension(function (d) {
        return d["defense"];
    });
    var pokeSpecialDefenseDim = ndx.dimension(function (d) {
        return d["special_defense"];
    });
    var pokeSpeedDim = ndx.dimension(function (d) {
        return d["speed"];
    });
    var pokeTotalDim = ndx.dimension(function (d) {
        return d.total;
    })
    
    var numPokemonByType = pokeTypeDim.group();
    var numPokemonNames = pokeNameDim.group();
    var numPokemonHPAverage = pokeHPDim.group();
    var numPokemonAttackAverage = pokeAttackDim.group();
    var numPokemonDefenseAverage = pokeDefenseDim.group();
    var numPokemonSpecialAttackAverage = pokeSpecialAttackDim.group();
    var numPokemonSpecialDefenseAverage = pokeSpecialDefenseDim.group();
    var numPokemonSpeedAverage = pokeSpeedDim.group();

    var testChart = dc.barChart("#test-chart");


    testChart
        .width(900)
        .height(750)
        .dimension(pokeHPDim)
        .group(numPokemonHPAverage)
        .x(d3.scale.linear().domain([0,200]))
        .yAxisLabel("Base Stats")
        .elasticY(true)
        .xAxis().ticks(10);


    dc.renderAll();
}