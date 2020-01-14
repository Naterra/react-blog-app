import React from 'react';

export default class AdComponent extends React.Component {
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render () {
        // My Add 1
        return (<ins className="adsbygoogle"
                 style={{display:"block"}}
                 data-ad-client=""
                 data-ad-slot=""
                 data-ad-format="auto"
                 data-full-width-responsive="true">
            </ins>);
    }
}





// export default  ()=>{
//     return(
//         <script>
//         (adsbygoogle = window.adsbygoogle || []).push({
//             google_ad_client: "ca-pub-0000000",
//             enable_page_level_ads: true
//         });
// </script>)
// }