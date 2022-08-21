import React from "react"
import Pagination from "react-bootstrap/Pagination"

function Paginate() {
  return (
    <Pagination>
      <Pagination.First disabled />
      <Pagination.Prev disabled />
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{30}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  )
}

export default Paginate
