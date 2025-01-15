import 'bootstrap/dist/css/bootstrap.min.css';

function Pagination({currentPage, totalCount, onPageChange}) {
    const pageUnit = 10; // recordCountPerPage
    const pageSize = 10; // pageSize

    const totalPageCount = ((totalCount - 1) / pageUnit) + 1
    const firstPageNoOnPageList = ((currentPage - 1) / pageSize) * pageSize + 1
    const lastPageNoOnPageList = firstPageNoOnPageList + pageSize - 1 > totalPageCount
        ? totalPageCount
        : firstPageNoOnPageList + pageSize - 1

    const previousPageNo = firstPageNoOnPageList > pageSize
        ? firstPageNoOnPageList - 1
        : 1;

    const nextPageNo = lastPageNoOnPageList < totalPageCount
        ? firstPageNoOnPageList + pageSize
        : totalPageCount;

    const pageNumbers = [];
    for (let i = firstPageNoOnPageList; i <= lastPageNoOnPageList; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="d-flex gap-2 justify-content-center py-1">
            <ul className="pagination">
                {
                    totalPageCount > pageSize && <li class="page-item">
                            <a className="page-link" href="#" onclick={() => onPageChange(1)}>
                                <span>&laquo;</span>
                            </a>
                        </li>
                }
                {
                    totalPageCount > pageSize && <li class="page-item">
                            <a class="page-link" href="#" onclick={() => onPageChange(previousPageNo)}>
                                <span>&lt;</span>
                            </a>
                        </li>
                }

                {
                    pageNumbers.map((number) => {
                        <li class="page-item">
                            {
                                number === currentPageNo
                                    ? <strong class="page-link">{number}</strong>
                                    : <a class="page-link" href="#" onclick={() => onPageChange(number)}>{number}</a>
                            }
                        </li>
                    })
                }
                {
                    totalPageCount > pageSize && <li class="page-item">
                            <a class="page-link" href="#" onclick={() => onPageChange(nextPageNo)}>
                                <span>&gt;</span>
                            </a>
                        </li>
                }
                {
                    totalPageCount > pageSize && <li class="page-item">
                            <a class="page-link" href="#" onclick={() => onPageChange(totalPageCount)}>
                                <span>&raquo;</span>
                            </a>
                        </li>
                }
            </ul>
        </div>
    );
}

export default Pagination;