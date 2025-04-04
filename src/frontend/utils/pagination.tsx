export const getVisiblePages = (currentPage: number, totalPages: number) => {
  const visiblePages = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = Math.max(totalPages - 4, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }
  return visiblePages;
};
