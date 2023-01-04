
//Function to make number from string
export const convertToNumStr = (str) => {

    str = str.replace(/[^,\.\d]/g,'')
    str = str.replace(/,/g,'.')
    if(str === '.'){
        str = '0.'
    }
    let numberOfDots = str.split('.').length-1
    if (numberOfDots > 1){
        str = str.slice(0,str.length-1)
    }
    if(str[0] === '0' && str.length > 1 && str[1] !== '.'){
        str = str.slice(0,str.length-1)
    }

    return str

}