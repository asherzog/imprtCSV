//  d3.select("#fileLoad")
//   .on("change", function() {
//     var file = d3.event.target.files[0];
//     if (file) {
//       var reader = new FileReader();
//       reader.onloadend = function(evt) {
//         //Grabs the path to the file to be loaded
//         var dataUrl = evt.target.result;
//         showData(dataUrl);
//       };
//       reader.readAsDataURL(file);
//     }
//   });
//
// function showData(csvUrl) {
//   Papa.parse(csvUrl, {
// 	worker: true,
// 	step: function(results) {
// 		console.log("Row:", results.data);
// 	}
// });
//   // d3.csv( csvUrl, function( rows ) {
//   //   console.log(rows);
//   //   var thead = d3.select("thead").selectAll("th")
//   //   .data(d3.keys(rows[0]))
//   //   .enter().append("th").text(function(d){return d;});
//   //   // fill the table
//   //   // create rows
//   //   var tr = d3.select("tbody").selectAll("tr")
//   //   .data(rows).enter().append("tr");
//   //   // cells
//   //   var td = tr.selectAll("td")
//   //   .data(function(d){return d3.values(d);})
//   //   .enter().append("td")
//   //   .text(function(d) {return d;});
//   // });
// };
