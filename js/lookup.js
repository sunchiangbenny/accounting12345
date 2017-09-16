var fdb = new ForerunnerDB();
var db = fdb.db("myDB");
var accountCollection = db.collection('account');
accountCollection.load();



function createAccountHTMLStrings(date, category, item, cost) {
    return "<tr><td>" + date + "</td><td>" + category + "</td><td>" + item + "</td><td>" + cost + "</td><td>"
}



$("#lookup").click(function() {
    $("#accountTable").find("tr").remove();
    if ($('input[name=method]:checked').val() == "curMonth") {
        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var dateString = year + "-" + month + "-01";
        var accounts = accountCollection.find({
            date: {
                $gte: dateString
            }
        });
        for (var i = 0; i < accounts.length; i++) {
            $("#accountTable").append(createAccountHTMLStrings(accounts[i].date, accounts[i].category, accounts[i].item, accounts[i].cost))
        }
        var eatCost = 0;
        var playCost = 0;
        var otherCost = 0;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].category == "吃飯") {
                eatCost += accounts[i].cost / 1;
            } else if (accounts[i].category == "玩") {
                playCost += accounts[i].cost / 1;
            } else if (accounts[i].category == "其他") {
                otherCost += accounts[i].cost / 1;

            }
        }
        var totalCost = eatCost + playCost + otherCost
        var eatProportion = Math.round((eatCost / totalCost) * 100) + "%";
        var playProportion = Math.round((playCost / totalCost) * 100) + "%";
        var otherProportion = Math.round((otherCost / totalCost) * 100) + "%";
        $("#eatCost").text(eatCost)
        $("#eatProportion").text(eatProportion)
        $("#playCost").text(playCost)
        $("#playProportion").text(playProportion)
        $("#otherCost").text(otherCost)
        $("#otherProportion").text(otherProportion)
        $("#totalCost").text(totalCost)

    } else {
        var fromTime = $("#fromTime").val();
        var toTime = $("#toTime").val()


        var accounts = accountCollection.find({
            date: {
                $gte: fromTime,
                $lte: toTime
            }

        })
        for (var i = 0; i < accounts.length; i++) {
            $("#accountTable").append(createAccountHTMLStrings(accounts[i].date, accounts[i].category, accounts[i].item, accounts[i].cost))
        }
        var eatCost = 0;
        var playCost = 0;
        var otherCost = 0;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].category == "吃飯") {
                eatCost += accounts[i].cost / 1;
            } else if (accounts[i].category == "玩") {
                playCost += accounts[i].cost / 1;
            } else if (accounts[i].category == "其他") {
                otherCost += accounts[i].cost / 1;
            }
        }

        var totalCost = eatCost + playCost + otherCost
        var eatProportion = Math.round((eatCost / totalCost) * 100) + "%";
        var playProportion = Math.round((playCost / totalCost) * 100) + "%";
        var otherProportion = Math.round((otherCost / totalCost) * 100) + "%";
        $("#eatCost").text(eatCost)
        $("#eatProportion").text(eatProportion)
        $("#playCost").text(playCost)
        $("#playProportion").text(playProportion)
        $("#otherCost").text(otherCost)
        $("#otherProportion").text(otherProportion)
        $("#totalCost").text(totalCost)
    }
})