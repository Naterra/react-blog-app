export const is_phone_number = val => {
    //(123) 456-7890 format or (123)456-7890, (123)-456-7890, (123) 456 7890, (123)4567890
    const phone_format_re_1 = /^\((\d{3})\)(|['\-']|[\s])(\d{3})(|['\-']|[\s])(\d{4})$/;
    if (phone_format_re_1.test(val) == true) return true;

    //5033904999, 503 390 4999, 503-390-4999, 503-3904999 etc
    const phone_format_re_2 = /^(\d{3})(|['\-']|[\s])(\d{3})(|['\-']|[\s])(\d{4})$/;
    if (phone_format_re_2.test(val) == true) return true;

    //Extension examples accepted ', 1#' ' 333' '; x12345' there needs to be at least a space between the 10 digits and extension. Up to 5 digits on extension.
    //Allowing for phone numbers with extensions and re_1
    const phone_format_re_3 = /^\((\d{3})\)(|['\-']|[\s])(\d{3})(|['\-']|[\s])(\d{4})([',']|[';'])?(\s)x?(\d{1,5})#?$/;
    if (phone_format_re_3.test(val) == true) return true;
    
    //Allowing for phone numbers with extensions and re_2
    const phone_format_re_4 = /^(\d{3})(|['\-']|[\s])(\d{3})(|['\-']|[\s])(\d{4})([',']|[';'])?(\s)x?(\d{1,5})#?$/;
    if (phone_format_re_4.test(val) == true) return true;

    return false;
};

export const format_to_phone_number = val => {
    //Remove extra spaces and letters
    let replaced = val.replace(/[^0-9]|\s/g, '');
    //Make sure the string still has value
    if(replaced && replaced.match(/[0-9]/g)){
        //String of numbers
        let phoneNumb = replaced.match(/[0-9]/g).join('');
        // Divide on 3 parts
        let pArray = [];
        pArray.push(phoneNumb.substring(0, 3));
        pArray.push(phoneNumb.substring(3, 6));
        pArray.push(phoneNumb.substring(6, 10));
        
        // make it as 718-555-5555
        replaced = pArray.join("-");
        
        return replaced;
    }
    return null;
};