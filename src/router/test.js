insertItem = (arr) => {
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        let newArr = arr.concat();
        newArr.shift();
        return {newArr, arr};
    }
}

let aaa = [2,4,6,7,7];
console.log(insertItem(aaa));


