function Hello() {
    var name = $("#name").val()
    var age = $("#age").val()
    var like = "";

    if ($("#boy").prop("checked")) { // 回傳布林值
        like += " " + $("#boy").val();
    }
    if ($("#girl").prop("checked")) { // 回傳布林值
        like += " " + $("#girl").val();
    }


    alert("Hello, " + age + " 歲的 " + name + " 你好 .原來你是" + like)
    $("#age").val("")
    $("#name").val("")
    $("#boy").prop("checked", false);
    $("#girl").prop("checked", false);


}

$("#Hello").on("click", Hello);