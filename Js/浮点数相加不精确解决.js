function add(num1,num2){
    let a1,a2,m;
    a1 = (''+num1).split('.')[1].length;
    a2 = (''+num2).split('.')[1].length;
    m = Math.pow(10,Math.max(a1,a2));
    return(num1*m + num2*m)/m;
}