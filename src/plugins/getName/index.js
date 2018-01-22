let getName = function(ids, addressData) {
    if(!(ids instanceof Array)){
        console.error("ids is not a Array");
        return false
    }

    const len = addressData.length;
    let names = [];

    ids.forEach((el, index) => {
        for (let i = 0; i < len; i++) {
            const element = addressData[i];
            if(element.value == el){
                names.push(element.name);
                break;
            }
        }
    })

    return names;
}

export default getName