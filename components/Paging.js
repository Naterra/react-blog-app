import React from 'react';

class Paging extends React.Component {
    getPagesArr(startPage, endPage){
        let res=[];
        for(let i=startPage; i<=endPage; i++){
            res.push(i);
        }
        return res;
    }
    getStartEnd(totalPages, currentPage){
        let startPage, endPage;

        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        return {startPage, endPage}
    }
    render() {
        // console.error('>>> Paging', this.props);
        const {total, pageNo, recordsPerPage} = this.props;
        const currentPage= pageNo || 1;
        const pageSize= recordsPerPage;
        const totalPages = total <=recordsPerPage ? 0 :Math.ceil(Number(total) / pageSize);
        // console.error('>>> totalPages', totalPages);

        let {startPage, endPage} = this.getStartEnd(totalPages, currentPage);
        let pagesArr = this.getPagesArr(startPage, endPage);


        let arrowStyleFirst= currentPage ==1 || currentPage< pageSize ? "disabled":"waves-effect";
        let arrowStyleLast= currentPage == totalPages || currentPage >totalPages-pageSize  ? "disabled":"waves-effect";

        if(totalPages <=0){
           return false;
        }else{
            return(<ul className="pagination">
                <li onClick={(e)=>this.props.onClick(e, 1)} className={arrowStyleFirst}><a><i className="material-icons">chevron_left</i></a></li>

                {pagesArr.map((page,i)=>{
                    let istyle= page == currentPage? "active":"waves-effect";

                    return(<li key={i} onClick={(e)=>this.props.onClick(e, page)} className={istyle}><a>{page}</a></li>);
                })}

                <li  onClick={(e)=>this.props.onClick(e, totalPages)} className={arrowStyleLast}><a><i className="material-icons">chevron_right</i></a></li>
            </ul>);
        }

    }
}

export default Paging;