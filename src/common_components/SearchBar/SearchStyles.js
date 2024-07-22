const searchstyles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 2,
  },
  textfield: { display: 'flex', flexDirection: 'column', gap: 2, width: '70%' },
  filters: { display: 'flex', gap: 2, alignItems: 'center' },
  booklist: {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    maxWidth: '75vw',
    padding: 2,
    boxSizing: 'border-box',
  },
}

export default searchstyles
