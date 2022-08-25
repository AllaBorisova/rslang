import React from 'react'
import ReactPaginate from 'react-paginate'

function Pagination(props) {
    const { action, current } = props
    const pageCount = 30
    return (
        <div className="group-btn">
            <ReactPaginate
                // initialPage={0}
                forcePage={current}
                previousLabel="<"
                nextLabel=">"
                pageCount={pageCount}
                siblingCount="1"
                onPageChange={action}
                containerClassName="pagination"
                previousLinkClassName="previous-btn"
                nextLinkClassName="next-btn"
                disabledClassName="disabled-btn"
                activeClassName="active-btn"
                pageRangeDisplayed={5}
            />
        </div>
    )
}
export default Pagination
