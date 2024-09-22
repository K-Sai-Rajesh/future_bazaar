export const config = {
    BASE_API: `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : ''}/api`,
    BASE_URL: `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : ''}`
}