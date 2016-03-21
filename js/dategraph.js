var moment = require('moment');

exports.graph = function(repositories) {

  count = function(ary, classifier) {
    return ary.reduce(function(counter, item) {
        var p = (classifier || String)(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {});
  };

  var date_sort_asc = function (date1, date2) {
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
  };

  dateArray = [];
  repositories.forEach(function(repo) {
      var newDate = new Date(moment(repo.created).format("YYYY, MM"));
      dateArray.push(newDate);
    });
  var sortedDates = dateArray.sort(date_sort_asc);
  console.log(sortedDates);
  var reSortedDates = count(sortedDates);


  var data =  $.map(reSortedDates, function(val, key) {
    var obj = {date: key, value: val};
    return obj;
  });

  data = data.splice((data.length - 6), data.length);


  console.log(data);


    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .6);

    var y = d3.scale.linear()
        .range([height, 0])

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select("#activityChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(data.map(function(d) { return moment(d.date).format("M YY"); }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Repos Created");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(moment(d.date).format("M YY")); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); });

    function type(d) {
      d.value = +d.value;
      return d;
    }
  };
