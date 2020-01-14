

export const generateClearUrl= (param) =>{
    // console.log('generateClearUrl param type', typeof param );
    //TODO:MUST be only string

    let url;

    if(typeof param == 'object'){
        let place = param;
        let urlParts = [];
        url = urlParts.join("-");

    }else{
        url = param.split(' ').join('-');
    }

    if(!url ) return false;


    // replace to dashes all  word characters
   let match = url.match(/([\wА-Яа-яЁёA-Za-z]+)/g,'-');
    // console.warn('>>> match', match);

    if(match){
        url = match.join("-");

        // to loverCase
        url =url.toLowerCase();

        // console.warn('>>> url', url);
        return url;
    }else{
        return false;
    }
};

export const generatePlaceClearUrl= (place) =>{
    //TODO:MUST be only object
    if(typeof place !== 'object') return false;

    let url=false;

    let urlParts = [];
    urlParts.push(place.name);
    urlParts.push(place._id); //must contain _id

    url = urlParts.join("-");



    if(!url ) return false;

    // replace to dashes all  word characters
    let match = url.match(/([\wА-Яа-яЁёA-Za-z]+)/g,'-');

    if(match){
        url = match.join("-");
        url =url.toLowerCase();
        return url;
    }else{
        return false;
    }

};