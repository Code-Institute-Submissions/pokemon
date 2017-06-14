queue()
    .defer(d3.json, "/pokemonproject")
    .await(makeGraphs);

function makeGraphs (error, pokemonproject) {

    var ndx = crossfilter(pokemonproject);
    var all = ndx.groupAll();

    // Creates dimensions from the json
    var pokeTypeDim = ndx.dimension(function (d) {
        return d["type1"];
    });
    var pokeNameDim = ndx.dimension(function (d) {
        return d["identifier"];
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

    // Create groups for each dimension
    var numPokemonByType = pokeTypeDim.group();
    var numPokemonNames = pokeNameDim.group();
    var numPokemonHP = pokeHPDim.group();
    var numPokemonAttack = pokeAttackDim.group();
    var numPokemonDefense = pokeDefenseDim.group();
    var numPokemonSpecialAttack = pokeSpecialAttackDim.group();
    var numPokemonSpecialDefense = pokeSpecialDefenseDim.group();
    var numPokemonSpeed = pokeSpeedDim.group();

    // Declare chart types and link to HTML
    var typeChart = dc.pieChart("#type-chart");
    var hpChart = dc.barChart("#hp-chart");
    var atkChart = dc.barChart("#attack-chart");
    var defChart = dc.barChart("#defense-chart");
    var satkChart = dc.barChart("#special-attack-chart");
    var sdefChart = dc.barChart("#special-defense-chart");
    var spdChart = dc.barChart("#speed-chart");
    var pokemonTotal = dc.numberDisplay("#total-pokemon");

    // Calculate min and max of fields for graphs x-axis
    var minHP = pokeHPDim.bottom(1)[0]["hp"];
    var maxHP = pokeHPDim.top(1)[0]["hp"];
    var minAtk = pokeAttackDim.bottom(1)[0]["attack"];
    var maxAtk = pokeAttackDim.top(1)[0]["attack"];
    var minDef = pokeDefenseDim.bottom(1)[0]["defense"];
    var maxDef = pokeDefenseDim.top(1)[0]["defense"];
    var minSAtk = pokeSpecialAttackDim.bottom(1)[0]["special_attack"];
    var maxSAtk = pokeSpecialAttackDim.top(1)[0]["special_attack"];
    var minSDef = pokeSpecialDefenseDim.bottom(1)[0]["special_defense"];
    var maxSDef = pokeSpecialDefenseDim.top(1)[0]["special_defense"];
    var minSpd = pokeSpeedDim.bottom(1)[0]["speed"];
    var maxSpd = pokeSpeedDim.top(1)[0]["speed"];

    // Pokemon Select Box
    selectField = dc.selectMenu('#pokemon-select')
        .dimension(pokeNameDim)
        .group(numPokemonNames);

    // Calculate dimensions for charts
    var chartWidth = $("#pieChart").width();
    var pieRadius = 200;
    if(chartWidth >= 480){
            pieRadius = 200;
        } else {
            pieRadius = chartWidth * 0.3;
        }

    // Type Pie Chart
    typeChart
        .height(400)
        .width(chartWidth)
        .cx([chartWidth/2 + 15])
        .radius(pieRadius)
        .transitionDuration(1500)
        // Adding correct colours for each type of pokemon
        .colors(d3.scale.ordinal().range(['#97EC8B','#3C2C17','#133061','#FFF63D','#F8A2F4','#930F0F','#F02E2E','#cca3de','#46087e','#21DD21','#BF9B76','#81E2D9','#E0E2E2','#8035EC','#C2378E','#656565','#87A0A9','#2681F5']))
        .legend(dc.legend().x(5).y(20).itemHeight(13).gap(5))
        .renderLabel(false)
        .dimension(pokeTypeDim)
        .group(numPokemonByType);

    // HP Barchart
    hpChart
        .width(chartWidth)
        .height(400)
        .dimension(pokeHPDim)
        .group(numPokemonHP)
        .x(d3.scale.linear().domain([minHP,maxHP]))
        .yAxisLabel("Number of Pokemon")
        .xAxisLabel("Base HP")
        .ordinalColors(['#009109'])
        .elasticY(true)
        .xAxis().ticks(10);

    // Attack Barchart
    atkChart
        .width(chartWidth)
        .height(400)
        .dimension(pokeAttackDim)
        .group(numPokemonAttack)
        .x(d3.scale.linear().domain([minAtk,maxAtk]))
        .yAxisLabel("Number of Pokemon")
        .xAxisLabel("Base Attack")
        .ordinalColors(['#910014'])
        .elasticY(true)
        .xAxis().ticks(10);

    // Defense Barchart
    defChart
        .width(chartWidth)
        .height(400)
        .dimension(pokeDefenseDim)
        .group(numPokemonDefense)
        .x(d3.scale.linear().domain([minDef,maxDef]))
        .yAxisLabel("Number of Pokemon")
        .xAxisLabel("Base Defense")
        .ordinalColors(['#004a91'])
        .elasticY(true)
        .xAxis().ticks(10);

    // Special Attack Barchart
    satkChart
        .width(chartWidth)
        .height(400)
        .dimension(pokeSpecialAttackDim)
        .group(numPokemonSpecialAttack)
        .x(d3.scale.linear().domain([minSAtk,maxSAtk]))
        .yAxisLabel("Number of Pokemon")
        .xAxisLabel("Base Special Attack")
        .ordinalColors(['#914900'])
        .elasticY(true)
        .xAxis().ticks(10);

    // Special Defense Barchart
    sdefChart
        .width(chartWidth)
        .height(400)
        .dimension(pokeSpecialDefenseDim)
        .group(numPokemonSpecialDefense)
        .x(d3.scale.linear().domain([minSDef,maxSDef]))
        .yAxisLabel("Number of Pokemon")
        .xAxisLabel("Base Special Defense")
        .ordinalColors(['#210091'])
        .elasticY(true)
        .xAxis().ticks(10);

    // Speed Barchart
    spdChart
        .width(chartWidth)
        .height(400)
        .dimension(pokeSpeedDim)
        .group(numPokemonSpeed)
        .x(d3.scale.linear().domain([minSpd,maxSpd]))
        .yAxisLabel("Number of Pokemon")
        .xAxisLabel("Base Speed")
        .ordinalColors(['#910087'])
        .elasticY(true)
        .xAxis().ticks(10);

    // Box for total number of Pokemon
    pokemonTotal
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all)
        .formatNumber(d3.format(".3s"));

    // Make charts responsive
    $(window).resize(function() {
        // Recalculate chart size
        chartWidth = $("#pieChart").width();
        if(chartWidth >= 480){
            pieRadius = 200;
        } else {
            pieRadius = chartWidth * 0.3;
        }

        // Set new values and redraw charts
        typeChart
            .width(chartWidth)
            .cx([chartWidth / 2 + 15])
            .radius(pieRadius)
            .redraw();

        hpChart
            .width(chartWidth)
            .rescale()
            .redraw();

        atkChart
            .width(chartWidth)
            .rescale()
            .redraw();

        defChart
            .width(chartWidth)
            .rescale()
            .redraw();

        satkChart
            .width(chartWidth)
            .rescale()
            .redraw();

        sdefChart
            .width(chartWidth)
            .rescale()
            .redraw();

        spdChart
            .width(chartWidth)
            .rescale()
            .redraw();
    });

    console.log(hpChart.radius);

    // Render everything on page
    dc.renderAll();
}