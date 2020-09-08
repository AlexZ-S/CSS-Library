function number(num){
    var num = num.split('.');
    num[1] = num[1].substr(0,2);
    num = num[0] + '.' +num[1];
    return num;
}