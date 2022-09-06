import React from 'react'
import ReactPaginate from 'react-paginate'

function Pagination(props) {
    const { action, current } = props
    const numberofPages = 30
    return (
        <div className="group-btn">
            <ReactPaginate
                forcePage={current}
                previousLabel="<"
                nextLabel=">"
                pageCount={numberofPages}
                siblingCount="1"
                onPageChange={action}
                containerClassName="pagination"
                previousLinkClassName="previous-btn"
                nextLinkClassName="next-btn"
                disabledClassName="disabled-btn"
                activeClassName="active-btn"
                pageRangeDisplayed={5}
            />
            {/* <ReactPaginate
                containerClassName="pagination"
                previousLabel="<"
                nextLabel=">"
                breakClassName="page-item"
                forcePage={current}
                breakLabel={<a className="page-link">...</a>}
                pageCount={numberofPages}
                siblingCount="1"
                onPageChange={action}
                pageClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                activeClassName="active"
                pageRangeDisplayed={3}
            /> */}
        </div>
    )
}
export default Pagination
