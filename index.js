 // d3.select("#fileLoad")
 //  .on("change", function() {
 //    var file = d3.event.target.files[0];
 //    if (file) {
 //      var reader = new FileReader();
 //      reader.onloadend = function(evt) {
 //        //Grabs the path to the file to be loaded
 //        var dataUrl = evt.target.result;
 //        showData(dataUrl);
 //      };
 //      reader.readAsDataURL(file);
 //    }
 //  });
//
// function showData(csvUrl) {
// //   Papa.parse(csvUrl, {
// // 	worker: true,
// // 	step: function(results) {
// // 		console.log("Row:", results.data);
// // 	}
// // });
//   d3.csv( csvUrl, function( rows ) {
//     console.log(rows);
//     var thead = d3.select("thead").selectAll("th")
//     .data(d3.keys(rows[0]))
//     .enter().append("th").text(function(d){return d;});
//     // fill the table
//     // create rows
//     var tr = d3.select("tbody").selectAll("tr")
//     .data(rows).enter().append("tr");
//     // cells
//     var td = tr.selectAll("td")
//     .data(function(d){return d3.values(d);})
//     .enter().append("td")
//     .text(function(d) {return d;});
//   });
// };
// $('tbody').sortable();



d3.select("#fileLoad")
 .on("change", function() {
   var file = d3.event.target.files[0];
   if (file) {
     var reader = new FileReader();
     reader.onloadend = function(evt) {
       //Grabs the path to the file to be loaded
       var dataUrl = evt.target.result;

       var oReq = new XMLHttpRequest();
       oReq.open("GET", dataUrl, true);
       oReq.responseType = "arraybuffer";

       oReq.onload = function(e) {
         var arraybuffer = oReq.response;

         /* convert data to binary string */
         var data = new Uint8Array(arraybuffer);
         var arr = new Array();
         for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
         var bstr = arr.join("");

         /* Call XLSX */
         var workbook = XLSX.read(bstr, {type:"binary"});
         var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        let parsed = XLSX.utils.sheet_to_json(worksheet, {header: 'A', raw: true});
        parsed.shift();
        let things = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S',
                      'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ',
                      'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT'];
        let count = 0;
        let columns = {}
        while (count < things.length) {
          if (parsed[0][things[count]]) {
            columns[count] = parsed[0][things[count]];
          }
          count++;
        };
        parsed.shift();
        let keys = Object.values(columns);
        let rows = parsed.map((row) => {
          let count = 0;
          let newRow = {};
          while (count < things.length) {
            if (row[things[count]]) {
              newRow[keys[count]] = row[things[count]];
            } else {
              newRow[keys[count]] = null;
            }
            count++;
          }
          return newRow;
        });

        function getJsDateFromExcel(excelDate) {
        	let date = new Date((excelDate - (25567 + 1))*86400*1000);
          return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()
        }
        rows.forEach(row => {
          if (row.COMPLETION) {
            row.COMPLETION = getJsDateFromExcel(+row.COMPLETION);
          }
          if (row.SPUD) {
            if (typeof row.SPUD == 'number' ) {
              row.SPUD = getJsDateFromExcel(+row.SPUD);
            } else {
              row.SPUD = row.SPUD;
            }
          }
        });

        let jRows = JSON.stringify(rows);
        console.log(jRows);




        var thead = d3.select("thead").selectAll("th")
        .data(d3.keys(rows[0]))
        .enter().append("th").text(function(d){
          if (d != 'undefined') {
            return d;
          }
        });
        // fill the table
        // create rows
        var tr = d3.select("tbody").selectAll("tr")
        .data(rows).enter().append("tr");
        // cells
        var td = tr.selectAll("td")
        .data(function(d){return d3.values(d);})
        .enter().append("td")
        .text(function(d) {return d;});

         $('tbody').sortable();
      };
       oReq.send();
     };
     reader.readAsDataURL(file);
   }
 });
