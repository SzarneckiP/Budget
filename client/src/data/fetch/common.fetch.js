export const fetchAllCategories = async () => {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`);

    return promise;
}