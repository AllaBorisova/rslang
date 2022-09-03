import React from 'react'
import ReactPaginate from 'react-paginate'

function Pagination(props) {
    const { action, current, diff, dict } = props
    const numberofPages = 30
    if (dict) {
        return (
            <div className="group-btn">
                <ReactPaginate
                    forcePage={diff}
                    previousLabel="<"
                    nextLabel=">"
                    pageCount={diff + 2}
                    siblingCount="1"
                    onPageChange={action}
                    containerClassName="pagination"
                    previousLinkClassName="previous-btn"
                    nextLinkClassName="next-btn"
                    disabledClassName="disabled-btn"
                    activeClassName="active-btn"
                    pageRangeDisplayed={0}
                />
            </div>
        )
    }
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
        </div>
    )
}
export default Pagination
